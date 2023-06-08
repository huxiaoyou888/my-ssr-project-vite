const isDev: Boolean = import.meta.env.DEV;

export function baseUrl() {
    if (__isBrowser__) {
        return `/api`;
    }
    return `http://${process.env.SSR_API}/api`;
}
