import { HTMType } from "../template/types";

export type GenericObjectType = {
	[key: string]: any;
};

export type TemplateType = HTMType

export type RenderType = {
	(
		template: TemplateType,
		context?: HTMLElement,
		options?: GenericObjectType,
	): HTMLElement;
};

type FnHandlerType = {
	(): string;
};

export type BindStylesParamsType = {
	(styles: string, selector: string, id: string): void;
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
