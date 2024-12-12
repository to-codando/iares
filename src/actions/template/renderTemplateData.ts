import { render } from "@/render";
import type { TemplateSchema, TaggedTemplate } from "@/types";
import type { State } from "@/state";

export const renderTemplateData =
  (templateData: TaggedTemplate, element: Element, state: State = {}) =>
    () => {
      if (typeof templateData === "string") {
        element.insertAdjacentHTML("beforeend", templateData);
      }

      if (typeof templateData === "number") {
        const data = Number(templateData);
        const value = data.toString();
        element.insertAdjacentHTML("beforeend", value);
      }
    };
