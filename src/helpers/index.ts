export * from './file';

export function getFileKey(path: string) {
    const fileName = path.split('/').pop() ?? ''

    return fileName.split('.')[0]
}

export function moneyToNumber(money: string) {
    return Number(money.replace(',', '.')).toFixed(2)
}

export function parseJSON<T = any>(data: string): T {
    return JSON.parse(data) as T
}

export function linesToJson<T>(lines: string[]): T[] {
    const result: T[] = [];

    for (const line of lines) {
        try {
            result.push(JSON.parse(line.trim()))
        } catch (err) {
            console.log('Deu ruim')
        }
    }

    return result;
}

export function recordToArray<T>(record: Record<string, T>) {
    return Object.values(record).flat()
}

export function hasDuplicatedKey<T>(list: T[], key: string) {
    const keySet = new Set<number>();

    for (const item of list) {
        if (keySet.has(item[key])) {
            return true;
        }
        keySet.add(item[key])
    }

    return false;
}

export function hasBrokenSequence<T>(list: T[], key: string) {
    const maxValue = list.length;
    const values = list.map((item) => item[key]);
    const ordered = values.sort();

    for (let i = 0; i < maxValue; i++) {
        if (ordered[i] !== i + 1) {
            return true;
        }
    }

    return false
}