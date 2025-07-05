import {pipe} from "effect/Function"
import {Utility} from "@skyrim-platform/skyrim-platform"
import * as DU from "effect/Duration"
import {Duration} from "effect/Duration"

export function getGameTime(): Duration {
    return pipe(Utility.getCurrentGameTime(), DU.days)
}

export function getRealTime(): Duration {
    return pipe(Utility.getCurrentRealTime(), DU.days)
}
