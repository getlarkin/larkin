export const getUrlQuery = (key: string) => new URLSearchParams(window.location.search).get(key)
