import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { MapPin, Loader2, Search, X } from 'lucide-react';
import { useAutocompleteSuggestions } from '../hooks/useAutocompleteSuggestions';

export interface ResolvedStop {
  uid: string;
  placeId: string;
  name: string;
  formattedAddress: string;
  location: { lat: number; lng: number };
}

interface PlaceSearchInputProps {
  placeholder: string;
  language?: string;
  value?: string;
  onSelect: (stop: ResolvedStop) => void;
  clearOnSelect?: boolean;
  id?: string;
}

export const PlaceSearchInput: React.FC<PlaceSearchInputProps> = ({
  placeholder,
  language = 'en',
  value,
  onSelect,
  clearOnSelect = false,
  id,
}) => {
  const placesLib = useMapsLibrary('places');
  const [inputValue, setInputValue] = useState(value ?? '');
  const [open, setOpen] = useState(false);
  const [resolving, setResolving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const { suggestions, isLoading, resetSession } = useAutocompleteSuggestions(
    open ? inputValue : '',
    language
  );

  const handleSelectSuggestion = useCallback(
    async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      if (!placesLib || !suggestion.placePrediction) return;
      setResolving(true);
      try {
        const place = suggestion.placePrediction.toPlace();
        await place.fetchFields({
          fields: ['id', 'displayName', 'formattedAddress', 'location', 'viewport'],
        });

        const loc = place.location;
        if (loc) {
          const resolved: ResolvedStop = {
            uid: `${place.id || Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            placeId: place.id || String(Date.now()),
            name: place.displayName || suggestion.placePrediction.mainText?.text || inputValue,
            formattedAddress: place.formattedAddress || suggestion.placePrediction.text?.text || '',
            location: {
              lat: typeof loc.lat === 'function' ? loc.lat() : (loc as unknown as { lat: number }).lat,
              lng: typeof loc.lng === 'function' ? loc.lng() : (loc as unknown as { lng: number }).lng,
            },
          };
          onSelect(resolved);
          setInputValue(clearOnSelect ? '' : resolved.name);
        }
        setOpen(false);
        resetSession();
      } catch (err) {
        const text = String(err ?? '');
        if (
          text.includes('RESOURCE_EXHAUSTED') ||
          text.includes('OVER_QUERY_LIMIT') ||
          text.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
      } finally {
        setResolving(false);
      }
    },
    [placesLib, inputValue, onSelect, clearOnSelect, resetSession]
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-[#5A6B63] absolute left-3.5 pointer-events-none" />
        <input
          id={id}
          type="text"
          value={inputValue}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setInputValue(e.target.value);
            setOpen(true);
          }}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-[#D8D3C8] rounded-lg text-[#14201B] placeholder:text-[#7A8780] focus:outline-none focus:border-[#0D2B22] focus:ring-2 focus:ring-[#0D2B22]/15 transition"
        />
        {(isLoading || resolving) ? (
          <Loader2 className="w-4 h-4 text-[#C58A2A] animate-spin absolute right-3" />
        ) : inputValue ? (
          <button
            type="button"
            onClick={() => {
              setInputValue('');
              resetSession();
            }}
            aria-label="Clear search"
            className="absolute right-2.5 p-1 text-[#7A8780] hover:text-[#14201B] rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : null}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-40 mt-1.5 w-full bg-white border border-[#E2DDD2] rounded-lg shadow-xl max-h-64 overflow-y-auto divide-y divide-[#F1EDE4]">
          {suggestions.map((s, idx) => {
            const main = s.placePrediction?.mainText?.text || s.placePrediction?.text?.text || '';
            const secondary = s.placePrediction?.secondaryText?.text || '';
            return (
              <li key={s.placePrediction?.placeId || idx}>
                <button
                  type="button"
                  onClick={() => void handleSelectSuggestion(s)}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-[#FAF8F3] flex items-start gap-2.5 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#C58A2A] shrink-0 mt-0.5" />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-[#14201B] truncate">{main}</span>
                    {secondary && (
                      <span className="block text-xs text-[#6B7A72] truncate">{secondary}</span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
