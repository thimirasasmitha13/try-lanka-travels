import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {
  ArrowDown,
  ArrowUp,
  Compass,
  Layers,
  Loader2,
  Mail,
  MessageCircle,
  Plus,
  Route as RouteIcon,
  Trash2,
} from 'lucide-react';
import { PlaceSearchInput, ResolvedStop } from './PlaceSearchInput';
import {
  QUICK_STOP_QUERIES,
  VEHICLES,
  buildMailtoUrl,
  buildWhatsAppUrl,
} from '../data/srilankaData';
import { LangCode, TranslationCopy } from '../data/translations';

// Island-level camera center for Sri Lanka viewport initialization
const SRI_LANKA_CENTER = { lat: 7.8731, lng: 80.7718 };

interface RouteSummary {
  distanceMeters: number;
  durationMillis: number;
  legDistances: number[];
}

interface SatelliteTourPlannerProps {
  t: TranslationCopy;
  lang: LangCode;
  pendingQueries: string[] | null;
  pendingMode: 'replace' | 'append';
  onConsumedPending: () => void;
  apiKeyAvailable: boolean;
}

type MapLayerType = 'hybrid' | 'satellite' | 'terrain' | 'roadmap';

function formatDuration(ms: number): string {
  const totalMins = Math.round(ms / 60000);
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (hrs <= 0) return `${mins} min`;
  return `${hrs}h ${mins}m`;
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
 * Inner map controller handling Places Text Search resolution,
 * Route.computeRoutes polyline rendering, and camera bounds.
 */
const RouteLayerController: React.FC<{
  stops: ResolvedStop[];
  onRouteComputed: (summary: RouteSummary | null, error: string | null, loading: boolean) => void;
}> = ({ stops, onRouteComputed }) => {
  const map = useMap('srilanka-satellite-map');
  const routesLib = useMapsLibrary('routes');
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!map || !routesLib) return;

    polylinesRef.current.forEach((p) => p.setMap(null));
    polylinesRef.current = [];

    if (stops.length < 2) {
      onRouteComputed(null, null, false);
      if (stops.length === 1) {
        map.panTo(stops[0].location);
        map.setZoom(11);
      }
      return;
    }

    let cancelled = false;
    onRouteComputed(null, null, true);

    const origin = stops[0].location;
    const destination = stops[stops.length - 1].location;
    const intermediates = stops.slice(1, -1).map((s) => ({ location: s.location }));

    const request: Record<string, unknown> = {
      origin,
      destination,
      travelMode: 'DRIVING',
      fields: ['path', 'distanceMeters', 'durationMillis', 'viewport', 'legs'],
    };
    if (intermediates.length > 0) {
      request.intermediates = intermediates;
    }

    (routesLib.Route as unknown as {
      computeRoutes: (req: Record<string, unknown>) => Promise<{ routes?: any[] }>;
    })
      .computeRoutes(request)
      .then((response) => {
        if (cancelled) return;
        const primaryRoute = response?.routes?.[0];
        if (!primaryRoute) {
          onRouteComputed(null, 'No drivable route found between these Sri Lanka stops.', false);
          return;
        }

        const newPolylines: google.maps.Polyline[] = primaryRoute.createPolylines?.() ?? [];
        newPolylines.forEach((polyline) => {
          polyline.setOptions({
            strokeColor: '#F2B649',
            strokeOpacity: 0.96,
            strokeWeight: 5,
          });
          polyline.setMap(map);
        });
        polylinesRef.current = newPolylines;

        if (primaryRoute.viewport) {
          map.fitBounds(primaryRoute.viewport, { top: 64, right: 48, bottom: 48, left: 48 });
        }

        const legDistances: number[] = Array.isArray(primaryRoute.legs)
          ? primaryRoute.legs.map((l: { distanceMeters?: number }) => l?.distanceMeters ?? 0)
          : [];

        onRouteComputed(
          {
            distanceMeters: primaryRoute.distanceMeters ?? 0,
            durationMillis: primaryRoute.durationMillis ?? 0,
            legDistances,
          },
          null,
          false
        );
      })
      .catch((err) => {
        if (cancelled) return;
        if (isQuotaError(err)) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        onRouteComputed(
          null,
          'Unable to compute driving route right now. Try adjusting your stops or try again.',
          false
        );
      });

    return () => {
      cancelled = true;
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
    };
  }, [map, routesLib, stops, onRouteComputed]);

  return null;
};

export const SatelliteTourPlanner: React.FC<SatelliteTourPlannerProps> = ({
  t,
  lang,
  pendingQueries,
  pendingMode,
  onConsumedPending,
  apiKeyAvailable,
}) => {
  const placesLib = useMapsLibrary('places');

  const [mapType, setMapType] = useState<MapLayerType>('hybrid');
  const [stops, setStops] = useState<ResolvedStop[]>([]);
  const [activeMarkerUid, setActiveMarkerUid] = useState<string | null>(null);
  const [resolvingQuick, setResolvingQuick] = useState<string | null>(null);
  const [routeSummary, setRouteSummary] = useState<RouteSummary | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);

  // Tour customization state
  const [vehicleId, setVehicleId] = useState<string>(VEHICLES[1].id); // Default KDH Van
  const [tourDays, setTourDays] = useState<number>(7);
  const [travelers, setTravelers] = useState<number>(2);
  const [hotelTier, setHotelTier] = useState<'none' | 'boutique' | 'luxury'>('boutique');
  const [startDate, setStartDate] = useState<string>('');

  const initializedRef = useRef(false);

  const resolvePlaceByText = useCallback(
    async (query: string): Promise<ResolvedStop | null> => {
      if (!placesLib) return null;
      try {
        const { places } = await placesLib.Place.searchByText({
          textQuery: query,
          fields: ['id', 'displayName', 'formattedAddress', 'location'],
          region: 'lk',
          language: lang,
          maxResultCount: 1,
        });
        const found = places?.[0];
        if (!found || !found.location) return null;
        return {
          uid: `${found.id || Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          placeId: found.id || query,
          name: found.displayName || query.replace(', Sri Lanka', ''),
          formattedAddress: found.formattedAddress || query,
          location: {
            lat:
              typeof found.location.lat === 'function'
                ? found.location.lat()
                : (found.location as unknown as { lat: number }).lat,
            lng:
              typeof found.location.lng === 'function'
                ? found.location.lng()
                : (found.location as unknown as { lng: number }).lng,
          },
        };
      } catch (err) {
        if (isQuotaError(err)) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        return null;
      }
    },
    [placesLib, lang]
  );

  // Seed default iconic 3-stop Sri Lanka showcase route via live Places API (New)
  useEffect(() => {
    if (!placesLib || initializedRef.current) return;
    initializedRef.current = true;
    let active = true;

    (async () => {
      const defaults = [
        'Bandaranaike International Airport, Sri Lanka',
        'Sigiriya, Sri Lanka',
        'Ella, Sri Lanka',
        'Galle Fort, Sri Lanka',
      ];
      const results: ResolvedStop[] = [];
      for (const q of defaults) {
        const r = await resolvePlaceByText(q);
        if (r) results.push(r);
      }
      if (active && results.length > 0) {
        setStops(results);
      }
    })();

    return () => {
      active = false;
    };
  }, [placesLib, resolvePlaceByText]);

  // Handle incoming stop requests from Destinations or Tour Packages cards
  useEffect(() => {
    if (!pendingQueries || pendingQueries.length === 0 || !placesLib) return;
    let active = true;
    setResolvingQuick('batch');

    (async () => {
      const resolvedList: ResolvedStop[] = [];
      for (const q of pendingQueries) {
        const stop = await resolvePlaceByText(q);
        if (stop) resolvedList.push(stop);
      }
      if (!active) return;

      if (resolvedList.length > 0) {
        setStops((prev) => (pendingMode === 'replace' ? resolvedList : [...prev, ...resolvedList]));
      }
      setResolvingQuick(null);
      onConsumedPending();
    })();

    return () => {
      active = false;
    };
  }, [pendingQueries, pendingMode, placesLib, resolvePlaceByText, onConsumedPending]);

  const handleQuickAdd = async (item: { id: string; label: string; query: string }) => {
    if (!placesLib) return;
    setResolvingQuick(item.id);
    const stop = await resolvePlaceByText(item.query);
    if (stop) {
      setStops((prev) => [...prev, stop]);
    }
    setResolvingQuick(null);
  };

  const handleRouteComputed = useCallback(
    (summary: RouteSummary | null, error: string | null, loading: boolean) => {
      setRouteSummary(summary);
      setRouteError(error);
      setRouteLoading(loading);
    },
    []
  );

  const moveStop = (index: number, delta: -1 | 1) => {
    setStops((prev) => {
      const next = [...prev];
      const target = index + delta;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const removeStop = (uid: string) => {
    setStops((prev) => prev.filter((s) => s.uid !== uid));
    if (activeMarkerUid === uid) setActiveMarkerUid(null);
  };

  const selectedVehicle = useMemo(
    () => VEHICLES.find((v) => v.id === vehicleId) ?? VEHICLES[0],
    [vehicleId]
  );

  const totalKm = routeSummary ? Math.round(routeSummary.distanceMeters / 1000) : 0;

  // Transparent estimate combining chauffeur vehicle days + distance fuel allowance + optional hotel tier
  const estimatedUsd = useMemo(() => {
    const vehicleCost = selectedVehicle.dailyTourUsd * tourDays;
    const extraKmAllowance = Math.max(0, totalKm - tourDays * 120) * selectedVehicle.perKmUsd;
    const hotelNightly =
      hotelTier === 'luxury' ? 175 : hotelTier === 'boutique' ? 85 : 0;
    const rooms = Math.max(1, Math.ceil(travelers / 2));
    const hotelCost = hotelNightly * Math.max(0, tourDays - 1) * rooms;
    return Math.round(vehicleCost + extraKmAllowance + hotelCost);
  }, [selectedVehicle, tourDays, totalKm, hotelTier, travelers]);

  const customTourSummaryText = useMemo(() => {
    const stopNames = stops.map((s, idx) => `${idx + 1}. ${s.name}`).join('\n');
    const hotelLabel =
      hotelTier === 'none'
        ? 'Transport & Chauffeur Only'
        : hotelTier === 'boutique'
        ? 'Boutique 4-Star Stays'
        : 'Luxury 5-Star Resorts';
    return [
      `Hello TRY LANKA TRAVELS!`,
      `I built a custom Sri Lanka tour on your Satellite Map Planner:`,
      ``,
      `Route Stops:`,
      stopNames || '(Custom route)',
      ``,
      totalKm > 0
        ? `Live Route: ${totalKm} km (${routeSummary ? formatDuration(routeSummary.durationMillis) : ''})`
        : '',
      `Vehicle: ${selectedVehicle.name} (${selectedVehicle.category})`,
      `Duration: ${tourDays} Days · ${travelers} Traveler(s)`,
      `Stay Option: ${hotelLabel}`,
      startDate ? `Preferred Arrival Date: ${startDate}` : '',
      `Estimated Quote Shown: USD $${estimatedUsd}`,
      ``,
      `Please confirm availability and final itinerary quote.`,
    ]
      .filter(Boolean)
      .join('\n');
  }, [stops, totalKm, routeSummary, selectedVehicle, tourDays, travelers, hotelTier, startDate, estimatedUsd]);

  const activeMarkerStop = useMemo(
    () => stops.find((s) => s.uid === activeMarkerUid) ?? null,
    [stops, activeMarkerUid]
  );

  return (
    <section id="planner" className="py-20 lg:py-28 bg-[#0D2B22] text-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#E5A93B] mb-3">
            {t.planner.kicker}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#FAF8F3] leading-[1.08] text-balance">
            {t.planner.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#D3DFDA] leading-relaxed">
            {t.planner.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Live Satellite Map */}
          <div className="lg:col-span-7 flex flex-col bg-[#12372C] border border-white/10 rounded-xl overflow-hidden">
            {/* Map Mode Switcher Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-[#0A221B]">
              <div className="flex items-center gap-2 text-xs text-[#D3DFDA]">
                <Layers className="w-4 h-4 text-[#E5A93B]" />
                <span className="font-medium">Sri Lanka Live Imagery</span>
              </div>
              <div className="flex items-center gap-1 p-1 bg-[#12372C] rounded-lg">
                {(
                  [
                    ['hybrid', t.planner.mapHybrid],
                    ['satellite', t.planner.mapSatellite],
                    ['terrain', t.planner.mapTerrain],
                    ['roadmap', t.planner.mapRoad],
                  ] as [MapLayerType, string][]
                ).map(([mode, label]) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setMapType(mode)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      mapType === mode
                        ? 'bg-[#E5A93B] text-[#0D2B22]'
                        : 'text-[#D3DFDA] hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Map Viewport (Explicit height prevents 0x0 collapse) */}
            <div className="relative w-full h-[460px] lg:h-[580px] bg-[#081A14]">
              {apiKeyAvailable ? (
                <GoogleMap
                  id="srilanka-satellite-map"
                  mapId="DEMO_MAP_ID"
                  defaultCenter={SRI_LANKA_CENTER}
                  defaultZoom={8}
                  mapTypeId={mapType}
                  gestureHandling="greedy"
                  mapTypeControl={false}
                  streetViewControl={true}
                  fullscreenControl={true}
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  className="w-full h-full"
                >
                  <RouteLayerController stops={stops} onRouteComputed={handleRouteComputed} />

                  {stops.map((stop, idx) => (
                    <AdvancedMarker
                      key={stop.uid}
                      position={stop.location}
                      title={stop.name}
                      onClick={() => setActiveMarkerUid(stop.uid)}
                    >
                      <Pin
                        background={idx === 0 ? '#0D2B22' : idx === stops.length - 1 ? '#C58A2A' : '#1B5E4A'}
                        borderColor="#FAF8F3"
                        glyphColor="#FAF8F3"
                        glyphText={String(idx + 1)}
                      />
                    </AdvancedMarker>
                  ))}

                  {activeMarkerStop && (
                    <InfoWindow
                      position={activeMarkerStop.location}
                      onCloseClick={() => setActiveMarkerUid(null)}
                    >
                      <div className="text-[#14201B] p-1 max-w-[220px]">
                        <p className="font-semibold text-sm">{activeMarkerStop.name}</p>
                        <p className="text-xs text-[#5A6B63] mt-0.5">
                          {activeMarkerStop.formattedAddress}
                        </p>
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                  <Compass className="w-10 h-10 text-[#E5A93B] mb-3" />
                  <p className="text-sm font-medium text-[#FAF8F3]">
                    Google Maps API key is required to load live satellite imagery.
                  </p>
                </div>
              )}

              {/* Live Route Telemetry Overlay Bar */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#0D2B22]/92 backdrop-blur-md border border-white/15 rounded-lg px-4 py-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-[#A9BEB6]">
                      {t.planner.totalDistance}
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-white tabular-nums">
                      {routeLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin inline text-[#E5A93B]" />
                      ) : totalKm > 0 ? (
                        `${totalKm} km`
                      ) : (
                        '—'
                      )}
                    </span>
                  </div>
                  <div className="h-7 w-px bg-white/15" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-[#A9BEB6]">
                      {t.planner.drivingTime}
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-white tabular-nums">
                      {routeLoading
                        ? '...'
                        : routeSummary
                        ? formatDuration(routeSummary.durationMillis)
                        : '—'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[11px] uppercase tracking-wider text-[#E5A93B]">
                    {t.planner.estimatedTotal}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-[#FAF8F3] tabular-nums">
                    USD ${estimatedUsd.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 py-2.5 bg-[#0A221B] border-t border-white/10 text-xs text-[#9BB2A9]">
              {routeError ? (
                <span className="text-amber-300">{routeError}</span>
              ) : (
                <span>{t.planner.routeNote}</span>
              )}
            </div>
          </div>

          {/* Right: Custom Tour & Transportation Builder */}
          <div className="lg:col-span-5 bg-[#FAF8F3] text-[#14201B] rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-5">
            <div className="space-y-5">
              {/* Place Search */}
              <div>
                <label
                  htmlFor="planner-place-search"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#4A5C54] mb-2"
                >
                  Add Any Destination in Sri Lanka
                </label>
                <PlaceSearchInput
                  id="planner-place-search"
                  placeholder={t.planner.searchPlaceholder}
                  language={lang}
                  clearOnSelect
                  onSelect={(stop) => setStops((prev) => [...prev, stop])}
                />
                <div className="mt-2.5">
                  <span className="block text-[11px] font-medium text-[#5A6B63] mb-1.5">
                    {t.planner.quickAddLabel}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_STOP_QUERIES.map((q) => (
                      <button
                        key={q.id}
                        type="button"
                        disabled={resolvingQuick !== null || !placesLib}
                        onClick={() => void handleQuickAdd(q)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-white border border-[#D8D3C8] text-[#14201B] rounded-md hover:border-[#0D2B22] hover:bg-[#0D2B22] hover:text-white transition-colors disabled:opacity-50"
                      >
                        {resolvingQuick === q.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Plus className="w-3 h-3" />
                        )}
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stop List */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#4A5C54] flex items-center gap-1.5">
                    <RouteIcon className="w-3.5 h-3.5 text-[#C58A2A]" />
                    {t.planner.yourRoute} ({stops.length})
                  </span>
                  {stops.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setStops([])}
                      className="text-xs text-[#6B7A72] hover:text-red-700 underline underline-offset-2"
                    >
                      {t.planner.clearRoute}
                    </button>
                  )}
                </div>

                {stops.length === 0 ? (
                  <p className="text-xs text-[#6B7A72] bg-white border border-dashed border-[#D8D3C8] rounded-lg p-3">
                    {t.planner.emptyRoute}
                  </p>
                ) : (
                  <ol className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    {stops.map((stop, idx) => (
                      <li
                        key={stop.uid}
                        className="flex items-center justify-between gap-2 bg-white border border-[#E4DFD4] rounded-lg px-3 py-2 text-sm"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveMarkerUid(stop.uid)}
                          className="flex items-center gap-2.5 min-w-0 text-left"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#0D2B22] text-[#FAF8F3] text-xs font-semibold flex items-center justify-center shrink-0 tabular-nums">
                            {idx + 1}
                          </span>
                          <span className="truncate font-medium text-[#14201B]">{stop.name}</span>
                        </button>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => moveStop(idx, -1)}
                            disabled={idx === 0}
                            aria-label="Move stop up"
                            className="p-1 text-[#5A6B63] hover:text-[#14201B] disabled:opacity-30"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveStop(idx, 1)}
                            disabled={idx === stops.length - 1}
                            aria-label="Move stop down"
                            className="p-1 text-[#5A6B63] hover:text-[#14201B] disabled:opacity-30"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeStop(stop.uid)}
                            aria-label="Remove stop"
                            className="p-1 text-[#5A6B63] hover:text-red-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              {/* Transportation & Trip Preferences */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#E4DFD4]">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-[#4A5C54] mb-1">
                    {t.planner.vehicleLabel}
                  </label>
                  <select
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8D3C8] rounded-lg focus:outline-none focus:border-[#0D2B22]"
                  >
                    {VEHICLES.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} — up to {v.passengers} pax (${v.dailyTourUsd}/day)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5C54] mb-1">
                    {t.planner.daysLabel}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={tourDays}
                    onChange={(e) => setTourDays(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8D3C8] rounded-lg tabular-nums focus:outline-none focus:border-[#0D2B22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5C54] mb-1">
                    {t.planner.travelersLabel}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={26}
                    value={travelers}
                    onChange={(e) => setTravelers(Math.max(1, Math.min(26, Number(e.target.value) || 1)))}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8D3C8] rounded-lg tabular-nums focus:outline-none focus:border-[#0D2B22]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5C54] mb-1">
                    {t.planner.hotelLabel}
                  </label>
                  <select
                    value={hotelTier}
                    onChange={(e) => setHotelTier(e.target.value as 'none' | 'boutique' | 'luxury')}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8D3C8] rounded-lg focus:outline-none focus:border-[#0D2B22]"
                  >
                    <option value="none">Transport Only</option>
                    <option value="boutique">4-Star Boutique</option>
                    <option value="luxury">5-Star Luxury</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A5C54] mb-1">
                    {t.planner.startDateLabel}
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D8D3C8] rounded-lg focus:outline-none focus:border-[#0D2B22]"
                  />
                </div>
              </div>
            </div>

            {/* Direct Booking Actions */}
            <div className="space-y-2.5 pt-2">
              <a
                href={buildWhatsAppUrl(customTourSummaryText)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-[#0D2B22] text-[#FAF8F3] hover:bg-[#164235] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#4ADE80]" />
                {t.planner.sendWhatsapp}
              </a>
              <a
                href={buildMailtoUrl(
                  `Custom Sri Lanka Tour Inquiry — ${tourDays} Days (${stops.length} Stops)`,
                  customTourSummaryText
                )}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg border border-[#0D2B22] text-[#0D2B22] hover:bg-[#0D2B22] hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                {t.planner.sendEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
