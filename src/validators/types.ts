export type Validator<T> = (payload: T) => () => boolean;
