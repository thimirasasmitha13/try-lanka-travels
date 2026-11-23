import React, { useEffect, useMemo, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import {
  ArrowLeftRight,
  Briefcase,
  Car,
  Check,
  Clock,
  Loader2,
  Mail,
  MessageCircle,
  Navigation,
  Users,
} from 'lucide-react';
import { PlaceSearchInput, ResolvedStop } from './PlaceSearchInput';
import {
  IMAGES,
  VEHICLES,
  buildMailtoUrl,
  buildWhatsAppUrl,
} from '../data/srilankaData';
import { LangCode, TranslationCopy } from '../data/translations';

interface TaxiEstimatorSectionProps {
  t: TranslationCopy;
  lang: LangCode;
}

function formatDuration(ms: number): string {
  const mins = Math.round(ms / 60000);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m} min`;
}

export const TaxiEstimatorSection: React.FC<TaxiEstimatorSectionProps> = ({ t, lang }) => {
  const routesLib = useMapsLibrary('routes');

  const [pickup, setPickup] = useState<ResolvedStop | null>(null);
  const [dropoff, setDropoff] = useState<ResolvedStop | null>(null);
  const [pickupDate, setPickupDate] = useState<string>('');
  const [passengers, setPassengers] = useState<number>(2);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(VEHICLES[0].id);

  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [calcError, setCalcError] = useState<string | null>(null);

  useEffect(() => {
    if (!routesLib || !pickup || !dropoff) {
      setDistanceKm(null);
      setDurationMs(null);
      setCalcError(null);
      return;
    }

    let cancelled = false;
    setCalculating(true);
    setCalcError(null);

    (routesLib.Route as unknown as {
      computeRoutes: (req: Record<string, unknown>) => Promise<{ routes?: any[] }>;
    })
      .computeRoutes({
        origin: pickup.location,
        destination: dropoff.location,
        travelMode: 'DRIVING',
        fields: ['distanceMeters', 'durationMillis'],
      })
      .then((res) => {
        if (cancelled) return;
        const route = res?.routes?.[0];
        if (!route) {
          setCalcError('No direct road route found between these two locations.');
          setDistanceKm(null);
          setDurationMs(null);
        } else {
          setDistanceKm(Math.max(1, Math.round((route.distanceMeters ?? 0) / 1000)));
          setDurationMs(route.durationMillis ?? 0);
        }
        setCalculating(false);
      })
      .catch((err) => {
        if (cancelled) return;
        const msg = String(err ?? '');
        if (
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('OVER_QUERY_LIMIT') ||
          msg.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        setCalcError('Unable to compute live distance right now.');
        setCalculating(false);
      });

    return () => {
      cancelled = true;
    };
  }, [routesLib, pickup, dropoff]);

  const selectedVehicle = useMemo(
    () => VEHICLES.find((v) => v.id === selectedVehicleId) ?? VEHICLES[0],
    [selectedVehicleId]
  );

  const estimatedFareUsd = useMemo(() => {
    const km = distanceKm ?? 45;
    return Math.round(selectedVehicle.baseTransferUsd + km * selectedVehicle.perKmUsd);
  }, [distanceKm, selectedVehicle]);

  const bookingMessage = useMemo(() => {
    return [
      `Hello TRY LANKA TRAVELS!`,
      `I would like to book a private Sri Lanka taxi / transfer:`,
      `Pickup: ${pickup ? `${pickup.name} (${pickup.formattedAddress})` : 'Bandaranaike International Airport (CMB)'}`,
      `Drop-off: ${dropoff ? `${dropoff.name} (${dropoff.formattedAddress})` : 'To be confirmed'}`,
      distanceKm ? `Routed Distance: ${distanceKm} km (${durationMs ? formatDuration(durationMs) : ''})` : '',
      `Vehicle: ${selectedVehicle.name} (${selectedVehicle.category})`,
      `Passengers: ${passengers}`,
      pickupDate ? `Pickup Date: ${pickupDate}` : '',
      distanceKm ? `Estimated Fare: USD $${estimatedFareUsd}` : '',
      `Please confirm driver availability.`,
    ]
      .filter(Boolean)
      .join('\n');
  }, [pickup, dropoff, distanceKm, durationMs, selectedVehicle, passengers, pickupDate, estimatedFareUsd]);

  const swapLocations = () => {
    setPickup(dropoff);
    setDropoff(pickup);
  };

  return (
    <section id="taxi" className="py-20 lg:py-28 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Instant Taxi Calculator */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-[#E4DFD4] rounded-xl p-6 sm:p-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C58A2A] mb-2.5">
                {t.taxi.kicker}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#14201B] leading-tight text-balance">
                {t.taxi.title}
              </h2>
              <p className="mt-3 text-sm text-[#5A6B63] leading-relaxed">
                {t.taxi.subtitle}
              </p>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
                  <div>
                    <label
                      htmlFor="taxi-pickup"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#4A5C54] mb-1.5"
                    >
                      {t.taxi.pickupLabel}
                    </label>
                    <PlaceSearchInput
                      id="taxi-pickup"
                      placeholder={t.taxi.pickupPlaceholder}
                      language={lang}
                      value={pickup?.name ?? ''}
                      onSelect={setPickup}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={swapLocations}
                    aria-label={t.taxi.swapBtn}
                    className="h-10 px-3 inline-flex items-center justify-center rounded-lg border border-[#D8D3C8] text-[#4A5C54] hover:border-[#0D2B22] hover:text-[#0D2B22] transition-colors"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>

                  <div>
                    <label
                      htmlFor="taxi-dropoff"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#4A5C54] mb-1.5"
                    >
                      {t.taxi.dropoffLabel}
                    </label>
                    <PlaceSearchInput
                      id="taxi-dropoff"
                      placeholder={t.taxi.dropoffPlaceholder}
                      language={lang}
                      value={dropoff?.name ?? ''}
                      onSelect={setDropoff}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A5C54] mb-1.5">
                      {t.taxi.dateLabel}
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-[#D8D3C8] rounded-lg focus:outline-none focus:border-[#0D2B22]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A5C54] mb-1.5">
                      {t.taxi.passengersLabel}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={26}
                      value={passengers}
                      onChange={(e) => setPassengers(Math.max(1, Math.min(26, Number(e.target.value) || 1)))}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-[#D8D3C8] rounded-lg tabular-nums focus:outline-none focus:border-[#0D2B22]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A5C54] mb-1.5">
                      {t.planner.vehicleLabel}
                    </label>
                    <select
                      value={selectedVehicleId}
                      onChange={(e) => setSelectedVehicleId(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-[#D8D3C8] rounded-lg focus:outline-none focus:border-[#0D2B22]"
                    >
                      {VEHICLES.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name} ({v.passengers} pax)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Live Fare Summary Strip */}
              <div className="mt-6 bg-[#FAF8F3] border border-[#E4DFD4] rounded-lg p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div className="flex items-center gap-2.5">
                  <Navigation className="w-4 h-4 text-[#C58A2A] shrink-0" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-[#6B7A72]">
                      {t.taxi.distanceLabel}
                    </span>
                    <span className="text-base font-semibold text-[#14201B] tabular-nums">
                      {calculating ? (
                        <Loader2 className="w-4 h-4 animate-spin inline text-[#C58A2A]" />
                      ) : distanceKm !== null ? (
                        `${distanceKm} km`
                      ) : (
                        'Select stops'
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#C58A2A] shrink-0" />
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-[#6B7A72]">
                      {t.taxi.durationLabel}
                    </span>
                    <span className="text-base font-semibold text-[#14201B] tabular-nums">
                      {calculating
                        ? '...'
                        : durationMs !== null
                        ? formatDuration(durationMs)
                        : '—'}
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="block text-[11px] uppercase tracking-wider text-[#C58A2A] font-semibold">
                    {t.taxi.estimatedFare}
                  </span>
                  <span className="text-xl font-bold text-[#0D2B22] tabular-nums">
                    {distanceKm !== null ? `USD $${estimatedFareUsd}` : `From $${selectedVehicle.baseTransferUsd}`}
                  </span>
                </div>
              </div>

              {calcError && (
                <p className="mt-2 text-xs text-amber-800">{calcError}</p>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={buildWhatsAppUrl(bookingMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-[#0D2B22] text-[#FAF8F3] hover:bg-[#164235] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#4ADE80]" />
                {t.taxi.bookTaxiWhatsapp}
              </a>
              <a
                href={buildMailtoUrl('Private Taxi Transfer Booking — TRY LANKA TRAVELS', bookingMessage)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg border border-[#0D2B22] text-[#0D2B22] hover:bg-[#0D2B22] hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                {t.taxi.bookTaxiEmail}
              </a>
            </div>
          </div>

          {/* Right: Editorial Transport Photograph */}
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden min-h-[340px] border border-[#E4DFD4]">
            <img
              src={IMAGES.luxuryTransport}
              alt="TRY LANKA TRAVELS executive touring van crossing Sri Lanka Ceylon tea hills"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B22]/90 via-[#0D2B22]/30 to-transparent flex flex-col justify-end p-6 text-[#FAF8F3]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E5A93B]">
                Katunayake BIA Airport &amp; Island-Wide
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold mt-1">
                Meet &amp; Greet Private Chauffeurs
              </h3>
              <p className="text-xs sm:text-sm text-[#D7E2DD] mt-2 leading-relaxed">
                Flight-tracked arrivals, chilled bottled water, expressway passes, and English-speaking licensed tourist drivers across all nine provinces.
              </p>
            </div>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="mt-14">
          <div className="flex items-end justify-between mb-6">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#14201B]">
              {t.taxi.fleetTitle}
            </h3>
            <span className="text-xs text-[#5A6B63]">
              Fuel · Driver Allowance · Insurance Included
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VEHICLES.map((v) => {
              const isSelected = v.id === selectedVehicleId;
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicleId(v.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedVehicleId(v.id);
                    }
                  }}
                  className={`cursor-pointer rounded-xl p-5 border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0D2B22] text-[#FAF8F3] border-[#0D2B22] shadow-md'
                      : 'bg-white text-[#14201B] border-[#E4DFD4] hover:border-[#0D2B22]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Car className={`w-5 h-5 ${isSelected ? 'text-[#E5A93B]' : 'text-[#0D2B22]'}`} />
                      <span
                        className={`text-xs font-medium tabular-nums ${
                          isSelected ? 'text-[#E5A93B]' : 'text-[#5A6B63]'
                        }`}
                      >
                        ${v.dailyTourUsd} {t.taxi.perDay}
                      </span>
                    </div>

                    <h4 className="font-semibold text-base">{v.name}</h4>
                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-[#C6D5CF]' : 'text-[#6B7A72]'}`}>
                      {v.category}
                    </p>

                    <div
                      className={`mt-3 pt-3 border-t flex items-center gap-4 text-xs tabular-nums ${
                        isSelected ? 'border-white/15 text-[#E8EFEA]' : 'border-[#F0ECE2] text-[#4A5C54]'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> {v.passengers} {t.taxi.passengersShort}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" /> {v.luggage} {t.taxi.bagsShort}
                      </span>
                    </div>

                    <ul className="mt-3 space-y-1.5">
                      {v.features.map((feat) => (
                        <li
                          key={feat}
                          className={`text-xs flex items-center gap-1.5 ${
                            isSelected ? 'text-[#D3DFDA]' : 'text-[#5A6B63]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 text-[#C58A2A] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p
                    className={`mt-4 pt-3 border-t text-[11px] ${
                      isSelected ? 'border-white/15 text-[#A9BEB6]' : 'border-[#F0ECE2] text-[#6B7A72]'
                    }`}
                  >
                    {v.idealFor}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
