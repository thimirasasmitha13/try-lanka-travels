export type LangCode = 'en' | 'si' | 'ta' | 'de' | 'fr' | 'ru';

export interface LanguageOption {
  code: LangCode;
  label: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'EN', nativeName: 'English' },
  { code: 'si', label: 'SI', nativeName: 'සිංහල' },
  { code: 'ta', label: 'TA', nativeName: 'தமிழ்' },
  { code: 'de', label: 'DE', nativeName: 'Deutsch' },
  { code: 'fr', label: 'FR', nativeName: 'Français' },
  { code: 'ru', label: 'RU', nativeName: 'Русский' },
];

export interface TranslationCopy {
  nav: {
    taxi: string;
    packages: string;
    destinations: string;
    planner: string;
    contact: string;
    whatsappDirect: string;
    emailDirect: string;
    contactForm: string;
    planTrip: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    optionTaxiTitle: string;
    optionTaxiDesc: string;
    optionPackagesTitle: string;
    optionPackagesDesc: string;
    optionDestTitle: string;
    optionDestDesc: string;
  };
  destinations: {
    kicker: string;
    title: string;
    subtitle: string;
    all: string;
    cultural: string;
    highlands: string;
    wildlife: string;
    coast: string;
    addToMap: string;
    bestSeason: string;
  };
  packages: {
    kicker: string;
    title: string;
    subtitle: string;
    days: string;
    nights: string;
    fromPerPerson: string;
    previewMap: string;
    bookWhatsapp: string;
    inquireEmail: string;
  };
  planner: {
    kicker: string;
    title: string;
    subtitle: string;
    mapHybrid: string;
    mapSatellite: string;
    mapTerrain: string;
    mapRoad: string;
    searchPlaceholder: string;
    quickAddLabel: string;
    yourRoute: string;
    clearRoute: string;
    emptyRoute: string;
    computingRoute: string;
    totalDistance: string;
    drivingTime: string;
    estimatedTotal: string;
    vehicleLabel: string;
    daysLabel: string;
    travelersLabel: string;
    hotelLabel: string;
    startDateLabel: string;
    sendWhatsapp: string;
    sendEmail: string;
    routeNote: string;
  };
  taxi: {
    kicker: string;
    title: string;
    subtitle: string;
    pickupPlaceholder: string;
    dropoffPlaceholder: string;
    pickupLabel: string;
    dropoffLabel: string;
    dateLabel: string;
    passengersLabel: string;
    swapBtn: string;
    calculating: string;
    distanceLabel: string;
    durationLabel: string;
    estimatedFare: string;
    bookTaxiWhatsapp: string;
    bookTaxiEmail: string;
    fleetTitle: string;
    passengersShort: string;
    bagsShort: string;
    perDay: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    whatsappCardTitle: string;
    whatsappCardDesc: string;
    whatsappBtn: string;
    emailCardTitle: string;
    emailCardDesc: string;
    emailBtn: string;
    formTitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    serviceLabel: string;
    messageLabel: string;
    submitWhatsapp: string;
    submitEmail: string;
    sentSuccess: string;
  };
  footer: {
    tagline: string;
    rights: string;
    mapsNotice: string;
  };
}

export const TRANSLATIONS: Record<LangCode, TranslationCopy> = {
  en: {
    nav: {
      taxi: 'Taxi',
      packages: 'Tour Packages',
      destinations: 'Destinations',
      planner: 'Satellite Planner',
      contact: 'Contact',
      whatsappDirect: 'Chat on WhatsApp',
      emailDirect: 'Send an Email',
      contactForm: 'Inquiry Desk',
      planTrip: 'Customize Tour',
    },
    hero: {
      kicker: 'Sri Lanka Private Tours & Chauffeur Transfers',
      title: 'Discover the Island of Serendipity at Your Own Pace',
      subtitle:
        'From misty Sigiriya dawns and Ella’s emerald tea trails to Yala safaris and Galle’s coral coast—tailored private transport and curated Sri Lanka journeys.',
      ctaPrimary: 'Launch Satellite Planner',
      ctaSecondary: 'Book Airport Taxi',
      optionTaxiTitle: 'Private Taxi & Transfers',
      optionTaxiDesc: '24/7 BIA airport pickups, intercity transfers, and chauffeur-driven fleet.',
      optionPackagesTitle: 'Curated Tour Packages',
      optionPackagesDesc: '5 to 14-day Sri Lanka itineraries with boutique stays and rail tickets.',
      optionDestTitle: 'Iconic Destinations',
      optionDestDesc: 'Explore ancient kingdoms, cloud-forest highlands, safaris, and beaches.',
    },
    destinations: {
      kicker: 'Island Regions',
      title: 'Destinations Across Sri Lanka',
      subtitle: 'Filter by landscape and add any region directly to your custom satellite map itinerary.',
      all: 'All Regions',
      cultural: 'Cultural Triangle',
      highlands: 'Tea Highlands',
      wildlife: 'Wildlife Safaris',
      coast: 'Southern Coast',
      addToMap: 'Add to Satellite Route',
      bestSeason: 'Best Season',
    },
    packages: {
      kicker: 'Signature Journeys',
      title: 'Handcrafted Sri Lanka Tour Packages',
      subtitle: 'Every itinerary includes a licensed chauffeur-guide, air-conditioned private vehicle, and flexible daily pace.',
      days: 'Days',
      nights: 'Nights',
      fromPerPerson: 'per traveler',
      previewMap: 'Preview on Satellite Map',
      bookWhatsapp: 'WhatsApp Quote',
      inquireEmail: 'Email Inquiry',
    },
    planner: {
      kicker: 'Interactive Satellite Map & Route Studio',
      title: 'Customize Your Sri Lanka Tour & Transportation',
      subtitle:
        'Inspect terrain and coastlines in live satellite view, search any Sri Lankan town or landmark, and calculate real driving distances and vehicle estimates.',
      mapHybrid: 'Satellite + Labels',
      mapSatellite: 'Pure Satellite',
      mapTerrain: 'Terrain',
      mapRoad: 'Road Map',
      searchPlaceholder: 'Search any destination in Sri Lanka (e.g. Ella, Sigiriya, Bentota)...',
      quickAddLabel: 'Quick-add iconic stops:',
      yourRoute: 'Your Custom Stops',
      clearRoute: 'Reset',
      emptyRoute: 'Add at least two Sri Lanka stops to compute live driving distance and route.',
      computingRoute: 'Computing real driving route...',
      totalDistance: 'Driving Distance',
      drivingTime: 'Est. Drive Time',
      estimatedTotal: 'Est. Private Transport & Tour',
      vehicleLabel: 'Select Vehicle',
      daysLabel: 'Tour Days',
      travelersLabel: 'Travelers',
      hotelLabel: 'Accommodation Tier',
      startDateLabel: 'Arrival Date',
      sendWhatsapp: 'Send Custom Tour on WhatsApp',
      sendEmail: 'Send Custom Tour via Email',
      routeNote: 'Live driving route calculated via Google Maps Routes API. Final pricing confirmed by our Colombo desk.',
    },
    taxi: {
      kicker: 'Private Transfers & Island Fleet',
      title: 'Point-to-Point Sri Lanka Taxi Estimator',
      subtitle: 'Select any pickup and drop-off across Sri Lanka for live highway distance, travel time, and instant fleet quotes.',
      pickupPlaceholder: 'Pickup location (e.g. Bandaranaike Airport, Colombo)...',
      dropoffPlaceholder: 'Drop-off destination (e.g. Kandy, Galle, Ella)...',
      pickupLabel: 'Pickup Point',
      dropoffLabel: 'Drop-off Point',
      dateLabel: 'Pickup Date',
      passengersLabel: 'Passengers',
      swapBtn: 'Swap',
      calculating: 'Calculating live route...',
      distanceLabel: 'Route Distance',
      durationLabel: 'Est. Transfer Time',
      estimatedFare: 'Estimated Private Transfer',
      bookTaxiWhatsapp: 'Confirm Taxi via WhatsApp',
      bookTaxiEmail: 'Book Taxi via Email',
      fleetTitle: 'Our Chauffeur-Driven Fleet',
      passengersShort: 'Pax',
      bagsShort: 'Bags',
      perDay: '/ day touring',
    },
    contact: {
      kicker: '24/7 Colombo & Airport Dispatch',
      title: 'Talk Directly With Our Sri Lanka Travel Desk',
      subtitle: 'Instant replies on WhatsApp for airport pickups, custom multi-day routes, and private chauffeur bookings.',
      whatsappCardTitle: 'WhatsApp Travel Concierge',
      whatsappCardDesc: 'Fastest way to confirm airport taxis, share flight numbers, or tweak your Sri Lanka route in real time.',
      whatsappBtn: 'Message on WhatsApp',
      emailCardTitle: 'Official Email Desk',
      emailCardDesc: 'Send full group itineraries, hotel preferences, or corporate travel requests for a detailed written proposal.',
      emailBtn: 'Email TRY LANKA TRAVELS',
      formTitle: 'Send a Direct Inquiry',
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      phoneLabel: 'WhatsApp / Phone',
      serviceLabel: 'Primary Interest',
      messageLabel: 'Dates, Stops & Special Requests',
      submitWhatsapp: 'Open in WhatsApp',
      submitEmail: 'Send via Email',
      sentSuccess: 'Your inquiry summary is ready and opened in your preferred channel.',
    },
    footer: {
      tagline: 'Licensed Sri Lanka private tours, bespoke chauffeur journeys, and 24/7 island airport transfers.',
      rights: 'TRY LANKA TRAVELS. All rights reserved.',
      mapsNotice: 'Interactive satellite maps & routing powered by Google Maps Platform.',
    },
  },
  si: {
    nav: {
      taxi: 'ටැක්සි',
      packages: 'සංචාරක පැකේජ',
      destinations: 'ගමනාන්ත',
      planner: 'සැටලයිට් සිතියම',
      contact: 'සම්බන්ධ වන්න',
      whatsappDirect: 'WhatsApp මගින් අමතන්න',
      emailDirect: 'විද්‍යුත් තැපෑල යවන්න',
      contactForm: 'විමසීම් කවුළුව',
      planTrip: 'සංචාරය සැලසුම් කරන්න',
    },
    hero: {
      kicker: 'ශ්‍රී ලංකා පෞද්ගලික සංචාර සහ ගුවන්තොටුපළ ප්‍රවාහන සේවා',
      title: 'ශ්‍රී ලංකාවේ අසිරිය ඔබේම රිද්මයට අත්විඳින්න',
      subtitle:
        'සීගිරිය, ඇල්ල, යාල වනෝද්‍යානය සහ ගාල්ල කොටුව ඇතුළු දිවයිනේ සුන්දරම තැන් වෙත සුවපහසු පෞද්ගලික වාහන සහ මගපෙන්වන්නන් සමඟ සංචාරය කරන්න.',
      ctaPrimary: 'සැටලයිට් සැලසුම්කරු අරඹන්න',
      ctaSecondary: 'ටැක්සියක් වෙන්කරන්න',
      optionTaxiTitle: 'පෞද්ගලික ටැක්සි සහ ප්‍රවාහනය',
      optionTaxiDesc: 'පැය 24 ගුවන්තොටුපළ ප්‍රවාහනය සහ පෞද්ගලික වාහන සේවා.',
      optionPackagesTitle: 'සංචාරක පැකේජ',
      optionPackagesDesc: 'දින 5 සිට 14 දක්වා විශේෂිත ශ්‍රී ලංකා සංචාරක පැකේජ.',
      optionDestTitle: 'ප්‍රධාන ගමනාන්ත',
      optionDestDesc: 'සංස්කෘතික ත්‍රිකෝණය, කඳුකරය, වනජීවී සෆාරි සහ වෙරළ තීරය.',
    },
    destinations: {
      kicker: 'දිවයිනේ කලාප',
      title: 'ශ්‍රී ලංකාවේ සුන්දර ගමනාන්ත',
      subtitle: 'ඔබ කැමති කලාපය තෝරා සැටලයිට් සිතියම් සැලසුමට එක් කරන්න.',
      all: 'සියලුම කලාප',
      cultural: 'සංස්කෘතික ත්‍රිකෝණය',
      highlands: 'කඳුකරය',
      wildlife: 'වනජීවී සෆාරි',
      coast: 'දකුණු වෙරළ',
      addToMap: 'සිතියම් මාර්ගයට එක් කරන්න',
      bestSeason: 'සුදුසුම කාලය',
    },
    packages: {
      kicker: 'විශේෂිත සංචාර',
      title: 'තෝරාගත් ශ්‍රී ලංකා සංචාරක පැකේජ',
      subtitle: 'සෑම පැකේජයකටම වායුසමීකරණය කළ පෞද්ගලික වාහනයක් සහ පළපුරුදු රියදුරු මගපෙන්වන්නෙකු ඇතුළත් වේ.',
      days: 'දින',
      nights: 'රාත්‍රී',
      fromPerPerson: 'එක් අයෙකුට',
      previewMap: 'සැටලයිට් සිතියමේ බලන්න',
      bookWhatsapp: 'WhatsApp මිල ගණන්',
      inquireEmail: 'ඊමේල් විමසීම',
    },
    planner: {
      kicker: 'සජීවී සැටලයිට් සිතියම සහ සංචාරක සැලසුම්කරු',
      title: 'ඔබේ සංචාරය සහ ප්‍රවාහනය සැලසුම් කරන්න',
      subtitle: 'සැටලයිට් සිතියම හරහා ශ්‍රී ලංකාවේ ඕනෑම නගරයක් තෝරා දුර ප්‍රමාණය සහ ඇස්තමේන්තු මිල ගණනය කරන්න.',
      mapHybrid: 'සැටලයිට් + නාම',
      mapSatellite: 'සැටලයිට්',
      mapTerrain: 'භූමි සිතියම',
      mapRoad: 'මාර්ග සිතියම',
      searchPlaceholder: 'ශ්‍රී ලංකාවේ ස්ථානයක් සොයන්න (උදා: ඇල්ල, සීගිරිය)...',
      quickAddLabel: 'ඉක්මන් ගමනාන්ත:',
      yourRoute: 'ඔබේ ගමන් මාර්ගය',
      clearRoute: 'මකන්න',
      emptyRoute: 'මාර්ගය ගණනය කිරීමට අවම වශයෙන් ස්ථාන දෙකක් එක් කරන්න.',
      computingRoute: 'මාර්ගය ගණනය වෙමින් පවතී...',
      totalDistance: 'මුළු දුර',
      drivingTime: 'ගමන් කාලය',
      estimatedTotal: 'ඇස්තමේන්තු මිල',
      vehicleLabel: 'වාහනය තෝරන්න',
      daysLabel: 'දින ගණන',
      travelersLabel: 'සංචාරකයින්',
      hotelLabel: 'හෝටල් මට්ටම',
      startDateLabel: 'පැමිණෙන දිනය',
      sendWhatsapp: 'WhatsApp හරහා යවන්න',
      sendEmail: 'ඊමේල් හරහා යවන්න',
      routeNote: 'Google Maps Routes API මගින් ගණනය කරන ලද සජීවී දුර ප්‍රමාණයන් වේ.',
    },
    taxi: {
      kicker: 'පෞද්ගලික ටැක්සි සහ වාහන සේවා',
      title: 'ශ්‍රී ලංකා ටැක්සි ගාස්තු ගණකය',
      subtitle: 'ආරම්භක සහ අවසාන ස්ථාන තෝරා සජීවී දුර සහ වාහන ගාස්තු පරීක්ෂා කරන්න.',
      pickupPlaceholder: 'ආරම්භක ස්ථානය (උදා: කටුනායක ගුවන්තොටුපළ)...',
      dropoffPlaceholder: 'ගමනාන්තය (උදා: මහනුවර, ගාල්ල)...',
      pickupLabel: 'ආරම්භක ස්ථානය',
      dropoffLabel: 'ගමනාන්තය',
      dateLabel: 'දිනය',
      passengersLabel: 'මගීන්',
      swapBtn: 'මාරු කරන්න',
      calculating: 'ගණනය වෙමින් පවතී...',
      distanceLabel: 'දුර ප්‍රමාණය',
      durationLabel: 'කාලය',
      estimatedFare: 'ඇස්තමේන්තු ගාස්තුව',
      bookTaxiWhatsapp: 'WhatsApp මගින් වෙන්කරන්න',
      bookTaxiEmail: 'ඊමේල් මගින් වෙන්කරන්න',
      fleetTitle: 'අපගේ සුවපහසු වාහන සමූහය',
      passengersShort: 'මගීන්',
      bagsShort: 'බෑග්',
      perDay: '/ දිනකට',
    },
    contact: {
      kicker: 'පැය 24 සේවාව',
      title: 'TRY LANKA TRAVELS සමඟ සම්බන්ධ වන්න',
      subtitle: 'ගුවන්තොටුපළ ප්‍රවාහන සහ සංචාරක පැකේජ සඳහා WhatsApp හෝ ඊමේල් මගින් ක්ෂණික පිළිතුරු ලබාගන්න.',
      whatsappCardTitle: 'WhatsApp සේවාව',
      whatsappCardDesc: 'ක්ෂණික ටැක්සි වෙන්කරවා ගැනීමට සහ සංචාරක උපදෙස් සඳහා.',
      whatsappBtn: 'WhatsApp පණිවිඩයක් යවන්න',
      emailCardTitle: 'විද්‍යුත් තැපෑල',
      emailCardDesc: 'සම්පූර්ණ සංචාරක සැලසුම් සහ කණ්ඩායම් වෙන්කරවා ගැනීම් සඳහා.',
      emailBtn: 'ඊමේල් පණිවිඩයක් යවන්න',
      formTitle: 'විමසීමක් යොමු කරන්න',
      nameLabel: 'සම්පූර්ණ නම',
      emailLabel: 'විද්‍යුත් තැපෑල',
      phoneLabel: 'WhatsApp / දුරකථන',
      serviceLabel: 'අවශ්‍ය සේවාව',
      messageLabel: 'විස්තර සහ දිනයන්',
      submitWhatsapp: 'WhatsApp වෙත යවන්න',
      submitEmail: 'ඊමේල් මගින් යවන්න',
      sentSuccess: 'ඔබේ විමසීම සූදානම් කර විවෘත කරන ලදී.',
    },
    footer: {
      tagline: 'ශ්‍රී ලංකාවේ විශ්වසනීය පෞද්ගලික සංචාර සහ ටැක්සි ප්‍රවාහන සේවාව.',
      rights: 'TRY LANKA TRAVELS. සියලුම හිමිකම් ඇවිරිණි.',
      mapsNotice: 'Google Maps Platform මගින් බලගැන්වූ සැටලයිට් සිතියම් සේවාව.',
    },
  },
  ta: {
    nav: {
      taxi: 'டாக்ஸி',
      packages: 'சுற்றுலா தொகுப்புகள்',
      destinations: 'இலக்குகள்',
      planner: 'செயற்கைக்கோள் வரைபடம்',
      contact: 'தொடர்பு',
      whatsappDirect: 'WhatsApp உரையாடல்',
      emailDirect: 'மின்னஞ்சல் அனுப்புக',
      contactForm: 'விசாரணை மையம்',
      planTrip: 'சுற்றுலா திட்டமிடு',
    },
    hero: {
      kicker: 'இலங்கை தனியார் சுற்றுலா & விமான நிலைய டாக்ஸி',
      title: 'இலங்கையின் அழகை உங்கள் விருப்பப்படி ஆராயுங்கள்',
      subtitle: 'சிகிரியா, எல்லா தேயிலை மலைகள், யாலா சஃபாரி மற்றும் காலி கோட்டைக்கு பாதுகாப்பான தனியார் வாகனங்கள் மற்றும் வழிகாட்டிகள்.',
      ctaPrimary: 'செயற்கைக்கோள் திட்டமிடல்',
      ctaSecondary: 'டாக்ஸி முன்பதிவு',
      optionTaxiTitle: 'தனியார் டாக்ஸி & போக்குவரத்து',
      optionTaxiDesc: '24/7 விமான நிலைய பிக்அப் மற்றும் நகரங்களுக்கு இடையிலான பயணம்.',
      optionPackagesTitle: 'சுற்றுலா தொகுப்புகள்',
      optionPackagesDesc: '5 முதல் 14 நாள் இலங்கை சுற்றுலா திட்டங்கள்.',
      optionDestTitle: 'முக்கிய இடங்கள்',
      optionDestDesc: 'பண்டைய கோட்டைகள், மலைநாடுகள், வனவிலங்கு மற்றும் கடற்கரைகள்.',
    },
    destinations: {
      kicker: 'இலங்கை பகுதிகள்',
      title: 'இலங்கையின் சிறந்த சுற்றுலா இடங்கள்',
      subtitle: 'உங்கள் விருப்ப இடங்களைத் தேர்ந்தெடுத்து செயற்கைக்கோள் வரைபடத்தில் சேர்க்கவும்.',
      all: 'அனைத்து பகுதிகள்',
      cultural: 'கலாச்சார முக்கோணம்',
      highlands: 'மலைநாடு',
      wildlife: 'வனவிலங்கு சஃபாரி',
      coast: 'தென் கடற்கரை',
      addToMap: 'வரைபடத்தில் சேர்க்க',
      bestSeason: 'சிறந்த காலம்',
    },
    packages: {
      kicker: 'சிறப்பு சுற்றுலாக்கள்',
      title: 'வடிவமைக்கப்பட்ட இலங்கை சுற்றுலா தொகுப்புகள்',
      subtitle: 'ஒவ்வொரு தொகுப்பிலும் குளிரூட்டப்பட்ட வாகனம் மற்றும் அனுபவம் வாய்ந்த ஓட்டுநர் வழிகாட்டி அடங்கும்.',
      days: 'நாட்கள்',
      nights: 'இரவுகள்',
      fromPerPerson: 'ஒரு நபருக்கு',
      previewMap: 'வரைபடத்தில் காண்க',
      bookWhatsapp: 'WhatsApp விலை',
      inquireEmail: 'மின்னஞ்சல்',
    },
    planner: {
      kicker: 'நேரடி செயற்கைக்கோள் வரைபடம்',
      title: 'உங்கள் இலங்கை சுற்றுலா & போக்குவரத்தை வடிவமைக்கவும்',
      subtitle: 'செயற்கைக்கோள் காட்சியில் இலங்கையின் எந்த இடத்தையும் தேடி பயண தூரம் மற்றும் கட்டணத்தை கணக்கிடுங்கள்.',
      mapHybrid: 'செயற்கைக்கோள் + பெயர்',
      mapSatellite: 'செயற்கைக்கோள்',
      mapTerrain: 'நிலப்பரப்பு',
      mapRoad: 'சாலை வரைபடம்',
      searchPlaceholder: 'இலங்கை இடத்தைத் தேடுங்கள் (எ.கா. எல்லா, சிகிரியா)...',
      quickAddLabel: 'விரைவு சேர்க்கை:',
      yourRoute: 'உங்கள் பயண நிறுத்தங்கள்',
      clearRoute: 'அழி',
      emptyRoute: 'பயண தூரத்தைக் கணக்கிட குறைந்தது இரண்டு இடங்களைச் சேர்க்கவும்.',
      computingRoute: 'பாதை கணக்கிடப்படுகிறது...',
      totalDistance: 'மொத்த தூரம்',
      drivingTime: 'பயண நேரம்',
      estimatedTotal: 'மதிப்பிடப்பட்ட கட்டணம்',
      vehicleLabel: 'வாகனத்தைத் தேர்ந்தெடுக்கவும்',
      daysLabel: 'நாட்கள்',
      travelersLabel: 'பயணிகள்',
      hotelLabel: 'ஹோட்டல் தரம்',
      startDateLabel: 'வருகை தேதி',
      sendWhatsapp: 'WhatsApp இல் அனுப்புக',
      sendEmail: 'மின்னஞ்சலில் அனுப்புக',
      routeNote: 'Google Maps Routes API மூலம் கணக்கிடப்பட்ட நேரடி பயண தூரம்.',
    },
    taxi: {
      kicker: 'தனியார் டாக்ஸி சேவை',
      title: 'இலங்கை டாக்ஸி கட்டண கணக்கிடு',
      subtitle: 'பிக்அப் மற்றும் செல்லும் இடத்தைத் தேர்ந்தெடுத்து உடனடி கட்டணத்தை அறியுங்கள்.',
      pickupPlaceholder: 'புறப்படும் இடம்...',
      dropoffPlaceholder: 'சேரும் இடம்...',
      pickupLabel: 'புறப்படும் இடம்',
      dropoffLabel: 'சேரும் இடம்',
      dateLabel: 'தேதி',
      passengersLabel: 'பயணிகள்',
      swapBtn: 'மாற்று',
      calculating: 'கணக்கிடப்படுகிறது...',
      distanceLabel: 'தூரம்',
      durationLabel: 'நேரம்',
      estimatedFare: 'மதிப்பிடப்பட்ட கட்டணம்',
      bookTaxiWhatsapp: 'WhatsApp முன்பதிவு',
      bookTaxiEmail: 'மின்னஞ்சல் முன்பதிவு',
      fleetTitle: 'எங்கள் தனியார் வாகனங்கள்',
      passengersShort: 'நபர்',
      bagsShort: 'பைகள்',
      perDay: '/ நாள்',
    },
    contact: {
      kicker: '24/7 சேவை',
      title: 'TRY LANKA TRAVELS தொடர்பு கொள்ளுங்கள்',
      subtitle: 'உடனடி WhatsApp மற்றும் மின்னஞ்சல் உதவி.',
      whatsappCardTitle: 'WhatsApp உதவி',
      whatsappCardDesc: 'டாக்ஸி மற்றும் சுற்றுலா உடனடி முன்பதிவுக்கு.',
      whatsappBtn: 'WhatsApp செய்தி அனுப்புக',
      emailCardTitle: 'மின்னஞ்சல்',
      emailCardDesc: 'விரிவான சுற்றுலா திட்டங்களுக்கு.',
      emailBtn: 'மின்னஞ்சல் அனுப்புக',
      formTitle: 'நேரடி விசாரணை',
      nameLabel: 'முழு பெயர்',
      emailLabel: 'மின்னஞ்சல்',
      phoneLabel: 'WhatsApp / தொலைபேசி',
      serviceLabel: 'சேவை வகை',
      messageLabel: 'பயண விவரங்கள்',
      submitWhatsapp: 'WhatsApp இல் திற',
      submitEmail: 'மின்னஞ்சலில் அனுப்புக',
      sentSuccess: 'உங்கள் விசாரணை தயாராகி திறக்கப்பட்டது.',
    },
    footer: {
      tagline: 'இலங்கையின் நம்பகமான தனியார் சுற்றுலா & டாக்ஸி சேவை.',
      rights: 'TRY LANKA TRAVELS. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      mapsNotice: 'Google Maps Platform செயற்கைக்கோள் வரைபடம்.',
    },
  },
  de: {
    nav: {
      taxi: 'Taxi',
      packages: 'Rundreisen',
      destinations: 'Reiseziele',
      planner: 'Satellitenplaner',
      contact: 'Kontakt',
      whatsappDirect: 'WhatsApp Chat',
      emailDirect: 'E-Mail senden',
      contactForm: 'Kontaktformular',
      planTrip: 'Tour planen',
    },
    hero: {
      kicker: 'Sri Lanka Privatreisen & Chauffeur-Transfers',
      title: 'Entdecken Sie Sri Lanka in Ihrem eigenen Tempo',
      subtitle:
        'Vom Sonnenaufgang auf dem Sigiriya-Felsen über das Teehochland von Ella bis zu Yala-Safaris und Galle Fort – privat und maßgeschneidert.',
      ctaPrimary: 'Satellitenplaner öffnen',
      ctaSecondary: 'Flughafentaxi buchen',
      optionTaxiTitle: 'Privattaxi & Transfers',
      optionTaxiDesc: '24/7 Flughafentransfers (CMB) und klimatisierte Fahrzeuge mit Fahrer.',
      optionPackagesTitle: 'Kuratierte Rundreisen',
      optionPackagesDesc: '5- bis 14-tägige Sri-Lanka-Reisen inkl. Boutique-Hotels & Zugtickets.',
      optionDestTitle: 'Top-Reiseziele',
      optionDestDesc: 'Kulturdreieck, Teeplantagen, Nationalparks und Südküste.',
    },
    destinations: {
      kicker: 'Inselregionen',
      title: 'Reiseziele in ganz Sri Lanka',
      subtitle: 'Entdecken Sie die Regionen und fügen Sie Stopps direkt Ihrer Satellitenroute hinzu.',
      all: 'Alle Regionen',
      cultural: 'Kulturdreieck',
      highlands: 'Teehochland',
      wildlife: 'Safari & Natur',
      coast: 'Südküste',
      addToMap: 'Zur Route hinzufügen',
      bestSeason: 'Beste Reisezeit',
    },
    packages: {
      kicker: 'Signature-Routen',
      title: 'Handverlesene Sri Lanka Rundreisen',
      subtitle: 'Jede Reise umfasst einen lizenzierten Chauffeur-Guide, ein modernes Fahrzeug und flexible Tagesetappen.',
      days: 'Tage',
      nights: 'Nächte',
      fromPerPerson: 'pro Person',
      previewMap: 'Auf Satellitenkarte ansehen',
      bookWhatsapp: 'WhatsApp-Angebot',
      inquireEmail: 'E-Mail-Anfrage',
    },
    planner: {
      kicker: 'Interaktive Satellitenkarte & Routenplaner',
      title: 'Sri Lanka Tour & Transport individuell planen',
      subtitle:
        'Erkunden Sie Küsten und Gebirge in der Satellitenansicht, fügen Sie beliebige Orte hinzu und berechnen Sie echte Fahrzeiten und Preise.',
      mapHybrid: 'Satellit + Namen',
      mapSatellite: 'Nur Satellit',
      mapTerrain: 'Gelände',
      mapRoad: 'Straßenkarte',
      searchPlaceholder: 'Ort in Sri Lanka suchen (z. B. Ella, Sigiriya, Bentota)...',
      quickAddLabel: 'Beliebte Stopps hinzufügen:',
      yourRoute: 'Ihre Wunschroute',
      clearRoute: 'Zurücksetzen',
      emptyRoute: 'Fügen Sie mindestens zwei Orte hinzu, um die Route zu berechnen.',
      computingRoute: 'Route wird berechnet...',
      totalDistance: 'Fahrstrecke',
      drivingTime: 'Fahrzeit ca.',
      estimatedTotal: 'Geschätzter Gesamtpreis',
      vehicleLabel: 'Fahrzeug wählen',
      daysLabel: 'Reisetage',
      travelersLabel: 'Reisende',
      hotelLabel: 'Hotelkategorie',
      startDateLabel: 'Anreisedatum',
      sendWhatsapp: 'Route per WhatsApp senden',
      sendEmail: 'Route per E-Mail senden',
      routeNote: 'Echte Fahrstrecken über Google Maps Routes API berechnet.',
    },
    taxi: {
      kicker: 'Privattransfers & Fahrzeugflotte',
      title: 'Sri Lanka Taxi-Preisrechner',
      subtitle: 'Wählen Sie Abhol- und Zielort für genaue Kilometer, Fahrzeit und transparente Festpreise.',
      pickupPlaceholder: 'Abholort (z. B. Flughafen Colombo)...',
      dropoffPlaceholder: 'Zielort (z. B. Kandy, Galle, Ella)...',
      pickupLabel: 'Abholort',
      dropoffLabel: 'Zielort',
      dateLabel: 'Datum',
      passengersLabel: 'Passagiere',
      swapBtn: 'Tauschen',
      calculating: 'Berechne Route...',
      distanceLabel: 'Entfernung',
      durationLabel: 'Fahrzeit',
      estimatedFare: 'Geschätzter Transferpreis',
      bookTaxiWhatsapp: 'Taxi per WhatsApp buchen',
      bookTaxiEmail: 'Taxi per E-Mail buchen',
      fleetTitle: 'Unsere Fahrzeugflotte mit Fahrer',
      passengersShort: 'Pers.',
      bagsShort: 'Koffer',
      perDay: '/ Tag Tour',
    },
    contact: {
      kicker: '24/7 Service in Colombo & am Flughafen',
      title: 'Direkter Kontakt zu unserem Sri Lanka Team',
      subtitle: 'Schnelle Antworten per WhatsApp oder E-Mail für Transfers und maßgeschneiderte Rundreisen.',
      whatsappCardTitle: 'WhatsApp Reiseberatung',
      whatsappCardDesc: 'Der schnellste Weg für Flughafentransfers und individuelle Routen.',
      whatsappBtn: 'Auf WhatsApp schreiben',
      emailCardTitle: 'Offizielle E-Mail',
      emailCardDesc: 'Für ausführliche Reiseangebote, Gruppenreisen und Hotelwünsche.',
      emailBtn: 'E-Mail an TRY LANKA TRAVELS',
      formTitle: 'Direkte Anfrage senden',
      nameLabel: 'Vollständiger Name',
      emailLabel: 'E-Mail-Adresse',
      phoneLabel: 'WhatsApp / Telefon',
      serviceLabel: 'Gewünschter Service',
      messageLabel: 'Reisedaten & Wünsche',
      submitWhatsapp: 'In WhatsApp öffnen',
      submitEmail: 'Per E-Mail senden',
      sentSuccess: 'Ihre Anfrage wurde vorbereitet und geöffnet.',
    },
    footer: {
      tagline: 'Lizenzierte Sri Lanka Privatreisen, Chauffeur-Touren und 24/7 Flughafentransfers.',
      rights: 'TRY LANKA TRAVELS. Alle Rechte vorbehalten.',
      mapsNotice: 'Satellitenkarten und Routenführung bereitgestellt von Google Maps Platform.',
    },
  },
  fr: {
    nav: {
      taxi: 'Taxi',
      packages: 'Circuits',
      destinations: 'Destinations',
      planner: 'Carte Satellite',
      contact: 'Contact',
      whatsappDirect: 'Discuter sur WhatsApp',
      emailDirect: 'Envoyer un e-mail',
      contactForm: 'Formulaire',
      planTrip: 'Créer mon circuit',
    },
    hero: {
      kicker: 'Circuits Privés & Transferts avec Chauffeur au Sri Lanka',
      title: 'Explorez le Sri Lanka à Votre Propre Rythme',
      subtitle:
        'Du lever du soleil sur Sigiriya aux plantations de thé d’Ella, des safaris de Yala au fort de Galle — voyages sur mesure avec chauffeur privé.',
      ctaPrimary: 'Ouvrir le Planificateur Satellite',
      ctaSecondary: 'Réserver un Taxi Aéroport',
      optionTaxiTitle: 'Taxi Privé & Transferts',
      optionTaxiDesc: 'Accueil aéroport CMB 24h/24 et transferts climatisés dans toute l’île.',
      optionPackagesTitle: 'Circuits Organisés',
      optionPackagesDesc: 'Itinéraires de 5 à 14 jours avec hôtels de charme et train panoramique.',
      optionDestTitle: 'Destinations Phares',
      optionDestDesc: 'Triangle culturel, hauts plateaux, parcs nationaux et plages du sud.',
    },
    destinations: {
      kicker: 'Régions de l’Île',
      title: 'Destinations à Travers le Sri Lanka',
      subtitle: 'Filtrez par ambiance et ajoutez chaque étape à votre carte satellite interactive.',
      all: 'Toutes les Régions',
      cultural: 'Triangle Culturel',
      highlands: 'Hauts Plateaux',
      wildlife: 'Safaris',
      coast: 'Côte Sud',
      addToMap: 'Ajouter à l’itinéraire',
      bestSeason: 'Meilleure Saison',
    },
    packages: {
      kicker: 'Voyages Signatures',
      title: 'Circuits Sur Mesure au Sri Lanka',
      subtitle: 'Chaque circuit inclut un chauffeur-guide agréé, un véhicule privé climatisé et un rythme flexible.',
      days: 'Jours',
      nights: 'Nuits',
      fromPerPerson: 'par voyageur',
      previewMap: 'Voir sur la Carte Satellite',
      bookWhatsapp: 'Devis WhatsApp',
      inquireEmail: 'Demande E-mail',
    },
    planner: {
      kicker: 'Carte Satellite Interactive & Transport',
      title: 'Personnalisez Votre Circuit & Transport au Sri Lanka',
      subtitle: 'Visualisez le relief par satellite, recherchez n’importe quelle ville et calculez la distance réelle et le tarif.',
      mapHybrid: 'Satellite + Noms',
      mapSatellite: 'Satellite Pur',
      mapTerrain: 'Relief',
      mapRoad: 'Plan',
      searchPlaceholder: 'Rechercher un lieu au Sri Lanka (ex. Ella, Sigiriya)...',
      quickAddLabel: 'Étapes emblématiques :',
      yourRoute: 'Votre Itinéraire',
      clearRoute: 'Effacer',
      emptyRoute: 'Ajoutez au moins deux étapes pour calculer le trajet.',
      computingRoute: 'Calcul de l’itinéraire...',
      totalDistance: 'Distance Totale',
      drivingTime: 'Temps de Route',
      estimatedTotal: 'Estimation Transport & Circuit',
      vehicleLabel: 'Véhicule',
      daysLabel: 'Jours',
      travelersLabel: 'Voyageurs',
      hotelLabel: 'Gamme d’Hôtels',
      startDateLabel: 'Date d’Arrivée',
      sendWhatsapp: 'Envoyer sur WhatsApp',
      sendEmail: 'Envoyer par E-mail',
      routeNote: 'Itinéraire réel calculé via Google Maps Routes API.',
    },
    taxi: {
      kicker: 'Transferts Privés & Flotte',
      title: 'Estimateur de Taxi au Sri Lanka',
      subtitle: 'Indiquez votre départ et votre arrivée pour connaître le tarif exact et la durée.',
      pickupPlaceholder: 'Lieu de prise en charge...',
      dropoffPlaceholder: 'Destination...',
      pickupLabel: 'Départ',
      dropoffLabel: 'Arrivée',
      dateLabel: 'Date',
      passengersLabel: 'Passagers',
      swapBtn: 'Inverser',
      calculating: 'Calcul en cours...',
      distanceLabel: 'Distance',
      durationLabel: 'Durée estimée',
      estimatedFare: 'Tarif Estimé',
      bookTaxiWhatsapp: 'Réserver sur WhatsApp',
      bookTaxiEmail: 'Réserver par E-mail',
      fleetTitle: 'Notre Flotte avec Chauffeur',
      passengersShort: 'Pers.',
      bagsShort: 'Valises',
      perDay: '/ jour circuit',
    },
    contact: {
      kicker: 'Assistance 24h/24 Colombo & Aéroport',
      title: 'Contactez Notre Équipe au Sri Lanka',
      subtitle: 'Réponse rapide par WhatsApp ou e-mail pour vos taxis et circuits privés.',
      whatsappCardTitle: 'Conciergerie WhatsApp',
      whatsappCardDesc: 'Idéal pour réserver un transfert aéroport ou ajuster votre itinéraire.',
      whatsappBtn: 'Écrire sur WhatsApp',
      emailCardTitle: 'Bureau E-mail',
      emailCardDesc: 'Pour recevoir une proposition détaillée par écrit.',
      emailBtn: 'Envoyer un E-mail',
      formTitle: 'Envoyer une Demande',
      nameLabel: 'Nom Complet',
      emailLabel: 'Adresse E-mail',
      phoneLabel: 'WhatsApp / Téléphone',
      serviceLabel: 'Service Souhaité',
      messageLabel: 'Dates, étapes et demandes',
      submitWhatsapp: 'Ouvrir dans WhatsApp',
      submitEmail: 'Envoyer par E-mail',
      sentSuccess: 'Votre demande a été préparée et ouverte.',
    },
    footer: {
      tagline: 'Circuits privés au Sri Lanka, chauffeurs-guides agréés et transferts aéroport 24h/24.',
      rights: 'TRY LANKA TRAVELS. Tous droits réservés.',
      mapsNotice: 'Cartes satellites et itinéraires fournis par Google Maps Platform.',
    },
  },
  ru: {
    nav: {
      taxi: 'Такси',
      packages: 'Туры',
      destinations: 'Направления',
      planner: 'Спутниковая карта',
      contact: 'Контакты',
      whatsappDirect: 'Чат в WhatsApp',
      emailDirect: 'Написать на Email',
      contactForm: 'Форма запроса',
      planTrip: 'Собрать тур',
    },
    hero: {
      kicker: 'Индивидуальные туры и трансферы по Шри-Ланке',
      title: 'Откройте Шри-Ланку в собственном ритме',
      subtitle:
        'Рассвет на скале Сигирия, чайные плантации Эллы, сафари в Яле и форт Галле — комфортабельные авто с лицензированными водителями.',
      ctaPrimary: 'Открыть спутниковую карту',
      ctaSecondary: 'Заказать такси из аэропорта',
      optionTaxiTitle: 'Такси и трансферы',
      optionTaxiDesc: 'Встреча в аэропорту Коломбо 24/7 и поездки между городами.',
      optionPackagesTitle: 'Готовые туры',
      optionPackagesDesc: 'Программы от 5 до 14 дней с отелями и билетами на поезд.',
      optionDestTitle: 'Главные места',
      optionDestDesc: 'Культурный треугольник, горы, сафари и пляжи океана.',
    },
    destinations: {
      kicker: 'Регионы острова',
      title: 'Лучшие направления Шри-Ланки',
      subtitle: 'Добавляйте понравившиеся регионы прямо на спутниковую карту маршрута.',
      all: 'Все регионы',
      cultural: 'Культура',
      highlands: 'Горы и чай',
      wildlife: 'Сафари',
      coast: 'Побережье',
      addToMap: 'Добавить в маршрут',
      bestSeason: 'Лучший сезон',
    },
    packages: {
      kicker: 'Авторские программы',
      title: 'Популярные туры по Шри-Ланке',
      subtitle: 'В каждый тур входит личный автомобиль с кондиционером и опытный водитель-гид.',
      days: 'Дней',
      nights: 'Ночей',
      fromPerPerson: 'за человека',
      previewMap: 'Показать на карте',
      bookWhatsapp: 'Запрос в WhatsApp',
      inquireEmail: 'Запрос на Email',
    },
    planner: {
      kicker: 'Спутниковая карта и конструктор тура',
      title: 'Соберите свой маршрут и транспорт по Шри-Ланке',
      subtitle: 'Изучайте остров со спутника, выбирайте любые точки и мгновенно рассчитывайте расстояние и стоимость.',
      mapHybrid: 'Спутник + названия',
      mapSatellite: 'Спутник',
      mapTerrain: 'Рельеф',
      mapRoad: 'Карта дорог',
      searchPlaceholder: 'Найти место на Шри-Ланке (Элла, Сигирия, Унаватуна)...',
      quickAddLabel: 'Быстрый выбор точек:',
      yourRoute: 'Ваш маршрут',
      clearRoute: 'Сбросить',
      emptyRoute: 'Добавьте минимум две точки для расчета маршрута.',
      computingRoute: 'Расчет маршрута...',
      totalDistance: 'Расстояние',
      drivingTime: 'Время в пути',
      estimatedTotal: 'Оценка тура и авто',
      vehicleLabel: 'Транспорт',
      daysLabel: 'Дней',
      travelersLabel: 'Туристов',
      hotelLabel: 'Уровень отелей',
      startDateLabel: 'Дата прилета',
      sendWhatsapp: 'Отправить маршрут в WhatsApp',
      sendEmail: 'Отправить маршрут на Email',
      routeNote: 'Точный маршрут рассчитывается через Google Maps Routes API.',
    },
    taxi: {
      kicker: 'Трансферы и автопарк',
      title: 'Калькулятор такси по Шри-Ланке',
      subtitle: 'Укажите точки подачи и назначения для расчета расстояния и стоимости трансфера.',
      pickupPlaceholder: 'Откуда (напр. Аэропорт Коломбо)...',
      dropoffPlaceholder: 'Куда (напр. Канди, Галле, Элла)...',
      pickupLabel: 'Точка отправления',
      dropoffLabel: 'Пункт назначения',
      dateLabel: 'Дата',
      passengersLabel: 'Пассажиры',
      swapBtn: 'Поменять',
      calculating: 'Расчет...',
      distanceLabel: 'Дистанция',
      durationLabel: 'Время в пути',
      estimatedFare: 'Стоимость трансфера',
      bookTaxiWhatsapp: 'Заказать в WhatsApp',
      bookTaxiEmail: 'Заказать по Email',
      fleetTitle: 'Наш автопарк с водителями',
      passengersShort: 'Чел.',
      bagsShort: 'Багаж',
      perDay: '/ день тура',
    },
    contact: {
      kicker: 'Поддержка 24/7 в Коломбо и аэропорту',
      title: 'Свяжитесь с TRY LANKA TRAVELS',
      subtitle: 'Оперативно отвечаем в WhatsApp и по электронной почте.',
      whatsappCardTitle: 'Консьерж в WhatsApp',
      whatsappCardDesc: 'Быстрый заказ такси из аэропорта и согласование маршрута.',
      whatsappBtn: 'Написать в WhatsApp',
      emailCardTitle: 'Электронная почта',
      emailCardDesc: 'Подробный расчет индивидуальных и групповых туров.',
      emailBtn: 'Написать на Email',
      formTitle: 'Отправить запрос',
      nameLabel: 'Ваше имя',
      emailLabel: 'Email',
      phoneLabel: 'WhatsApp / Телефон',
      serviceLabel: 'Интересующая услуга',
      messageLabel: 'Даты, маршрут и пожелания',
      submitWhatsapp: 'Открыть в WhatsApp',
      submitEmail: 'Отправить по Email',
      sentSuccess: 'Ваш запрос сформирован и открыт.',
    },
    footer: {
      tagline: 'Лицензированные туры, индивидуальный транспорт и трансферы 24/7 по Шри-Ланке.',
      rights: 'TRY LANKA TRAVELS. Все права защищены.',
      mapsNotice: 'Спутниковые карты и маршрутизация на базе Google Maps Platform.',
    },
  },
};
