export const getImageUrl = (relativePath) => {
    if (!relativePath) return '';
    return new URL(relativePath, import.meta.url).href;
};