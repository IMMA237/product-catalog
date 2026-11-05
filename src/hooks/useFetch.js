import { useEffect, useState } from 'react';

// Custom hook (React PDF, Module 8.4): reusable fetch logic with
// loading and error states, so components don't repeat useState/useEffect.
export default function useFetch(url) {
  // Remember WHICH url the stored result belongs to
  const [result, setResult] = useState({ url: null, data: null, error: null });

  useEffect(() => {
    let cancelled = false; // ignore late responses after unmount or url change

    fetch(url)
      .then((res) => {
        // fetch() does NOT throw on 404/500, so check res.ok ourselves
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setResult({ url, data, error: null });
      })
      .catch((error) => {
        if (!cancelled) setResult({ url, data: null, error });
      });

    // Cleanup function (React PDF, Module 6.3)
    return () => {
      cancelled = true;
    };
  }, [url]); // re-run only when the url changes

  // Still loading if we have no result for the CURRENT url yet
  const loading = result.url !== url;

  return {
    data: loading ? null : result.data,
    error: loading ? null : result.error,
    loading,
  };
}