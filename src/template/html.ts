import htm from "htm";
import type { TaggedTemplate, TemplateProps, TemplateSchema } from "./types";

const hypertext = (
  type: unknown,
  props: TemplateProps,
  ...children: TemplateSchema[]
) => {
  return { type, props, children };
};

const html = htm.bind<TaggedTemplate>(hypertext);

export { html };
export { html as jsx };
export { html as tsx };
