import * as SC from "effect/Schema"
import {pipe} from "effect/Function"
import {Utility} from "@skyrim-platform/skyrim-platform"
import * as DU from "effect/Duration"
import {Duration} from "effect/Duration"

export const GameTime = pipe(
    SC.Number,
    SC.brand("GameTime"),
    SC.annotations({
        title: "Game Time",
        description: 'The current game time in terms of "game days passed".'
    })
)

export type GameTime = typeof GameTime.Type

export function getGameTime(): GameTime {
    return pipe(Utility.getCurrentGameTime(), GameTime.make)
}

export function asDuration(time: GameTime): Duration {
    return DU.days(time)
}
