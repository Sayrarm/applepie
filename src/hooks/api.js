// Вспомогательная функция для загрузки JSON
export const fetchData = async (fileName) => {
  try {
    const response = await fetch(`/src/data/${fileName}.json`);
    if (!response.ok) throw new Error("Ошибка загрузки");
    return await response.json();
  } catch (error) {
    console.error(`Ошибка загрузки ${fileName}:`, error);
    return [];
  }
};
