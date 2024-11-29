import {HttpClient as PlatformHttp, HttpResponse} from "@skyrim-platform/skyrim-platform"
import * as FX from "effect/Effect"
import {Effect, tryPromise} from "effect/Effect"
import * as SC from "effect/Schema"
import {Schema} from "effect/Schema"
import * as ST from "effect/String"
import * as O from "effect/Option"
import {TaggedError} from "effect/Data"
import {parseError, ParseError, Unexpected} from "effect/ParseResult"
import {ReadonlyRecord} from "effect/Record"
import {ParseOptions} from "effect/SchemaAST"
import {pipe} from "effect/Function"

export class HttpError extends TaggedError("Http")<{
    message: string,
    status?: number
}> {
}

export type RawResponse = { status: number, body: string }

export interface HttpClient {
    get<A, I = A, R = never>(
        path: string,
        schema: Schema<A, I, R>,
        options?: {
            readonly headers?: ReadonlyRecord<string, string>,
            readonly parse?: ParseOptions
        }
    ): Effect<A, HttpError | ParseError, R>

    getRaw(
        path: string,
        options?: {
            readonly headers?: ReadonlyRecord<string, string>,
            readonly parse?: ParseOptions
        }
    ): Effect<RawResponse, HttpError>

    post<A, I = A, R = never>(
        path: string,
        body: string,
        schema: Schema<A, I, R>,
        options?: {
            readonly contentType?: string,
            readonly headers?: ReadonlyRecord<string, string>,
            readonly parse?: ParseOptions
        }
    ): Effect<A, HttpError | ParseError, R>

    postRaw(
        path: string,
        body: string,
        options?: {
            readonly contentType?: string,
            readonly headers?: ReadonlyRecord<string, string>,
            readonly parse?: ParseOptions
        }
    ): Effect<RawResponse, HttpError>
}

export interface HttpClientOptions {
    readonly baseUrl: string
}

export abstract class AbstractHttpClient implements HttpClient {
    readonly baseUrl: string

    constructor(options: HttpClientOptions) {
        this.baseUrl = options.baseUrl.replace(/\/+$/, "")

        this.resolveUrl = this.resolveUrl.bind(this)
        this.handleHttpErrors = this.handleHttpErrors.bind(this)
        this.validateResponse = this.validateResponse.bind(this)

        this.get = this.get.bind(this)
        this.getRaw = this.getRaw.bind(this)
        this.post = this.post.bind(this)
        this.postRaw = this.postRaw.bind(this)
        this.doGet = this.doGet.bind(this)
        this.doPost = this.doPost.bind(this)
    }

    protected resolveUrl(url: string): string {
        const path = url.replace(/^\/+/, "")

        return [this.baseUrl, path].join("/")
    }

    protected handleHttpErrors(response: RawResponse): Effect<RawResponse, HttpError> {
        const {status, body} = response

        return FX.gen(function* () {
            yield* FX.logTrace(`HTTP response: status=${status}, body=${JSON.stringify(body)}`)

            if (status < 200 || status >= 300) {
                return yield* new HttpError({
                    message: pipe(
                        body,
                        O.fromNullable,
                        O.filter(ST.isNonEmpty),
                        O.map(reason => `HTTP error: [${status}] ${reason}`),
                        O.getOrElse(() => `Http error has occurred: status=${status}.`)
                    ),
                    status
                })
            }

            return {status, body}
        })
    }

    protected validateResponse<A, I = A, R = never>(
        schema: Schema<A, I, R>,
        options?: ParseOptions
    ): (response: RawResponse) => Effect<A, ParseError, R> {
        return ({body}) => pipe(
            FX.try({
                try: () => JSON.parse(body),
                catch: e => pipe(
                    new Unexpected(body, e instanceof Error ? e.message : e?.toString()),
                    parseError
                )
            }),
            FX.flatMap(SC.validate(schema, options))
        )
    }

    get<A, I = A, R = never>(
        path: string,
        schema: Schema<A, I, R>,
        options?: {
            readonly headers?: ReadonlyRecord<string, string>,
            readonly parse?: ParseOptions
        }
    ): Effect<A, HttpError | ParseError, R> {
        return pipe(
            this.getRaw(this.resolveUrl(path), options),
            FX.flatMap(this.validateResponse(schema, options?.parse))
        )
    }

    getRaw(
        path: string,
        options?: {
            readonly headers?: ReadonlyRecord<string, string>
        }
    ): Effect<RawResponse, HttpError> {
        return pipe(
            FX.logTrace(`HTTP request: GET ${path}`),
            FX.flatMap(() => this.doGet(this.resolveUrl(path), options)),
            FX.flatMap(this.handleHttpErrors)
        )
    }

    post<A, I = A, R = never>(
        path: string,
        body: string,
        schema: Schema<A, I, R>,
        options?: {
            readonly contentType?: string,
            readonly headers?: ReadonlyRecord<string, string>,
            readonly parse?: ParseOptions
        }
    ): Effect<A, HttpError | ParseError, R> {
        return pipe(
            this.postRaw(path, body, options),
            FX.flatMap(this.validateResponse(schema, options?.parse))
        )
    }

    postRaw(
        path: string,
        body: string,
        options?: {
            readonly contentType?: string,
            readonly headers?: ReadonlyRecord<string, string>
        }
    ): Effect<RawResponse, HttpError> {
        return pipe(
            FX.logTrace(`HTTP request: POST ${path}`),
            FX.flatMap(() => this.doPost(this.resolveUrl(path), body, options)),
            FX.flatMap(this.handleHttpErrors)
        )
    }

    protected abstract doGet(
        url: string,
        options?: {
            readonly headers?: ReadonlyRecord<string, string>
        }
    ): Effect<RawResponse, HttpError>

    protected abstract doPost(
        url: string,
        body: string,
        options?: {
            readonly contentType?: string,
            readonly headers?: ReadonlyRecord<string, string>
        }
    ): Effect<RawResponse, HttpError>
}

export class PlatformHttpClient extends AbstractHttpClient {
    protected readonly http: PlatformHttp

    constructor(options: HttpClientOptions) {
        super(options)

        this.http = new PlatformHttp(this.baseUrl)

        this.handlePlatformResponse = this.handlePlatformResponse.bind(this)
    }

    protected override resolveUrl(url: string): string {
        return "/" + url.replace(/^\/+/, "")
    }

    protected handlePlatformResponse(
        promise: Promise<HttpResponse>
    ): Effect<RawResponse, HttpError> {
        return pipe(
            tryPromise({
                try: () => promise,
                catch: e => new HttpError({
                    message: pipe(
                        e instanceof Error ? e.message : e?.toString(),
                        O.fromNullable,
                        O.filter(ST.isNonEmpty),
                        O.map(reason => `Failed to send an HTTP request: ${reason}`),
                        O.getOrElse(() => "Failed to send an HTTP request.")
                    )
                })
            }),
            FX.flatMap(({status, error, body}) => {
                if (status == 0) {
                    return FX.fail(new HttpError({
                        message: pipe(
                            error,
                            O.fromNullable,
                            O.filter(ST.isNonEmpty),
                            O.getOrElse(() => "HTTP connection has failed or timed-out.")
                        )
                    }))
                }

                return FX.succeed({
                    body: pipe(
                        error,
                        O.fromNullable,
                        O.filter(ST.isNonEmpty),
                        O.getOrElse(() => body)
                    ),
                    status
                })
            })
        )
    }

    protected doGet(url: string, options?: {
        readonly headers?: ReadonlyRecord<string, string>
    }): Effect<{ status: number, body: string }, HttpError> {
        return pipe(
            this.http.get(url, {headers: options?.headers}),
            this.handlePlatformResponse
        )
    }

    protected doPost(url: string, body: string, options?: {
        readonly contentType?: string,
        readonly headers?: ReadonlyRecord<string, string>
    }): Effect<{ status: number, body: string }, HttpError> {
        return pipe(
            this.http.post(url, {
                body,
                contentType: options?.contentType ?? "application/json",
                headers: options?.headers
            }),
            this.handlePlatformResponse
        )
    }
}
