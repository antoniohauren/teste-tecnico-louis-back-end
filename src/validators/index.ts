export * from './pedido';
export * from './nota';

export function isNumber(value: any) {
    return typeof value === "number" && !Number.isNaN(value);
}

export function isPositive(value: number) {
    return value > 0;
}

export function isInteger(value: any) {
    return Number.isInteger(value)
}

export function isPositiveInteger(value: any) {
    return isNumber(value) && isPositive(value) && isInteger(value)
}

export function isValidMoney(value: any) {
    return isNumber(Number(value.replace(',', '.')));
}

export function hasNDecimal(value: any, count: number) {
    const decimal = value.split(',').pop();

    return decimal.length === count;
}

export function isAlphaNumeric(value: any) {
    return typeof value === 'string'
}