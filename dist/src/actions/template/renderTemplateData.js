var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/actions/template/renderTemplateData.ts
var renderTemplateData = /* @__PURE__ */ __name((templateData, element, state = {}) => () => {
  if (typeof templateData === "string") {
    element.insertAdjacentHTML("beforeend", templateData);
  }
  if (typeof templateData === "number") {
    const data = Number(templateData);
    const value = data.toString();
    element.insertAdjacentHTML("beforeend", value);
  }
}, "renderTemplateData");
export {
  renderTemplateData
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vc3JjL2FjdGlvbnMvdGVtcGxhdGUvcmVuZGVyVGVtcGxhdGVEYXRhLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiQC9yZW5kZXJcIjtcbmltcG9ydCB0eXBlIHsgVGVtcGxhdGVTY2hlbWEsIFRhZ2dlZFRlbXBsYXRlIH0gZnJvbSBcIkAvdHlwZXNcIjtcbmltcG9ydCB0eXBlIHsgU3RhdGUgfSBmcm9tIFwiQC9zdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgcmVuZGVyVGVtcGxhdGVEYXRhID1cbiAgKHRlbXBsYXRlRGF0YTogVGFnZ2VkVGVtcGxhdGUsIGVsZW1lbnQ6IEVsZW1lbnQsIHN0YXRlOiBTdGF0ZSA9IHt9KSA9PlxuICAgICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGVEYXRhID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHRlbXBsYXRlRGF0YSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGVEYXRhID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBOdW1iZXIodGVtcGxhdGVEYXRhKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkYXRhLnRvU3RyaW5nKCk7XG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7OztBQUlPLElBQU0scUJBQ1gsd0JBQUMsY0FBOEIsU0FBa0IsUUFBZSxDQUFDLE1BQy9ELE1BQU07QUFDSixNQUFJLE9BQU8saUJBQWlCLFVBQVU7QUFDcEMsWUFBUSxtQkFBbUIsYUFBYSxZQUFZO0FBQUEsRUFDdEQ7QUFFQSxNQUFJLE9BQU8saUJBQWlCLFVBQVU7QUFDcEMsVUFBTSxPQUFPLE9BQU8sWUFBWTtBQUNoQyxVQUFNLFFBQVEsS0FBSyxTQUFTO0FBQzVCLFlBQVEsbUJBQW1CLGFBQWEsS0FBSztBQUFBLEVBQy9DO0FBQ0YsR0FYRjsiLAogICJuYW1lcyI6IFtdCn0K
