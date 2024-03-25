import { describe, test } from 'node:test'
import assert from 'node:assert';

import {
    hasNDecimal,
    isAlphaNumeric,
    isInteger,
    isNumber,
    isPositive,
    isPositiveInteger,
    isValidMoney,
} from '.'

describe("validators", () => {
    test("hasNDecimal - true", () => {
        const input = "1,33";
        const result = hasNDecimal(input, 2);
        const expected = true;

        assert.equal(result, expected)
    })

    test("hasNDecimal - false", () => {
        const input = "1,3445";
        const result = hasNDecimal(input, 2);
        const expected = false;

        assert.equal(result, expected)
    })

    test("isAlphaNumeric - true", () => {
        const input = "HaureN_666";
        const result = isAlphaNumeric(input);
        const expected = true;

        assert.equal(result, expected)
    })
    test("isAlphaNumeric - false", () => {
        const input = null;
        const result = isAlphaNumeric(input);
        const expected = false;

        assert.equal(result, expected);
    })

    test("isInteger - true", () => {
        const input = 5;
        const result = isInteger(input);
        const expected = true;

        assert.equal(result, expected)
    })

    test("isInteger - false", () => {
        const input = 5.5;
        const result = isInteger(input);
        const expected = false;

        assert.equal(result, expected)
    })

    test("isNumber - true", () => {
        const input = 5;
        const result = isNumber(input);
        const expected = true;

        assert.equal(result, expected);
    })

    test("isNumber - false", () => {
        const input = "HaureN";
        const result = isNumber(input);
        const expected = false;

        assert.equal(result, expected);
    })

    test("isPositive - true", () => {
        const input = 5;
        const result = isPositive(input);
        const expected = true;

        assert.equal(result, expected);
    })

    test("isPositive - false", () => {
        const input = -5;
        const result = isPositive(input);
        const expected = false;

        assert.equal(result, expected);
    })

    test("isPositiveInteger - true", () => {
        const input = 5;
        const result = isPositiveInteger(input);
        const expected = true;

        assert.equal(result, expected);
    })

    test("isPositiveInteger - false", () => {
        const input = -2.5;
        const result = isPositiveInteger(input);
        const expected = false;

        assert.equal(result, expected);
    })

    test("isValidMoney - true", () => {
        const input = "5,50";
        const result = isValidMoney(input);
        const expected = true;

        assert.equal(result, expected);
    })

    test("isValidMoney - false", () => {
        const input = "invalid";
        const result = isValidMoney(input);
        const expected = false;

        assert.equal(result, expected);
    })
})