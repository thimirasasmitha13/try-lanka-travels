import React, { useEffect, useRef, useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import {
  ArrowRight,
  Car,
  Check,
  ChevronDown,
  Compass,
  Globe,
  Mail,
  Map as MapIcon,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  X,
} from 'lucide-react';
import {
  COMPANY_INFO,
  DESTINATIONS,
  IMAGES,
  TOUR_PACKAGES,
  buildMailtoUrl,
  buildWhatsAppUrl,
} from './data/srilankaData';
import { LANGUAGES, LangCode, TRANSLATIONS } from './data/translations';
import { SatelliteTourPlanner } from './components/SatelliteTourPlanner';
import { TaxiEstimatorSection } from './components/TaxiEstimatorSection';
import { ContactSection } from './components/ContactSection';

const MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';

export default function App() {
  const [lang, setLang] = useState<LangCode>('en');
  const [regionFilter, setRegionFilter] = useState<'all' | 'cultural' | 'highlands' | 'wildlife' | 'coast'>('all');
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  // Queue stops requested from Destinations or Tour Packages into the Satellite Planner
  const [pendingQueries, setPendingQueries] = useState<string[] | null>(null);
  const [pendingMode, setPendingMode] = useState<'replace' | 'append'>('append');

  const contactMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];
  const currentLangOption = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    const onQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuota);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (contactMenuRef.current && !contactMenuRef.current.contains(e.target as Node)) {
        setContactMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setContactMenuOpen(false);
        setLangMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setContactMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddDestinationToMap = (query: string) => {
    setPendingMode('append');
    setPendingQueries([query]);
    scrollToSection('planner');
  };

  const handlePreviewPackageOnMap = (stopQueries: string[]) => {
    setPendingMode('replace');
    setPendingQueries(stopQueries);
    scrollToSection('planner');
  };

  const filteredDestinations =
    regionFilter === 'all'
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.region === regionFilter);

  return (
    <APIProvider
      apiKey={MAPS_API_KEY}
      language={lang}
      region="LK"
      libraries={['places', 'routes', 'marker']}
    >
      <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#14201B]">
        {/* Google Maps Platform Quota Banner (Demo Key Defense) */}
        {quotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        {/* Responsive Top Navigation Bar */}
        <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-md border-b border-[#E4DFD4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
            {/* Zone 1: Brand Logo & Single-Line Wordmark */}
            <a
              href="#top"
              className="flex items-center gap-3 shrink-0 whitespace-nowrap group"
              aria-label="TRY LANKA TRAVELS Home"
            >
              <span className="w-10 h-10 rounded-lg bg-white border border-[#E4DFD4] flex items-center justify-center overflow-hidden p-1 shadow-xs">
                <img
                  src={COMPANY_INFO.logoUrl}
                  alt="TRY LANKA TRAVELS logo"
                  className="w-full h-full object-contain"
                />
              </span>
              <span className="font-display text-lg sm:text-xl font-bold tracking-[0.06em] text-[#0D2B22] whitespace-nowrap shrink-0">
                {COMPANY_INFO.name}
              </span>
            </a>

            {/* Zone 2: Primary Navigation Links & Contact Dropdown */}
            <nav
              className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#374740]"
              aria-label="Main navigation"
            >
              <a
                href="#taxi"
                className="hover:text-[#0D2B22] transition-colors whitespace-nowrap shrink-0"
              >
                {t.nav.taxi}
              </a>
              <a
                href="#packages"
                className="hover:text-[#0D2B22] transition-colors whitespace-nowrap shrink-0"
              >
                {t.nav.packages}
              </a>
              <a
                href="#destinations"
                className="hover:text-[#0D2B22] transition-colors whitespace-nowrap shrink-0"
              >
                {t.nav.destinations}
              </a>
              <a
                href="#planner"
                className="hover:text-[#0D2B22] transition-colors whitespace-nowrap shrink-0"
              >
                {t.nav.planner}
              </a>

              {/* Contact Dropdown with WhatsApp & Email Icons */}
              <div ref={contactMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setContactMenuOpen((prev) => !prev)}
                  aria-expanded={contactMenuOpen}
                  aria-haspopup="menu"
                  className="inline-flex items-center gap-1.5 hover:text-[#0D2B22] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-2"
                >
                  <span>{t.nav.contact}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      contactMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {contactMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-64 bg-white border border-[#E4DFD4] rounded-xl shadow-lg py-2 z-50"
                  >
                    <a
                      role="menuitem"
                      href={buildWhatsAppUrl(
                        'Hello TRY LANKA TRAVELS! I would like to inquire about Sri Lanka tours or a private taxi.'
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setContactMenuOpen(false)}
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#FAF8F3] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                      <div>
                        <span className="block text-sm font-semibold text-[#14201B]">
                          {t.nav.whatsappDirect}
                        </span>
                        <span className="block text-xs text-[#6B7A72] tabular-nums">
                          {COMPANY_INFO.whatsappDisplay}
                        </span>
                      </div>
                    </a>

                    <a
                      role="menuitem"
                      href={buildMailtoUrl(
                        'Sri Lanka Inquiry — TRY LANKA TRAVELS',
                        'Hello TRY LANKA TRAVELS,\n\nI would like to plan a Sri Lanka trip or book a private taxi.'
                      )}
                      onClick={() => setContactMenuOpen(false)}
                      className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#FAF8F3] transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[#C58A2A] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <span className="block text-sm font-semibold text-[#14201B]">
                          {t.nav.emailDirect}
                        </span>
                        <span className="block text-xs text-[#6B7A72] truncate">
                          {COMPANY_INFO.email}
                        </span>
                      </div>
                    </a>

                    <div className="my-1 border-t border-[#F0ECE2]" />

                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => scrollToSection('contact')}
                      className="w-full text-left flex items-center gap-3 px-4 py-2 text-xs font-medium text-[#4A5C54] hover:bg-[#FAF8F3] hover:text-[#0D2B22] cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>{t.nav.contactForm}</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Zone 3: Language Switcher + Primary Action + Mobile Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Language Selector */}
              <div ref={langMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setLangMenuOpen((prev) => !prev)}
                  aria-label="Select language"
                  aria-expanded={langMenuOpen}
                  className="inline-flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-[#14201B] bg-white border border-[#DCD6CA] rounded-lg hover:border-[#0D2B22] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-[#0D2B22]" />
                  <span>{currentLangOption.label}</span>
                  <ChevronDown className="w-3 h-3 text-[#6B7A72]" />
                </button>

                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-[#E4DFD4] rounded-xl shadow-lg py-1.5 z-50">
                    {LANGUAGES.map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        onClick={() => {
                          setLang(option.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between hover:bg-[#FAF8F3] cursor-pointer ${
                          lang === option.code
                            ? 'font-semibold text-[#0D2B22] bg-[#F4F1EA]'
                            : 'text-[#374740]'
                        }`}
                      >
                        <span>{option.nativeName}</span>
                        <span className="text-[11px] text-[#7A8780]">{option.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => scrollToSection('planner')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0D2B22] text-[#FAF8F3] hover:bg-[#174638] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.nav.planTrip}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#DCD6CA] bg-white text-[#14201B] cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-[#E4DFD4] px-4 py-4 space-y-3 shadow-lg">
              <div className="flex flex-col space-y-1 text-sm font-medium text-[#14201B]">
                <button
                  type="button"
                  onClick={() => scrollToSection('taxi')}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-[#FAF8F3]"
                >
                  {t.nav.taxi}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('packages')}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-[#FAF8F3]"
                >
                  {t.nav.packages}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('destinations')}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-[#FAF8F3]"
                >
                  {t.nav.destinations}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('planner')}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-[#FAF8F3]"
                >
                  {t.nav.planner}
                </button>
              </div>

              <div className="pt-3 border-t border-[#EFEBE2] grid grid-cols-2 gap-2.5">
                <a
                  href={buildWhatsAppUrl(
                    'Hello TRY LANKA TRAVELS! I would like to book a Sri Lanka taxi or tour.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-lg bg-[#0D2B22] text-white"
                >
                  <MessageCircle className="w-4 h-4 text-[#4ADE80]" />
                  WhatsApp
                </a>
                <a
                  href={buildMailtoUrl('Inquiry — TRY LANKA TRAVELS', 'Hello TRY LANKA TRAVELS,')}
                  className="inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-lg border border-[#0D2B22] text-[#0D2B22]"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </div>
            </div>
          )}
        </header>

        <main id="top" className="flex-1">
          {/* Editorial Full-Bleed Sri Lanka Hero */}
          <section className="relative overflow-hidden bg-[#0D2B22] text-[#FAF8F3]">
            <div className="absolute inset-0">
              <img
                src={IMAGES.heroSigiriya}
                alt="Sunrise over Sigiriya Lion Rock and misty emerald canopy in Sri Lanka"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#091E18]/75 via-[#091E18]/55 to-[#091E18]/92" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-14 lg:pt-28 lg:pb-20">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#E5A93B] mb-4">
                  {t.hero.kicker}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.05] text-balance">
                  {t.hero.title}
                </h1>
                <p className="mt-5 text-base sm:text-lg text-[#E4ECE8] max-w-2xl leading-relaxed">
                  {t.hero.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => scrollToSection('planner')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg bg-[#E5A93B] text-[#0D2B22] hover:bg-[#F0BA54] transition-colors cursor-pointer"
                  >
                    <MapIcon className="w-4 h-4" />
                    {t.hero.ctaPrimary}
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('taxi')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-lg border border-white/40 bg-white/10 backdrop-blur-xs text-white hover:bg-white hover:text-[#0D2B22] transition-colors cursor-pointer"
                  >
                    <Car className="w-4 h-4" />
                    {t.hero.ctaSecondary}
                  </button>
                </div>
              </div>

              {/* Three Main Options Strip: Taxi, Tour Packages, Destinations */}
              <div className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection('taxi')}
                  className="text-left group bg-[#0D2B22]/85 backdrop-blur-md border border-white/15 hover:border-[#E5A93B] rounded-xl p-5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <Car className="w-5 h-5 text-[#E5A93B]" />
                    <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-[#E5A93B] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-white">
                    {t.hero.optionTaxiTitle}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#D1DFDA] leading-relaxed">
                    {t.hero.optionTaxiDesc}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('packages')}
                  className="text-left group bg-[#0D2B22]/85 backdrop-blur-md border border-white/15 hover:border-[#E5A93B] rounded-xl p-5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <Compass className="w-5 h-5 text-[#E5A93B]" />
                    <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-[#E5A93B] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-white">
                    {t.hero.optionPackagesTitle}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#D1DFDA] leading-relaxed">
                    {t.hero.optionPackagesDesc}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('destinations')}
                  className="text-left group bg-[#0D2B22]/85 backdrop-blur-md border border-white/15 hover:border-[#E5A93B] rounded-xl p-5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <MapPin className="w-5 h-5 text-[#E5A93B]" />
                    <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-[#E5A93B] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-white">
                    {t.hero.optionDestTitle}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#D1DFDA] leading-relaxed">
                    {t.hero.optionDestDesc}
                  </p>
                </button>
              </div>
            </div>
          </section>

          {/* Main Option 1: Destinations Explorer */}
          <section id="destinations" className="py-20 lg:py-28 bg-[#FAF8F3]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                <div className="max-w-2xl">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C58A2A] mb-2.5">
                    {t.destinations.kicker}
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#14201B] leading-tight text-balance">
                    {t.destinations.title}
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-[#5A6B63]">
                    {t.destinations.subtitle}
                  </p>
                </div>

                {/* Interactive Region Filter Segmented Control */}
                <div className="flex flex-wrap items-center gap-1 p-1 bg-[#EFECE3] rounded-lg self-start lg:self-auto">
                  {(
                    [
                      ['all', t.destinations.all],
                      ['cultural', t.destinations.cultural],
                      ['highlands', t.destinations.highlands],
                      ['wildlife', t.destinations.wildlife],
                      ['coast', t.destinations.coast],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setRegionFilter(key)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        regionFilter === key
                          ? 'bg-[#0D2B22] text-white shadow-xs'
                          : 'text-[#4A5C54] hover:text-[#14201B]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {filteredDestinations.map((dest) => (
                  <article
                    key={dest.id}
                    className="bg-white border border-[#E4DFD4] rounded-xl overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      <div className="aspect-[16/10] overflow-hidden bg-[#14201B]">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7A72] mb-2">
                          <span>{dest.subtitle}</span>
                          <span aria-hidden="true">·</span>
                          <span>
                            {t.destinations.bestSeason}: {dest.bestSeason}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{dest.stayDuration}</span>
                        </div>

                        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#14201B]">
                          {dest.name}
                        </h3>
                        <p className="mt-2.5 text-sm text-[#4A5C54] leading-relaxed">
                          {dest.description}
                        </p>

                        <div className="mt-4 pt-4 border-t border-[#F0ECE2] flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-[#374740]">
                          {dest.highlights.map((hl) => (
                            <span key={hl} className="inline-flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#C58A2A]" />
                              {hl}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      <button
                        type="button"
                        onClick={() => handleAddDestinationToMap(dest.placeQuery)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg border border-[#0D2B22] text-[#0D2B22] hover:bg-[#0D2B22] hover:text-white transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        {t.destinations.addToMap}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Main Option 2: Curated Tour Packages */}
          <section id="packages" className="py-20 lg:py-28 bg-white border-y border-[#E6E1D6]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-12">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C58A2A] mb-2.5">
                  {t.packages.kicker}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#14201B] leading-tight text-balance">
                  {t.packages.title}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#5A6B63]">
                  {t.packages.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                {TOUR_PACKAGES.map((pkg) => {
                  const pkgMsg = `Hello TRY LANKA TRAVELS! I am interested in the "${pkg.title}" (${pkg.days} Days / ${pkg.nights} Nights, Route: ${pkg.routeSummary}). Please share availability and pricing.`;
                  return (
                    <article
                      key={pkg.id}
                      className="bg-[#FAF8F3] border border-[#E4DFD4] rounded-xl overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-12 items-stretch">
                          <div className="sm:col-span-5 min-h-[220px] bg-[#14201B]">
                            <img
                              src={pkg.image}
                              alt={pkg.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-2 text-xs text-[#6B7A72] mb-2 tabular-nums">
                                <span>
                                  {pkg.days} {t.packages.days} · {pkg.nights} {t.packages.nights}
                                </span>
                                <span className="font-semibold text-[#0D2B22] text-sm">
                                  USD ${pkg.pricePerPersonUsd}{' '}
                                  <span className="text-[11px] font-normal text-[#6B7A72]">
                                    / {t.packages.fromPerPerson}
                                  </span>
                                </span>
                              </div>

                              <h3 className="font-display text-2xl font-semibold text-[#14201B] leading-snug">
                                {pkg.title}
                              </h3>
                              <p className="mt-1.5 text-xs font-medium text-[#C58A2A]">
                                {pkg.routeSummary}
                              </p>
                              <p className="mt-3 text-sm text-[#4A5C54] leading-relaxed">
                                {pkg.description}
                              </p>

                              <ul className="mt-4 space-y-1.5">
                                {pkg.inclusions.map((inc) => (
                                  <li
                                    key={inc}
                                    className="text-xs text-[#374740] flex items-center gap-1.5"
                                  >
                                    <Check className="w-3.5 h-3.5 text-[#0D2B22] shrink-0" />
                                    <span>{inc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 py-4 bg-white border-t border-[#ECE7DC] flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handlePreviewPackageOnMap(pkg.stopQueries)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#0D2B22] text-white hover:bg-[#174638] transition-colors cursor-pointer"
                        >
                          <MapIcon className="w-3.5 h-3.5 text-[#E5A93B]" />
                          {t.packages.previewMap}
                        </button>
                        <a
                          href={buildWhatsAppUrl(pkgMsg)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#D8D3C8] text-[#14201B] hover:border-[#0D2B22] transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#16A34A]" />
                          {t.packages.bookWhatsapp}
                        </a>
                        <a
                          href={buildMailtoUrl(`Tour Package Inquiry — ${pkg.title}`, pkgMsg)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#D8D3C8] text-[#14201B] hover:border-[#0D2B22] transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#C58A2A]" />
                          {t.packages.inquireEmail}
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Interactive Satellite Map Custom Tour & Transportation Planner */}
          <SatelliteTourPlanner
            t={t}
            lang={lang}
            pendingQueries={pendingQueries}
            pendingMode={pendingMode}
            onConsumedPending={() => setPendingQueries(null)}
            apiKeyAvailable={Boolean(MAPS_API_KEY)}
          />

          {/* Main Option 3: Private Taxi & Fleet Estimator */}
          <TaxiEstimatorSection t={t} lang={lang} />

          {/* Contact Hub */}
          <ContactSection t={t} />
        </main>

        {/* Quiet Editorial Footer */}
        <footer className="bg-[#0A221B] text-[#C7D6D0] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-white flex items-center justify-center p-1 shrink-0">
                  <img
                    src={COMPANY_INFO.logoUrl}
                    alt="TRY LANKA TRAVELS logo"
                    className="w-full h-full object-contain"
                  />
                </span>
                <div>
                  <span className="block font-display text-lg font-bold tracking-[0.06em] text-white">
                    {COMPANY_INFO.name}
                  </span>
                  <span className="block text-xs text-[#9BB2A9]">{t.footer.tagline}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-[#D3DFDA]">
                <a href="#taxi" className="hover:text-white transition-colors">
                  {t.nav.taxi}
                </a>
                <a href="#packages" className="hover:text-white transition-colors">
                  {t.nav.packages}
                </a>
                <a href="#destinations" className="hover:text-white transition-colors">
                  {t.nav.destinations}
                </a>
                <a href="#planner" className="hover:text-white transition-colors">
                  {t.nav.planner}
                </a>
                <a href="#contact" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#8AA49A]">
              <span>
                © {new Date().getFullYear()} {t.footer.rights} · {COMPANY_INFO.licenseNote}
              </span>
              <span>{t.footer.mapsNotice}</span>
            </div>
          </div>
        </footer>

        {/* Floating Quick WhatsApp & Email Contact Dock */}
        <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
          <a
            href={buildMailtoUrl(
              'Travel Inquiry — TRY LANKA TRAVELS',
              'Hello TRY LANKA TRAVELS, I would like assistance planning my Sri Lanka trip.'
            )}
            aria-label="Email TRY LANKA TRAVELS"
            className="w-11 h-11 rounded-full bg-white text-[#0D2B22] border border-[#D8D3C8] shadow-lg flex items-center justify-center hover:bg-[#0D2B22] hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={buildWhatsAppUrl(
              'Hello TRY LANKA TRAVELS! I need help with a Sri Lanka tour or taxi.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with TRY LANKA TRAVELS on WhatsApp"
            className="inline-flex items-center gap-2 px-4 h-11 rounded-full bg-[#15803D] text-white text-xs font-semibold shadow-lg hover:bg-[#166534] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </APIProvider>
  );
}
