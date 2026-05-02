import { useEffect, useState } from 'react';

const SEARCH_DEBOUNCE_MS = 1000;

export function useDelayedSearch() {
  const [keyWord, setKeyWord] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setQuery(keyWord), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [keyWord]);

  return { keyWord, setKeyWord, query };
}
