export type GenericObjectType = { [key: string]: any };

export type contextCallbackType = {
  element: Element;
  props: GenericObjectType | null;
};
export type CallbackRenderType = (context: contextCallbackType) => void;

export type watcherStateType = (payload: GenericObjectType) => any;

export type PropType = GenericObjectType | null;

export type StatePropsType = {
  state: GenericObjectType;
  setState: (payload: GenericObjectType) => void;
  getState: () => GenericObjectType;
};

export type StateType = {
  setState: (payload: GenericObjectType) => void;
  getState: () => GenericObjectType;
  watchState: (handler: watcherStateType) => watcherStateType;
};

export type HTMType = {
  type: string;
  props: GenericObjectType | null;
  children: Array<HTMType> | Array<GenericObjectType>;
};

export type hooksType = GenericObjectType & {
  beforeMount?: () => void;
  afterMount?: () => void;
  beforeRender?: () => void;
  afterRender?: () => void;
  unmount?: () => void;
};

export type GenericComponentType = {
  template: (params: GenericObjectType) => HTMType;
  actions?: (params: GenericObjectType) => GenericObjectType;
  styles?: (params: GenericObjectType) => string;
  hooks?: (params: ActionsType) => hooksType;
  state?: StateType;
};

export type ComponentSchemaProps = {
  props: PropType;
  factory: ComponentFactoryType;
};

export type factoryType = () => GenericComponentType;

type ComponentType = GenericComponentType & {
  setup: (params: GenericObjectType) => void;
  mount: () => void;
  unmount: () => void;
};

export type ComponentFactoryType = (params?: GenericObjectType) => GenericComponentType;

export type ChildrenNodeType = Array<string> | Array<HTMType>;

export type ActionsType = {
  [key: string]: (handler?: GenericObjectType) => GenericObjectType | void;
};

export type ActionParamsType = {
  schema: GenericComponentType;
  props: GenericObjectType | null;
};

export type TemplateElementType = Element | null;
export type TemplateSchemaType = {
  schema: GenericComponentType;
  state: GenericObjectType;
  actions: GenericObjectType;
};

export type getHookParamsType = {
  actions: ActionsType;
  schema: GenericComponentType;
};
