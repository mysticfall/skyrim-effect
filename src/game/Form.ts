// noinspection JSUnusedGlobalSymbols

import {
    Action,
    Activator,
    ActiveMagicEffect,
    Actor,
    ActorBase,
    ActorValueInfo,
    Alias,
    Ammo,
    Apparatus,
    Armor,
    ArmorAddon,
    Art,
    AssociationType,
    Book,
    Cell,
    Class,
    ColorForm,
    CombatStyle,
    ConstructibleObject,
    Container,
    DefaultObjectManager,
    Door,
    EffectShader,
    Enchantment,
    EncounterZone,
    EquipSlot,
    Explosion,
    Faction,
    Flora,
    Form,
    FormList,
    Furniture,
    Game,
    GlobalVariable,
    Hazard,
    HeadPart,
    Idle,
    ImageSpaceModifier,
    ImpactDataSet,
    Ingredient,
    Key,
    Keyword,
    LeveledActor,
    LeveledItem,
    LeveledSpell,
    Light,
    Location,
    LocationAlias,
    LocationRefType,
    MagicEffect,
    Message,
    MiscObject,
    MusicType,
    NetImmerse,
    ObjectReference,
    Outfit,
    Package,
    PapyrusObject,
    Perk,
    Potion,
    Projectile,
    Quest,
    Race,
    ReferenceAlias,
    Scene,
    Scroll,
    ShaderParticleGeometry,
    Shout,
    SoulGem,
    Sound,
    SoundCategory,
    SoundDescriptor,
    Spell,
    Static,
    TextureSet,
    Topic,
    TopicInfo,
    TreeObject,
    Ui,
    VisualEffect,
    VoiceType,
    Weapon,
    Weather,
    WordOfPower,
    WorldSpace
} from "@skyrim-platform/skyrim-platform"
import {pipe} from "effect/Function"
import {TaggedError} from "effect/Data"
import * as FX from "effect/Effect"
import {Effect} from "effect/Effect"
import * as O from "effect/Option"
import * as ST from "effect/String"
import {Constructor} from "../common/Type"

export class FormError extends TaggedError("Form")<{
    message: string
    formId: number
    form?: Form
    modFile?: string
}> {}

const withString =
    (value: string | null | undefined) =>
    <R>(fn: (name: string) => R, onEmpty: () => R): R =>
        pipe(
            value,
            O.fromNullable,
            O.filter(ST.isNonEmpty),
            O.map(fn),
            O.getOrElse(onEmpty)
        )

export function resolveForm<T extends PapyrusObject>(
    type: Constructor<T> & {from: (form: Form | null) => T | null}
): (formId: number, modFile?: string) => Effect<T, FormError> {
    return (formId, modFile) => {
        const withModName = withString(modFile)
        const withFormName = (form: Form) => withString(form.getName())

        return pipe(
            FX.Do,
            FX.bind("form", () =>
                pipe(
                    withModName(
                        mod => Game.getFormFromFile(formId, mod),
                        () => Game.getFormEx(formId)
                    ),
                    FX.fromNullable,
                    FX.mapError(
                        () =>
                            new FormError({
                                message: withModName(
                                    mod =>
                                        `Failed to find ${type.name}(${formId}) from ${mod}.`,
                                    () =>
                                        `No such ${type.name} exists: ${formId}.`
                                ),
                                formId,
                                modFile
                            })
                    )
                )
            ),
            FX.bind("object", ({form}) =>
                pipe(
                    type.from(form),
                    FX.fromNullable,
                    FX.mapError(
                        () =>
                            new FormError({
                                message: withFormName(form)(
                                    name =>
                                        `Expected ${formId} to be ${type.name}, but it was ${name}.`,
                                    () =>
                                        `Unexpected type for ${type.name}$(${formId}).`
                                ),
                                formId,
                                modFile
                            })
                    )
                )
            ),
            FX.map(({object}) => object as T)
        )
    }
}

export const getAction = resolveForm(Action)
export const getActivator = resolveForm(Activator)
export const getActiveMagicEffect = resolveForm(ActiveMagicEffect)
export const getActor = resolveForm(Actor)
export const getActorBase = resolveForm(ActorBase)
export const getActorValueInfo = resolveForm(ActorValueInfo)
export const getAlias = resolveForm(Alias)
export const getAmmo = resolveForm(Ammo)
export const getApparatus = resolveForm(Apparatus)
export const getArmor = resolveForm(Armor)
export const getArmorAddon = resolveForm(ArmorAddon)
export const getArt = resolveForm(Art)
export const getAssociationType = resolveForm(AssociationType)
export const getBook = resolveForm(Book)
export const getCell = resolveForm(Cell)
export const getClass = resolveForm(Class)
export const getColorForm = resolveForm(ColorForm)
export const getCombatStyle = resolveForm(CombatStyle)
export const getConstructibleObject = resolveForm(ConstructibleObject)
export const getContainer = resolveForm(Container)
export const getDefaultObjectManager = resolveForm(DefaultObjectManager)
export const getDoor = resolveForm(Door)
export const getEffectShader = resolveForm(EffectShader)
export const getEnchantment = resolveForm(Enchantment)
export const getEncounterZone = resolveForm(EncounterZone)
export const getEquipSlot = resolveForm(EquipSlot)
export const getExplosion = resolveForm(Explosion)
export const getFaction = resolveForm(Faction)
export const getFlora = resolveForm(Flora)
export const getFormList = resolveForm(FormList)
export const getFurniture = resolveForm(Furniture)
export const getGlobalVariable = resolveForm(GlobalVariable)
export const getHazard = resolveForm(Hazard)
export const getHeadPart = resolveForm(HeadPart)
export const getIdle = resolveForm(Idle)
export const getImageSpaceModifier = resolveForm(ImageSpaceModifier)
export const getImpactDataSet = resolveForm(ImpactDataSet)
export const getIngredient = resolveForm(Ingredient)
export const getKey = resolveForm(Key)
export const getKeyword = resolveForm(Keyword)
export const getLeveledActor = resolveForm(LeveledActor)
export const getLeveledItem = resolveForm(LeveledItem)
export const getLeveledSpell = resolveForm(LeveledSpell)
export const getLight = resolveForm(Light)
export const getLocation = resolveForm(Location)
export const getLocationAlias = resolveForm(LocationAlias)
export const getLocationRefType = resolveForm(LocationRefType)
export const getMagicEffect = resolveForm(MagicEffect)
export const getMessage = resolveForm(Message)
export const getMiscObject = resolveForm(MiscObject)
export const getMusicType = resolveForm(MusicType)
export const getNetImmerse = resolveForm(NetImmerse)
export const getObjectReference = resolveForm(ObjectReference)
export const getOutfit = resolveForm(Outfit)
export const getPackage = resolveForm(Package)
export const getPerk = resolveForm(Perk)
export const getPotion = resolveForm(Potion)
export const getProjectile = resolveForm(Projectile)
export const getQuest = resolveForm(Quest)
export const getRace = resolveForm(Race)
export const getReferenceAlias = resolveForm(ReferenceAlias)
export const getScene = resolveForm(Scene)
export const getScroll = resolveForm(Scroll)
export const getShaderParticleGeometry = resolveForm(ShaderParticleGeometry)
export const getShout = resolveForm(Shout)
export const getSoulGem = resolveForm(SoulGem)
export const getSound = resolveForm(Sound)
export const getSoundCategory = resolveForm(SoundCategory)
export const getSoundDescriptor = resolveForm(SoundDescriptor)
export const getSpell = resolveForm(Spell)
export const getStatic = resolveForm(Static)
export const getTextureSet = resolveForm(TextureSet)
export const getTopic = resolveForm(Topic)
export const getTopicInfo = resolveForm(TopicInfo)
export const getTreeObject = resolveForm(TreeObject)
export const getUi = resolveForm(Ui)
export const getVisualEffect = resolveForm(VisualEffect)
export const getVoiceType = resolveForm(VoiceType)
export const getWeapon = resolveForm(Weapon)
export const getWeather = resolveForm(Weather)
export const getWordOfPower = resolveForm(WordOfPower)
export const getWorldSpace = resolveForm(WorldSpace)
