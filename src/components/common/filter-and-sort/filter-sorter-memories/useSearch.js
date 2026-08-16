import { useEffect, useState, useCallback } from "react";
import { getSearchQuery, saveSearchQuery } from "@localstorage";

export const useSearch = (prefix = "") => {
  const [searchQuery, setSearchQuery] = useState(() => getSearchQuery(prefix));

  // Сохраняем поисковый запрос
  useEffect(() => {
    saveSearchQuery(prefix, searchQuery);
  }, [searchQuery, prefix]);

  const onSearch = useCallback((value) => {
    setSearchQuery(value.toLowerCase());
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    saveSearchQuery(prefix, "");
  }, [prefix]);

  return { searchQuery, onSearch, clearSearch };
};
