import type { TaggedStyle } from "./types";
type HandlerParams = {
    hashId: string;
    scopedStyle: string;
    styleElement: Element;
};
type Handler = (payload: HandlerParams) => void;
export declare const css: (selector: string, handler?: Handler) => TaggedStyle;
export {};
//# sourceMappingURL=css.d.ts.map