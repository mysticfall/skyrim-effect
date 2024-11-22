import * as FX from "effect/Effect"
import {Effect} from "effect/Effect"
import {Debug} from "@skyrim-platform/skyrim-platform"

export function messageBox(message: string): Effect<void> {
    return FX.gen(function* () {
        Debug.messageBox(message)
    })
}

export function notification(message: string): Effect<void> {
    return FX.gen(function* () {
        Debug.notification(message)
    })
}
