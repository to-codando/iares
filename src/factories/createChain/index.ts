import type { ChainLink } from "./types";

export const createChain = () => {
  const _chain = new Set<ChainLink<unknown>>();

  const add = <T>(chainLink: ChainLink<T>) => {
    _chain.add(chainLink);
  };

  const execute = () => {
    for (const { action, validator } of _chain) {
      if (validator()) action();
    }
  };

  return { add, execute };
};
