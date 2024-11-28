var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/utils/index.ts
var escapeTemplateString = /* @__PURE__ */ __name((templateString) => {
  if (typeof templateString !== "string") return templateString;
  return templateString.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/\//g, "&#x2F;");
}, "escapeTemplateString");
var bindStyleScope = /* @__PURE__ */ __name((scopeId, strings) => {
  const regex = /(\.(\w+)(\-*|\_*)?)+\w+/gi;
  return strings.replace(regex, (values) => {
    return `.${scopeId}-${values.replace(/\./, "")}`;
  });
}, "bindStyleScope");
var createUUID = /* @__PURE__ */ __name(() => Math.random().toString(36).slice(2, 6), "createUUID");
var HTMLEvents = [
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
  "onscroll"
];

// src/template/css.ts
var css = /* @__PURE__ */ __name((strings, ...values) => {
  const uniqueId = createUUID();
  const processedValues = values.map(
    (value) => typeof value === "function" ? value().toString() : value.toString()
  );
  const rawCss = strings.map((str, index) => `${str}${processedValues[index] || ""}`).join("");
  const prefixedCss = rawCss.replace(
    /([^{}]+){([^}]*)}/g,
    (match, selectors, content) => {
      if (selectors.trim().startsWith("@")) {
        return match;
      }
      const prefixedSelectors = selectors.split(",").map((sel) => `.${uniqueId}${sel.trim()}`).join(", ");
      return `${prefixedSelectors} {${content}}`;
    }
  );
  return prefixedCss;
}, "css");
export {
  css
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL3V0aWxzL2luZGV4LnRzIiwgIi4uLy4uLy4uL3NyYy90ZW1wbGF0ZS9jc3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBjb25zdCBlc2NhcGVUZW1wbGF0ZVN0cmluZyA9ICh0ZW1wbGF0ZVN0cmluZzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKHR5cGVvZiB0ZW1wbGF0ZVN0cmluZyAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIHRlbXBsYXRlU3RyaW5nO1xuICByZXR1cm4gdGVtcGxhdGVTdHJpbmdcbiAgICAucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpXG4gICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpXG4gICAgLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG4gICAgLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKVxuICAgIC5yZXBsYWNlKC9cXC8vZywgXCImI3gyRjtcIik7XG59O1xuXG5leHBvcnQgY29uc3QgYmluZFN0eWxlU2NvcGUgPSAoc2NvcGVJZDogc3RyaW5nLCBzdHJpbmdzOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCByZWdleCA9IC8oXFwuKFxcdyspKFxcLSp8XFxfKik/KStcXHcrL2dpO1xuICByZXR1cm4gc3RyaW5ncy5yZXBsYWNlKHJlZ2V4LCAodmFsdWVzKSA9PiB7XG4gICAgcmV0dXJuIGAuJHtzY29wZUlkfS0ke3ZhbHVlcy5yZXBsYWNlKC9cXC4vLCBcIlwiKX1gO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVVVUlEID0gKCkgPT4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiwgNik7XG5cbmV4cG9ydCBjb25zdCBIVE1MRXZlbnRzID0gW1xuICAvLyBFdmVudG9zIGRlIE1vdXNlXG4gIFwib25jbGlja1wiLFxuICBcIm9uZGJsY2xpY2tcIixcbiAgXCJvbm1vdXNlZG93blwiLFxuICBcIm9ubW91c2V1cFwiLFxuICBcIm9ubW91c2VvdmVyXCIsXG4gIFwib25tb3VzZW91dFwiLFxuICBcIm9ubW91c2Vtb3ZlXCIsXG4gIFwib25tb3VzZWVudGVyXCIsXG4gIFwib25tb3VzZWxlYXZlXCIsXG4gIFwib25jb250ZXh0bWVudVwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgVGVjbGFkb1xuICBcIm9ua2V5ZG93blwiLFxuICBcIm9ua2V5dXBcIixcbiAgXCJvbmtleXByZXNzXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBGb2NvXG4gIFwib25mb2N1c1wiLFxuICBcIm9uYmx1clwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgRm9ybXVsXHUwMEUxcmlvXG4gIFwib25zdWJtaXRcIixcbiAgXCJvbmNoYW5nZVwiLFxuICBcIm9uaW5wdXRcIixcbiAgXCJvbnJlc2V0XCIsXG4gIFwib25pbnZhbGlkXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBNXHUwMEVEZGlhXG4gIFwib25wbGF5XCIsXG4gIFwib25wYXVzZVwiLFxuICBcIm9uZW5kZWRcIixcbiAgXCJvbnZvbHVtZWNoYW5nZVwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgVG9xdWUgKFRvdWNoKSAtIHBhcmEgZGlzcG9zaXRpdm9zIG1cdTAwRjN2ZWlzXG4gIFwib250b3VjaHN0YXJ0XCIsXG4gIFwib250b3VjaG1vdmVcIixcbiAgXCJvbnRvdWNoZW5kXCIsXG4gIFwib250b3VjaGNhbmNlbFwiLFxuXG4gIC8vIEV2ZW50b3MgZGUgQW5pbWFcdTAwRTdcdTAwRTNvIGUgVHJhbnNpXHUwMEU3XHUwMEUzb1xuICBcIm9uYW5pbWF0aW9uc3RhcnRcIixcbiAgXCJvbmFuaW1hdGlvbmVuZFwiLFxuICBcIm9uYW5pbWF0aW9uaXRlcmF0aW9uXCIsXG4gIFwib250cmFuc2l0aW9uZW5kXCIsXG5cbiAgLy8gRXZlbnRvcyBkZSBPdXRyb3MgSW50ZXJhdGl2b3NcbiAgXCJvbmxvYWRcIixcbiAgXCJvbmVycm9yXCIsXG4gIFwib25yZXNpemVcIixcbiAgXCJvbnNjcm9sbFwiLFxuXTtcbiIsICJpbXBvcnQgeyBjcmVhdGVVVUlEIH0gZnJvbSBcIkAvdXRpbHNcIjtcblxuZXhwb3J0IGNvbnN0IGNzcyA9IChcbiAgc3RyaW5nczogVGVtcGxhdGVTdHJpbmdzQXJyYXksXG4gIC4uLnZhbHVlczogKHN0cmluZyB8IG51bWJlciB8ICgoKSA9PiBzdHJpbmcgfCBudW1iZXIpKVtdXG4pOiBzdHJpbmcgPT4ge1xuICBjb25zdCB1bmlxdWVJZCA9IGNyZWF0ZVVVSUQoKTtcblxuICBjb25zdCBwcm9jZXNzZWRWYWx1ZXMgPSB2YWx1ZXMubWFwKCh2YWx1ZSkgPT5cbiAgICB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IHZhbHVlKCkudG9TdHJpbmcoKSA6IHZhbHVlLnRvU3RyaW5nKCksXG4gICk7XG5cbiAgY29uc3QgcmF3Q3NzID0gc3RyaW5nc1xuICAgIC5tYXAoKHN0ciwgaW5kZXgpID0+IGAke3N0cn0ke3Byb2Nlc3NlZFZhbHVlc1tpbmRleF0gfHwgXCJcIn1gKVxuICAgIC5qb2luKFwiXCIpO1xuXG4gIGNvbnN0IHByZWZpeGVkQ3NzID0gcmF3Q3NzLnJlcGxhY2UoXG4gICAgLyhbXnt9XSspeyhbXn1dKil9L2csXG4gICAgKG1hdGNoLCBzZWxlY3RvcnMsIGNvbnRlbnQpID0+IHtcbiAgICAgIGlmIChzZWxlY3RvcnMudHJpbSgpLnN0YXJ0c1dpdGgoXCJAXCIpKSB7XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJlZml4ZWRTZWxlY3RvcnMgPSBzZWxlY3RvcnNcbiAgICAgICAgLnNwbGl0KFwiLFwiKVxuICAgICAgICAubWFwKChzZWw6IHN0cmluZykgPT4gYC4ke3VuaXF1ZUlkfSR7c2VsLnRyaW0oKX1gKVxuICAgICAgICAuam9pbihcIiwgXCIpO1xuXG4gICAgICByZXR1cm4gYCR7cHJlZml4ZWRTZWxlY3RvcnN9IHske2NvbnRlbnR9fWA7XG4gICAgfSxcbiAgKTtcblxuICByZXR1cm4gcHJlZml4ZWRDc3M7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7OztBQUFPLElBQU0sdUJBQXVCLHdCQUFDLG1CQUFtQztBQUN0RSxNQUFJLE9BQU8sbUJBQW1CLFNBQVUsUUFBTztBQUMvQyxTQUFPLGVBQ0osUUFBUSxNQUFNLE9BQU8sRUFDckIsUUFBUSxNQUFNLE1BQU0sRUFDcEIsUUFBUSxNQUFNLE1BQU0sRUFDcEIsUUFBUSxNQUFNLFFBQVEsRUFDdEIsUUFBUSxNQUFNLE9BQU8sRUFDckIsUUFBUSxPQUFPLFFBQVE7QUFDNUIsR0FUb0M7QUFXN0IsSUFBTSxpQkFBaUIsd0JBQUMsU0FBaUIsWUFBNEI7QUFDMUUsUUFBTSxRQUFRO0FBQ2QsU0FBTyxRQUFRLFFBQVEsT0FBTyxDQUFDLFdBQVc7QUFDeEMsV0FBTyxJQUFJLE9BQU8sSUFBSSxPQUFPLFFBQVEsTUFBTSxFQUFFLENBQUM7QUFBQSxFQUNoRCxDQUFDO0FBQ0gsR0FMOEI7QUFPdkIsSUFBTSxhQUFhLDZCQUFNLEtBQUssT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQTNDO0FBRW5CLElBQU0sYUFBYTtBQUFBO0FBQUEsRUFFeEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQTtBQUFBLEVBR0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBO0FBQUEsRUFHQTtBQUFBLEVBQ0E7QUFBQTtBQUFBLEVBR0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUE7QUFBQSxFQUdBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUE7QUFBQSxFQUdBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUE7QUFBQSxFQUdBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUE7QUFBQSxFQUdBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7OztBQ3RFTyxJQUFNLE1BQU0sd0JBQ2pCLFlBQ0csV0FDUTtBQUNYLFFBQU0sV0FBVyxXQUFXO0FBRTVCLFFBQU0sa0JBQWtCLE9BQU87QUFBQSxJQUFJLENBQUMsVUFDbEMsT0FBTyxVQUFVLGFBQWEsTUFBTSxFQUFFLFNBQVMsSUFBSSxNQUFNLFNBQVM7QUFBQSxFQUNwRTtBQUVBLFFBQU0sU0FBUyxRQUNaLElBQUksQ0FBQyxLQUFLLFVBQVUsR0FBRyxHQUFHLEdBQUcsZ0JBQWdCLEtBQUssS0FBSyxFQUFFLEVBQUUsRUFDM0QsS0FBSyxFQUFFO0FBRVYsUUFBTSxjQUFjLE9BQU87QUFBQSxJQUN6QjtBQUFBLElBQ0EsQ0FBQyxPQUFPLFdBQVcsWUFBWTtBQUM3QixVQUFJLFVBQVUsS0FBSyxFQUFFLFdBQVcsR0FBRyxHQUFHO0FBQ3BDLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxvQkFBb0IsVUFDdkIsTUFBTSxHQUFHLEVBQ1QsSUFBSSxDQUFDLFFBQWdCLElBQUksUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsRUFDaEQsS0FBSyxJQUFJO0FBRVosYUFBTyxHQUFHLGlCQUFpQixLQUFLLE9BQU87QUFBQSxJQUN6QztBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1QsR0EvQm1COyIsCiAgIm5hbWVzIjogW10KfQo=
