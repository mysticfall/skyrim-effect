import {pipe} from "effect/Function"
import * as O from "effect/Option"
import {Option} from "effect/Option"
import * as R from "effect/Record"
import * as SC from "effect/Schema"
import {FormHexId, FormId, resolveForm, toHexId} from "./Form"
import {ObjectReference, VoiceType} from "@skyrim-platform/skyrim-platform"

export const VoiceTypeId = pipe(FormId, SC.brand("VoiceTypeId"))
export type VoiceTypeId = typeof VoiceTypeId.Type

export function getVoiceTypeId(voiceType: VoiceType): VoiceTypeId {
    return VoiceTypeId.make(voiceType.getFormID())
}

export const VoiceTypeHexId = pipe(
    FormHexId,
    SC.brand("VoiceTypeHexId"),
    SC.annotations({
        title: "Voice Type Hex ID",
        description: "The ID of a voice type as a hex string."
    })
)

export type VoiceTypeHexId = typeof VoiceTypeHexId.Type

export function getVoiceTypeHexId(voiceType: VoiceType): VoiceTypeHexId {
    return pipe(voiceType, getVoiceTypeId, toHexId(VoiceTypeHexId))
}

export const getVoiceType = resolveForm<VoiceTypeId, VoiceType>(VoiceType)

export const VoiceName = pipe(SC.NonEmptyString, SC.brand("VoiceName"))
export type VoiceName = typeof VoiceName.Type

const KnownVoiceNames: Record<string, VoiceName> = {
    "00013AEF": VoiceName.make("FemaleArgonian"),
    "00013AE9": VoiceName.make("FemaleChild"),
    "00013AE3": VoiceName.make("FemaleCommander"),
    "00013ADE": VoiceName.make("FemaleCommoner"),
    "00013AE4": VoiceName.make("FemaleCondescending"),
    "00013AE5": VoiceName.make("FemaleCoward"),
    "00013AF3": VoiceName.make("FemaleDarkElf"),
    "00013AF1": VoiceName.make("FemaleElfHaughty"),
    "00013ADD": VoiceName.make("FemaleEvenToned"),
    "00013AED": VoiceName.make("FemaleKhajiit"),
    "00013AE7": VoiceName.make("FemaleNord"),
    "00013AE2": VoiceName.make("FemaleOldGrumpy"),
    "00013AE1": VoiceName.make("FemaleOldKindly"),
    "00013AEB": VoiceName.make("FemaleOrc"),
    "0001BBC3": VoiceName.make("FemaleShrill"),
    "0001B560": VoiceName.make("FemaleSoldier"),
    "00013AE0": VoiceName.make("FemaleSultry"),
    "0001BDB5": VoiceName.make("FemaleUniqueAstrid"),
    "00014432": VoiceName.make("FemaleUniqueDelphine"),
    "0001A63B": VoiceName.make("FemaleUniqueElenwen"),
    "0001B080": VoiceName.make("FemaleUniqueKarliah"),
    "0009F17B": VoiceName.make("FemaleUniqueMaven"),
    "0003924E": VoiceName.make("FemaleUniqueMirabelleErvine"),
    "0003B5A2": VoiceName.make("FemaleUniqueVex"),
    "00013ADC": VoiceName.make("FemaleYoungEager"),
    "00013AEE": VoiceName.make("MaleArgonian"),
    "0009843B": VoiceName.make("MaleBandit"),
    "00013ADA": VoiceName.make("MaleBrute"),
    "00013AE8": VoiceName.make("MaleChild"),
    "00013AD8": VoiceName.make("MaleCommander"),
    "00013AD3": VoiceName.make("MaleCommoner"),
    "000EA266": VoiceName.make("MaleCommonerAccented"),
    "00013AD9": VoiceName.make("MaleCondescending"),
    "00013ADB": VoiceName.make("MaleCoward"),
    "00013AF2": VoiceName.make("MaleDarkElf"),
    "00013AD4": VoiceName.make("MaleDrunk"),
    "00013AF0": VoiceName.make("MaleElfHaughty"),
    "00013AD2": VoiceName.make("MaleEvenToned"),
    "000EA267": VoiceName.make("MaleEvenTonedAccented"),
    "000B84FF": VoiceName.make("MaleForsworn"),
    "000A8AD3": VoiceName.make("MaleGuard"),
    "00013AEC": VoiceName.make("MaleKhajiit"),
    "00013AE6": VoiceName.make("MaleNord"),
    "000E5003": VoiceName.make("MaleNordCommander"),
    "00013AD7": VoiceName.make("MaleOldGrumpy"),
    "00013AD6": VoiceName.make("MaleOldKindly"),
    "00013AEA": VoiceName.make("MaleOrc"),
    "00013AD5": VoiceName.make("MaleSlyCynical"),
    "0001B55F": VoiceName.make("MaleSoldier"),
    "0003924F": VoiceName.make("MaleUniqueAncano"),
    "0002F7C1": VoiceName.make("MaleUniqueArngier"),
    "0001B07E": VoiceName.make("MaleUniqueBrynjolf"),
    "0001BDAF": VoiceName.make("MaleUniqueCicero"),
    "00029DA8": VoiceName.make("MaleUniqueDelvinMallory"),
    "0001D4B8": VoiceName.make("MaleUniqueEmperor"),
    "0003BDA4": VoiceName.make("MaleUniqueEsbern"),
    "0001BB5F": VoiceName.make("MaleUniqueGallus"),
    "000E5002": VoiceName.make("MaleUniqueGalmar"),
    "001074BF": VoiceName.make("MaleUniqueHadvard"),
    "0001B07B": VoiceName.make("MaleUniqueMercerFrey"),
    "000411FB": VoiceName.make("MaleUniqueMGAugur"),
    "0001C3AC": VoiceName.make("MaleUniqueNazir"),
    "00048786": VoiceName.make("MaleUniqueSeptimus"),
    "0001A63A": VoiceName.make("MaleUniqueTullius"),
    "00020C1A": VoiceName.make("MaleUniqueUlfric"),
    "0009843A": VoiceName.make("MaleWarlock"),
    "00013AD1": VoiceName.make("MaleYoungEager")
}

export function getKnownVoiceName(
    reference: ObjectReference
): Option<VoiceName> {
    return pipe(
        reference.getVoiceType(),
        O.fromNullable,
        O.map(getVoiceTypeHexId),
        O.flatMap(v => pipe(KnownVoiceNames, R.get(v)))
    )
}
