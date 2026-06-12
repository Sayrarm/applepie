export const getImageUrl = (relativePath) => {
    if (!relativePath) return '';
    const cleanPath = relativePath.replace('../assets/', '');
    return `${import.meta.env.BASE_URL}src/assets/${cleanPath}`;
};