import {Logger, LogLevel} from "effect"
import {Debug, printConsole} from "@skyrim-platform/skyrim-platform"

function getTraceLevel(logLevel: LogLevel.LogLevel): number {
    switch (logLevel) {
        case LogLevel.Fatal:
        case LogLevel.Error:
            return 2
        case LogLevel.Warning:
            return 1
        case LogLevel.Info:
        case LogLevel.Debug:
        case LogLevel.Trace:
        case LogLevel.None:
        default:
            return 0
    }
}

export interface MinimumLogLevels {
    readonly trace?: LogLevel.LogLevel
    readonly console?: LogLevel.LogLevel
    readonly messageBox?: LogLevel.LogLevel
}

export interface LoggingOptions {
    readonly prefix?: string
    readonly minLevels?: MinimumLogLevels
}

export function createLogger(
    options?: LoggingOptions
): Logger.Logger<unknown, void> {
    return Logger.make(({logLevel, message}) => {
        if (logLevel === LogLevel.None) return

        const isAllowed = (minLevel: LogLevel.LogLevel) =>
            minLevel != LogLevel.None &&
            LogLevel.greaterThanEqual(logLevel, minLevel)

        const entry = options?.prefix
            ? `[${options?.prefix}][${logLevel.label}]: ${message}`
            : `[${logLevel.label}]: ${message}`

        if (isAllowed(options?.minLevels?.trace ?? LogLevel.Trace)) {
            Debug.trace(entry, getTraceLevel(logLevel))
        }

        if (isAllowed(options?.minLevels?.console ?? LogLevel.Warning)) {
            printConsole(entry)
        }

        if (isAllowed(options?.minLevels?.messageBox ?? LogLevel.Fatal)) {
            Debug.messageBox(entry)
        }
    })
}
