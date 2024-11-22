import {TaggedError} from "effect/Data"

export class BackendError extends TaggedError("Backend")<{
    message: string
}> {
}
