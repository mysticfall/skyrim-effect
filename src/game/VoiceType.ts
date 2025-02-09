import {pipe} from "effect/Function"
import * as O from "effect/Option"
import {Option} from "effect/Option"
import * as SC from "effect/Schema"
import {FormId, resolveForm} from "./Form"
import {ObjectReference, VoiceType} from "@skyrim-platform/skyrim-platform"

export const VoiceTypeId = pipe(FormId, SC.brand("VoiceTypeId"))
export type VoiceTypeId = typeof VoiceTypeId.Type

export const getVoiceType = resolveForm<VoiceTypeId, VoiceType>(VoiceType)

export const StockVoiceType = SC.Union(
    SC.Literal("FemaleArgonian"),
    SC.Literal("FemaleChild"),
    SC.Literal("FemaleCommander"),
    SC.Literal("FemaleCommoner"),
    SC.Literal("FemaleCondescending"),
    SC.Literal("FemaleCoward"),
    SC.Literal("FemaleDarkElf"),
    SC.Literal("FemaleElfHaughty"),
    SC.Literal("FemaleEvenToned"),
    SC.Literal("FemaleKhajiit"),
    SC.Literal("FemaleNord"),
    SC.Literal("FemaleOldGrumpy"),
    SC.Literal("FemaleOldKindly"),
    SC.Literal("FemaleOrc"),
    SC.Literal("FemaleShrill"),
    SC.Literal("FemaleSultry"),
    SC.Literal("FemaleUniqueGhost"),
    SC.Literal("FemaleYoungEager"),
    SC.Literal("MaleArgonian"),
    SC.Literal("MaleBandit"),
    SC.Literal("MaleBrute"),
    SC.Literal("MaleChild"),
    SC.Literal("MaleCommander"),
    SC.Literal("MaleCommoner"),
    SC.Literal("MaleCommonerAccented"),
    SC.Literal("MaleCondescending"),
    SC.Literal("MaleCoward"),
    SC.Literal("MaleDarkElf"),
    SC.Literal("MaleDrunk"),
    SC.Literal("MaleElfHaughty"),
    SC.Literal("MaleEvenToned"),
    SC.Literal("MaleEvenTonedAccented"),
    SC.Literal("MaleGuard"),
    SC.Literal("MaleKhajiit"),
    SC.Literal("MaleNord"),
    SC.Literal("MaleNordCommander"),
    SC.Literal("MaleOldGrumpy"),
    SC.Literal("MaleOldKindly"),
    SC.Literal("MaleOrc"),
    SC.Literal("MaleSlyCynical"),
    SC.Literal("MaleSoldier"),
    SC.Literal("MaleUniqueGhost"),
    SC.Literal("MaleWarlock"),
    SC.Literal("MaleYoungEager")
)

export type StockVoiceType = typeof StockVoiceType.Type

export function getStockVoiceType(
    reference: ObjectReference
): Option<StockVoiceType> {
    return pipe(
        reference.getVoiceType(),
        O.fromNullable,
        O.map(v => v.getName()),
        O.filter(SC.is(StockVoiceType))
    )
}
