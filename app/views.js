// PH StatBook — views.js
// One render function per hash route. Each returns an HTML string for the
// #view element; main.js wires up the controls afterwards. All figures come
// from data.js, so a number shown here is always the sourced number there.

import { COUNTRY, POPULATION, ECONOMY, HEALTH, EDUCATION, TRADE, SOURCES } from './data.js';
import { barChart, lineChart, shareBars } from './charts.js';

function fmt(n) {
  return n.toLocaleString('en-US');
}
function srcNote(text) {
  return `<p class="src">Source: ${text}</p>`;
}
function kpi(value, label, sub) {
  return `<div class="kpi"><div class="kpi-value">${value}</div><div class="kpi-label">${label}</div><div class="kpi-sub">${sub || ''}</div></div>`;
}
function sectionHead(title, intro) {
  return `<h2>${title}</h2><p class="lede">${intro}</p>`;
}

export function viewOverview() {
  const gdp = ECONOMY.gdpNominal.at(-1);
  const growth = ECONOMY.gdpGrowth.at(-1);
  const pop = POPULATION.latest;
  return `
  <section class="hero">
    <p class="eyebrow">Republic of the Philippines · Republika ng Pilipinas</p>
    <h1>The Philippines in numbers</h1>
    <p class="lede">Population, economy, health, education and trade — the country's headline statistics, each with its source and year, in one place. Figures are from the Philippine Statistics Authority, the World Bank and the Bangko Sentral ng Pilipinas.</p>
    <div class="kpi-grid">
      ${kpi(fmt(pop.total), 'people', `2024 census · PSA`)}
      ${kpi('$' + gdp.usd.toFixed(1) + ' bn', 'GDP, 2024', 'World Bank · current US$')}
      ${kpi(growth.pct + '%', 'GDP growth, 2024', 'World Bank · real terms')}
      ${kpi(HEALTH.lifeExpectancy.at(-1).years + ' yrs', 'life expectancy, 2024', 'World Bank')}
      ${kpi(EDUCATION.basicLiteracy2024 + '%', 'basic literacy, 2024', 'PSA FLEMMS')}
      ${kpi('$' + TRADE.years[2024].exports + ' bn', 'goods exports, 2024', 'PSA trade statistics')}
    </div>
  </section>
  <section>
    <h2>Explore the numbers</h2>
    <div class="card-grid">
      <a class="card" href="#/population"><h3>Population</h3><p>112.7 million people counted in the 2024 census, a median age of 27.7, and the regions where they live.</p><span class="card-link">See population →</span></a>
      <a class="card" href="#/economy"><h3>Economy</h3><p>A $461.6 billion economy growing 5.7% in 2024, poverty at 9.7% in 2025, and $38.3 billion sent home by Filipinos abroad.</p><span class="card-link">See economy →</span></a>
      <a class="card" href="#/health"><h3>Health</h3><p>Life expectancy of 69.9 years, infant mortality of 21.7 per 1,000 births, and health spending at 5.1% of GDP.</p><span class="card-link">See health →</span></a>
      <a class="card" href="#/education"><h3>Education</h3><p>Nine in ten Filipinos can read and write; seven in ten are functionally literate under the stricter 2024 measure.</p><span class="card-link">See education →</span></a>
      <a class="card" href="#/trade"><h3>Trade</h3><p>$73.3 billion of goods exported in 2024 — over half of it electronics — against $127.6 billion imported.</p><span class="card-link">See trade →</span></a>
    </div>
  </section>
  <section>
    <h2>Growth at a glance</h2>
    <p class="lede">Real GDP growth, 2019–2024. Switch the measure to see the size of the economy instead.</p>
    <div class="controls" role="group" aria-label="Choose measure">
      <button class="toggle active" data-metric="growth" type="button">Growth rate</button>
      <button class="toggle" data-metric="nominal" type="button">GDP in US$ billions</button>
    </div>
    <div id="overview-chart">${barChart(ECONOMY.gdpGrowth.map((d) => ({ label: String(d.year), value: d.pct })), { unit: '%', highlightIndex: 1, ariaLabel: 'Real GDP growth, Philippines, 2019 to 2024' })}</div>
    <p class="note">The red bar is 2020, the pandemic year, when the economy shrank 9.5% — the sharpest fall in the series. Growth returned to 5.7% in 2021 and peaked at 7.6% in 2022.</p>
    ${srcNote('World Bank, World Development Indicators (GDP growth, annual %) and PSA National Accounts.')}
  </section>
  <section>
    <h2>Country facts</h2>
    <div class="tscroll"><table class="facts">
      <tr><th>Capital</th><td>${COUNTRY.capital}</td></tr>
      <tr><th>Official languages</th><td>Filipino, English</td></tr>
      <tr><th>Currency</th><td>${COUNTRY.currency}</td></tr>
      <tr><th>Land area</th><td>${COUNTRY.landAreaNote}</td></tr>
      <tr><th>Divisions</th><td>${COUNTRY.regions} regions, ${COUNTRY.provinces} provinces, ${COUNTRY.cities} cities, ${fmt(COUNTRY.municipalities)} municipalities, ${fmt(COUNTRY.barangays)} barangays (PSA Philippine Standard Geographic Code, 30 September 2026)</td></tr>
      <tr><th>Data last checked</th><td>${COUNTRY.updated}</td></tr>
    </table></div>
  </section>`;
}

export function viewPopulation(year) {
  const censusYear = POPULATION.census.find((c) => c.year === year) || POPULATION.latest;
  const median = POPULATION.medianAge[censusYear.year];
  return `
  ${sectionHead('Population', 'Who lives in the Philippines, how old they are, and where they live — from the census the PSA counts every few years.')}
  <div class="controls" role="group" aria-label="Choose census year">
    <span class="controls-label">Census year:</span>
    ${POPULATION.census.map((c) => `<button class="toggle ${c.year === censusYear.year ? 'active' : ''}" data-year="${c.year}" type="button">${c.year}</button>`).join('')}
  </div>
  <div class="kpi-grid">
    ${kpi(fmt(censusYear.total), 'people counted', `${censusYear.year} census · PSA`)}
    ${median ? kpi(median + ' yrs', 'median age', censusYear.year + ' census · PSA') : kpi('—', 'median age', 'not published for ' + censusYear.year)}
    ${kpi(POPULATION.urbanShare + '%', 'live in urban areas', '2024 census · PSA')}
    ${kpi('1.92', 'births per woman', 'total fertility rate, 2023 · World Bank')}
  </div>
  <section>
    <h3>Population at each census</h3>
    ${barChart(POPULATION.census.map((c) => ({ label: String(c.year), value: Math.round(c.total / 1000000) })), { unit: 'm', highlightIndex: POPULATION.census.findIndex((c) => c.year === censusYear.year), ariaLabel: 'Philippine population at each census, millions of people' })}
    <p class="note">The count rose from 92.3 million in 2010 to 112.7 million in 2024 — but growth is slowing: 0.80% a year in 2020–2024, down from 1.63% in 2015–2020.</p>
    ${srcNote('PSA, 2024 Census of Population, declared official by Proclamation No. 973 (July 2025).')}
  </section>
  <section>
    <h3>Age structure, 2024</h3>
    ${shareBars(POPULATION.ageStructure2024.map((a) => ({ label: a.group, value: a.share })), { ariaLabel: 'Age structure of the Philippines, 2024' })}
    <p class="note">Two in three Filipinos (66.7%, 74.95 million) are of working age, 15 to 64. The young (under 15) are 26.7% and those 65 and over are 6.6% — the country is still young, but ageing: the median age rose from 24.3 in 2015 to 27.7 in 2024.</p>
    ${srcNote('PSA, Age and Sex Distribution in the Philippine Population (2024 Census of Population).')}
  </section>
  <section>
    <h3>Regions, by population</h3>
    <p class="lede">The 12 largest and smallest regions in the 2024 census. Type to filter the list.</p>
    <div class="controls"><label class="search-label">Search regions <input id="region-search" type="search" placeholder="e.g. Visayas" aria-label="Search regions"></label></div>
    <div class="tscroll"><table class="data-table" id="region-table">
      <thead><tr><th>Region</th><th class="num">Population, 2024</th><th class="num">Share</th></tr></thead>
      <tbody>
        ${POPULATION.regions.map((r) => `<tr data-name="${r.name.toLowerCase()}"><td>${r.name}</td><td class="num">${fmt(r.pop)}</td><td class="num">${(r.pop / POPULATION.latest.total * 100).toFixed(1)}%</td></tr>`).join('')}
      </tbody>
    </table></div>
    <p class="note" id="region-count"></p>
    <p class="note">${POPULATION.regionNote}</p>
    ${srcNote('PSA, 2024 Census of Population.')}
  </section>`;
}

export function viewEconomy(year) {
  const y = ECONOMY.gdpGrowth.find((d) => d.year === year) || ECONOMY.gdpGrowth.at(-1);
  const nominal = ECONOMY.gdpNominal.find((d) => d.year === y.year);
  const pov = ECONOMY.poverty.at(-1);
  return `
  ${sectionHead('Economy', 'The size of the economy, how fast it grows, what people earn and send home, and who is still poor.')}
  <div class="controls" role="group" aria-label="Choose year">
    <span class="controls-label">Year:</span>
    ${ECONOMY.gdpGrowth.map((d) => `<button class="toggle ${d.year === y.year ? 'active' : ''}" data-year="${d.year}" type="button">${d.year}</button>`).join('')}
  </div>
  <div class="kpi-grid">
    ${kpi('$' + nominal.usd.toFixed(1) + ' bn', 'GDP, ' + y.year, 'World Bank · current US$')}
    ${kpi((y.pct > 0 ? '+' : '') + y.pct + '%', 'GDP growth, ' + y.year, 'World Bank · real terms')}
    ${kpi('$' + fmt(ECONOMY.gdpPerCapita2024), 'GDP per person, 2024', 'World Bank')}
    ${kpi(ECONOMY.inflation[2024] + '%', 'inflation, 2024', 'consumer prices · World Bank')}
    ${kpi(ECONOMY.unemployment[2024] + '%', 'unemployment, 2024', 'PSA Labour Force Survey')}
    ${kpi(pov.pct + '%', 'poverty, ' + pov.year, 'PSA · share of population')}
  </div>
  <section>
    <h3>Real GDP growth, 2019–2024</h3>
    ${barChart(ECONOMY.gdpGrowth.map((d) => ({ label: String(d.year), value: d.pct })), { unit: '%', highlightIndex: ECONOMY.gdpGrowth.findIndex((d) => d.year === y.year), accent: '#c8102e', ariaLabel: 'Real GDP growth of the Philippines, 2019 to 2024' })}
    <p class="note">The highlighted bar is the year you picked above. 2022's 7.6% was the fastest growth in the series; 2020's −9.5% was the pandemic contraction. ${ECONOMY.gdpNote}</p>
    ${srcNote('World Bank, World Development Indicators; PSA National Accounts.')}
  </section>
  <section>
    <h3>Poverty is falling — slowly, then fast</h3>
    ${barChart(ECONOMY.poverty.map((d) => ({ label: String(d.year), value: d.pct })), { unit: '%', ariaLabel: 'Poverty incidence in the Philippines, 2015 to 2025' })}
    <p class="note">${ECONOMY.povertyNote}</p>
    ${srcNote('PSA, Full-Year Poverty Statistics (Family Income and Expenditure Survey).')}
  </section>
  <section>
    <h3>Money sent home</h3>
    <p class="lede">Personal remittances from Filipinos abroad reached a record $38.34 billion in 2024 — 8.3% of GDP. Cash sent through banks was $34.49 billion. The United States supplied 40.6% of cash remittances, Singapore 7.2% and Saudi Arabia 6.4%.</p>
    ${srcNote('Bangko Sentral ng Pilipinas, February 2025 release.')}
    <h3>Where people work</h3>
    ${shareBars(ECONOMY.employmentBySector.map((s) => ({ label: s.sector, value: s.share })), { ariaLabel: 'Employment by sector, Philippines, 2024' })}
    <p class="note">Services employ 59.3% of workers, agriculture 21.2% and industry 19.5%. The labour force is about 51 million people, with a participation rate of 61.4%.</p>
    ${srcNote('World Bank, World Development Indicators, 2024.')}
  </section>`;
}

export function viewHealth() {
  const le = HEALTH.lifeExpectancy.at(-1);
  return `
  ${sectionHead('Health', 'How long Filipinos live, how many children survive, and what the country spends on health.')}
  <div class="kpi-grid">
    ${kpi(le.years + ' yrs', 'life expectancy, 2024', 'World Bank')}
    ${kpi(HEALTH.lifeExpectancyBySex2023.female + ' / ' + HEALTH.lifeExpectancyBySex2023.male, 'women / men, 2023', 'years · World Bank')}
    ${kpi(HEALTH.infantMortality[2024], 'infant deaths per 1,000 births, 2024', 'World Bank')}
    ${kpi(HEALTH.underFiveMortality[2024], 'under-5 deaths per 1,000 births, 2024', 'World Bank')}
    ${kpi(HEALTH.maternalMortality2020, 'maternal deaths per 100,000 live births, 2020', 'World Bank')}
    ${kpi(HEALTH.healthSpendingShareGdp2023 + '%', 'health spending, share of GDP, 2023', 'World Bank')}
  </div>
  <section>
    <h3>Life expectancy, 2020–2024</h3>
    ${lineChart(HEALTH.lifeExpectancy.map((d) => ({ label: String(d.year), value: d.years })), { unit: ' yrs', ariaLabel: 'Life expectancy at birth in the Philippines, 2020 to 2024' })}
    <p class="note">${HEALTH.note} Women live longer than men — 72.8 years against 66.9 in 2023, a gap of almost six years.</p>
    ${srcNote('World Bank, World Development Indicators (SP.DYN.LE00.IN).')}
  </section>
  <section>
    <h3>Child survival</h3>
    <p class="lede">In 2024, 21.7 of every 1,000 babies died before their first birthday and 26.5 before their fifth — about 1 in 38 children. In 2023 the figures were 20.7 and 26.9. Child mortality has fallen far from the levels of a generation ago, but it remains above the regional average for East Asia.</p>
    ${srcNote('World Bank, World Development Indicators, 2023–2024.')}
  </section>`;
}

export function viewEducation() {
  return `
  ${sectionHead('Education', 'Can Filipinos read, write and understand what they read — and how many stay in school?')}
  <div class="kpi-grid">
    ${kpi(EDUCATION.basicLiteracy2024 + '%', 'basic literacy, 2024', 'ages 5+ · PSA FLEMMS')}
    ${kpi(EDUCATION.functionalLiteracy2024 + '%', 'functional literacy, 2024', 'ages 10–64 · PSA FLEMMS')}
    ${kpi(EDUCATION.primaryEnrolment2024 + '%', 'primary enrolment, gross, 2024', 'World Bank')}
    ${kpi(EDUCATION.tertiaryEnrolment2024 + '%', 'tertiary enrolment, gross, 2024', 'World Bank')}
    ${kpi(EDUCATION.publicSpendingEducation2024 + '%', 'public spending on education, share of GDP, 2024', 'World Bank')}
    ${kpi(EDUCATION.internetUsers2024 + '%', 'internet users, 2024', 'World Bank')}
  </div>
  <section>
    <h3>Two ways to count literacy</h3>
    ${shareBars([
      { label: 'Basic literacy (ages 5+)', value: EDUCATION.basicLiteracy2024 },
      { label: 'Functional literacy (ages 10–64)', value: EDUCATION.functionalLiteracy2024 },
    ], { ariaLabel: 'Literacy rates in the Philippines, 2024' })}
    <p class="note">${EDUCATION.literacyNote} In plain terms: 9 in 10 Filipinos aged 5 and over can read, write and do basic arithmetic, but only 7 in 10 aged 10–64 can also comprehend what they read. Young adults do best — 96.1% of 20- to 24-year-olds are basically literate — and women (90.9%) slightly outscore men (89.0%).</p>
    ${srcNote('PSA, 2024 Functional Literacy, Education and Mass Media Survey (FLEMMS), released 4 April 2025.')}
  </section>
  <section>
    <h3>Schooling and spending</h3>
    <p class="lede">Gross primary enrolment was 94.03% in 2024 and tertiary enrolment 47.41% — nearly half of young Filipinos now reach college or university. ${EDUCATION.spendingNote} About two in three Filipinos (67.3%) used the internet in 2024.</p>
    ${srcNote('World Bank, World Development Indicators, 2024.')}
  </section>`;
}

export function viewTrade() {
  const t = TRADE.years[2024];
  const prev = TRADE.years[2023];
  return `
  ${sectionHead('Trade', 'What the Philippines sells to the world, what it buys, and who it trades with.')}
  <div class="kpi-grid">
    ${kpi('$' + t.exports + ' bn', 'goods exports, 2024', '−0.5% on 2023 · PSA')}
    ${kpi('$' + t.imports + ' bn', 'goods imports, 2024', '+1.1% on 2023 · PSA')}
    ${kpi('−$' + Math.abs(t.balance) + ' bn', 'trade balance, 2024', 'deficit widened 3.3% · PSA')}
    ${kpi('$' + t.total + ' bn', 'total trade in goods, 2024', '+0.5% on 2023 · PSA')}
  </div>
  <section>
    <h3>Exports vs imports</h3>
    <p class="lede">Switch the measure to compare exports, imports and the balance across the two latest years.</p>
    <div class="controls" role="group" aria-label="Choose trade measure">
      <button class="toggle active" data-metric="exports" type="button">Exports</button>
      <button class="toggle" data-metric="imports" type="button">Imports</button>
      <button class="toggle" data-metric="balance" type="button">Balance</button>
    </div>
    <div id="trade-chart">${barChart([{ label: '2023', value: prev.exports }, { label: '2024', value: t.exports }], { unit: ' bn $', ariaLabel: 'Philippine goods exports, 2023 and 2024' })}</div>
    <p class="note">${TRADE.note}</p>
    ${srcNote('PSA, International Merchandise Trade Statistics of the Philippines 2024.')}
  </section>
  <section>
    <h3>Top export markets, 2024</h3>
    <p class="lede">Type to filter the partners list.</p>
    <div class="controls"><label class="search-label">Search partners <input id="partner-search" type="search" placeholder="e.g. Japan" aria-label="Search trade partners"></label></div>
    <div class="tscroll"><table class="data-table" id="partner-table">
      <thead><tr><th>Export destination</th><th class="num">Value (US$ bn)</th><th class="num">Share of exports</th></tr></thead>
      <tbody>
        ${TRADE.exportDestinations.map((d) => `<tr data-name="${d.partner.toLowerCase()}"><td>${d.partner}</td><td class="num">${d.value.toFixed(2)}</td><td class="num">${d.share.toFixed(1)}%</td></tr>`).join('')}
      </tbody>
    </table></div>
    <p class="note" id="partner-count"></p>
    <h3>Top import sources, 2024</h3>
    ${shareBars(TRADE.importSources.slice(0, 5).map((d) => ({ label: d.partner, value: d.share })), { ariaLabel: 'Top import sources of the Philippines, 2024, share of imports' })}
    <p class="note">China alone supplied 25.6% of imports ($34.50 billion) — more than the next three suppliers combined. The Philippines runs its largest bilateral deficit with China (about $24 billion) and its largest surplus with the United States (about $3.9 billion).</p>
    ${srcNote('WTO Tariff & Trade Data, Philippines member profile, 2024.')}
  </section>
  <section>
    <h3>What the country trades</h3>
    <div class="tscroll"><table class="data-table">
      <thead><tr><th>Top exports, 2024</th><th class="num">US$ bn</th><th class="num">Share</th></tr></thead>
      <tbody>
        ${TRADE.topExportProducts.map((p) => `<tr><td>${p.product}</td><td class="num">${p.value.toFixed(2)}</td><td class="num">${p.share.toFixed(1)}%</td></tr>`).join('')}
      </tbody>
    </table></div>
    <div class="tscroll"><table class="data-table">
      <thead><tr><th>Top imports, 2024</th><th class="num">US$ bn</th><th class="num">Share</th></tr></thead>
      <tbody>
        ${TRADE.topImportProducts.map((p) => `<tr><td>${p.product}</td><td class="num">${p.value.toFixed(2)}</td><td class="num">${p.share.toFixed(1)}%</td></tr>`).join('')}
      </tbody>
    </table></div>
    ${srcNote('PSA / Department of Trade and Industry, 2024.')}
  </section>`;
}

export function viewSources() {
  return `
  ${sectionHead('Sources & method', 'Every figure on this site names its source. Figures are shown exactly as the source publishes them; where two sources disagree (the census count vs. the World Bank estimate of population), both are shown and labelled.')}
  <section>
    <h3>Where the numbers come from</h3>
    <div class="tscroll"><table class="data-table">
      <thead><tr><th>Source</th><th>What it covers</th></tr></thead>
      <tbody>
        ${SOURCES.map((s) => `<tr><td><strong>${s.short}</strong><br><span class="muted">${s.detail}</span></td><td>${s.covers}</td></tr>`).join('')}
      </tbody>
    </table></div>
  </section>
  <section>
    <h3>How to use this site</h3>
    <p class="lede">Pick a section from the menu — Population, Economy, Health, Education or Trade. On the Population and Economy pages, choose a year to see that year's figures. On the Trade page, switch between exports, imports and the balance, and search the partners table. Everything on this site is a static file: it works with no network connection, on a desktop and on a phone.</p>
    <p class="lede">Figures are the latest published at the time this site was built (26 November 2026). The 2025 poverty rate (9.7%) comes from the PSA release of August 2026; the 2024 census counts were declared official in July 2025.</p>
  </section>`;
}
