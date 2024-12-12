import type htm from "htm";

export type TemplateProps = object & {
  [key: string | symbol]: unknown;
};

export type TemplateSchema<T = unknown> = {
  type: unknown;
  props: TemplateProps;
  children: TemplateSchema[];
};

export type TaggedTemplate = TemplateSchema | TemplateSchema[];

export type HTMX = ReturnType<typeof htm.bind<TaggedTemplate>>;

export type JSX = ReturnType<typeof htm.bind<TaggedTemplate>>;

export type TSX = ReturnType<typeof htm.bind<TaggedTemplate>>;
