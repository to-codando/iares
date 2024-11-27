import { isEventName } from "@/validators";

type Attribute = object & {
  [key: symbol | string]: unknown;
};

type EventHandler = <K extends keyof HTMLElementEventMap>(
  event: HTMLElementEventMap[K],
) => void;

export const setElementAttributes = (
  element: Element,
  attributes: Attribute,
): Element => {
  const attributeKeys = attributes ? Object.keys(attributes) : [];
  for (const key of attributeKeys) {
    if (!isEventName(key)()) {
      element.setAttribute(key, attributes[key] as string);
    } else {
      const eventName = key
        .replace(/on/, "")
        .toLowerCase() as keyof HTMLElementEventMap;
      const eventHandler = attributes[key] as EventHandler;
      element.addEventListener(eventName, eventHandler);
    }
  }
  return element;
};
