export declare type GenericObjectType = {
    [key: string]: any;
};
export declare type contextCallbackType = {
    element: Element;
    props: GenericObjectType | null;
};
export declare type GenericCallbackType = (params?: GenericObjectType) => any;
export declare type CallbackRenderType = (context: contextCallbackType) => void;
export declare type watcherStateType = (payload: GenericObjectType) => any;
export declare type PropType = GenericObjectType | null;
export declare type StatePropsType = {
    state: GenericObjectType;
    setState: (payload: GenericObjectType) => void;
    getState: () => GenericObjectType;
};
export declare type StateType = {
    setState: (payload: GenericObjectType) => void;
    getState: () => GenericObjectType;
    watchState: (handler: watcherStateType) => watcherStateType;
};
export declare type HTMType = {
    type: string;
    props: GenericObjectType | null;
    children: Array<HTMType> | Array<GenericObjectType>;
};
export declare type hooksType = GenericObjectType & {
    beforeMount?: () => void;
    afterMount?: (params?: GenericObjectType) => void;
    beforeRender?: () => void;
    afterRender?: (params: GenericObjectType) => void;
    unmount?: () => void;
};
export declare type GenericComponentType = {
    template: (params: GenericObjectType) => HTMType;
    actions?: (params: GenericObjectType) => GenericObjectType;
    styles?: (params: GenericObjectType) => string;
    hooks?: (params: ActionsType) => hooksType;
    state?: StateType;
    selector: string;
    name: string;
};
export declare type ComponentSchemaProps = {
    props: PropType;
    factory: ComponentFactoryType;
};
export declare type factoryType = () => GenericComponentType;
export declare type ComponentFactoryType = (params?: GenericObjectType) => GenericComponentType;
export declare type ChildrenNodeType = Array<string> | Array<HTMType>;
export declare type ActionsType = {
    [key: string]: (handler?: GenericObjectType) => GenericObjectType | void;
};
export declare type ActionParamsType = {
    schema: GenericComponentType;
    props: GenericObjectType | null;
};
export declare type TemplateElementType = Element | null;
export declare type TemplateSchemaType = {
    schema: GenericComponentType;
    state: GenericObjectType;
    actions: GenericObjectType;
};
export declare type getHookParamsType = {
    actions: ActionsType;
    schema: GenericComponentType;
};
export declare type applyStylesParamsType = {
    actions: ActionsType;
    props: GenericObjectType | null;
    schema: GenericComponentType;
    id: string;
};
export declare type PubsubListenerType = {
    [key: string]: PubsubHandlerType[];
};
export declare type PubsubHandlerType = {
    eventName: string;
    callback: GenericCallbackType;
};
export declare type EventBusType = {
    on: (params: PubsubHandlerType) => PubsubHandlerType;
    off: (params: PubsubHandlerType) => void;
    emit: (eventName: string, payload: GenericObjectType) => void;
};
