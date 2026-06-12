export const getImageUrl = (relativePath) => {
    const cleanPath = relativePath.replace('../assets/', '');
    return new URL(`/src/assets/${cleanPath}`, import.meta.url).href;
};