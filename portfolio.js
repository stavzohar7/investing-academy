// ===================================================================
//  💼 מבחן קיצון לתיק: מזינים הקצאה ותרחיש ירידה, ורואים הפסד, זמן החלמה ופעולות איזון.
//  התרחישים השמורים הם דוגמאות בדיוניות — לא תחזיות.
// ===================================================================
TITLES.portfolio = "מבחן קיצון לתיק";

const PF_ASSETS = ["קרן מדד", "אג\"ח", "מניות בודדות", "מזומן"];
const PF_PRESETS = {
  mild: { name: "ירידה מתונה", s: [-15, -2, -25, 0] },
  sharp: { name: "ירידה חדה", s: [-30, -5, -45, 0] },
  severe: { name: "ירידה קשה", s: [-40, -8, -60, 0] },
  custom: { name: "מותאם אישית", s: null }
};
const PF_KEY = "ia-portfolio";

Routes.portfolio = function () {
  let st = { value: 400000, alloc: [60, 15, 20, 5], preset: "sharp", shocks: [-30, -5, -45, 0], band: 5 };
  try { const s = JSON.parse(localStorage.getItem(PF_KEY)); if (s && s.alloc && s.shocks) st = Object.assign(st, s); } catch (e) { /* ignore */ }

  app().innerHTML = `
    <h1>💼 מבחן קיצון לתיק</h1>
    <p class="muted">הזינו הקצאה ותרחיש ירידה בדיוני, וראו כמה התיק יירד, מה צריך כדי להתאושש ומה כלל האיזון אומר. זה כלי לימודי לחשיבה על סיכון — התרחישים אינם תחזיות. <a href="#lesson/lp-7">לשיעור העבודה</a></p>
    <div class="grid grid-2">
      <section class="card" aria-labelledby="pfIn">
        <h2 id="pfIn">הקצאה</h2>
        <div class="field"><label for="pfValue">שווי התיק (₪)</label><input id="pfValue" type="number" inputmode="numeric" min="0" step="1000"></div>
        <fieldset><legend class="small muted">אחוז מהתיק בכל נכס (הסכום אמור להיות 100)</legend>
          ${PF_ASSETS.map((a, i) => `<div class="field"><label for="pfA${i}">${a} (%)</label><input id="pfA${i}" type="number" inputmode="decimal" min="0" max="100" step="1"></div>`).join("")}
        </fieldset>
        <p class="small" id="pfSum" aria-live="polite"></p>
      </section>
      <section class="card" aria-labelledby="pfSc">
        <h2 id="pfSc">תרחיש</h2>
        <div class="field"><label for="pfPreset">תרחיש בדיוני</label>
          <select id="pfPreset">${Object.entries(PF_PRESETS).map(([k, p]) => `<option value="${k}">${p.name}</option>`).join("")}</select></div>
        <fieldset><legend class="small muted">שינוי באחוזים בכל נכס (שלילי = ירידה)</legend>
          ${PF_ASSETS.map((a, i) => `<div class="field"><label for="pfS${i}">${a} (%)</label><input id="pfS${i}" type="number" inputmode="decimal" min="-100" max="1000" step="1"></div>`).join("")}
        </fieldset>
        <div class="field"><label for="pfBand">כלל איזון: סטייה מותרת (נקודות אחוז)</label><input id="pfBand" type="number" inputmode="decimal" min="1" max="30" step="1"></div>
      </section>
    </div>
    <section class="card mt" aria-labelledby="pfOut" aria-live="polite"><h2 id="pfOut">תוצאות</h2><div id="pfRes"></div></section>
    <section class="card mt" aria-labelledby="pfPj">
      <h2 id="pfPj">📈 הקרנה ל-20 שנה: הפקדות ודמי ניהול</h2>
      <p class="small muted">חישוב פשוט עם תשואה קבועה בשנה — מציאות לא נראית ככה. התשואה האמיתית משתנה משנה לשנה, ומה שנקבע לפי הדוגמה אינו תחזית. מטרת החישוב: להראות את כוחן של הפקדות ושל עלויות.</p>
      <div class="grid grid-3">
        <div class="field"><label for="pjStart">שווי התחלתי (₪)</label><input id="pjStart" type="number" inputmode="numeric" min="0" step="1000"></div>
        <div class="field"><label for="pjContrib">הפקדה שנתית (₪)</label><input id="pjContrib" type="number" inputmode="numeric" min="0" step="1000"></div>
        <div class="field"><label for="pjYears">שנים</label><input id="pjYears" type="number" inputmode="numeric" min="1" max="50" step="1"></div>
        <div class="field"><label for="pjGross">תשואה ברוטו לשנה (%)</label><input id="pjGross" type="number" inputmode="decimal" min="-20" max="30" step="0.5"></div>
        <div class="field"><label for="pjFeeA">דמי ניהול א׳ (%)</label><input id="pjFeeA" type="number" inputmode="decimal" min="0" max="5" step="0.05"></div>
        <div class="field"><label for="pjFeeB">דמי ניהול ב׳ (%)</label><input id="pjFeeB" type="number" inputmode="decimal" min="0" max="5" step="0.05"></div>
      </div>
      <div id="pjRes" aria-live="polite"></div>
    </section>
    <section class="card mt" aria-labelledby="pqT">
      <h2 id="pqT">🎲 סיכון הרצף: אותן תשואות, סדר אחר</h2>
      <p class="small muted">20 שנות תשואה בדיוניות, זהות בשני המקרים — כולל שנה אחת של −30%. ההבדל היחיד: מתי השנה הגרועה מגיעה (בשנה 1 או בשנה 20). בדקו מה קורה כשמפקידים, כשמושכים כסף, וכשלא עושים כלום.</p>
      <div class="grid grid-3">
        <div class="field"><label for="pqMode">מצב</label><select id="pqMode"><option value="none">ללא הפקדות או משיכות</option><option value="in">הפקדה שנתית</option><option value="out">משיכה שנתית (פרישה)</option></select></div>
        <div class="field"><label for="pqAmt">סכום שנתי (₪)</label><input id="pqAmt" type="number" inputmode="numeric" min="0" step="1000"></div>
        <div class="field"><label for="pqStart">שווי התחלתי (₪)</label><input id="pqStart" type="number" inputmode="numeric" min="0" step="1000"></div>
      </div>
      <div id="pqRes" aria-live="polite"></div>
    </section>
    <section class="card mt" aria-labelledby="prT">
      <h2 id="prT">🧭 מה הייתי עושה? לקבוע כלל מראש</h2>
      <p class="small muted">נניח שהתרחיש שבחרתם למעלה מתרחש בשנה 1, ואז יש התאוששות בהדרגה. כך נראות שלוש תגובות אפשריות — לפי התיק והתרחיש שהזנתם. זה תרחיש בדיוני אחד: ירידות והתאוששויות אמיתיות שונות במהירות ובצורה, ולפעמים ההתאוששות איטית יותר.</p>
      <div class="grid grid-3">
        <div class="field"><label for="prContrib">הפקדה שנתית (₪, בתחילת כל שנה)</label><input id="prContrib" type="number" inputmode="numeric" min="0" step="1000"></div>
        <div class="field"><label for="prGrowth">תשואה שנתית אחרי ההתאוששות (%)</label><input id="prGrowth" type="number" inputmode="decimal" min="0" max="15" step="0.5"></div>
        <div class="field"><label for="prRec">שנים עד שהתיק חוזר לרמה שלפני הירידה</label><input id="prRec" type="number" inputmode="numeric" min="1" max="8" step="1"></div>
        <div class="field"><label for="prCash">שנים במזומן אחרי מכירה בפאניקה</label><input id="prCash" type="number" inputmode="numeric" min="1" max="6" step="1"></div>
        <div class="field"><label for="prCashY">ריבית על המזומן (%)</label><input id="prCashY" type="number" inputmode="decimal" min="0" max="10" step="0.5"></div>
      </div>
      <div id="prRes" aria-live="polite"></div>
    </section>
    <p class="small muted">התוכן לימודי בלבד ואינו ייעוץ השקעות. מכירה לצורך איזון עשויה ליצור אירוע מס — בדקו לפני פעולה.</p>`;

  const $v = id => document.getElementById(id);
  $v("pfValue").value = st.value; $v("pfPreset").value = st.preset; $v("pfBand").value = st.band;
  PF_ASSETS.forEach((_, i) => { $v("pfA" + i).value = st.alloc[i]; $v("pfS" + i).value = st.shocks[i]; });

  function calc() {
    const value = Math.max(0, +$v("pfValue").value || 0);
    const alloc = PF_ASSETS.map((_, i) => Math.max(0, +$v("pfA" + i).value || 0));
    const shocks = PF_ASSETS.map((_, i) => +$v("pfS" + i).value || 0);
    const band = Math.max(0, +$v("pfBand").value || 0);
    const sum = alloc.reduce((a, b) => a + b, 0);
    $v("pfSum").innerHTML = sum === 100 ? `<span class="good">✔ הסכום 100%</span>` : `<span class="bad">הסכום הוא ${fmt(sum, 1)}%. החישוב מנרמל את ההקצאה ל-100%.</span>`;
    if (!sum || !value) { $v("pfRes").innerHTML = `<p class="muted">הזינו שווי והקצאה.</p>`; return; }
    const w = alloc.map(a => a / sum);
    const v0 = w.map(x => x * value);
    const v1 = v0.map((v, i) => v * Math.max(0, 1 + shocks[i] / 100));
    const total = v1.reduce((a, b) => a + b, 0);
    const loss = 1 - total / value;
    const weights = v1.map(v => total ? v / total : 0);
    const devs = weights.map((x, i) => (x - w[i]) * 100);
    const breach = devs.some(d => Math.abs(d) > band);
    const targets = w.map(x => x * total);
    st = { value, alloc, preset: $v("pfPreset").value, shocks, band }; try { localStorage.setItem(PF_KEY, JSON.stringify(st)); } catch (e) { /* ignore */ }
    const rec = loss > 0 && loss < 1 ? 1 / (1 - loss) - 1 : null;
    window.__pfLoss = loss; if (typeof rulesRun === "function") rulesRun();
    $v("pfRes").innerHTML = `
      <div class="stats-strip" role="group" aria-label="סיכום">
        <div class="card center"><b>${fmt(total)} ₪</b><span class="small muted">שווי אחרי התרחיש</span></div>
        <div class="card center"><b class="${loss > 0 ? "bad" : "good"}">${loss > 0 ? "−" : "+"}${fmt(Math.abs(loss) * 100, 1)}%</b><span class="small muted">שינוי בתיק (${fmt(total - value)} ₪)</span></div>
        <div class="card center"><b>${rec == null ? "—" : fmt(rec * 100, 0) + "%"}</b><span class="small muted">עלייה נדרשת כדי לחזור</span></div>
      </div>
      <div class="table-wrap"><table><caption class="sr-only">תוצאות לפי נכס</caption>
        <thead><tr><th scope="col">נכס</th><th scope="col">לפני</th><th scope="col">שינוי</th><th scope="col">אחרי</th><th scope="col">משקל</th><th scope="col">יעד</th><th scope="col">סטייה</th></tr></thead>
        <tbody>${PF_ASSETS.map((a, i) => `<tr><th scope="row">${a}</th><td>${fmt(v0[i])}</td><td>${shocks[i]}%</td><td>${fmt(v1[i])}</td><td>${fmt(weights[i] * 100, 1)}%</td><td>${fmt(w[i] * 100, 1)}%</td><td class="${Math.abs(devs[i]) > band ? "bad" : ""}">${devs[i] > 0 ? "+" : ""}${fmt(devs[i], 1)}</td></tr>`).join("")}</tbody></table></div>
      <h3>מה כלל האיזון אומר?</h3>
      ${breach
        ? `<p>לפחות נכס אחד סטה ביותר מ-${band} נקודות אחוז. לפי הכלל, מאזנים ליעדים החדשים (סכומים בשקלים, הערכה כללית):</p><ul>${PF_ASSETS.map((a, i) => { const m = targets[i] - v1[i]; return `<li>${a}: ${m >= 0 ? "קנייה" : "מכירה"} של כ-${fmt(Math.abs(m))} ₪</li>`; }).join("")}</ul><p class="small muted">איזון בעזרת הפקדות חדשות חוסך מכירות ומס.</p>`
        : `<p>אף נכס לא סטה ביותר מ-${band} נקודות אחוז, ולכן <b>לפי הכלל לא מאזנים</b> — ממשיכים בהפקדות ובתוכנית.</p>`}
      <h3>שאלת המבחן</h3>
      <p>האם הייתם מסוגלים לראות את התיק יורד ${fmt(Math.max(0, loss) * 100, 1)}% ולהמשיך לפי התוכנית? אם לא — ההקצאה אגרסיבית מדי עבורכם, וכדאי לשנות אותה עכשיו, בראש שקט.</p>`;
  }

  // ----- הקרנה ל-20 שנה -----
  const PJ_KEY = "ia-portfolio-proj";
  let pj = { start: 400000, contrib: 40000, years: 20, gross: 6, feeA: 0.1, feeB: 1 };
  try { const s = JSON.parse(localStorage.getItem(PJ_KEY)); if (s) pj = Object.assign(pj, s); } catch (e) { /* ignore */ }
  const pjIds = { start: "pjStart", contrib: "pjContrib", years: "pjYears", gross: "pjGross", feeA: "pjFeeA", feeB: "pjFeeB" };
  Object.entries(pjIds).forEach(([k, id]) => { $v(id).value = pj[k]; });
  const series = (p, fee) => { const out = [p.start]; let v = p.start; for (let y = 1; y <= p.years; y++) { v = (v + p.contrib) * (1 + (p.gross - fee) / 100); out.push(v); } return out; };
  function project() {
    const p = {}; Object.entries(pjIds).forEach(([k, id]) => { p[k] = +$v(id).value || 0; });
    p.years = Math.min(50, Math.max(1, Math.round(p.years)));
    try { localStorage.setItem(PJ_KEY, JSON.stringify(p)); } catch (e) { /* ignore */ }
    const A = series(p, p.feeA), B = series(p, p.feeB);
    const paid = Array.from({ length: p.years + 1 }, (_, y) => p.start + p.contrib * y);
    const diff = A[p.years] - B[p.years], hi = Math.max(A[p.years], B[p.years]), diffPct = hi ? 1 - Math.min(A[p.years], B[p.years]) / hi : 0;
    const W = 640, H = 260, pad = 36, max = Math.max(...A, ...B, 1);
    const X = i => pad + i * (W - 2 * pad) / p.years, Y = v => H - pad - v / max * (H - 2 * pad);
    const line = arr => arr.map((v, i) => X(i).toFixed(1) + "," + Y(v).toFixed(1)).join(" ");
    $v("pjRes").innerHTML = `
      <div dir="ltr"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="גרף הקרנה: שווי התיק לפי שנים, בשני מקרי דמי ניהול ובסכום ההפקדות" style="width:100%;height:auto;max-width:720px;background:var(--card2);border-radius:10px">
        <polyline points="${line(paid)}" fill="none" style="stroke:var(--muted)" stroke-width="2" stroke-dasharray="5 4"/>
        <polyline points="${line(B)}" fill="none" style="stroke:var(--red)" stroke-width="2.5"/>
        <polyline points="${line(A)}" fill="none" style="stroke:var(--green)" stroke-width="2.5"/>
        <text x="${pad}" y="16" font-size="11" style="fill:var(--green)">green: fee ${p.feeA}%</text>
        <text x="${pad + 110}" y="16" font-size="11" style="fill:var(--red)">red: fee ${p.feeB}%</text>
        <text x="${pad + 220}" y="16" font-size="11" style="fill:var(--muted)">dashed: total deposited</text>
        <text x="${pad}" y="${H - 10}" font-size="11" style="fill:var(--muted)">year 0</text>
        <text x="${W - pad - 40}" y="${H - 10}" font-size="11" style="fill:var(--muted)">year ${p.years}</text>
      </svg></div>
      <div class="table-wrap"><table><caption class="sr-only">ערכי סוף התקופה</caption>
        <thead><tr><th scope="col">מקרה</th><th scope="col">שווי אחרי ${p.years} שנים</th></tr></thead>
        <tbody>
          <tr><th scope="row">סך ההפקדות (כולל התחלה)</th><td>${fmt(paid[p.years])} ₪</td></tr>
          <tr><th scope="row">דמי ניהול ${p.feeA}%</th><td>${fmt(A[p.years])} ₪</td></tr>
          <tr><th scope="row">דמי ניהול ${p.feeB}%</th><td>${fmt(B[p.years])} ₪</td></tr>
        </tbody></table></div>
      <p>הפער בין שני המקרים: <b>${fmt(Math.abs(diff))} ₪</b> (התוצאה הנמוכה נמוכה ב-${fmt(diffPct * 100, 1)}% מהגבוהה) — רק בגלל עלות. ההפקדות והזמן הם הרוב; העלות היא החלק שאפשר לשלוט בו.</p>
      <p class="small muted">נוסחה: כל שנה (שווי + הפקדה) × (1 + תשואה ברוטו − דמי ניהול). ללא מס, אינפלציה ותנודתיות.</p>`;
  }
  Object.values(pjIds).forEach(id => $v(id).addEventListener("input", project));
  project();

  // ----- סיכון הרצף -----
  const PQ_R = [-30, 8, 12, 10, 7, 15, -10, 9, 11, 14, 6, 12, 8, -5, 13, 10, 9, 7, 16, 11];
  const PQ_A = PQ_R.slice(), PQ_B = PQ_R.slice(1).concat(PQ_R[0]);
  $v("pqMode").value = "out"; $v("pqAmt").value = 16000; $v("pqStart").value = 400000;
  const pqRun = (seq, start, flow) => { let v = start; const out = [v]; for (const r of seq) { v = Math.max(0, (v + flow) * (1 + r / 100)); out.push(v); } return out; };
  function seqRisk() {
    const mode = $v("pqMode").value, amt = Math.max(0, +$v("pqAmt").value || 0), start = Math.max(0, +$v("pqStart").value || 0);
    const flow = mode === "in" ? amt : mode === "out" ? -amt : 0;
    const a = pqRun(PQ_A, start, flow), b = pqRun(PQ_B, start, flow);
    const W = 640, H = 240, pad = 36, max = Math.max(...a, ...b, 1);
    const X = i => pad + i * (W - 2 * pad) / 20, Y = v => H - pad - v / max * (H - 2 * pad);
    const line = arr => arr.map((v, i) => X(i).toFixed(1) + "," + Y(v).toFixed(1)).join(" ");
    const msg = mode === "out"
      ? "במשיכה, שנה גרועה בהתחלה פוגעת הכי הרבה: מוכרים יחידות במחיר נמוך, ויש פחות כסף שיכול להתאושש. זה סיכון הרצף."
      : mode === "in"
        ? "בהפקדה, שנה גרועה בהתחלה דווקא עוזרת: כל הפקדה אחריה קונה במחיר נמוך. שנה גרועה בסוף — כשהתיק גדול — פוגעת יותר."
        : "בלי הפקדות או משיכות הסדר לא משנה: מכפלת התשואות זהה, ולכן השווי זהה.";
    $v("pqRes").innerHTML = `
      <div dir="ltr"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="גרף שני רצפי תשואה זהים בסדר שונה: הירידה בשנה הראשונה או בשנה האחרונה" style="width:100%;height:auto;max-width:720px;background:var(--card2);border-radius:10px">
        <polyline points="${line(b)}" fill="none" style="stroke:var(--green)" stroke-width="2.5"/>
        <polyline points="${line(a)}" fill="none" style="stroke:var(--red)" stroke-width="2.5"/>
        <text x="${pad}" y="16" font-size="11" style="fill:var(--red)">red: -30% in year 1</text>
        <text x="${pad + 130}" y="16" font-size="11" style="fill:var(--green)">green: -30% in year 20</text>
        <text x="${pad}" y="${H - 10}" font-size="11" style="fill:var(--muted)">year 0</text>
        <text x="${W - pad - 40}" y="${H - 10}" font-size="11" style="fill:var(--muted)">year 20</text>
      </svg></div>
      <div class="table-wrap"><table><caption class="sr-only">ערכי סוף ושפל</caption>
        <thead><tr><th scope="col">רצף</th><th scope="col">שווי אחרי 20 שנה</th><th scope="col">השווי הנמוך ביותר בדרך</th></tr></thead>
        <tbody>
          <tr><th scope="row">ירידה של 30% בשנה 1</th><td>${fmt(a[20])} ₪</td><td>${fmt(Math.min(...a))} ₪</td></tr>
          <tr><th scope="row">ירידה של 30% בשנה 20</th><td>${fmt(b[20])} ₪</td><td>${fmt(Math.min(...b))} ₪</td></tr>
        </tbody></table></div>
      <p>${msg}</p>
      <p class="small muted">התשואה הממוצעת בדוגמה כ-6.65% בשנה (גיאומטרית כ-6.0%). התשואות בדיוניות ואינן תחזית.</p>`;
  }
  ["pqMode", "pqAmt", "pqStart"].forEach(id => $v(id).addEventListener("input", seqRisk));
  seqRisk();

  // ----- כלל תגובה מראש -----
  $v("prContrib").value = 40000; $v("prGrowth").value = 6; $v("prRec").value = 3; $v("prCash").value = 2; $v("prCashY").value = 1;
  function prModel(o) {
    const rec = Math.pow(1 / (1 - o.L), 1 / o.recYears) - 1, H = 10;
    const ret = y => y === 1 ? -o.L : (y <= 1 + o.recYears ? rec : o.g / 100);
    let a = o.start, b = o.start, c = (o.start + o.contrib) * (1 - o.L);
    for (let y = 1; y <= H; y++) a = (a + o.contrib) * (1 + ret(y));
    for (let y = 1; y <= H; y++) b = (b + (y <= 2 ? 0 : o.contrib)) * (1 + ret(y));
    for (let y = 2; y <= H; y++) c = (c + o.contrib) * (1 + (y < 2 + o.cashYears ? o.cashY / 100 : ret(y)));
    return { rec, a, b, c };
  }
  function rulesRun() {
    const L = window.__pfLoss;
    if (L == null || !(L > 0 && L < 1)) { $v("prRes").innerHTML = '<p class="muted">בחרו תרחיש ירידה למעלה כדי לראות את הכללים.</p>'; return; }
    const o = { start: Math.max(0, +$v("pfValue").value || 0), contrib: Math.max(0, +$v("prContrib").value || 0), g: +$v("prGrowth").value || 0, recYears: Math.min(8, Math.max(1, Math.round(+$v("prRec").value || 3))), cashYears: Math.min(6, Math.max(1, Math.round(+$v("prCash").value || 2))), cashY: +$v("prCashY").value || 0, L };
    const r = prModel(o), best = Math.max(r.a, r.b, r.c);
    const rows = [["א. ממשיכים בתוכנית: מחזיקים ומפקידים כרגיל", r.a], ["ב. עוצרים הפקדות בשנתיים הראשונות ומחכים", r.b], ["ג. מוכרים אחרי הירידה, ממתינים במזומן וחוזרים", r.c]];
    $v("prRes").innerHTML = `
      <p class="small muted">הירידה בתיק: ${fmt(L * 100, 1)}%. כדי לחזור לאותה רמה ב-${o.recYears} שנים נדרשת עלייה של ${fmt(r.rec * 100, 1)}% בשנה בתקופת ההתאוששות. אופק: 10 שנים.</p>
      <div class="table-wrap"><table><caption class="sr-only">תוצאות שלוש תגובות</caption><thead><tr><th scope="col">כלל</th><th scope="col">שווי אחרי 10 שנים</th><th scope="col">מול הגבוה ביותר</th></tr></thead>
      <tbody>${rows.map(x => `<tr><th scope="row">${x[0]}</th><td>${fmt(x[1])} ₪</td><td>${x[1] === best ? "הגבוה ביותר" : "−" + fmt(best - x[1]) + " ₪"}</td></tr>`).join("")}</tbody></table></div>
      <p>המסר אינו "כך תרוויחו": בתרחיש הזה מי שיצא וחזר <b>אחרי</b> ההתאוששות הפסיד אותה. אבל אם ההתאוששות הייתה איטית או לא הגיעה, התוצאה הייתה אחרת. זו הסיבה שכותבים <b>כלל מראש</b>, בראש שקט, ומבצעים אותו — ולא מחליטים תחת פאניקה. ובודקים קודם אם אתם באמת מסוגלים לעמוד בירידה (השאלה שלמעלה).</p>
      <p class="small muted">המודל: הפקדה בתחילת כל שנה, ירידה בשנה 1, התאוששות שווה בכל שנה עד חזרה לרמה הקודמת, ואז תשואה קבועה. אין מס, עמלות ואינפלציה.</p>`;
  }
  ["prContrib", "prGrowth", "prRec", "prCash", "prCashY"].forEach(id => $v(id).addEventListener("input", rulesRun));

  $v("pfPreset").onchange = e => { const p = PF_PRESETS[e.target.value]; if (p.s) p.s.forEach((x, i) => $v("pfS" + i).value = x); calc(); };
  PF_ASSETS.forEach((_, i) => { $v("pfS" + i).addEventListener("input", () => { $v("pfPreset").value = "custom"; calc(); }); $v("pfA" + i).addEventListener("input", calc); });
  $v("pfValue").addEventListener("input", calc); $v("pfBand").addEventListener("input", calc);
  calc(); rulesRun();
};
