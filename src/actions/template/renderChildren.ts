import { render } from "@/render";
import type { Template, TemplateSchema } from "@/template";
import type { State } from "@/state";

export const renderChildren = (
  children: TemplateSchema[],
  element: Element,
  state: State = {},
) => {
  for (const child of children) {
    if (typeof child === "string") {
      element.innerHTML = child;
      //console.log(children, state);
    } else render(child, element, state);
  }
};
