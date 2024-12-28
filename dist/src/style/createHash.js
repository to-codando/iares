var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/style/createHash.ts
var createHash = /* @__PURE__ */ __name((text, selector) => {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = hash * 33 ^ text.charCodeAt(i);
  }
  return `${selector}-${(hash >>> 0).toString(36)}`;
}, "createHash");
export {
  createHash
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc3JjL3N0eWxlL2NyZWF0ZUhhc2gudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogR2VyYSB1bSBoYXNoIFx1MDBGQW5pY28gYmFzZWFkbyBubyBhbGdvcml0bW8gREpCMi5cbiAqIEBwYXJhbSBzdHIgLSBPIGNvbnRlXHUwMEZBZG8gYSBwYXJ0aXIgZG8gcXVhbCBvIGhhc2ggc2VyXHUwMEUxIGdlcmFkby5cbiAqIEByZXR1cm5zIE8gaGFzaCBnZXJhZG8gY29tbyB1bWEgc3RyaW5nLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlSGFzaCA9ICh0ZXh0OiBzdHJpbmcsIHNlbGVjdG9yOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBsZXQgaGFzaCA9IDUzODE7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgIGhhc2ggPSAoaGFzaCAqIDMzKSBeIHRleHQuY2hhckNvZGVBdChpKTtcbiAgfVxuICByZXR1cm4gYCR7c2VsZWN0b3J9LSR7KGhhc2ggPj4+IDApLnRvU3RyaW5nKDM2KX1gO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7QUFLTyxJQUFNLGFBQWEsd0JBQUMsTUFBYyxhQUE2QjtBQUNwRSxNQUFJLE9BQU87QUFDWCxXQUFTLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxLQUFLO0FBQ3BDLFdBQVEsT0FBTyxLQUFNLEtBQUssV0FBVyxDQUFDO0FBQUEsRUFDeEM7QUFDQSxTQUFPLEdBQUcsUUFBUSxLQUFLLFNBQVMsR0FBRyxTQUFTLEVBQUUsQ0FBQztBQUNqRCxHQU4wQjsiLAogICJuYW1lcyI6IFtdCn0K
