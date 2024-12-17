import { render } from "@/render";
import type { TemplateSchema } from "@/template";
import type { State } from "@/state";

export const renderChildren = (
  children: TemplateSchema[],
  parentElement: Element,
  state: State = {},
) => {
  parentElement.innerHTML = "";
  if (!Array.isArray(children) && typeof children === "object") {
    render(children, parentElement, state);
    return;
  }

  for (const child of children) {
    render(child, parentElement, state);
  }
};
