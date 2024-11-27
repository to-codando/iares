import type { TemplateSchema } from "@/types";
import { createChain } from "@/factories";
import {
  createElementByFactoryName,
  createElementByTagName,
  renderChildren,
  setElementAttributes,
} from "@/actions";
import { isFunction, isString } from "@/validators";
import type { State } from "@/state";

type Factory = (params?: unknown) => unknown;

export const renderTemplateObject =
  (template: TemplateSchema, contextElement: Element, state: State = {}) =>
    (): void => {
      const _chain = createChain();

      _chain.add({
        validator: isString(template.type),
        action: createElementByTagName(template, contextElement, state),
      });

      _chain.add({
        validator: isFunction(template.type),
        action: createElementByFactoryName(template, contextElement, state),
      });

      _chain.execute();
    };
