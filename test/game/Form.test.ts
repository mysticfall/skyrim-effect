import {describe, expect, it} from "vitest"
import {FormHexId, FormId, fromHexId, toHexId} from "../../src/game/Form"
import * as E from "effect/Either"
import * as SC from "effect/Schema"
import {pipe} from "effect/Function"

describe("FormHexId", () => {
    const validIdentifiers = ["120DFA20", "0000001A"]
    const invalidIdentifiers = ["120DGA20", "0000001a", "120DFA202", "120DFA2"]

    describe("should accept a valid FormHexId", () => {
        it.each(validIdentifiers)(
            "should validate FormHexId: '%s'",
            identifier => {
                const result = pipe(
                    identifier,
                    SC.decodeUnknownEither(FormHexId)
                )

                expect(result).satisfy(E.isRight)
            }
        )
    })

    describe("should reject an invalid FormHexId", () => {
        it.each(invalidIdentifiers)(
            "should reject FormHexId: '%s'",
            identifier => {
                const result = pipe(
                    identifier,
                    SC.decodeUnknownEither(FormHexId)
                )

                expect(result).satisfy(E.isLeft)
            }
        )
    })
})

describe("toHexId", () => {
    it("should convert a valid FormId to an 8-digit hex string", () => {
        const schema = FormHexId
        const formId = FormId.make(4278190332)
        const hexString = toHexId(schema)(formId)

        expect(hexString).toBe("FF0000FC")
    })

    it("should pad the hex string with leading zeros to make it 8 digits", () => {
        const schema = FormHexId
        const formId = FormId.make(255)
        const hexString = toHexId(schema)(formId)

        expect(hexString).toBe("000000FF")
    })
})

describe("fromHexId", () => {
    it("should convert a valid 8-digit hex string back to a FormId", () => {
        const schema = FormId // Use the `FormId` schema for branding
        const hexString = FormHexId.make("FF0000FC")
        const formId = fromHexId(schema)(hexString)

        expect(formId).toBe(4278190332)
    })

    it("should handle a hex string with padded zeros correctly", () => {
        const schema = FormId
        const hexString = FormHexId.make("000000FF")
        const formId = fromHexId(schema)(hexString)

        expect(formId).toBe(255)
    })
})
