import type { TemplateSchema } from "@/template";
import type { GenericObject, State, StateManager } from "@/state";
import { createState } from "@/state";
import { render } from "@/render";
import { html, jsx, tsx } from "@/template";
import { css } from "@/style";
import { renderChildren } from "./renderChildren";
import { setElementAttributes } from "./setElementAttributes";

type Factory = (params?: unknown) => unknown;

type StyleParams = {
  props: State;
  state: State;
  css: ReturnType<typeof css>;
};

type Styles = { [key: string]: string };
type StylesObject = GenericObject<{ [key: string]: () => string }>;
type StyleHandlerFactory = () => StylesObject;
type StyleHandler = (params: StyleParams) => string;

type TemplateParams = {
  props: State;
  state: State;
  html: typeof html;
  jsx: typeof jsx;
  tsx: typeof tsx;
  styles: Styles;
  actions: Actions;
};

type TemplateInjections = <T = unknown>() => GenericObject<T>;

type TemplateHandler = (
  params: TemplateParams,
  injections: TemplateInjections,
) => void;

type Actions = GenericObject;

type ActionParams = {
  props: State;
  state: StateManager;
};
type ActionHandlerFactory = (params: ActionParams) => GenericObject;

type Attribute = object & {
  [key: symbol | string]: unknown;
};

const _attributes = {};

const _createTagByFactoryName = (factory: Factory) => {
  return factory.name
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
};

const _createUseState = (state: StateManager) => {
  const currentState = {};
  const useState = <T>(initialState: State<T>): StateManager => {
    const latestState = state.get() as State<T>;
    state.set({ ...initialState, ...latestState });

    Object.assign(currentState, state.get());
    return { get: state.get, set: state.set, watch: state.watch };
  };
  return { currentState, useState };
};

const _createUseStyle = ({ props, state, css }: StyleParams) => {
  const stylesheet = {};
  const useStyle = (cssHandlerFactory: StyleHandlerFactory) => {
    const handlers = cssHandlerFactory();
    const styles: Styles = {};

    for (const key in handlers) {
      const handler = handlers[key] as StyleHandler;
      const style = handler({ props, state, css });
      styles[key] = style;
    }

    Object.assign(stylesheet, styles);
    return styles;
  };

  return { styles: stylesheet, useStyle };
};

const _createUseTemplate = (params: TemplateParams) => {
  const useTemplate = (
    templateHandler: TemplateHandler,
    templateInjections: TemplateInjections,
  ) => {
    return templateHandler(params, templateInjections);
  };

  return useTemplate;
};

const _createUseAction = ({ props, state }: ActionParams) => {
  const actions: GenericObject = {};

  const useAction = (actionHandlerFactory: ActionHandlerFactory) => {
    const handlerActions = actionHandlerFactory({ props, state });
    Object.assign(actions, handlerActions);
  };

  return { actions, useAction };
};

export const createElementByFactoryName = (
  template: TemplateSchema,
  parentElement: Element,
  latestState: State = {},
) => {
  return () => {
    const factory = template.type as Factory;
    const tagName = _createTagByFactoryName(factory);
    const selector = tagName.toLowerCase();
    const element = document.createElement(tagName);

    const props = template.props;
    const latestDeepState = JSON.parse(JSON.stringify(latestState));
    const stateManager = createState(latestDeepState);
    const { currentState: state, useState } = _createUseState(stateManager);
    const styled = css(selector, ({ hashId }) => {
      element.classList.add(hashId);
      Object.assign(_attributes, { class: hashId });
    });
    const { styles, useStyle } = _createUseStyle({ props, state, css: styled });
    const { actions, useAction } = _createUseAction({
      props,
      state: stateManager,
    });

    const useTemplate = _createUseTemplate({
      props,
      state,
      html,
      jsx,
      tsx,
      styles,
      actions,
    });

    const children = factory({
      props,
      useState,
      useStyle,
      useTemplate,
      useAction,
    }) as TemplateSchema[];

    const oldElement = parentElement.querySelector(selector) as Element;
    setElementAttributes(element, _attributes);

    oldElement
      ? oldElement.replaceWith(element)
      : parentElement.insertAdjacentElement("beforeend", element);

    renderChildren(children, element, state);

    stateManager.watch((payload) => {
      element.innerHTML = "";
      render(template, parentElement, payload);
    });
  };
};
