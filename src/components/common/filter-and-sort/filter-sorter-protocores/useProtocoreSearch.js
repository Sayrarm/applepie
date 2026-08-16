import { useState, useEffect, useCallback } from "react";
import {
  getProtocoreSearchQuery,
  saveProtocoreSearchQuery,
} from "@localstorage";

export const useProtocoreSearch = (prefix = "") => {
  const [searchQuery, setSearchQuery] = useState(() =>
    getProtocoreSearchQuery(prefix),
  );

  useEffect(() => {
    saveProtocoreSearchQuery(prefix, searchQuery);
  }, [searchQuery, prefix]);

  const onSearch = useCallback((value) => {
    setSearchQuery(value.toLowerCase());
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    saveProtocoreSearchQuery(prefix, "");
  }, [prefix]);

  return { searchQuery, onSearch, clearSearch };
};
