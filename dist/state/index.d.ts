import type { TState } from './types';
type PrimitiveObject = {
    [key: symbol]: string | number | boolean | object | null | undefined | unknown;
};
export declare const createState: <S extends PrimitiveObject>(value: S) => TState<S>;
export {};
//# sourceMappingURL=index.d.ts.map