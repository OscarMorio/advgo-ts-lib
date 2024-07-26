import { Nullable } from "../types/base-types"

export const isDefined = <T>(input: T): input is Exclude<T, undefined> => {
    return typeof input !== 'undefined'
}

export const isNull = (input: unknown): input is null => {
    return isDefined(input) && input === null
}

export const isNotNull = <T>(input: T): input is Exclude<T, null> => isDefined(input) && input !== null

export const isString = (input: unknown): input is string => isNotNull(input) && typeof input === 'string'

export const isNumber = (input: unknown): input is number => isNotNull(input) && typeof input === 'number'