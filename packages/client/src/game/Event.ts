import {Chunk, flow, Stream} from "effect"
import {ButtonEvent, on} from "@skyrim-platform/skyrim-platform"
import {Emit} from "effect/StreamEmit"
import * as FX from "effect/Effect"

export const buttonEvents: Stream.Stream<ButtonEvent> = Stream.async(
    (emit: Emit<never, never, ButtonEvent, void>) => {
        on("buttonEvent", flow(Chunk.of, FX.succeed, emit))
    }
)
