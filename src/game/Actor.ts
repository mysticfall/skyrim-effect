import {
    Actor,
    ActorBase,
    ActorValueInfo
} from "@skyrim-platform/skyrim-platform"
import {FormId, resolveForm} from "./Form"
import {pipe} from "effect/Function"
import * as SC from "effect/Schema"

export const ActorId = pipe(
    FormId,
    SC.brand("ActorId"),
    SC.annotations({
        title: "Actor ID",
        description: "The numeric ID of an actor."
    })
)

export type ActorId = typeof ActorId.Type

export const ActorName = pipe(
    SC.String,
    SC.nonEmptyString(),
    SC.brand("ActorName"),
    SC.annotations({
        title: "Actor Name",
        description: "The name of an actor."
    })
)

export type ActorName = typeof ActorName.Type

export const ActorBaseId = pipe(FormId, SC.brand("ActorBaseId"))

export type ActorBaseId = typeof ActorBaseId.Type

export const ActorValueInfoId = pipe(FormId, SC.brand("ActorValueInfoId"))

export type ActorValueInfoId = typeof ActorValueInfoId.Type

export const Sex = pipe(
    SC.Union(SC.Literal("none"), SC.Literal("male"), SC.Literal("female")),
    SC.annotations({
        title: "Sex",
        description: "The sex of an actor."
    })
)

export type Sex = typeof Sex.Type

export function getSex(actor: ActorBase): Sex {
    switch (actor.getSex()) {
        case 0:
            return "male"
        case 1:
            return "female"
        case -1:
        default:
            return "none"
    }
}

export const getActor = resolveForm<ActorId, Actor>(Actor)

export const getActorBase = resolveForm<ActorBaseId, ActorBase>(ActorBase)

export const getActorValueInfo = resolveForm<ActorValueInfoId, ActorValueInfo>(
    ActorValueInfo
)
