import type { Template, TemplateSchema } from "@/template";
import { renderTemplateArray, renderTemplateObject } from "@/actions";
import { isArray, isObject, isFunction } from "@/validators";

type ContextElement = Element;
import { createChain } from "@/factories";
import { createState, type State } from "@/state";

//const globalState = createState({});

export const render = (
  template: Template,
  context: ContextElement = document.body,
  state: State = {},
): ContextElement => {
  const chain = createChain();
  const componentElement = context || document.querySelector("body");

  chain.add({
    validator: isArray(template),
    action: renderTemplateArray(
      template as TemplateSchema[],
      componentElement,
      state,
    ),
  });

  chain.add({
    validator: isObject(template),
    action: renderTemplateObject(
      template as TemplateSchema,
      componentElement,
      state,
    ),
  });

  chain.execute();
  return componentElement;
};
