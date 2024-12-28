export type Error = {
  name: string;
  message: string;
};

export type CallbackError = (() => Error) | null;

export type MountParams = {
  [key: string]: HTMLElement;
};

export type Mount = (params: MountParams) => void;

export type Route = {
  start?: string;
  regex: RegExp;
  default?: string;
  mount: Mount;
};

type RouterInitializer = {
  init: () => void;
};

type RouterParams = {
  context: HTMLElement;
  routes: Route[];
};

export type Router = (params: RouterParams) => RouterInitializer;

export type RouterObject = {
  [key: string]: unknown; // Substitua 'any' por 'unknown' para maior segurança de tipo
};

type Callback = (params: RouterObject) => void;

type Validator = () => boolean;

export type Execute = (
  validator: Validator,
  callback: Callback,
  error: CallbackError,
) => void;
