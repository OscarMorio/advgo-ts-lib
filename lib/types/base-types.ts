export type BrandedType<T, A> = T & { __brand: A }

export type Nullable<T> = null | T