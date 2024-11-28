import type { Template, TemplateSchema } from "@/template";
import type { GenericObject, State, StateManager } from "@/state";
import { createState } from "@/state";
import { render } from "@/render";
import { html, jsx, tsx } from "@/template";
import { css } from "@/style";
import { renderChildren } from "./renderChildren";

type Factory = (params?: unknown) => unknown;

type StyleParams = {
  props: State;
  state: State;
  css: typeof css;
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
};

type TemplateInjections = <T = unknown>() => GenericObject<T>;

type TemplateHandler = (
  params: TemplateParams,
  injections: TemplateInjections,
) => void;

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

const _createUseActions = () => { };

const _createUseTemplate = (params: TemplateParams) => {
  const { props, state, html, jsx, tsx, styles } = params;

  const useTemplate = (
    templateHandler: TemplateHandler,
    templateInjections: TemplateInjections,
  ) => {
    return templateHandler(
      { props, state, html, jsx, tsx, styles },
      templateInjections,
    );
  };

  return useTemplate;
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

    const latestDeepState = JSON.parse(JSON.stringify(latestState));
    const stateManager = createState(latestDeepState);
    const { currentState: state, useState } = _createUseState(stateManager);
    const { styles, useStyle } = _createUseStyle({ props, state, css });

    const useTemplate = _createUseTemplate({
      props,
      state,
      html,
      jsx,
      tsx,
      styles,
    });

    const children = factory({
      props,
      useState,
      useStyle,
      useTemplate,
    }) as TemplateSchema[];

    parentElement.insertAdjacentElement("beforeend", element);
    renderChildren(children, element, state);

    stateManager.watch((payload) => {
      element.innerHTML = "";
      render(template, element, payload);
    });
  };
};
