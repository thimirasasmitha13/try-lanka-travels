import { useEffect, useRef, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

export interface UseAutocompleteSuggestionsReturn {
  suggestions: google.maps.places.AutocompleteSuggestion[];
  isLoading: boolean;
  resetSession: () => void;
}

function isQuotaError(err: unknown): boolean {
  const text = String(err ?? '');
  return (
    text.includes('RESOURCE_EXHAUSTED') ||
    text.includes('OVER_QUERY_LIMIT') ||
    text.includes('429') ||
    text.includes('QuotaExceededError')
  );
}

/**
 * Modern Places API (New) Autocomplete hook using AutocompleteSuggestion
 * and session tokens restricted to Sri Lanka (lk).
 */
export function useAutocompleteSuggestions(
  inputString: string,
  language?: string
): UseAutocompleteSuggestionsReturn {
  const placesLib = useMapsLibrary('places');
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompleteSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!placesLib) return;

    const trimmed = inputString.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const { AutocompleteSessionToken, AutocompleteSuggestion } = placesLib;

    if (!sessionTokenRef.current) {
      sessionTokenRef.current = new AutocompleteSessionToken();
    }

    let cancelled = false;
    setIsLoading(true);

    const timer = window.setTimeout(() => {
      const request: google.maps.places.AutocompleteRequest = {
        input: trimmed,
        includedRegionCodes: ['lk'],
        language: language || 'en',
        sessionToken: sessionTokenRef.current ?? undefined,
      };

      AutocompleteSuggestion.fetchAutocompleteSuggestions(request)
        .then((res) => {
          if (cancelled) return;
          setSuggestions(res?.suggestions ?? []);
          setIsLoading(false);
        })
        .catch((err) => {
          if (cancelled) return;
          setSuggestions([]);
          setIsLoading(false);
          if (isQuotaError(err)) {
            window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
          }
        });
    }, 220);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [placesLib, inputString, language]);

  return {
    suggestions,
    isLoading,
    resetSession: () => {
      sessionTokenRef.current = null;
      setSuggestions([]);
    },
  };
}
