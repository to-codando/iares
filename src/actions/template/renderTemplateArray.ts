import { render } from "@/render";
import type { TemplateSchema } from "@/types";
import type { State } from "@/state";

export const renderTemplateArray =
  (
    templateSchema: TemplateSchema[],
    contextElement: Element,
    state: State = {},
  ) =>
    () => {
      for (const template of templateSchema) {
        render(template, contextElement, state);
      }
    };
