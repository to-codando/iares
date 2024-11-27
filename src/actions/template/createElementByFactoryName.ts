import { render } from "@/render";
import type { Template, TemplateSchema } from "@/template";
import {
  type State,
  type StateCreator,
  type StateHandler,
  type StateManager,
  createState,
} from "@/state";
import { renderChildren } from "./renderChildren";

type Factory = (params?: unknown) => unknown;

const _createTagByFactoryName = (factory: Factory) => {
  return factory.name
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
};

export const createElementByFactoryName = (
  template: TemplateSchema,
  parentElement: Element,
  latestState: State = {},
) => {
  return () => {
    const factory = template.type as Factory;
    const tagName = _createTagByFactoryName(factory);
    const element = document.createElement(tagName);
    const props = template.props;

    const currentState = JSON.parse(JSON.stringify(latestState));
    const state = createState(currentState);
    const children = factory({ props, state }) as TemplateSchema[];

    parentElement.insertAdjacentElement("beforeend", element);
    renderChildren(children, element, currentState);

    state.watch((payload) => {
      element.innerHTML = "";
      render(template, element, payload);
    });
  };
};
