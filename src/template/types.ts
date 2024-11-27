import type { State } from "@/state";

export type TemplateProps = object & {
  [key: string | symbol]: unknown;
};

export type TemplateSchema<T = unknown> = {
  type: unknown;
  props: TemplateProps;
  children: TemplateSchema[];
};

export type Template = TemplateSchema | TemplateSchema[];
