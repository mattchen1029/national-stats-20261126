// PH StatBook — charts.js
// Every chart on the site is drawn here, in plain SVG, with no library:
// a bar chart and a line chart, each taking plain arrays and returning an
// SVG string. Colours come from the site palette so charts and page agree.

const NS = 'http://www.w3.org/2000/svg';

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fmt(n) {
  return n.toLocaleString('en-US');
}

// A vertical bar chart. points: [{label, value, note?}]. Negative values
// draw below the zero line. highlightIndex marks one bar in the accent
// colour; the rest use the series colour.
export function barChart(points, opts = {}) {
  const width = opts.width || 720;
  const height = opts.height || 320;
  const padL = opts.padLeft ?? 64;
  const padR = 16;
  const padT = 18;
  const padB = 34;
  const accent = opts.accent || '#c8102e';
  const series = opts.color || '#0b4f6c';
  const unit = opts.unit || '';
  const values = points.map((p) => p.value);
  const lo = Math.min(0, ...values);
  const hi = Math.max(0, ...values);
  const span = hi - lo || 1;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const y = (v) => padT + ((hi - v) / span) * innerH;
  const slot = innerW / points.length;
  const barW = Math.min(54, slot * 0.62);
  let s = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(opts.ariaLabel || 'Bar chart')}" xmlns="${NS}">`;
  // Gridlines at four steps between lo and hi.
  for (let i = 0; i <= 4; i += 1) {
    const v = lo + ((hi - lo) * i) / 4;
    const gy = y(v);
    s += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - padR}" y2="${gy.toFixed(1)}" stroke="#dbe4ea" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="#5a6b76">${esc(fmt(Math.round(v * 10) / 10))}${unit}</text>`;
  }
  // Zero line.
  s += `<line x1="${padL}" y1="${y(0).toFixed(1)}" x2="${width - padR}" y2="${y(0).toFixed(1)}" stroke="#8fa3b0" stroke-width="1.5"/>`;
  points.forEach((p, i) => {
    const cx = padL + slot * i + slot / 2;
    const top = y(Math.max(p.value, 0));
    const bottom = y(Math.min(p.value, 0));
    const fill = i === opts.highlightIndex ? accent : series;
    s += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(1, bottom - top).toFixed(1)}" rx="3" fill="${fill}"><title>${esc(p.label)}: ${esc(fmt(p.value))}${unit}${p.note ? ` — ${esc(p.note)}` : ''}</title></rect>`;
    const labelY = p.value >= 0 ? top - 6 : y(0) - 6;
    s += `<text x="${cx.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="12.5" font-weight="600" fill="#12303f">${esc(fmt(p.value))}${unit}</text>`;
    s += `<text x="${cx.toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="#5a6b76">${esc(p.label)}</text>`;
  });
  s += '</svg>';
  return s;
}

// A line chart with dots and value labels. points: [{label, value}].
export function lineChart(points, opts = {}) {
  const width = opts.width || 720;
  const height = opts.height || 300;
  const padL = 56;
  const padR = 24;
  const padT = 24;
  const padB = 34;
  const color = opts.color || '#0b4f6c';
  const unit = opts.unit || '';
  const values = points.map((p) => p.value);
  let lo = Math.min(...values);
  let hi = Math.max(...values);
  const pad = (hi - lo) * 0.15 || 1;
  lo -= pad;
  hi += pad;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const x = (i) => padL + (innerW * i) / Math.max(1, points.length - 1);
  const y = (v) => padT + ((hi - v) / (hi - lo)) * innerH;
  let s = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(opts.ariaLabel || 'Line chart')}" xmlns="${NS}">`;
  for (let i = 0; i <= 3; i += 1) {
    const v = lo + ((hi - lo) * i) / 3;
    const gy = y(v);
    s += `<line x1="${padL}" y1="${gy.toFixed(1)}" x2="${width - padR}" y2="${gy.toFixed(1)}" stroke="#dbe4ea" stroke-width="1"/>`;
    s += `<text x="${padL - 8}" y="${(gy + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="#5a6b76">${esc(fmt(Math.round(v * 10) / 10))}${unit}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  s += `<path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  points.forEach((p, i) => {
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4.5" fill="#ffffff" stroke="${color}" stroke-width="2.5"><title>${esc(p.label)}: ${esc(fmt(p.value))}${unit}</title></circle>`;
    s += `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 11).toFixed(1)}" text-anchor="middle" font-size="12.5" font-weight="600" fill="#12303f">${esc(fmt(p.value))}${unit}</text>`;
    s += `<text x="${x(i).toFixed(1)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="#5a6b76">${esc(p.label)}</text>`;
  });
  s += '</svg>';
  return s;
}

// A horizontal bar list for shares (e.g. age structure, trade partners):
// rows of label + bar + value, drawn as plain HTML-friendly SVG.
export function shareBars(rows, opts = {}) {
  const width = opts.width || 720;
  const rowH = opts.rowHeight || 40;
  const labelW = opts.labelWidth || 190;
  const height = rows.length * rowH + 8;
  const max = Math.max(...rows.map((r) => r.value), 1);
  const color = opts.color || '#0b4f6c';
  const unit = opts.unit || '%';
  let s = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(opts.ariaLabel || 'Share chart')}" xmlns="${NS}">`;
  rows.forEach((r, i) => {
    const cy = 8 + i * rowH + rowH / 2;
    const barX = labelW + 8;
    const barW = (width - barX - 76) * (r.value / max);
    s += `<text x="${labelW}" y="${cy + 4}" text-anchor="end" font-size="13" fill="#12303f">${esc(r.label)}</text>`;
    s += `<rect x="${barX}" y="${cy - 9}" width="${Math.max(2, barW).toFixed(1)}" height="18" rx="4" fill="${i === opts.highlightIndex ? opts.accent || '#c8102e' : color}"><title>${esc(r.label)}: ${esc(fmt(r.value))}${unit}</title></rect>`;
    s += `<text x="${(barX + barW + 8).toFixed(1)}" y="${cy + 4}" font-size="13" font-weight="600" fill="#12303f">${esc(fmt(r.value))}${unit}</text>`;
  });
  s += '</svg>';
  return s;
}
