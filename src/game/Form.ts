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
import * as SC from "effect/Schema"
import * as ST from "effect/String"
import {Constructor} from "../common/Type"

export class FormError extends TaggedError("Form")<{
    message: string
    formId: number
    form?: Form
    modFile?: string
}> {}

export const FormId = pipe(SC.NonNegativeInt, SC.brand("FormId"))
export type FormId = typeof FormId.Type

export const ActionId = pipe(FormId, SC.brand("ActionId"))
export type ActionId = typeof ActionId.Type

export const ActivatorId = pipe(FormId, SC.brand("ActivatorId"))
export type ActivatorId = typeof ActivatorId.Type

export const ActiveMagicEffectId = pipe(FormId, SC.brand("ActiveMagicEffectId"))
export type ActiveMagicEffectId = typeof ActiveMagicEffectId.Type

export const ActorId = pipe(FormId, SC.brand("ActorId"))
export type ActorId = typeof ActorId.Type

export const ActorBaseId = pipe(FormId, SC.brand("ActorBaseId"))
export type ActorBaseId = typeof ActorBaseId.Type

export const ActorValueInfoId = pipe(FormId, SC.brand("ActorValueInfoId"))
export type ActorValueInfoId = typeof ActorValueInfoId.Type

export const AliasId = pipe(FormId, SC.brand("AliasId"))
export type AliasId = typeof AliasId.Type

export const AmmoId = pipe(FormId, SC.brand("AmmoId"))
export type AmmoId = typeof AmmoId.Type

export const ApparatusId = pipe(FormId, SC.brand("ApparatusId"))
export type ApparatusId = typeof ApparatusId.Type

export const ArmorId = pipe(FormId, SC.brand("ArmorId"))
export type ArmorId = typeof ArmorId.Type

export const ArmorAddonId = pipe(FormId, SC.brand("ArmorAddonId"))
export type ArmorAddonId = typeof ArmorAddonId.Type

export const ArtId = pipe(FormId, SC.brand("ArtId"))
export type ArtId = typeof ArtId.Type

export const AssociationTypeId = pipe(FormId, SC.brand("AssociationTypeId"))
export type AssociationTypeId = typeof AssociationTypeId.Type

export const BookId = pipe(FormId, SC.brand("BookId"))
export type BookId = typeof BookId.Type

export const CellId = pipe(FormId, SC.brand("CellId"))
export type CellId = typeof CellId.Type

export const ClassId = pipe(FormId, SC.brand("ClassId"))
export type ClassId = typeof ClassId.Type

export const ColorFormId = pipe(FormId, SC.brand("ColorFormId"))
export type ColorFormId = typeof ColorFormId.Type

export const CombatStyleId = pipe(FormId, SC.brand("CombatStyleId"))
export type CombatStyleId = typeof CombatStyleId.Type

export const ConstructibleObjectId = pipe(
    FormId,
    SC.brand("ConstructibleObjectId")
)
export type ConstructibleObjectId = typeof ConstructibleObjectId.Type

export const ContainerId = pipe(FormId, SC.brand("ContainerId"))
export type ContainerId = typeof ContainerId.Type

export const DefaultObjectManagerId = pipe(
    FormId,
    SC.brand("DefaultObjectManagerId")
)
export type DefaultObjectManagerId = typeof DefaultObjectManagerId.Type

export const DoorId = pipe(FormId, SC.brand("DoorId"))
export type DoorId = typeof DoorId.Type

export const EffectShaderId = pipe(FormId, SC.brand("EffectShaderId"))
export type EffectShaderId = typeof EffectShaderId.Type

export const EnchantmentId = pipe(FormId, SC.brand("EnchantmentId"))
export type EnchantmentId = typeof EnchantmentId.Type

export const EncounterZoneId = pipe(FormId, SC.brand("EncounterZoneId"))
export type EncounterZoneId = typeof EncounterZoneId.Type

export const EquipSlotId = pipe(FormId, SC.brand("EquipSlotId"))
export type EquipSlotId = typeof EquipSlotId.Type

export const ExplosionId = pipe(FormId, SC.brand("ExplosionId"))
export type ExplosionId = typeof ExplosionId.Type

export const FactionId = pipe(FormId, SC.brand("FactionId"))
export type FactionId = typeof FactionId.Type

export const FloraId = pipe(FormId, SC.brand("FloraId"))
export type FloraId = typeof FloraId.Type

export const FormListId = pipe(FormId, SC.brand("FormListId"))
export type FormListId = typeof FormListId.Type

export const FurnitureId = pipe(FormId, SC.brand("FurnitureId"))
export type FurnitureId = typeof FurnitureId.Type

export const GlobalVariableId = pipe(FormId, SC.brand("GlobalVariableId"))
export type GlobalVariableId = typeof GlobalVariableId.Type

export const HazardId = pipe(FormId, SC.brand("HazardId"))
export type HazardId = typeof HazardId.Type

export const HeadPartId = pipe(FormId, SC.brand("HeadPartId"))
export type HeadPartId = typeof HeadPartId.Type

export const IdleId = pipe(FormId, SC.brand("IdleId"))
export type IdleId = typeof IdleId.Type

export const ImageSpaceModifierId = pipe(
    FormId,
    SC.brand("ImageSpaceModifierId")
)
export type ImageSpaceModifierId = typeof ImageSpaceModifierId.Type

export const ImpactDataSetId = pipe(FormId, SC.brand("ImpactDataSetId"))
export type ImpactDataSetId = typeof ImpactDataSetId.Type

export const IngredientId = pipe(FormId, SC.brand("IngredientId"))
export type IngredientId = typeof IngredientId.Type

export const KeyId = pipe(FormId, SC.brand("KeyId"))
export type KeyId = typeof KeyId.Type

export const KeywordId = pipe(FormId, SC.brand("KeywordId"))
export type KeywordId = typeof KeywordId.Type

export const LeveledActorId = pipe(FormId, SC.brand("LeveledActorId"))
export type LeveledActorId = typeof LeveledActorId.Type

export const LeveledItemId = pipe(FormId, SC.brand("LeveledItemId"))
export type LeveledItemId = typeof LeveledItemId.Type

export const LeveledSpellId = pipe(FormId, SC.brand("LeveledSpellId"))
export type LeveledSpellId = typeof LeveledSpellId.Type

export const LightId = pipe(FormId, SC.brand("LightId"))
export type LightId = typeof LightId.Type

export const LocationId = pipe(FormId, SC.brand("LocationId"))
export type LocationId = typeof LocationId.Type

export const LocationAliasId = pipe(FormId, SC.brand("LocationAliasId"))
export type LocationAliasId = typeof LocationAliasId.Type

export const LocationRefTypeId = pipe(FormId, SC.brand("LocationRefTypeId"))
export type LocationRefTypeId = typeof LocationRefTypeId.Type

export const MagicEffectId = pipe(FormId, SC.brand("MagicEffectId"))
export type MagicEffectId = typeof MagicEffectId.Type

export const MessageId = pipe(FormId, SC.brand("MessageId"))
export type MessageId = typeof MessageId.Type

export const MiscObjectId = pipe(FormId, SC.brand("MiscObjectId"))
export type MiscObjectId = typeof MiscObjectId.Type

export const MusicTypeId = pipe(FormId, SC.brand("MusicTypeId"))
export type MusicTypeId = typeof MusicTypeId.Type

export const NetImmerseId = pipe(FormId, SC.brand("NetImmerseId"))
export type NetImmerseId = typeof NetImmerseId.Type

export const ObjectReferenceId = pipe(FormId, SC.brand("ObjectReferenceId"))
export type ObjectReferenceId = typeof ObjectReferenceId.Type

export const OutfitId = pipe(FormId, SC.brand("OutfitId"))
export type OutfitId = typeof OutfitId.Type

export const PackageId = pipe(FormId, SC.brand("PackageId"))
export type PackageId = typeof PackageId.Type

export const PerkId = pipe(FormId, SC.brand("PerkId"))
export type PerkId = typeof PerkId.Type

export const PotionId = pipe(FormId, SC.brand("PotionId"))
export type PotionId = typeof PotionId.Type

export const ProjectileId = pipe(FormId, SC.brand("ProjectileId"))
export type ProjectileId = typeof ProjectileId.Type

export const QuestId = pipe(FormId, SC.brand("QuestId"))
export type QuestId = typeof QuestId.Type

export const RaceId = pipe(FormId, SC.brand("RaceId"))
export type RaceId = typeof RaceId.Type

export const ReferenceAliasId = pipe(FormId, SC.brand("ReferenceAliasId"))
export type ReferenceAliasId = typeof ReferenceAliasId.Type

export const SceneId = pipe(FormId, SC.brand("SceneId"))
export type SceneId = typeof SceneId.Type

export const ScrollId = pipe(FormId, SC.brand("ScrollId"))
export type ScrollId = typeof ScrollId.Type

export const ShaderParticleGeometryId = pipe(
    FormId,
    SC.brand("ShaderParticleGeometryId")
)
export type ShaderParticleGeometryId = typeof ShaderParticleGeometryId.Type

export const ShoutId = pipe(FormId, SC.brand("ShoutId"))
export type ShoutId = typeof ShoutId.Type

export const SoulGemId = pipe(FormId, SC.brand("SoulGemId"))
export type SoulGemId = typeof SoulGemId.Type

export const SoundId = pipe(FormId, SC.brand("SoundId"))
export type SoundId = typeof SoundId.Type

export const SoundCategoryId = pipe(FormId, SC.brand("SoundCategoryId"))
export type SoundCategoryId = typeof SoundCategoryId.Type

export const SoundDescriptorId = pipe(FormId, SC.brand("SoundDescriptorId"))
export type SoundDescriptorId = typeof SoundDescriptorId.Type

export const SpellId = pipe(FormId, SC.brand("SpellId"))
export type SpellId = typeof SpellId.Type

export const StaticId = pipe(FormId, SC.brand("StaticId"))
export type StaticId = typeof StaticId.Type

export const TextureSetId = pipe(FormId, SC.brand("TextureSetId"))
export type TextureSetId = typeof TextureSetId.Type

export const TopicId = pipe(FormId, SC.brand("TopicId"))
export type TopicId = typeof TopicId.Type

export const TopicInfoId = pipe(FormId, SC.brand("TopicInfoId"))
export type TopicInfoId = typeof TopicInfoId.Type

export const TreeObjectId = pipe(FormId, SC.brand("TreeObjectId"))
export type TreeObjectId = typeof TreeObjectId.Type

export const UiId = pipe(FormId, SC.brand("UiId"))
export type UiId = typeof UiId.Type

export const VisualEffectId = pipe(FormId, SC.brand("VisualEffectId"))
export type VisualEffectId = typeof VisualEffectId.Type

export const VoiceTypeId = pipe(FormId, SC.brand("VoiceTypeId"))
export type VoiceTypeId = typeof VoiceTypeId.Type

export const WeaponId = pipe(FormId, SC.brand("WeaponId"))
export type WeaponId = typeof WeaponId.Type

export const WeatherId = pipe(FormId, SC.brand("WeatherId"))
export type WeatherId = typeof WeatherId.Type

export const WordOfPowerId = pipe(FormId, SC.brand("WordOfPowerId"))
export type WordOfPowerId = typeof WordOfPowerId.Type

export const WorldSpaceId = pipe(FormId, SC.brand("WorldSpaceId"))
export type WorldSpaceId = typeof WorldSpaceId.Type

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

export function resolveForm<TID extends FormId, TForm extends PapyrusObject>(
    type: Constructor<TForm> & {from: (form: Form | null) => TForm | null}
): (formId: TID, modFile?: string) => Effect<TForm, FormError> {
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
            FX.map(({object}) => object as TForm)
        )
    }
}

export const getAction = resolveForm<ActionId, Action>(Action)
export const getActivator = resolveForm<ActivatorId, Activator>(Activator)
export const getActiveMagicEffect = resolveForm<
    ActiveMagicEffectId,
    ActiveMagicEffect
>(ActiveMagicEffect)
export const getActor = resolveForm<ActorId, Actor>(Actor)
export const getActorBase = resolveForm<ActorBaseId, ActorBase>(ActorBase)
export const getActorValueInfo = resolveForm<ActorValueInfoId, ActorValueInfo>(
    ActorValueInfo
)
export const getAlias = resolveForm<AliasId, Alias>(Alias)
export const getAmmo = resolveForm<AmmoId, Ammo>(Ammo)
export const getApparatus = resolveForm<ApparatusId, Apparatus>(Apparatus)
export const getArmor = resolveForm<ArmorId, Armor>(Armor)
export const getArmorAddon = resolveForm<ArmorAddonId, ArmorAddon>(ArmorAddon)
export const getArt = resolveForm<ArtId, Art>(Art)
export const getAssociationType = resolveForm<
    AssociationTypeId,
    AssociationType
>(AssociationType)
export const getBook = resolveForm<BookId, Book>(Book)
export const getCell = resolveForm<CellId, Cell>(Cell)
export const getClass = resolveForm<ClassId, Class>(Class)
export const getColorForm = resolveForm<ColorFormId, ColorForm>(ColorForm)
export const getCombatStyle = resolveForm<CombatStyleId, CombatStyle>(
    CombatStyle
)
export const getConstructibleObject = resolveForm<
    ConstructibleObjectId,
    ConstructibleObject
>(ConstructibleObject)
export const getContainer = resolveForm<ContainerId, Container>(Container)
export const getDefaultObjectManager = resolveForm<
    DefaultObjectManagerId,
    DefaultObjectManager
>(DefaultObjectManager)
export const getDoor = resolveForm<DoorId, Door>(Door)
export const getEffectShader = resolveForm<EffectShaderId, EffectShader>(
    EffectShader
)
export const getEnchantment = resolveForm<EnchantmentId, Enchantment>(
    Enchantment
)
export const getEncounterZone = resolveForm<EncounterZoneId, EncounterZone>(
    EncounterZone
)
export const getEquipSlot = resolveForm<EquipSlotId, EquipSlot>(EquipSlot)
export const getExplosion = resolveForm<ExplosionId, Explosion>(Explosion)
export const getFaction = resolveForm<FactionId, Faction>(Faction)
export const getFlora = resolveForm<FloraId, Flora>(Flora)
export const getFormList = resolveForm<FormListId, FormList>(FormList)
export const getFurniture = resolveForm<FurnitureId, Furniture>(Furniture)
export const getGlobalVariable = resolveForm<GlobalVariableId, GlobalVariable>(
    GlobalVariable
)
export const getHazard = resolveForm<HazardId, Hazard>(Hazard)
export const getHeadPart = resolveForm<HeadPartId, HeadPart>(HeadPart)
export const getIdle = resolveForm<IdleId, Idle>(Idle)
export const getImageSpaceModifier = resolveForm<
    ImageSpaceModifierId,
    ImageSpaceModifier
>(ImageSpaceModifier)
export const getImpactDataSet = resolveForm<ImpactDataSetId, ImpactDataSet>(
    ImpactDataSet
)
export const getIngredient = resolveForm<IngredientId, Ingredient>(Ingredient)
export const getKey = resolveForm<KeyId, Key>(Key)
export const getKeyword = resolveForm<KeywordId, Keyword>(Keyword)
export const getLeveledActor = resolveForm<LeveledActorId, LeveledActor>(
    LeveledActor
)
export const getLeveledItem = resolveForm<LeveledItemId, LeveledItem>(
    LeveledItem
)
export const getLeveledSpell = resolveForm<LeveledSpellId, LeveledSpell>(
    LeveledSpell
)
export const getLight = resolveForm<LightId, Light>(Light)
export const getLocation = resolveForm<LocationId, Location>(Location)
export const getLocationAlias = resolveForm<LocationAliasId, LocationAlias>(
    LocationAlias
)
export const getLocationRefType = resolveForm<
    LocationRefTypeId,
    LocationRefType
>(LocationRefType)
export const getMagicEffect = resolveForm<MagicEffectId, MagicEffect>(
    MagicEffect
)
export const getMessage = resolveForm<MessageId, Message>(Message)
export const getMiscObject = resolveForm<MiscObjectId, MiscObject>(MiscObject)
export const getMusicType = resolveForm<MusicTypeId, MusicType>(MusicType)
export const getNetImmerse = resolveForm<NetImmerseId, NetImmerse>(NetImmerse)
export const getObjectReference = resolveForm<
    ObjectReferenceId,
    ObjectReference
>(ObjectReference)
export const getOutfit = resolveForm<OutfitId, Outfit>(Outfit)
export const getPackage = resolveForm<PackageId, Package>(Package)
export const getPerk = resolveForm<PerkId, Perk>(Perk)
export const getPotion = resolveForm<PotionId, Potion>(Potion)
export const getProjectile = resolveForm<ProjectileId, Projectile>(Projectile)
export const getQuest = resolveForm<QuestId, Quest>(Quest)
export const getRace = resolveForm<RaceId, Race>(Race)
export const getReferenceAlias = resolveForm<ReferenceAliasId, ReferenceAlias>(
    ReferenceAlias
)
export const getScene = resolveForm<SceneId, Scene>(Scene)
export const getScroll = resolveForm<ScrollId, Scroll>(Scroll)
export const getShaderParticleGeometry = resolveForm<
    ShaderParticleGeometryId,
    ShaderParticleGeometry
>(ShaderParticleGeometry)
export const getShout = resolveForm<ShoutId, Shout>(Shout)
export const getSoulGem = resolveForm<SoulGemId, SoulGem>(SoulGem)
export const getSound = resolveForm<SoundId, Sound>(Sound)
export const getSoundCategory = resolveForm<SoundCategoryId, SoundCategory>(
    SoundCategory
)
export const getSoundDescriptor = resolveForm<
    SoundDescriptorId,
    SoundDescriptor
>(SoundDescriptor)
export const getSpell = resolveForm<SpellId, Spell>(Spell)
export const getStatic = resolveForm<StaticId, Static>(Static)
export const getTextureSet = resolveForm<TextureSetId, TextureSet>(TextureSet)
export const getTopic = resolveForm<TopicId, Topic>(Topic)
export const getTopicInfo = resolveForm<TopicInfoId, TopicInfo>(TopicInfo)
export const getTreeObject = resolveForm<TreeObjectId, TreeObject>(TreeObject)
export const getUi = resolveForm<UiId, Ui>(Ui)
export const getVisualEffect = resolveForm<VisualEffectId, VisualEffect>(
    VisualEffect
)
export const getVoiceType = resolveForm<VoiceTypeId, VoiceType>(VoiceType)
export const getWeapon = resolveForm<WeaponId, Weapon>(Weapon)
export const getWeather = resolveForm<WeatherId, Weather>(Weather)
export const getWordOfPower = resolveForm<WordOfPowerId, WordOfPower>(
    WordOfPower
)
export const getWorldSpace = resolveForm<WorldSpaceId, WorldSpace>(WorldSpace)
