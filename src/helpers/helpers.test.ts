import { describe, test } from 'node:test'
import assert from 'node:assert';

import { getFileKey, hasBrokenSequence, hasDuplicatedKey, linesToJson, moneyToNumber, recordToArray } from ".";


describe("helpers", () => {
    test("getFileKey", () => {
        const input = "./data/Notas/N1.txt";
        const result = getFileKey(input);
        const expected = "N1"

        assert.equal(result, expected)
    })

    test("moneyToNumber", () => {
        const input = "15.00";
        const result = moneyToNumber(input)
        const expected = 15.00

        assert.equal(result, expected)
    })

    test("linesToJson", () => {
        const input = ['{"hello":"world"}', '{"success":true}']
        const result = linesToJson(input);
        const expected = [{ hello: "world" }, { success: true }]

        assert.deepEqual(result, expected)
    })

    test("recordToArray", () => {
        const input = {
            "1": [1, 2, 3],
            "2": [4, 5, 6]
        }
        const result = recordToArray(input)
        const expected = [1, 2, 3, 4, 5, 6];

        assert.deepEqual(result, expected)
    })

    test("hasDuplicatedKey - true", () => {
        const input = [
            { "id": 1, "name": "teste1" },
            { "id": 1, "name": "teste2" },
        ]
        const result = hasDuplicatedKey(input, 'id');
        const expected = true

        assert.equal(result, expected)
    })

    test("hasDuplicatedKey - false", () => {
        const input = [
            { id: 1, "name": "teste1" },
            { id: 2, "name": "teste2" },
        ]
        const result = hasDuplicatedKey(input, 'id');
        const expected = false

        assert.equal(result, expected)
    })

    test("hasBrokenSequence - true", () => {
        const input = [
            { id: 5, name: "teste5" },
            { id: 2, name: "teste2" },
            { id: 1, name: "teste1" },
        ];
        const result = hasBrokenSequence(input, 'id');
        const expected = true;

        assert.equal(result, expected);
    })

    test("hasBrokenSequence - false", () => {
        const input = [
            { id: 2, name: "teste2" },
            { id: 3, name: "teste3" },
            { id: 1, name: "teste1" },
        ];
        const result = hasBrokenSequence(input, 'id');
        const expected = false;

        assert.equal(result, expected);
    })
})