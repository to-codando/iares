import type { TaggedTemplate, TemplateSchema } from "@/template";
import {
  renderTemplateArray,
  renderTemplateObject,
  renderTemplateData,
} from "@/actions";
import { isArray, isObject, isTemplateData } from "@/validators";

type ContextElement = Element;
import { createChain } from "@/factories";
import { createState, type State } from "@/state";

//const globalState = createState({});

export const render = (
  template: TaggedTemplate,
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

  chain.add({
    validator: isTemplateData(template),
    action: renderTemplateData(template, componentElement, state),
  });

  chain.execute();
  return componentElement;
};
