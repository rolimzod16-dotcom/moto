import type { Localized } from "./utils";

export const motorcycles = [
  {
    slug: "honda-crf300l",
    model: "Honda CRF300L",
    unitCount: 12,
    publicStatus: "AVAILABLE" as const,
    priceNote: "Price on request",
    depositNote: "Refundable deposit confirmed in writing before the rental starts.",
    images: [
      "/images/motorcycle-crf300l.jpg",
      "/images/motorcycle-detail.jpg",
      "/images/hero.jpg",
      "/images/group-ride.jpg",
    ],
    specs: {
      engine: "286 cc liquid-cooled single-cylinder",
      transmission: "6-speed",
      fuel: "7.8 L",
      seatHeight: "880 mm",
      weight: "142 kg (wet, approx.)",
      clearance: "285 mm",
      wheels: "21\" front / 18\" rear",
    },
    recommendedUse: {
      en: "Pamir Highway, paved and gravel roads, mountain and mixed-surface routes.",
      ru: "Памирский тракт, асфальт и гравий, горные и смешанные покрытия.",
    },
    equipment: [
      { en: "Helmet (on request, sized in advance)", ru: "Шлем (по запросу, размер заранее)" },
      { en: "Basic tool and puncture kit", ru: "Базовый инструмент и ремкомплект" },
      { en: "Spare tubes and selected wear parts", ru: "Запасные камеры и расходники" },
      { en: "Luggage rack", ru: "Багажная рамка" },
    ],
    optionalServices: [
      { en: "Guide", ru: "Гид" },
      { en: "Mechanic", ru: "Механик" },
      { en: "Support vehicle", ru: "Машина сопровождения" },
      { en: "GBAO and travel permits", ru: "Разрешения GBAO и документы" },
      { en: "Hotels and homestays", ru: "Гостиницы и хоумстеев" },
      { en: "Meals", ru: "Питание" },
      { en: "Airport and hotel transfers", ru: "Трансферы" },
    ],
  },
];

export const vehicles = [
  {
    slug: "toyota-land-cruiser",
    category: "4x4",
    make: "Toyota",
    model: "Land Cruiser",
    year: 2018,
    transmission: "Manual / automatic",
    driveType: "4WD",
    fuel: "Diesel",
    passengers: 5,
    luggage: "Roof rack + rear load area",
    minDays: 3,
    publicStatus: "AVAILABLE" as const,
    priceNote: "Price on request",
    depositNote: "Deposit depends on self-drive or driver service.",
    images: ["/images/car-landcruiser.jpg", "/images/car-prado.jpg"],
    routeSuitability: {
      en: "Pamir Highway, Wakhan, high passes, mixed gravel and broken asphalt.",
      ru: "Памирский тракт, Вахан, высокие перевалы, гравий и разбитый асфальт.",
    },
    serviceOptions: [
      { en: "Self drive where permitted", ru: "Самостоятельное вождение, если разрешено" },
      { en: "Car with driver", ru: "Автомобиль с водителем" },
      { en: "English-speaking driver-guide", ru: "Водитель-гид с английским" },
      { en: "Full tour package", ru: "Полный турпакет" },
    ],
  },
  {
    slug: "toyota-prado",
    category: "4x4",
    make: "Toyota",
    model: "Land Cruiser Prado",
    year: 2017,
    transmission: "Automatic",
    driveType: "4WD",
    fuel: "Diesel",
    passengers: 5,
    luggage: "Rear + roof rack",
    minDays: 3,
    publicStatus: "LIMITED" as const,
    priceNote: "Price on request",
    depositNote: "Deposit confirmed with the quotation.",
    images: ["/images/car-prado.jpg", "/images/car-landcruiser.jpg"],
    routeSuitability: {
      en: "Comfortable 4x4 for the Pamir Highway and Wakhan with mixed surfaces.",
      ru: "Комфортный 4x4 для Памирского тракта и Вахана на смешанных дорогах.",
    },
    serviceOptions: [
      { en: "Self drive where permitted", ru: "Самостоятельное вождение, если разрешено" },
      { en: "Car with driver", ru: "Автомобиль с водителем" },
      { en: "English-speaking driver-guide", ru: "Водитель-гид с английским" },
      { en: "Full tour package", ru: "Полный турпакет" },
    ],
  },
  {
    slug: "support-vehicles",
    category: "support",
    make: "Toyota / Mitsubishi",
    model: "Hilux, Delica and support vans",
    year: 2016,
    transmission: "Manual",
    driveType: "4WD",
    fuel: "Diesel",
    passengers: 4,
    luggage: "Bike parts, luggage and spare fuel",
    minDays: 4,
    publicStatus: "ON_REQUEST" as const,
    priceNote: "Price on request",
    depositNote: "Included in supported expedition quotations.",
    images: ["/images/support-vehicles.jpg", "/images/group-ride.jpg"],
    routeSuitability: {
      en: "Support for motorcycle groups, luggage transfer and remote recovery.",
      ru: "Сопровождение мотогрупп, перевозка багажа и эвакуация.",
    },
    serviceOptions: [
      { en: "Support vehicle with driver", ru: "Машина сопровождения с водителем" },
      { en: "Mechanic on board", ru: "Механик в машине" },
      { en: "Full tour package", ru: "Полный турпакет" },
    ],
  },
];

export const tours = [
  {
    slug: "pamir-highway-expedition",
    type: "scheduled",
    title: { en: "Pamir Highway motorcycle expedition", ru: "Мотоэкспедиция по Памирскому тракту" } satisfies Localized,
    summary: {
      en: "A supported ride on one of the world’s highest roads, with a mechanic and a backup 4x4.",
      ru: "Сопровождаемый проезд по одной из самых высоких дорог мира, с механиком и машиной 4x4.",
    } satisfies Localized,
    durationDays: 12,
    dates: ["2027-06-14", "2027-07-12", "2027-08-09", "2027-09-06"],
    groupSize: "4–8 riders",
    vehicleType: "Honda CRF300L",
    difficulty: "Demanding",
    distanceKm: 1800,
    dailyRidingHours: "5–7 hours",
    highestAltitude: 4655,
    surface: {
      en: "Broken asphalt, gravel, high passes, dust and occasional river crossings.",
      ru: "Разбитый асфальт, гравий, перевалы, пыль и отдельные броды.",
    },
    itinerary: [
      { day: 1, en: "Arrive Dushanbe. Bike fitting, briefing, documents.", ru: "Прилёт в Душанбе. Подгонка мотоцикла, брифинг, документы." },
      { day: 2, en: "Dushanbe to Kalai Khumb.", ru: "Душанбе — Калаи-Хумб." },
      { day: 3, en: "Kalai Khumb to Khorog.", ru: "Калаи-Хумб — Хорог." },
      { day: 4, en: "Khorog and rest / GBAO checks.", ru: "Хорог, отдых и проверка документов GBAO." },
      { day: 5, en: "Into the Wakhan Valley.", ru: "Въезд в Ваханскую долину." },
      { day: 6, en: "Wakhan forts, hot springs and villages.", ru: "Крепости Вахана, источники и кишлаки." },
      { day: 7, en: "Climb towards the plateau and Langar.", ru: "Подъём на плато, Лангар." },
      { day: 8, en: "Murghab.", ru: "Мургаб." },
      { day: 9, en: "Karakul lake.", ru: "Озеро Каракуль." },
      { day: 10, en: "Ak-Baital pass and return south or north as scheduled.", ru: "Перевал Ак-Байтал и движение по программе." },
      { day: 11, en: "Return riding day.", ru: "Обратный ходовой день." },
      { day: 12, en: "Dushanbe. Bike return and debrief.", ru: "Душанбе. Сдача мотоциклов и разбор поездки." },
    ],
    inclusions: [
      { en: "Honda CRF300L rental", ru: "Аренда Honda CRF300L" },
      { en: "English-speaking motorcycle guide", ru: "Мотогид с английским языком" },
      { en: "Mechanic and support 4x4", ru: "Механик и машина сопровождения 4x4" },
      { en: "GBAO permit assistance", ru: "Помощь с разрешением GBAO" },
      { en: "Airport transfers", ru: "Трансферы аэропорта" },
    ],
    exclusions: [
      { en: "International flights", ru: "Международные авиабилеты" },
      { en: "Travel and medical insurance", ru: "Медицинская и тревел-страховка" },
      { en: "Fuel", ru: "Топливо" },
      { en: "Personal expenses", ru: "Личные расходы" },
    ],
    priceBasis: {
      en: "Price on request. Group and private departures quoted after dates and group size.",
      ru: "Цена по запросу. Групповые и индивидуальные даты считаются после уточнения состава.",
    },
    lodging: {
      en: "Simple hotels in towns and homestays in the valleys. Rooms are clean and practical, not luxury.",
      ru: "Простые гостиницы в городах и хоумстеев в долинах. Чисто и по делу, без люкса.",
    },
    experience: {
      en: "Recent mixed-surface riding, a valid motorcycle licence, and comfort at altitude. We brief every rider in Dushanbe.",
      ru: "Недавний опыт смешанных дорог, действующие права и готовность к высоте. Брифинг в Душанбе.",
    },
    support: {
      en: "English-speaking motorcycle guide, mechanic and a support 4x4 for luggage, spares and recovery.",
      ru: "Мотогид с английским, механик и 4x4 для багажа, запчастей и эвакуации.",
    },
    roadLabel: { en: "Gravel, broken asphalt, high passes", ru: "Гравий, разбитый асфальт, перевалы" },
    mapQuery: "Pamir Highway Tajikistan",
    images: ["/images/group-ride.jpg", "/images/hero.jpg", "/images/karakul.jpg"],
  },
  {
    slug: "wakhan-valley-ride",
    type: "scheduled",
    title: { en: "Wakhan Valley ride", ru: "Поездка по Ваханской долине" } satisfies Localized,
    summary: {
      en: "A shorter supported ride along the Panj river, with time in villages and at the forts.",
      ru: "Более короткий сопровождаемый маршрут вдоль Пянджа, с кишлаками и крепостями.",
    } satisfies Localized,
    durationDays: 8,
    dates: ["2027-06-21", "2027-07-19", "2027-08-16"],
    groupSize: "4–8 riders",
    vehicleType: "Honda CRF300L",
    difficulty: "Moderate to demanding",
    distanceKm: 900,
    dailyRidingHours: "4–6 hours",
    highestAltitude: 3800,
    surface: {
      en: "Narrow valley roads, gravel, dust and short paved sections.",
      ru: "Узкие долинные дороги, гравий, пыль и короткие участки асфальта.",
    },
    itinerary: [
      { day: 1, en: "Dushanbe arrival and briefing.", ru: "Прилёт в Душанбе и брифинг." },
      { day: 2, en: "Transfer or ride towards Khorog.", ru: "Трансфер или переезд к Хорогу." },
      { day: 3, en: "Enter the Wakhan.", ru: "Въезд в Вахан." },
      { day: 4, en: "Yamchun, Vrang and village stays.", ru: "Ямчун, Вранг и ночёвки в кишлаках." },
      { day: 5, en: "Langar and high viewpoints.", ru: "Лангар и смотровые точки." },
      { day: 6, en: "Return along the river.", ru: "Возвращение вдоль реки." },
      { day: 7, en: "Khorog to Dushanbe corridor.", ru: "Коридор Хорог — Душанбе." },
      { day: 8, en: "Dushanbe. Bike return.", ru: "Душанбе. Сдача техники." },
    ],
    inclusions: [
      { en: "Motorcycle rental", ru: "Аренда мотоцикла" },
      { en: "Guide and support options", ru: "Гид и сопровождение" },
      { en: "Permit assistance", ru: "Помощь с разрешениями" },
    ],
    exclusions: [
      { en: "Flights and insurance", ru: "Авиабилеты и страховка" },
      { en: "Fuel and meals unless quoted", ru: "Топливо и питание, если не включены в расчёт" },
    ],
    priceBasis: {
      en: "Price on request.",
      ru: "Цена по запросу.",
    },
    lodging: {
      en: "Village guesthouses and a hotel night in Khorog.",
      ru: "Хоумстеев в кишлаках и ночь в гостинице Хорога.",
    },
    experience: {
      en: "Steady off-road control and patience with slow village roads.",
      ru: "Спокойное управление на грунте и терпение на узких участках у кишлаков.",
    },
    support: {
      en: "Guide, optional mechanic and 4x4 backup.",
      ru: "Гид, по запросу механик и машина 4x4.",
    },
    roadLabel: { en: "Narrow valley gravel and dust", ru: "Узкий долинный гравий и пыль" },
    mapQuery: "Wakhan Valley Tajikistan",
    images: ["/images/wakhan.jpg", "/images/guesthouse.jpg"],
  },
  {
    slug: "private-pamir-dates",
    type: "private",
    title: { en: "Private Pamir dates", ru: "Индивидуальные даты по Памиру" } satisfies Localized,
    summary: {
      en: "Your own dates, group size and mix of motorcycles, 4x4 and support.",
      ru: "Свои даты, размер группы и сочетание мотоциклов, 4x4 и сопровождения.",
    } satisfies Localized,
    durationDays: 10,
    dates: [],
    groupSize: "Private, 1–12 people",
    vehicleType: "Motorcycle, 4x4 or mixed",
    difficulty: "Matched to the group",
    distanceKm: 0,
    dailyRidingHours: "Flexible",
    highestAltitude: 4655,
    surface: {
      en: "Built around the route you choose.",
      ru: "Под выбранный маршрут.",
    },
    itinerary: [
      { day: 1, en: "We design the itinerary after your dates, riding experience and overnight style.", ru: "Маршрут собираем после дат, опыта и формата ночёвок." },
    ],
    inclusions: [
      { en: "Quoted to your brief", ru: "Состав услуг по вашему запросу" },
    ],
    exclusions: [
      { en: "Anything not listed on the written quotation", ru: "Всё, что не указано в письменном расчёте" },
    ],
    priceBasis: {
      en: "Private quotation after dates and group size.",
      ru: "Индивидуальный расчёт после дат и состава группы.",
    },
    lodging: {
      en: "Matched to the itinerary you choose.",
      ru: "Под выбранный маршрут.",
    },
    experience: {
      en: "We match the route to licence, height and recent riding.",
      ru: "Маршрут подбираем под права, рост и недавний опыт.",
    },
    support: {
      en: "Any mix of guide, mechanic, 4x4, hotels and transfers.",
      ru: "Любое сочетание гида, механика, 4x4, гостиниц и трансферов.",
    },
    roadLabel: { en: "Built around your route", ru: "Под ваш маршрут" },
    mapQuery: "Pamirs Tajikistan",
    images: ["/images/riders.jpg", "/images/murghab.jpg"],
  },
];

export const routes = [
  {
    slug: "pamir-highway",
    title: { en: "Pamir Highway", ru: "Памирский тракт" } satisfies Localized,
    summary: {
      en: "The M41 between Dushanbe, Khorog, Murghab and the high plateau — the core motorcycle and 4x4 route of Tajikistan.",
      ru: "Трасса M41 между Душанбе, Хорогом, Мургабом и высокогорным плато — основной маршрут Таджикистана.",
    } satisfies Localized,
    startFinish: { en: "Dushanbe — Murghab / Karakul — Dushanbe or Osh corridor", ru: "Душанбе — Мургаб / Каракуль — Душанбе или коридор на Ош" },
    season: { en: "June to September, with July–August the most reliable for high passes.", ru: "Июнь–сентябрь, июль–август наиболее надёжны для перевалов." },
    roadConditions: { en: "Long gravel, corrugation, altitude, weather changes and limited fuel.", ru: "Длинный гравий, гребёнка, высота, смена погоды и редкие заправки." },
    experience: { en: "Confident riders or drivers used to unpaved mountain roads and altitude.", ru: "Уверенный опыт грунтовых горных дорог и высоты." },
    permits: { en: "GBAO permit required. Cross-border travel only with written approval.", ru: "Нужно разрешение GBAO. Пересечение границ только с письменным согласованием." },
    supportOptions: { en: "Guide, mechanic, support 4x4, hotels and recovery.", ru: "Гид, механик, машина 4x4, гостиницы и эвакуация." },
    images: ["/images/hero.jpg", "/images/group-ride.jpg"],
    mapQuery: "Pamir Highway Tajikistan",
  },
  {
    slug: "wakhan-valley",
    title: { en: "Wakhan Valley", ru: "Ваханская долина" } satisfies Localized,
    summary: {
      en: "A quieter road along the Panj, with Afghanistan across the river, forts, hot springs and village guesthouses.",
      ru: "Спокойнее, чем тракт: Пяндж, Афганистан на том берегу, крепости, источники и кишлаки.",
    } satisfies Localized,
    startFinish: { en: "Khorog — Ishkashim — Langar", ru: "Хорог — Ишкашим — Лангар" },
    season: { en: "June to September.", ru: "Июнь–сентябрь." },
    roadConditions: { en: "Narrow, dusty, sometimes washed, with slow village sections.", ru: "Узко, пыльно, иногда размыто, медленные участки у кишлаков." },
    experience: { en: "Steady off-road control and patience with local traffic.", ru: "Спокойное управление на грунте и терпение к местному движению." },
    permits: { en: "GBAO permit. Border areas are not a crossing without approval.", ru: "Разрешение GBAO. Приграничье не является переходом без согласования." },
    supportOptions: { en: "Local guide, 4x4 backup and booked homestays.", ru: "Местный гид, 4x4 и забронированные хоумстеев." },
    images: ["/images/wakhan.jpg", "/images/guesthouse.jpg"],
    mapQuery: "Wakhan Valley Tajikistan",
  },
  {
    slug: "murghab",
    title: { en: "Murghab", ru: "Мургаб" } satisfies Localized,
    summary: {
      en: "The high eastern hub of the Pamirs: fuel, basic shops, wind and a night to acclimatise.",
      ru: "Высокогорный узел восточного Памира: топливо, простые магазины, ветер и ночь на акклиматизацию.",
    } satisfies Localized,
    startFinish: { en: "Reached via Alichur from the Wakhan or from Karakul.", ru: "Через Аличур из Вахана или со стороны Каракуля." },
    season: { en: "Late June to early September.", ru: "Конец июня — начало сентября." },
    roadConditions: { en: "Open plateau, strong wind, cold nights, gravel.", ru: "Открытое плато, ветер, холодные ночи, гравий." },
    experience: { en: "Altitude awareness and conservative daily distances.", ru: "Учёт высоты и спокойный дневной километраж." },
    permits: { en: "GBAO permit.", ru: "Разрешение GBAO." },
    supportOptions: { en: "Warm layers in the support car, booked rooms, spare fuel.", ru: "Тёплые вещи в машине сопровождения, комнаты, запас топлива." },
    images: ["/images/murghab.jpg"],
    mapQuery: "Murghab Tajikistan",
  },
  {
    slug: "karakul",
    title: { en: "Karakul", ru: "Каракуль" } satisfies Localized,
    summary: {
      en: "A high lake under snow peaks, close to Ak-Baital pass — short riding days, long views.",
      ru: "Высокогорное озеро у снежных вершин, рядом с перевалом Ак-Байтал.",
    } satisfies Localized,
    startFinish: { en: "Murghab — Karakul — Ak-Baital", ru: "Мургаб — Каракуль — Ак-Байтал" },
    season: { en: "July and August are the most stable.", ru: "Июль и август наиболее стабильны." },
    roadConditions: { en: "High, exposed, possible snow even in summer.", ru: "Высоко, открыто, возможен снег даже летом." },
    experience: { en: "Riders and drivers already acclimatised.", ru: "Нужна акклиматизация." },
    permits: { en: "GBAO permit. Kyrgyz border only with written approval and papers.", ru: "GBAO. Граница с Кыргызстаном только с письменным согласованием." },
    supportOptions: { en: "Support vehicle strongly recommended.", ru: "Машина сопровождения настоятельно рекомендуется." },
    images: ["/images/karakul.jpg"],
    mapQuery: "Karakul Lake Tajikistan",
  },
  {
    slug: "tailor-made",
    title: { en: "Tailor-made routes", ru: "Индивидуальные маршруты" } satisfies Localized,
    summary: {
      en: "Fann Mountains, Bartang, mixed motorcycle and 4x4 days, or a private loop built around your dates.",
      ru: "Фанские горы, Бартанг, смешанные дни на мото и 4x4 или свой кольцевой маршрут.",
    } satisfies Localized,
    startFinish: { en: "Agreed with you", ru: "Согласуем с вами" },
    season: { en: "Depends on altitude and passes.", ru: "Зависит от высоты и перевалов." },
    roadConditions: { en: "Confirmed in the quotation.", ru: "Уточняем в расчёте." },
    experience: { en: "We match the route to licence, height and recent riding.", ru: "Маршрут подбираем под права, рост и недавний опыт." },
    permits: { en: "We list every permit before you travel.", ru: "Все разрешения перечисляем до поездки." },
    supportOptions: { en: "Any mix of guide, mechanic, 4x4, hotels and transfers.", ru: "Любое сочетание гида, механика, 4x4, гостиниц и трансферов." },
    images: ["/images/riders.jpg", "/images/wakhan.jpg"],
    mapQuery: "Fann Mountains Tajikistan",
  },
];

export const services = [
  {
    slug: "rental-only",
    title: { en: "Rental only", ru: "Только аренда" },
    text: {
      en: "Motorcycle or 4x4 with agreed equipment. You ride or drive independently after briefing and document checks.",
      ru: "Мотоцикл или 4x4 с согласованным оснащением. Самостоятельная поездка после брифинга и проверки документов.",
    },
  },
  {
    slug: "guided-ride",
    title: { en: "Guided ride", ru: "Поездка с гидом" },
    text: {
      en: "A local rider or driver-guide who knows fuel, rooms, altitude and the day’s road.",
      ru: "Местный гид, который знает топливо, ночёвки, высоту и дорогу дня.",
    },
  },
  {
    slug: "supported-expedition",
    title: { en: "Supported expedition", ru: "Экспедиция с сопровождением" },
    text: {
      en: "Guide, mechanic and a support 4x4 for luggage, spares and recovery on remote days.",
      ru: "Гид, механик и 4x4 для багажа, запчастей и эвакуации на дальних днях.",
    },
  },
  {
    slug: "car-with-driver",
    title: { en: "Car with driver", ru: "Автомобиль с водителем" },
    text: {
      en: "A 4x4 and a professional driver for guests who want the Pamirs without self-drive.",
      ru: "4x4 и профессиональный водитель, если не хотите вести сами.",
    },
  },
  {
    slug: "full-tour-package",
    title: { en: "Full tour package", ru: "Полный турпакет" },
    text: {
      en: "Vehicles, permits, rooms, meals where agreed, transfers and a written itinerary.",
      ru: "Техника, разрешения, комнаты, питание по договорённости, трансферы и письменный маршрут.",
    },
  },
  {
    slug: "guide",
    title: { en: "Guide", ru: "Гид" },
    text: { en: "English-speaking local guide on a motorcycle or in a 4x4.", ru: "Местный гид с английским на мотоцикле или в 4x4." },
  },
  {
    slug: "mechanic",
    title: { en: "Mechanic", ru: "Механик" },
    text: { en: "A technician with tools and common CRF300L and 4x4 parts.", ru: "Техник с инструментом и ходовыми запчастями CRF300L и 4x4." },
  },
  {
    slug: "support-vehicle",
    title: { en: "Support vehicle", ru: "Машина сопровождения" },
    text: { en: "Luggage, spare fuel, a tired rider and recovery capacity.", ru: "Багаж, запас топлива, место для уставшего райдера и эвакуация." },
  },
  {
    slug: "equipment",
    title: { en: "Equipment", ru: "Снаряжение" },
    text: { en: "Helmets, luggage bags, tools and spares requested in advance.", ru: "Шлемы, сумки, инструмент и запчасти — по запросу заранее." },
  },
  {
    slug: "permits",
    title: { en: "Permits", ru: "Разрешения" },
    text: { en: "GBAO and related paperwork prepared before you ride east.", ru: "GBAO и связанные документы до выезда на восток." },
  },
  {
    slug: "accommodation",
    title: { en: "Accommodation", ru: "Проживание" },
    text: { en: "Simple hotels and homestays booked to the itinerary.", ru: "Простые гостиницы и хоумстеев по маршруту." },
  },
  {
    slug: "meals",
    title: { en: "Meals", ru: "Питание" },
    text: { en: "Breakfast and dinner can be included on supported trips.", ru: "Завтрак и ужин можно включить в сопровождаемые поездки." },
  },
  {
    slug: "transfers",
    title: { en: "Transfers", ru: "Трансферы" },
    text: { en: "Airport and hotel transfers in Dushanbe.", ru: "Трансферы аэропорт и гостиница в Душанбе." },
  },
  {
    slug: "recovery",
    title: { en: "Recovery support", ru: "Эвакуация" },
    text: { en: "Remote recovery is arranged and charged according to location.", ru: "Эвакуация с удалённых участков согласовывается и тарифицируется по месту." },
  },
];

export const faqs = [
  {
    category: "booking",
    question: { en: "Does submitting a request confirm a booking?", ru: "Заявка сразу подтверждает бронь?" },
    answer: {
      en: "No. You send a request. We check fleet, route, documents and support, then send a quotation. A booking is confirmed only after you accept the quotation and the agreed payment or deposit.",
      ru: "Нет. Вы отправляете заявку. Мы проверяем парк, маршрут, документы и сопровождение, затем присылаем расчёт. Бронь подтверждается после согласия с расчётом и оговорённой оплаты или депозита.",
    },
  },
  {
    category: "documents",
    question: { en: "What documents do I need to rent a motorcycle?", ru: "Какие документы нужны для мотоцикла?" },
    answer: {
      en: "A valid motorcycle licence for the CRF300L class, passport, and travel insurance that covers motorcycle riding. We may ask for a scan before we confirm.",
      ru: "Действующие права нужной категории, паспорт и страховка, покрывающая езду на мотоцикле. Перед подтверждением можем запросить сканы.",
    },
  },
  {
    category: "documents",
    question: { en: "Can I self-drive a 4x4?", ru: "Можно ли взять 4x4 без водителя?" },
    answer: {
      en: "Self-drive is possible where permitted and after we review your licence and recent mountain driving. Many guests choose a driver or driver-guide on the Pamir Highway.",
      ru: "Самостоятельное вождение возможно, если это разрешено и после проверки прав и опыта. На Памирском тракте многие берут водителя или водителя-гида.",
    },
  },
  {
    category: "insurance",
    question: { en: "Do you provide travel insurance?", ru: "Вы даёте тревел-страховку?" },
    answer: {
      en: "You must arrive with your own travel and medical insurance covering motorcycle riding or 4x4 travel, altitude and evacuation. We do not sell insurance on this website.",
      ru: "Нужна своя медицинская и тревел-страховка с покрытием мото/4x4, высоты и эвакуации. На сайте страховку не продаём.",
    },
  },
  {
    category: "deposit",
    question: { en: "How does the deposit work?", ru: "Как работает депозит?" },
    answer: {
      en: "A refundable deposit is agreed in the quotation. It covers damage, missing equipment and late return, and is settled after inspection at the end of the rental.",
      ru: "Возвратный депозит фиксируется в расчёте. Он покрывает повреждения, пропажу снаряжения и поздний возврат и закрывается после осмотра.",
    },
  },
  {
    category: "fuel",
    question: { en: "Is fuel included?", ru: "Топливо входит в цену?" },
    answer: {
      en: "Fuel is usually paid by the guest unless a full tour quotation says otherwise. We brief you on distances between pumps.",
      ru: "Топливо обычно оплачивает гость, если иное не указано в полном туррасчёте. На брифинге говорим о расстояниях между заправками.",
    },
  },
  {
    category: "equipment",
    question: { en: "Do you supply helmets and luggage bags?", ru: "Есть ли шлемы и сумки?" },
    answer: {
      en: "Helmets and luggage can be requested. Sizes and quantities are limited, so ask in the form. Bring your own helmet if you prefer a known fit.",
      ru: "Шлемы и сумки можно запросить. Размеры и количество ограничены — укажите в форме. Свой шлем удобнее, если важна привычная посадка.",
    },
  },
  {
    category: "borders",
    question: { en: "Can I cross into Kyrgyzstan or Uzbekistan?", ru: "Можно ли выехать в Кыргызстан или Узбекистан?" },
    answer: {
      en: "Only with written approval, the right vehicle papers and current border information. Do not assume a border is open.",
      ru: "Только с письменным согласием, документами на технику и актуальной информацией по границе. Не считайте переход открытым заранее.",
    },
  },
  {
    category: "weather",
    question: { en: "When is the riding season?", ru: "Когда сезон?" },
    answer: {
      en: "High Pamir routes are usually June to September. July and August are the most stable. Shoulder months can bring snow on passes.",
      ru: "Высокий Памир обычно июнь–сентябрь. Июль и август стабильнее. В межсезонье на перевалах возможен снег.",
    },
  },
  {
    category: "support",
    question: { en: "What happens if a motorcycle breaks down?", ru: "Что если мотоцикл сломается?" },
    answer: {
      en: "Call the emergency number on your rental sheet. We arrange mechanic support or recovery. Remote recovery is charged according to location unless a supported package includes it.",
      ru: "Звоните по номеру в памятке. Организуем механика или эвакуацию. Удалённая эвакуация тарифицируется по месту, если не входит в пакет сопровождения.",
    },
  },
];

export const advantages = [
  {
    title: { en: "Local team", ru: "Местная команда" },
    text: {
      en: "We live and work in Tajikistan. Road reports, rooms and permits come from people on the ground.",
      ru: "Живём и работаем в Таджикистане. Дороги, комнаты и разрешения — от людей на месте.",
    },
  },
  {
    title: { en: "Mountain-road experience", ru: "Опыт горных дорог" },
    text: {
      en: "The fleet and the briefings are built for gravel, altitude and long days, not city hire.",
      ru: "Парк и брифинги рассчитаны на гравий, высоту и длинные дни, не на городской прокат.",
    },
  },
  {
    title: { en: "Mechanic and support vehicle", ru: "Механик и машина сопровождения" },
    text: {
      en: "You can add a technician and a 4x4 so luggage, spares and a tired rider have a place to go.",
      ru: "Можно добавить техника и 4x4: багаж, запчасти и место для уставшего райдера.",
    },
  },
  {
    title: { en: "Flexible service", ru: "Гибкий формат" },
    text: {
      en: "Rental only, guided ride, car with driver or a full tour — one request form covers the mix.",
      ru: "Только аренда, гид, авто с водителем или полный тур — одна форма на любой набор.",
    },
  },
  {
    title: { en: "Direct communication", ru: "Прямая связь" },
    text: {
      en: "WhatsApp, email and phone. A person answers, with a request number you can quote.",
      ru: "WhatsApp, почта и телефон. Отвечает человек, у заявки есть номер.",
    },
  },
];
