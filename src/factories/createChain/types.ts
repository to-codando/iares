export type Validator<T = boolean> = () => T;
export type Action<T = unknown> = () => T;

export type ChainLink<A = unknown, V = boolean> = {
  action: Action<A>;
  validator: Validator<V>;
};
