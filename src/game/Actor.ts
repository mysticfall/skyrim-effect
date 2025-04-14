import {
    Actor,
    ActorBase,
    ActorValueInfo,
    Game
} from "@skyrim-platform/skyrim-platform"
import {FormError, FormHexId, FormId, resolveForm, toHexId} from "./Form"
import {pipe} from "effect/Function"
import * as FX from "effect/Effect"
import {Effect} from "effect/Effect"
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

export function getActorId(actor: Actor): ActorId {
    return ActorId.make(actor.getFormID())
}

export const ActorHexId = pipe(
    FormHexId,
    SC.brand("ActorHexId"),
    SC.annotations({
        title: "Actor Hex ID",
        description: "The ID of an actor as a hex string."
    })
)

export type ActorHexId = typeof ActorHexId.Type

export function getActorHexId(actor: Actor): ActorHexId {
    return pipe(actor, getActorId, toHexId(ActorHexId))
}

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

export function getActorName(actor: Actor): ActorName {
    return ActorName.make(actor.getName())
}

export const ActorBaseId = pipe(FormId, SC.brand("ActorBaseId"))

export type ActorBaseId = typeof ActorBaseId.Type

export function getActorBaseId(actor: ActorBase): ActorBaseId {
    return ActorBaseId.make(actor.getFormID())
}

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

export const PlayerId = ActorId.make(0x00000014)

export const playerActor: Effect<Actor, FormError> = pipe(
    FX.fromNullable(Game.getPlayer()),
    FX.catchTag(
        "NoSuchElementException",
        () =>
            new FormError({
                formId: PlayerId,
                message: "Failed to get the player reference."
            })
    )
)
