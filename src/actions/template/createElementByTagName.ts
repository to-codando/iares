import type { State } from "@/state";
import type { TemplateSchema } from "@/template";
import { setElementAttributes } from "./setElementAttributes";
import { renderChildren } from "./renderChildren";

export const createElementByTagName =
  (template: TemplateSchema, parentElement: Element, state: State = {}) =>
    () => {
      const tagName = template.type as string;
      const element = document.createElement(tagName);
      setElementAttributes(element, template.props);

      parentElement.insertAdjacentElement("beforeend", element);
      renderChildren(template.children, element, state);
    };
