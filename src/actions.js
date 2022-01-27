export function selectOnFocus(node) {
  if (node && typeof node.select === "function") {
    const onFocus = (event) => node.select();
    node.addEventListener("focus", onFocus);
    return {
      destroy: () => node.removeEventListener("focus", onFocus),
    };
  }
}
