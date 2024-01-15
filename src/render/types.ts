import { TState } from "../state/types";
import { HTMType } from "../template/types";

export type GenericObjectType = {
	[key: string]: any;
};
export type ObjectType = {
	[key: string]: any;
};

export type Store<State = ObjectType, Actions = ObjectType> = {
	state: TState<State>;
	actions: Actions;
}

export type TemplateType = HTMType|HTMType[]

export type Component<S=void, T=void, P=ObjectType, D=Store> = {
	styles: <Params=S>(params: Params) => string;
	template: <Params=T>(params: Params) => TemplateType;
	props: P
	state: D
}

export type RenderType = {
	(
		template: TemplateType,
		context?: HTMLElement,
		options?: GenericObjectType,
	): string|undefined;
};

type FnHandlerType = {
	(): string;
};

export type BindStylesParamsType = {
	(component: Component, selector: string, id: string): void;
};

export type CallbackType = {
	(element: HTMLElement): void;
};

export type CallbackExecutorType = {
	(callback: CallbackType): void;
};

export type HookType = {
	(handler: CallbackType): void;
};

export type HooksType = {
	beforeRender: HookType;
	afterRender: HookType;
	beforeMount: HookType;
	afterMount: HookType;
	destroy: HookType;
};

export type EventDriveFactoryType = {
	(element: HTMLElement): {
		execute: CallbackExecutorType;
	};
};

export type ScopeType = {
	uuid: string | null;
	componentId: string | null;
};
