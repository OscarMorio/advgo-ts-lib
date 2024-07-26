import TelephonePrefixes from "../enums/telephone-prefixes"
import { isNumber } from "../guards/base-guards"

export const getPrefixFromNumber = (number: string): number | null => {
    const [prefix] = number.split(' ')

    if (!prefix.startsWith('+')) return null

    const parsedPrefix = parseInt(prefix.substring(1), 10)

    return isNumber(parsedPrefix) ? parsedPrefix : null
}


export const getCountryNameByPrefix = (prefix: string): string | null => {
    const entries = Object.entries(TelephonePrefixes);
    const foundEntry = entries.find(([_, value]) => value === prefix);
    return foundEntry ? foundEntry[0] : null;
}
