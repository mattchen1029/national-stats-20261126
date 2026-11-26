// PH StatBook — main.js
// The router and the controls. Routes are hashes: #/ is the overview,
// #/population, #/economy, #/health, #/education, #/trade, #/sources.
// Every control on a page does what it says: year buttons re-render that
// year's figures, metric toggles redraw the chart, and search boxes filter
// their table live. Nothing here fetches anything — the data is local.

import { ECONOMY, POPULATION, TRADE } from './data.js';
import { barChart } from './charts.js';
import {
  viewOverview,
  viewPopulation,
  viewEconomy,
  viewHealth,
  viewEducation,
  viewTrade,
  viewSources,
} from './views.js';

const app = document.getElementById('view');

function route() {
  const hash = window.location.hash || '#/';
  const parts = hash.replace(/^#\/?/, '').split('/');
  const name = parts[0] || '';
  const year = Number(parts[1]) || null;
  let html = '';
  if (name === 'population') html = viewPopulation(year);
  else if (name === 'economy') html = viewEconomy(year);
  else if (name === 'health') html = viewHealth();
  else if (name === 'education') html = viewEducation();
  else if (name === 'trade') html = viewTrade();
  else if (name === 'sources') html = viewSources();
  else html = viewOverview();
  app.innerHTML = html;
  document.querySelectorAll('.nav-link').forEach((a) => {
    const target = a.getAttribute('href').replace(/^#\/?/, '').split('/')[0];
    a.classList.toggle('active', target === name || (name === '' && target === ''));
  });
  wireControls(name);
  window.scrollTo(0, 0);
}

function fmt(n) {
  return n.toLocaleString('en-US');
}

// Attach the controls of the page that was just rendered.
function wireControls(name) {
  // Overview: switch the growth chart between growth rate and GDP size.
  if (name === '' || name === undefined) {
    const chart = document.getElementById('overview-chart');
    document.querySelectorAll('[data-metric]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-metric]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        if (btn.dataset.metric === 'nominal') {
          chart.innerHTML = barChart(
            ECONOMY.gdpNominal.map((d) => ({ label: String(d.year), value: d.usd })),
            { unit: ' bn $', ariaLabel: 'Nominal GDP of the Philippines, billions of US dollars, 2019 to 2024' },
          );
        } else {
          chart.innerHTML = barChart(
            ECONOMY.gdpGrowth.map((d) => ({ label: String(d.year), value: d.pct })),
            { unit: '%', highlightIndex: 1, ariaLabel: 'Real GDP growth, Philippines, 2019 to 2024' },
          );
        }
      });
    });
  }

  // Population: census-year buttons re-render the page for that year.
  if (name === 'population') {
    document.querySelectorAll('[data-year]').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.location.hash = `#/population/${btn.dataset.year}`;
      });
    });
    wireSearch('region-search', 'region-table', 'region-count', 'regions');
  }

  // Economy: year buttons re-render the page for that year.
  if (name === 'economy') {
    document.querySelectorAll('[data-year]').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.location.hash = `#/economy/${btn.dataset.year}`;
      });
    });
  }

  // Trade: metric toggles redraw the two-year comparison chart.
  if (name === 'trade') {
    const chart = document.getElementById('trade-chart');
    document.querySelectorAll('[data-metric]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-metric]').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const metric = btn.dataset.metric;
        const prev = TRADE.years[2023];
        const cur = TRADE.years[2024];
        if (metric === 'imports') {
          chart.innerHTML = barChart(
            [{ label: '2023', value: prev.imports }, { label: '2024', value: cur.imports }],
            { unit: ' bn $', ariaLabel: 'Philippine goods imports, 2023 and 2024' },
          );
        } else if (metric === 'balance') {
          chart.innerHTML = barChart(
            [{ label: '2023', value: prev.balance }, { label: '2024', value: cur.balance }],
            { unit: ' bn $', highlightIndex: 1, ariaLabel: 'Philippine trade balance, 2023 and 2024' },
          );
        } else {
          chart.innerHTML = barChart(
            [{ label: '2023', value: prev.exports }, { label: '2024', value: cur.exports }],
            { unit: ' bn $', ariaLabel: 'Philippine goods exports, 2023 and 2024' },
          );
        }
      });
    });
    wireSearch('partner-search', 'partner-table', 'partner-count', 'partners');
  }
}

// A search box that filters a table's rows by name and reports the count.
function wireSearch(inputId, tableId, countId, noun) {
  const input = document.getElementById(inputId);
  const table = document.getElementById(tableId);
  const count = document.getElementById(countId);
  if (!input || !table) return;
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  const update = () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    rows.forEach((row) => {
      const hit = !q || row.dataset.name.includes(q);
      row.style.display = hit ? '' : 'none';
      if (hit) shown += 1;
    });
    count.textContent = q
      ? `Showing ${shown} of ${rows.length} ${noun} matching “${input.value.trim()}”.`
      : '';
  };
  input.addEventListener('input', update);
}

window.addEventListener('hashchange', route);
route();
