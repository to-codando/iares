export const escapeTemplateString = (templateString: string): string => {
  if (typeof templateString !== "string") return templateString;
  return templateString
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\//g, "&#x2F;");
};

export const bindStyleScope = (scopeId: string, strings: string) => {
  const regex = /(\.(\w+)(\-*|\_*)?)+\w+/gi;
  return strings.replace(regex, (values) => {
    return `.${scopeId}-${values.replace(/\./, "")}`;
  });
};

export const HTMLEvents = [
  // Eventos de Mouse
  "onclick",
  "ondblclick",
  "onmousedown",
  "onmouseup",
  "onmouseover",
  "onmouseout",
  "onmousemove",
  "onmouseenter",
  "onmouseleave",
  "oncontextmenu",

  // Eventos de Teclado
  "onkeydown",
  "onkeyup",
  "onkeypress",

  // Eventos de Foco
  "onfocus",
  "onblur",

  // Eventos de Formulário
  "onsubmit",
  "onchange",
  "oninput",
  "onreset",
  "oninvalid",

  // Eventos de Mídia
  "onplay",
  "onpause",
  "onended",
  "onvolumechange",

  // Eventos de Toque (Touch) - para dispositivos móveis
  "ontouchstart",
  "ontouchmove",
  "ontouchend",
  "ontouchcancel",

  // Eventos de Animação e Transição
  "onanimationstart",
  "onanimationend",
  "onanimationiteration",
  "ontransitionend",

  // Eventos de Outros Interativos
  "onload",
  "onerror",
  "onresize",
  "onscroll",
];
