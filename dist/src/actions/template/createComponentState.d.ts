import type { TemplateSchema } from "@/template";
type Handler = (element: Element) => void;
export declare const createComponentState: ({ type, props, children }: TemplateSchema, handler: Handler) => () => void;
export {};
//# sourceMappingURL=createComponentState.d.ts.map