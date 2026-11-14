// כלי עזר לדוח השבועי: מחשב שלושה תרחישי DCF ו-Reverse DCF לכל מניה.
// שימוש:  node weekly/valuate.js input.json
// input.json: { "AAPL": { "price": 354.88, "fcf": 136, "gT": 0.03, "r": 0.09, "cash": 137, "debt": 94.5,
//                          "shares": 14.54, "g": [0.04, 0.08, 0.12] }, ... }
// (מיליארדי דולר; מניות במיליארדים). אותו מודל כמו מחשבון ה-DCF באפליקציה (10 שנים, שני שלבים).
//
// למניות הפסדיות אפשר להשתמש במודל "שווי בשנת יעד":
// "CBRS": { "exit": true, "shares": 0.26, "netCash": 5, "multiple": 25, "r": 0.12, "yrs": 4,
//           "cases": [[2, 0.05], [5, 0.20], [10, 0.30]] }   // [הכנסות, שולי רווח]
const fs = require("fs");
const input = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));

function dcf({ fcf, g, years = 10, gT, r, cash = 0, debt = 0, shares }) {
  let f = fcf, pv = 0;
  for (let t = 1; t <= years; t++) { f *= 1 + g; pv += f / Math.pow(1 + r, t); }
  const tv = f * (1 + gT) / (r - gT) / Math.pow(1 + r, years);
  return (pv + tv + cash - debt) / shares;
}
function reverseG(p, price) {
  let lo = -0.3, hi = 0.6;
  for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; dcf({ ...p, g: m }) > price ? hi = m : lo = m; }
  return (lo + hi) / 2;
}
const out = {};
for (const [k, s] of Object.entries(input)) {
  if (s.exit) {
    const v = s.cases.map(([rev, m]) => Math.max(0, rev * m * s.multiple + s.netCash) / s.shares / Math.pow(1 + (s.r || 0.12), s.yrs || 4));
    out[k] = { bear: Math.round(v[0]), base: Math.round(v[1]), bull: Math.round(v[2]) };
  } else {
    const v = s.g.map(g => dcf({ ...s, g }));
    out[k] = { bear: Math.round(v[0]), base: Math.round(v[1]), bull: Math.round(v[2]), impliedGrowthPct: +(reverseG(s, s.price) * 100).toFixed(1) };
  }
}
console.log(JSON.stringify(out, null, 1));
