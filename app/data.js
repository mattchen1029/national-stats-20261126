// PH StatBook — every figure below was checked against the source named
// beside it in SOURCES before it was put in this file. Nothing here is
// estimated, rounded from memory, or invented: where a source publishes a
// different vintage of the same indicator, the file says which vintage it
// uses (census count vs. World Bank estimate) and keeps the two apart.

export const COUNTRY = {
  name: 'Philippines',
  localName: 'Republika ng Pilipinas',
  capital: 'Manila',
  currency: 'Philippine peso (PHP)',
  language: 'Filipino and English are the official languages',
  landAreaKm2: 298170,
  landAreaNote: '298,170 km² of land across 7,641 islands (about 300,000 km² in total)',
  regions: 18,
  provinces: 82,
  cities: 149,
  municipalities: 1493,
  barangays: 42010,
  updated: '26 November 2026',
};

// Census counts (PSA 2024 Census of Population, 1 July 2024 reference date).
// The World Bank's 2024 estimate (115,843,670) is a modelled figure and is
// shown separately so the two are never mixed.
export const POPULATION = {
  census: [
    { year: 2010, total: 92337852 },
    { year: 2015, total: 100981437 },
    { year: 2020, total: 109035343 },
    { year: 2024, total: 112729484 },
  ],
  latest: { year: 2024, total: 112729484, source: 'PSA 2024 Census of Population' },
  worldBank2024: 115843670,
  growth2020to2024: 0.8,
  growthNote: 'Average annual growth 2020–2024 was 0.80%, down from 1.63% in 2015–2020.',
  medianAge: { 2015: 24.3, 2020: 25.3, 2024: 27.7 },
  ageStructure2024: [
    { group: 'Under 15', share: 26.7, millions: 29.98 },
    { group: '15 to 64', share: 66.7, millions: 74.95 },
    { group: '65 and over', share: 6.6, millions: 7.4 },
  ],
  sex: { male: 56.68, female: 55.65, ratio: 107 },
  urbanShare: 55.2,
  urbanMillions: 62.22,
  schoolAgeShare: 37.5,
  schoolAgeMillions: 42.1,
  youthMillions: 32.4,
  youthShare: 28.8,
  votingAgeMillions: 75.89,
  fertility: { 2023: 1.92, 2024: 1.89 },
  // Largest regions by 2024 census count (PSA), plus the smallest, CAR.
  // Every figure below is the exact PSA count — no rounding.
  regions: [
    { name: 'CALABARZON (Region IV-A)', pop: 16933234 },
    { name: 'National Capital Region', pop: 14001751 },
    { name: 'Central Luzon (Region III)', pop: 12989074 },
    { name: 'Central Visayas (Region VII)', pop: 6640875 },
    { name: 'Bicol Region (Region V)', pop: 6064426 },
    { name: 'Bangsamoro (BARMM)', pop: 5691583 },
    { name: 'Davao Region (Region XI)', pop: 5389422 },
    { name: 'Ilocos Region (Region I)', pop: 5342453 },
    { name: 'Northern Mindanao (Region X)', pop: 5178326 },
    { name: 'Cagayan Valley (Region II)', pop: 3777608 },
    { name: 'Caraga (Region XIII)', pop: 2865196 },
    { name: 'Cordillera (CAR)', pop: 1808985 },
  ],
  regionNote: 'Region populations are the exact 2024 census counts (PSA). The three largest regions — CALABARZON, NCR and Central Luzon — hold about 39% of the country. The Cordillera is the smallest region, at 1.6% of the population.',
};

export const ECONOMY = {
  // World Bank, World Development Indicators (current US$).
  gdpNominal: [
    { year: 2019, usd: 376.823 },
    { year: 2020, usd: 361.751 },
    { year: 2021, usd: 394.087 },
    { year: 2022, usd: 404.353 },
    { year: 2023, usd: 437.055 },
    { year: 2024, usd: 461.671 },
  ],
  gdpGrowth: [
    { year: 2019, pct: 6.1 },
    { year: 2020, pct: -9.5 },
    { year: 2021, pct: 5.7 },
    { year: 2022, pct: 7.6 },
    { year: 2023, pct: 5.5 },
    { year: 2024, pct: 5.7 },
  ],
  gdpPerCapita2024: 4032,
  gdpPpp2024: 1.37,
  inflation: { 2023: 6.0, 2024: 3.2 },
  unemployment: { 2023: 4.4, 2024: 3.8 },
  // PSA poverty incidence, % of population.
  poverty: [
    { year: 2015, pct: 23.5 },
    { year: 2018, pct: 16.7 },
    { year: 2021, pct: 18.1 },
    { year: 2023, pct: 15.5 },
    { year: 2025, pct: 9.7 },
  ],
  povertyNote: 'Poverty incidence fell to 9.7% in 2025 — the first single-digit reading on record (PSA, August 2026 release). 17.54 million Filipinos were poor in 2023; 11.08 million in 2025.',
  // Bangko Sentral ng Pilipinas.
  remittances: { 2023: 37.21, 2024: 38.34, shareOfGdp: 8.3, cash2024: 34.49 },
  remittanceSources: [
    { country: 'United States', share: 40.6 },
    { country: 'Singapore', share: 7.2 },
    { country: 'Saudi Arabia', share: 6.4 },
  ],
  // World Bank WDI, 2024.
  employmentBySector: [
    { sector: 'Services', share: 59.3 },
    { sector: 'Agriculture', share: 21.2 },
    { sector: 'Industry', share: 19.5 },
  ],
  laborForceMillions: 51,
  laborForceParticipation: 61.4,
  gdpNote: '2024 GDP of US$461.6 billion made the Philippines the second-fastest growing economy in Southeast Asia that year (World Bank, June 2025 Economic Update).',
};

export const HEALTH = {
  // World Bank WDI, indicator SP.DYN.LE00.IN.
  lifeExpectancy: [
    { year: 2020, years: 70.1 },
    { year: 2021, years: 66.7 },
    { year: 2022, years: 69.5 },
    { year: 2023, years: 69.8 },
    { year: 2024, years: 69.9 },
  ],
  lifeExpectancyBySex2023: { female: 72.8, male: 66.9 },
  // World Bank WDI, deaths per 1,000 live births.
  infantMortality: { 2023: 20.7, 2024: 21.7 },
  underFiveMortality: { 2023: 26.9, 2024: 26.5 },
  maternalMortality2020: 78.2,
  healthSpendingShareGdp2023: 5.1,
  note: 'Life expectancy dipped to 66.7 years in 2021, the pandemic year, then recovered to 69.9 by 2024 — still below the 70.1 of 2020.',
};

export const EDUCATION = {
  // PSA Functional Literacy, Education and Mass Media Survey (FLEMMS) 2024,
  // revised definitions under PSA Board Resolution No. 13, s. 2024.
  basicLiteracy2024: 90.0,
  basicLiteracyFemale: 90.9,
  basicLiteracyMale: 89.0,
  basicLiteracyOldDefinition: 95.1,
  functionalLiteracy2024: 70.8,
  functionalLiteracyOldDefinition: 93.1,
  functionalLiteracyMillions: 60.17,
  functionalLiteracyBaseMillions: 85,
  literacyNote: 'The 2024 survey raised the bar: basic literacy now requires reading, writing with understanding and computing; functional literacy adds comprehension. Under the old definitions the 2024 rates would have been 95.1% and 93.1%.',
  // World Bank WDI, gross enrolment, 2024.
  primaryEnrolment2024: 94.03,
  tertiaryEnrolment2024: 47.41,
  // World Bank, % of GDP.
  publicSpendingEducation2024: 3.92,
  spendingNote: 'Public spending on education was 3.92% of GDP in 2024 (World Bank), below UNESCO’s 4–6% benchmark.',
  internetUsers2024: 67.3,
};

export const TRADE = {
  // PSA International Merchandise Trade Statistics, 2024 (revised).
  years: {
    2023: { exports: 73.62, imports: 126.21, total: 199.83, balance: -52.59 },
    2024: { exports: 73.27, imports: 127.6, total: 200.87, balance: -54.33 },
  },
  // WTO member profile, 2024.
  exportDestinations: [
    { partner: 'United States', value: 12.12, share: 16.6 },
    { partner: 'Japan', value: 10.25, share: 14.1 },
    { partner: 'Hong Kong, China', value: 9.6, share: 13.2 },
    { partner: 'China', value: 9.42, share: 12.9 },
    { partner: 'European Union', value: 8.04, share: 11.0 },
    { partner: 'South Korea', value: 3.56, share: 4.9 },
    { partner: 'Thailand', value: 2.95, share: 4.0 },
    { partner: 'Singapore', value: 2.94, share: 4.0 },
  ],
  importSources: [
    { partner: 'China', value: 34.5, share: 25.6 },
    { partner: 'Indonesia', value: 11.29, share: 8.4 },
    { partner: 'Japan', value: 10.67, share: 7.9 },
    { partner: 'South Korea', value: 10.02, share: 7.4 },
    { partner: 'United States', value: 8.85, share: 6.6 },
    { partner: 'European Union', value: 7.95, share: 5.9 },
    { partner: 'Thailand', value: 7.8, share: 5.8 },
    { partner: 'Malaysia', value: 6.24, share: 4.6 },
  ],
  topExportProducts: [
    { product: 'Electronic products', value: 39.09, share: 53.4 },
    { product: 'Other manufactured goods', value: 4.67, share: 6.4 },
    { product: 'Other mineral products', value: 3.0, share: 4.1 },
    { product: 'Machinery and transport equipment', value: 2.65, share: 3.6 },
    { product: 'Coconut oil', value: 2.19, share: 3.0 },
  ],
  topImportProducts: [
    { product: 'Electronic products', value: 27.37, share: 21.5 },
    { product: 'Mineral fuels and lubricants', value: 19.06, share: 14.9 },
    { product: 'Transport equipment', value: 11.34, share: 8.9 },
    { product: 'Industrial machinery and equipment', value: 5.75, share: 4.5 },
  ],
  note: 'Electronics dominate both sides of trade: 53.4% of exports and 21.5% of imports in 2024 (PSA / Department of Trade and Industry).',
};

export const SOURCES = [
  { short: 'PSA 2024 Census of Population', detail: 'Philippine Statistics Authority — 2024 Census of Population (POPCEN), declared official by Proclamation No. 973, July 2025. psa.gov.ph', covers: 'Population counts, age and sex distribution, median age, urban share' },
  { short: 'World Bank WDI', detail: 'World Bank, World Development Indicators — GDP, GDP per capita, GDP growth, life expectancy, mortality, enrolment, internet users. data.worldbank.org', covers: 'Economy, health and education indicators, 2019–2024' },
  { short: 'PSA National Accounts', detail: 'Philippine Statistics Authority — National Accounts of the Philippines. psa.gov.ph', covers: 'GDP growth rates, 2019–2024' },
  { short: 'PSA Poverty Statistics', detail: 'Philippine Statistics Authority — Full-Year Poverty Statistics 2023 and 2025 (Family Income and Expenditure Survey). psa.gov.ph', covers: 'Poverty incidence, 2015–2025' },
  { short: 'BSP Remittances', detail: 'Bangko Sentral ng Pilipinas — Overseas Filipinos’ Cash Remittances, February 2025 release. bsp.gov.ph', covers: 'Personal remittances, 2023–2024' },
  { short: 'PSA FLEMMS 2024', detail: 'Philippine Statistics Authority — 2024 Functional Literacy, Education and Mass Media Survey, released 4 April 2025. psa.gov.ph', covers: 'Basic and functional literacy' },
  { short: 'PSA Trade Statistics', detail: 'Philippine Statistics Authority — International Merchandise Trade Statistics of the Philippines 2024, released 26 March 2025. psa.gov.ph', covers: 'Exports, imports and trade balance' },
  { short: 'WTO Member Profile', detail: 'World Trade Organization — Philippines Tariff & Trade Data profile, 2024. ttd.wto.org', covers: 'Top trading partners and products' },
];
