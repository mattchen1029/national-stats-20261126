[![National Statistics Site](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/mattchen1029/national-stats-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/mattchen1029/national-stats-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# PH StatBook — The Philippines in Numbers

A national statistics site for the Philippines, built for the [make.fun bounty "Make the best national statistics site"](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

## What it is

One country, six sections, every figure real and sourced:

- **Overview** — headline indicators (population, GDP, growth, life expectancy, literacy, exports) and a switchable GDP growth / GDP size chart.
- **Population** — 2024 census count of 112,729,484, age structure, median age 27.7, and a searchable table of regions. Pick a census year (2010 / 2015 / 2020 / 2024) to see that year's count.
- **Economy** — GDP and growth 2019–2024 with a year picker, poverty falling from 23.5% (2015) to 9.7% (2025), record remittances of $38.34 billion, and employment by sector.
- **Health** — life expectancy 2020–2024 (69.9 years in 2024), infant and under-5 mortality, maternal mortality, health spending.
- **Education** — basic literacy 90.0% and functional literacy 70.8% under the PSA's stricter 2024 measures, enrolment, and public spending on education.
- **Trade** — exports $73.27bn vs imports $127.60bn in 2024, switchable exports / imports / balance charts, searchable top-partner tables, and top products (electronics are 53.4% of exports).

Every figure was verified against its source before it was put in the site — the Philippine Statistics Authority (2024 census, national accounts, poverty statistics, FLEMMS 2024, trade statistics), the World Bank (World Development Indicators), the Bangko Sentral ng Pilipinas (remittances) and the WTO (trade partners). The **Sources** page lists each source and what it covers, and every section names its source on the page.

## How it is built

Static files under `app/` — no build step, no network requests at runtime, no libraries or external fonts. Charts are hand-drawn SVG in vanilla JavaScript (`app/charts.js`); the data lives in `app/data.js`; each section is rendered by `app/views.js` and routed by hash in `app/main.js`.

- Serve it locally: `node serve.ts`, then open http://localhost:8080
- Hand in: `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`

## Layout

- `main.ts` — hands the site in (copies `app/` and `screenshots/` to `/output`, writes `dossier.json`)
- `serve.ts` — tiny static server for local testing
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
- `app/` — `index.html`, `style.css`, `main.js`, `views.js`, `charts.js`, `data.js`
- `screenshots/` — real renders of the site in a browser
- `LICENSE` — MIT
