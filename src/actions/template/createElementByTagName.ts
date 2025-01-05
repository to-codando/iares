import type { State } from "@/state";
import type { TemplateSchema } from "@/template";
import { setElementAttributes } from "./setElementAttributes";
import { renderChildren } from "./renderChildren";

const _extractHashId = (text: string) => {
  const regex = /(_.*)+/gi;
  if (!text) return text;
  return text.replace(regex, "");
};
export const createElementByTagName =
  (template: TemplateSchema, parentElement: Element, state: State = {}) =>
    () => {
      const tagName = template.type as string;
      const selector = tagName.toLowerCase();
      const element = document.createElement(tagName);
      const parentElementClass = parentElement.getAttribute("class") as string;
      const hashId = _extractHashId(parentElementClass);
      const className = template?.props?.class as string;
      if (className) {
        if (!className.includes(hashId)) {
          const newClassName = `${hashId}_${className}`;
          setElementAttributes(element, { class: newClassName });
          parentElement.insertAdjacentElement("beforeend", element);
          renderChildren(template.children, element, state);
          return;
        }
      }
      setElementAttributes(element, template.props);
      parentElement.insertAdjacentElement("beforeend", element);
      renderChildren(template.children, element, state);
    };
