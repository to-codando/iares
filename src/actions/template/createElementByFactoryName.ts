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

type StyleParams = {
  props: State;
  state: State;
};

type CssHandler = (params: StyleParams) => void;

const _createTagByFactoryName = (factory: Factory) => {
  return factory.name
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
};

const _mergeState = (state: StateManager) => {
  const mergeState = <T>(initialState: State<T>): StateManager => {
    const latestState = state.get() as State<T>;
    state.set({ ...initialState, ...latestState });

    return { get: state.get, set: state.set, watch: state.watch };
  };
  return mergeState;
};

const _createStyles = ({ props, state }: StyleParams) => {
  return (cssHandler: CssHandler) => {
    return cssHandler({ props, state });
  };
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
    const useState = _mergeState(state);
    const useStyles = _createStyles({ props, state });

    const children = factory({
      props,
      useState,
      useStyles,
    }) as TemplateSchema[];

    parentElement.insertAdjacentElement("beforeend", element);
    renderChildren(children, element, currentState);

    state.watch((payload) => {
      element.innerHTML = "";
      render(template, element, payload);
    });
  };
};
