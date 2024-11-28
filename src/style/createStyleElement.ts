const styleElementCache: Map<string, HTMLStyleElement> = new Map();

export const createStyleElement = (componentId: string): HTMLStyleElement => {
  const styleElement = styleElementCache.get(componentId);

  if (styleElement !== undefined) {
    return styleElement;
  }

  const style = document.createElement("style");
  style.setAttribute("data-component", componentId);
  document.head.appendChild(style);
  styleElementCache.set(componentId, style);

  return style;
};
