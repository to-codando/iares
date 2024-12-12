import { HTMLEvents } from "@/utils";

const isObject =
  <T>(payload: T) =>
    () => {
      return !!payload && !Array.isArray(payload) && typeof payload === "object";
    };

const isArray =
  <T>(payload: T) =>
    () => {
      return !!payload && Array.isArray(payload);
    };

const isFunction =
  <T = void>(payload: T) =>
    () => {
      return !!payload && typeof payload === "function";
    };

const isString =
  <T = void>(payload: T) =>
    () => {
      return typeof payload === "string";
    };

const isEventName =
  <T = void>(payload: T) =>
    () => {
      if (typeof payload !== "string") return false;
      return HTMLEvents.includes(payload.toLowerCase());
    };

const isTemplateData =
  <T = void>(payload: T) =>
    () => {
      return typeof payload === "string" || typeof payload === "number";
    };

export { isObject, isArray, isFunction, isString, isEventName, isTemplateData };
