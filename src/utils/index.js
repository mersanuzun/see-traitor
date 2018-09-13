export const makeDebounce = (component, timeout) => {
    return (fn) => {
        clearTimeout(component.debounceId);
        component.debounceId = setTimeout(fn, timeout);
    }
}