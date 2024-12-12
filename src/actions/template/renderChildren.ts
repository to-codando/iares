import { render } from "@/render";
import type { TemplateSchema } from "@/template";
import type { State } from "@/state";

export const renderChildren = (
  children: TemplateSchema[],
  element: Element,
  state: State = {},
) => {
  if (!Array.isArray(children) && typeof children === "object") {
    render(children, element, state);
    return;
  }

  for (const child of children) {
    render(child, element, state);
  }
};
