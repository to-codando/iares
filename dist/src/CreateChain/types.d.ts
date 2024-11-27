export type Validator = () => boolean;
export type Action = () => void;
export type ChainLink = {
    action: Action;
    validator: Validator;
};
//# sourceMappingURL=types.d.ts.map