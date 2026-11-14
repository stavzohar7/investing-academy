// ===================================================================
//  כלים: מחשבונים, סימולטור סווינג, צ'קליסט באפט, יומן מסחר
// ===================================================================

const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const num = id => parseFloat(($("#" + id) || {}).value);
function field(id, label, value, hint = "", step = "any") {
  return `<div class="field"><label for="${id}">${label}</label><input id="${id}" type="number" step="${step}" value="${value}" />${hint ? `<div class="hint">${hint}</div>` : ""}</div>`;
}
function bindInputs(container, fn) {
  $$("input, select", container).forEach(i => i.addEventListener("input", fn));
  fn();
}
function cls(v, good, bad, higherBetter = true) {
  if (!isFinite(v)) return "";
  if (higherBetter) return v >= good ? "good" : v <= bad ? "bad" : "mid";
  return v <= good ? "good" : v >= bad ? "bad" : "mid";
}

// =================== TOOLS PAGE ===================
const TOOL_TABS = [
  ["dcf", "🧮 DCF ושווי פנימי"],
  ["position", "📏 גודל פוזיציה ותוחלת"],
  ["ratios", "🔬 מנתח יחסים"],
  ["compound", "📈 ריבית דריבית"],
  ["returns", "🧩 פירוק תשואה"]
];

// ---------- RETURN DECOMPOSITION (Bogle) ----------
function returnsView(el) {
  el.innerHTML = `
    <h2>🧩 מאיפה תגיע התשואה? פירוק תשואה צפויה</h2>
    <p class="muted small">ג'ון בוגל לימד שתשואה של מניה לאורך זמן מורכבת משלושה חלקים בלבד: <b>צמיחת הרווח</b> + <b>הדיבידנד</b> (התשואה ה"השקעתית") ועוד <b>שינוי המכפיל</b> (התשואה ה"ספקולטיבית" — מה שאחרים יהיו מוכנים לשלם). הכלי מראה כמה מכל חלק.</p>
    <div class="form">
      ${field("rt_price", "מחיר נוכחי", 100)}
      ${field("rt_pe", "מכפיל רווח (P/E) נוכחי", 30)}
      ${field("rt_g", "צמיחת רווח שנתית צפויה (%)", 10)}
      ${field("rt_exit", "מכפיל בסוף התקופה", 20, "מה הגיוני לחברה בוגרת יותר?")}
      ${field("rt_years", "מספר שנים", 10, "", "1")}
      ${field("rt_div", "תשואת דיבידנד / רכישה חוזרת (%)", 1)}
    </div>
    <div id="rt_out"></div>`;
  bindInputs(el, () => {
    const P = num("rt_price"), pe = num("rt_pe"), g = num("rt_g") / 100, ex = num("rt_exit"), n = Math.max(1, Math.round(num("rt_years"))), dy = num("rt_div") / 100;
    if (!(pe > 0 && ex > 0)) { $("#rt_out").innerHTML = `<div class="result bad">הכנס מכפילים חיוביים.</div>`; return; }
    const mult = Math.pow(ex / pe, 1 / n) - 1;
    const total = (1 + g) * (1 + mult) - 1 + dy;
    const future = P * Math.pow(1 + g, n) * ex / pe;
    const parts = [["צמיחת רווח", g, "#2ecc8f"], ["דיבידנד / רכישה חוזרת", dy, "#6cb3ff"], ["שינוי מכפיל", mult, mult >= 0 ? "#f2c14e" : "#ff7676"]];
    const scale = Math.max(...parts.map(p => Math.abs(p[1])), 0.01);
    const sens = [0.6, 0.8, 1, 1.2, 1.4].map(f => { const e = pe * f; const m = Math.pow(e / pe, 1 / n) - 1; return [e, (1 + g) * (1 + m) - 1 + dy]; });
    $("#rt_out").innerHTML = `
      <div class="result">
        <div class="kv">
          <div><div class="k">תשואה שנתית צפויה</div><div class="v big ${total >= 0.08 ? "good" : total >= 0.04 ? "mid" : "bad"}">${pct(total)}</div></div>
          <div><div class="k">מחיר משוער בעוד ${n} שנים (בלי דיבידנד)</div><div class="v">${fmt(future, 2)}</div></div>
        </div>
        <h3>הפירוק</h3>
        <div class="bars" role="list">${parts.map(p => `
          <div class="bar-row" role="listitem"><span class="bar-lbl">${p[0]}</span>
            <span class="bar-track"><span class="bar-fill" style="width:${Math.abs(p[1]) / scale * 100}%;background:${p[2]}"></span></span>
            <b class="${p[1] >= 0 ? "good" : "bad"}" dir="ltr">${p[1] >= 0 ? "+" : ""}${(p[1] * 100).toFixed(1)}%</b></div>`).join("")}
        </div>
        <p class="mt">${mult < -0.02 ? `⚠️ <b>התכווצות המכפיל אוכלת כ-${(-mult * 100).toFixed(1)}% בשנה</b> מהתשואה. זה מה שקורה כשקונים מניה מצוינת במחיר גבוה מדי: העסק צומח, אבל המניה מדשדשת.` : mult > 0.02 ? `שים לב: חלק מהתשואה תלוי ב<b>התרחבות המכפיל</b> — כלומר שאחרים יהיו מוכנים לשלם יותר. זה החלק הכי פחות אמין בתחזית.` : `רוב התשואה מגיעה מצמיחת העסק ומהחזר ההון — החלק ה"השקעתי" והאמין יותר.`}</p>
        <h3>מה אם המכפיל בסוף יהיה אחר?</h3>
        <table class="data"><tr><th>מכפיל בסוף</th>${sens.map(s => `<th>${s[0].toFixed(0)}</th>`).join("")}</tr>
          <tr><th>תשואה שנתית</th>${sens.map(s => `<td class="${s[1] >= 0.08 ? "good" : s[1] >= 0.04 ? "mid" : "bad"}">${pct(s[1])}</td>`).join("")}</tr></table>
        <p class="small muted mt">חישוב מקורב לצורכי לימוד, לפני מסים ועמלות. ראה גם את השיעור <a href="#lesson/l2-5">מכפילי שווי</a> ואת <a href="#lesson/lm-6">האם השוק כולו יקר</a>.</p>
      </div>`;
  });
};

Routes.tools = function (tab = "dcf") {
  app().innerHTML = `
    <h1>🧰 כלים</h1>
    <div class="tabs" role="tablist" aria-label="בחירת כלי">${TOOL_TABS.map(t => `<button role="tab" aria-selected="${t[0] === tab}" class="${t[0] === tab ? "active" : ""}" onclick="go('tools/${t[0]}')">${t[1]}</button>`).join("")}</div>
    <div class="card" id="toolBody"></div>`;
  (ToolViews[tab] || ToolViews.dcf)($("#toolBody"));
};

const ToolViews = {};
ToolViews.returns = returnsView;

// ---------- DCF ----------
function dcfValue(p, g1) {
  const r = p.r / 100, gT = p.gT / 100;
  let fcf = p.fcf, pv = 0;
  const rows = [];
  for (let t = 1; t <= p.years; t++) {
    fcf *= 1 + g1;
    const d = fcf / Math.pow(1 + r, t);
    pv += d;
    rows.push([t, fcf, d]);
  }
  const tv = r > gT ? fcf * (1 + gT) / (r - gT) : NaN;
  const tvPv = tv / Math.pow(1 + r, p.years);
  const equity = pv + tvPv + p.cash - p.debt;
  return { pv, tv, tvPv, equity, perShare: equity / p.shares, rows };
}

ToolViews.dcf = function (el) {
  // הנחות שהגיעו מהדוח השבועי (כפתור "פתח במחשבון DCF")
  const P = Object.assign({ fcf: 1000, g1: 10, years: 10, gT: 2.5, r: 10, cash: 500, debt: 1500, shares: 400, price: 45, mos: 30 }, window.DCF_PRESET || {});
  const presetName = window.DCF_PRESET && window.DCF_PRESET.name;
  window.DCF_PRESET = null;
  el.innerHTML = `
    <h2>🧮 מחשבון DCF — שווי פנימי ומרווח ביטחון</h2>
    ${presetName ? `<p class="pill gold">נטענו הנחות תרחיש הבסיס של ${esc(presetName)} מהדוח השבועי (מיליארדי דולר) — שנה אותן ובדוק מה קורה</p>` : ""}
    <p class="muted small">הכנס נתונים מהדוחות (באותן יחידות — למשל מיליונים). השתמש בהנחות שמרניות. כל המספרים כאן הם הערכה, לא אמת.</p>
    <div class="form">
      ${field("d_fcf", "FCF / Owner Earnings שנתי", P.fcf, "נקודת ההתחלה — עדיף ממוצע של כמה שנים")}
      ${field("d_g1", "צמיחה שנתית בשלב 1 (%)", P.g1, "היה שמרני — לרוב מתחת להיסטוריה")}
      ${field("d_years", "אורך שלב 1 (שנים)", P.years, "5-10 שנים", "1")}
      ${field("d_gT", "צמיחה לנצח (%)", P.gT, "2-3% (לא יותר מצמיחת הכלכלה)")}
      ${field("d_r", "שיעור היוון / תשואה נדרשת (%)", P.r, "8-12% מקובל")}
      ${field("d_cash", "מזומן", P.cash)}
      ${field("d_debt", "חוב", P.debt)}
      ${field("d_shares", "מספר מניות", P.shares)}
      ${field("d_price", "מחיר מניה נוכחי", P.price)}
      ${field("d_mos", "מרווח ביטחון רצוי (%)", P.mos)}
    </div>
    <div id="d_out"></div>`;

  bindInputs(el, () => {
    const p = { fcf: num("d_fcf"), years: Math.max(1, Math.round(num("d_years"))), gT: num("d_gT"), r: num("d_r"), cash: num("d_cash") || 0, debt: num("d_debt") || 0, shares: num("d_shares"), price: num("d_price") };
    const g1 = num("d_g1") / 100, mos = num("d_mos") / 100;
    if (!(p.r > p.gT)) { $("#d_out").innerHTML = `<div class="result bad">שיעור ההיוון חייב להיות גבוה מהצמיחה לנצח.</div>`; return; }
    const v = dcfValue(p, g1);
    const buy = v.perShare * (1 - mos);
    const upside = v.perShare / p.price - 1;
    const curMos = 1 - p.price / v.perShare;
    const tvShare = v.tvPv / (v.pv + v.tvPv);

    // reverse DCF: find g1 such that perShare == price
    let lo = -0.5, hi = 1.0, implied = NaN;
    if ((dcfValue(p, lo).perShare - p.price) * (dcfValue(p, hi).perShare - p.price) < 0) {
      for (let i = 0; i < 80; i++) {
        const mid = (lo + hi) / 2;
        if (dcfValue(p, mid).perShare > p.price) hi = mid; else lo = mid;
      }
      implied = (lo + hi) / 2;
    }

    // sensitivity
    const rs = [p.r - 2, p.r - 1, p.r, p.r + 1, p.r + 2];
    const gs = [g1 - 0.04, g1 - 0.02, g1, g1 + 0.02, g1 + 0.04];
    const sens = `<table class="data"><tr><th>צמיחה ↓ / היוון →</th>${rs.map(r => `<th>${r.toFixed(1)}%</th>`).join("")}</tr>
      ${gs.map(g => `<tr><th>${(g * 100).toFixed(1)}%</th>${rs.map(r => {
        const val = r > p.gT ? dcfValue(Object.assign({}, p, { r }), g).perShare : NaN;
        const c = val >= p.price / (1 - mos) ? "good" : val >= p.price ? "mid" : "bad";
        return `<td class="${c}">${fmt(val, 1)}</td>`;
      }).join("")}</tr>`).join("")}</table>`;

    const verdict = curMos >= mos ? ["good", `המחיר נמוך מהשווי ביותר ממרווח הביטחון שהגדרת (${pct(curMos, 0)}). לפי ההנחות שלך — אטרקטיבי. עכשיו בדוק: האם ההנחות באמת שמרניות?`]
      : curMos > 0 ? ["mid", `המחיר מתחת לשווי (${pct(curMos, 0)}) אבל פחות ממרווח הביטחון הרצוי. רשימת מעקב — חכה למחיר טוב יותר.`]
      : ["bad", `המחיר גבוה מהשווי שחישבת ב-${pct(-upside, 0)}. לפי ההנחות שלך — יקר.`];

    $("#d_out").innerHTML = `
      <div class="result">
        <div class="kv">
          <div><div class="k">שווי פנימי למניה</div><div class="v big">${fmt(v.perShare, 2)}</div></div>
          <div><div class="k">מחיר קנייה עם מרווח ביטחון</div><div class="v good">${fmt(buy, 2)}</div></div>
          <div><div class="k">פוטנציאל מהמחיר הנוכחי</div><div class="v ${upside > 0 ? "good" : "bad"}">${pct(upside)}</div></div>
          <div><div class="k">מרווח ביטחון נוכחי</div><div class="v ${cls(curMos, mos, 0)}">${pct(curMos)}</div></div>
        </div>
        <p class="mt ${verdict[0]}"><b>${verdict[1]}</b></p>
        <div class="kv">
          <div><div class="k">ערך נוכחי של שלב 1</div><div class="v">${fmt(v.pv)}</div></div>
          <div><div class="k">ערך נוכחי של ערך השארית</div><div class="v">${fmt(v.tvPv)}</div></div>
          <div><div class="k">חלק ערך השארית מהשווי</div><div class="v ${tvShare > 0.75 ? "bad" : "mid"}">${pct(tvShare, 0)}</div></div>
          <div><div class="k">שווי הון כולל</div><div class="v">${fmt(v.equity)}</div></div>
        </div>
        ${tvShare > 0.75 ? `<p class="small bad">⚠️ יותר מ-75% מהשווי מגיע מערך השארית — ההערכה רגישה מאוד להנחות לטווח הרחוק.</p>` : ""}
        <h3>🔄 Reverse DCF — מה המחיר הנוכחי מניח?</h3>
        <p>${isFinite(implied)
          ? `כדי להצדיק מחיר של <b>${fmt(p.price, 2)}</b>, ה-FCF צריך לצמוח בכ-<b class="mid">${(implied * 100).toFixed(1)}%</b> בשנה במשך ${p.years} שנים (בשיעור היוון ${p.r}%). שאל את עצמך: האם זה ריאלי לעסק הזה? ${implied < g1 ? "השוק מניח צמיחה <b class='good'>נמוכה</b> מההנחה שלך." : "השוק מניח צמיחה <b class='bad'>גבוהה</b> מההנחה שלך."}`
          : "לא ניתן לחשב בטווח צמיחה סביר."}</p>
        <h3>🎛️ טבלת רגישות (שווי למניה)</h3>
        <p class="small muted">ירוק = מעל המחיר עם מרווח ביטחון · צהוב = מעל המחיר · אדום = מתחת למחיר</p>
        ${sens}
      </div>`;
  });
};

// ---------- POSITION SIZE ----------
ToolViews.position = function (el) {
  el.innerHTML = `
    <h2>📏 מחשבון גודל פוזיציה ויחס סיכוי-סיכון</h2>
    <div class="form">
      ${field("p_acc", "גודל התיק", 100000)}
      ${field("p_risk", "סיכון לעסקה (% מהתיק)", 1, "מומלץ 0.5%-1%")}
      ${field("p_entry", "מחיר כניסה", 50)}
      ${field("p_stop", "סטופ לוס", 47)}
      ${field("p_target", "יעד", 59)}
      ${field("p_atr", "ATR (לא חובה)", 1.8, "לבדיקה שהסטופ לא קרוב מדי")}
      ${field("p_max", "מקסימום לפוזיציה (% מהתיק)", 25)}
    </div>
    <div id="p_out"></div>
    <hr style="border-color:var(--line);margin:28px 0">
    <h2>🎲 מחשבון תוחלת וקריטריון קלי</h2>
    <div class="form">
      ${field("e_win", "אחוז הצלחה (%)", 40)}
      ${field("e_avgw", "רווח ממוצע (ב-R)", 2.5)}
      ${field("e_avgl", "הפסד ממוצע (ב-R)", 1)}
      ${field("e_n", "מספר עסקאות בשנה", 50, "", "1")}
    </div>
    <div id="e_out"></div>`;

  bindInputs(el, () => {
    const acc = num("p_acc"), risk = num("p_risk") / 100, en = num("p_entry"), st = num("p_stop"), tg = num("p_target"), atr = num("p_atr"), maxP = num("p_max") / 100;
    const long = st < en;
    const perShare = Math.abs(en - st);
    const riskAmt = acc * risk;
    let shares = Math.floor(riskAmt / perShare);
    let capped = false;
    if (shares * en > acc * maxP) { shares = Math.floor(acc * maxP / en); capped = true; }
    const posVal = shares * en;
    const rr = long ? (tg - en) / perShare : (en - tg) / perShare;
    const be = 1 / (1 + rr);
    const stopPct = perShare / en;
    const atrMult = perShare / atr;
    $("#p_out").innerHTML = perShare > 0 ? `
      <div class="result">
        <div class="kv">
          <div><div class="k">כמות מניות לקנייה</div><div class="v big">${fmt(shares)}</div></div>
          <div><div class="k">שווי הפוזיציה</div><div class="v">${fmt(posVal)} (${pct(posVal / acc)})</div></div>
          <div><div class="k">הפסד אם הסטופ נפגע (1R)</div><div class="v bad">${fmt(shares * perShare)}</div></div>
          <div><div class="k">רווח אם היעד נפגע</div><div class="v good">${fmt(shares * Math.abs(tg - en))}</div></div>
          <div><div class="k">יחס סיכוי-סיכון</div><div class="v ${cls(rr, 2.5, 1.5)}">${isFinite(rr) ? rr.toFixed(2) + " : 1" : "—"}</div></div>
          <div><div class="k">אחוז הצלחה לאיזון</div><div class="v">${pct(be)}</div></div>
          <div><div class="k">מרחק הסטופ</div><div class="v ${cls(stopPct, 0.08, 0.1, false)}">${pct(stopPct)}</div></div>
          <div><div class="k">הסטופ ביחידות ATR</div><div class="v ${isFinite(atrMult) ? cls(atrMult, 1.2, 0.8) : ""}">${isFinite(atrMult) ? atrMult.toFixed(2) + "×" : "—"}</div></div>
        </div>
        <ul class="small mt">
          ${capped ? `<li class="mid">הכמות הוגבלה ע"י מקסימום הפוזיציה (${pct(maxP, 0)}) — הסיכון בפועל נמוך מ-${pct(risk)}.</li>` : ""}
          ${rr < 2 ? `<li class="bad">יחס מתחת ל-2:1 — שקול לוותר או למצוא כניסה טובה יותר.</li>` : `<li class="good">יחס סיכוי-סיכון טוב.</li>`}
          ${stopPct > 0.08 ? `<li class="bad">סטופ רחוק מ-8% — לפי או'ניל, כנראה לא Setup אידיאלי.</li>` : ""}
          ${isFinite(atrMult) && atrMult < 1 ? `<li class="bad">הסטופ קטן מ-ATR אחד — סביר שתוצא ברעש רגיל.</li>` : ""}
          ${!long ? `<li class="muted">הסטופ מעל הכניסה — מחושב כעסקת שורט.</li>` : ""}
        </ul>
      </div>` : `<div class="result bad">הסטופ חייב להיות שונה ממחיר הכניסה.</div>`;

    const w = num("e_win") / 100, aw = num("e_avgw"), al = num("e_avgl"), n = num("e_n");
    const E = w * aw - (1 - w) * al;
    const R = aw / al;
    const kelly = w - (1 - w) / R;
    const yearR = E * n;
    const yearPct = Math.pow(1 + E * risk, n) - 1;
    $("#e_out").innerHTML = `
      <div class="result">
        <div class="kv">
          <div><div class="k">תוחלת לעסקה</div><div class="v ${E > 0 ? "good" : "bad"}">${E >= 0 ? "+" : ""}${E.toFixed(2)}R</div></div>
          <div><div class="k">צפי שנתי (ב-R)</div><div class="v">${yearR.toFixed(1)}R</div></div>
          <div><div class="k">צפי שנתי בסיכון ${pct(risk)} לעסקה</div><div class="v ${yearPct > 0 ? "good" : "bad"}">${pct(yearPct)}</div></div>
          <div><div class="k">קלי מלא / רבע קלי</div><div class="v">${pct(kelly)} / ${pct(kelly / 4)}</div></div>
        </div>
        <p class="small muted mt">${E > 0 ? "לשיטה יש יתרון חיובי — אם הנתונים אמיתיים (מהיומן, לא מדמיון)." : "לשיטה הזו אין יתרון. שפר את יחס הרווח/הפסד או את אחוז ההצלחה."} הצפי הוא תיאורטי ואינו כולל עמלות, מסים והחלקה.</p>
      </div>`;
  });
};

// ---------- RATIO ANALYZER ----------
ToolViews.ratios = function (el) {
  const F = [
    ["r_rev", "הכנסות", 10000], ["r_gp", "רווח גולמי", 5200], ["r_ebit", "רווח תפעולי (EBIT)", 2600],
    ["r_ni", "רווח נקי", 1900], ["r_int", "הוצאות ריבית", 120], ["r_tax", "שיעור מס (%)", 21],
    ["r_eq", "הון עצמי", 9000], ["r_debt", "חוב פיננסי כולל", 3000], ["r_cash", "מזומן והשקעות", 2000],
    ["r_ca", "נכסים שוטפים", 6000], ["r_cl", "התחייבויות שוטפות", 3500], ["r_cfo", "תזרים מפעילות שוטפת", 2300],
    ["r_capex", "CAPEX", 500], ["r_shares", "מספר מניות", 500], ["r_price", "מחיר מניה", 60]
  ];
  el.innerHTML = `
    <h2>🔬 מנתח יחסים פיננסיים</h2>
    <p class="muted small">הכנס נתונים מהדוח השנתי (באותן יחידות). הצבעים הם כללי אצבע לחברה תעשייתית/צרכנית/טכנולוגית — לא לבנקים, ביטוח ונדל"ן.</p>
    <div class="form">${F.map(f => field(f[0], f[1], f[2])).join("")}</div>
    <div id="r_out"></div>`;

  bindInputs(el, () => {
    const v = Object.fromEntries(F.map(f => [f[0], num(f[0])]));
    const nopat = v.r_ebit * (1 - v.r_tax / 100);
    const invested = v.r_eq + v.r_debt - v.r_cash;
    const fcf = v.r_cfo - v.r_capex;
    const mcap = v.r_price * v.r_shares;
    const ev = mcap + v.r_debt - v.r_cash;
    const eps = v.r_ni / v.r_shares, bvps = v.r_eq / v.r_shares;
    const graham = eps > 0 && bvps > 0 ? Math.sqrt(22.5 * eps * bvps) : NaN;
    const M = [
      ["איכות ורווחיות", [
        ["שולי רווח גולמי", v.r_gp / v.r_rev, 0.4, 0.25, true, "p", "מעל 40% = כוח תמחור"],
        ["שולי רווח תפעולי", v.r_ebit / v.r_rev, 0.2, 0.1, true, "p", ""],
        ["שולי רווח נקי", v.r_ni / v.r_rev, 0.15, 0.05, true, "p", ""],
        ["ROE", v.r_ni / v.r_eq, 0.15, 0.1, true, "p", "בדוק שלא נובע מחוב"],
        ["ROIC", nopat / invested, 0.15, 0.08, true, "p", "המדד החשוב ביותר"],
      ]],
      ["חוזק פיננסי", [
        ["חוב ÷ הון עצמי", v.r_debt / v.r_eq, 0.5, 1.5, false, "x", ""],
        ["חוב נטו ÷ FCF (שנים)", (v.r_debt - v.r_cash) / fcf, 3, 5, false, "x", "פחות מ-3 = מצוין"],
        ["כיסוי ריבית", v.r_ebit / v.r_int, 8, 3, true, "x", ""],
        ["יחס שוטף", v.r_ca / v.r_cl, 1.5, 1, true, "x", ""],
      ]],
      ["תזרים מזומנים", [
        ["FCF", fcf, NaN, NaN, true, "n", ""],
        ["המרת FCF (FCF ÷ רווח נקי)", fcf / v.r_ni, 0.9, 0.6, true, "p", "איכות רווחים"],
        ["CAPEX ÷ CFO", v.r_capex / v.r_cfo, 0.25, 0.5, false, "p", "נמוך = עסק קל-הון"],
      ]],
      ["תמחור", [
        ["רווח למניה (EPS)", eps, NaN, NaN, true, "d", ""],
        ["P/E", v.r_price / eps, 15, 30, false, "x", "השווה למתחרות ולהיסטוריה"],
        ["EV/EBIT", ev / v.r_ebit, 12, 25, false, "x", ""],
        ["P/B", v.r_price / bvps, 1.5, 5, false, "x", ""],
        ["תשואת FCF", fcf / mcap, 0.06, 0.03, true, "p", "+ צמיחה ≈ תשואה צפויה"],
        ["מספר גרהאם", graham, NaN, NaN, true, "d", graham ? (v.r_price <= graham ? "המחיר מתחת למספר גרהאם" : "המחיר מעל מספר גרהאם (שמרני מאוד)") : ""],
      ]]
    ];
    const show = (val, t) => t === "p" ? pct(val) : t === "x" ? (isFinite(val) ? val.toFixed(2) : "—") : t === "d" ? fmt(val, 2) : fmt(val);
    let g = 0, b = 0;
    const html = M.map(([title, rows]) => `
      <h3>${title}</h3>
      <div class="kv">${rows.map(r => {
        const c = isFinite(r[2]) ? cls(r[1], r[2], r[3], r[4]) : "";
        if (c === "good") g++; if (c === "bad") b++;
        return `<div><div class="k">${r[0]}</div><div class="v ${c}">${show(r[1], r[5])}</div>${r[6] ? `<div class="small muted">${r[6]}</div>` : ""}</div>`;
      }).join("")}</div>`).join("");
    const summary = g >= 10 && b <= 1 ? ["good", "פרופיל של עסק איכותי מאוד. עכשיו: האם יש חפיר עמיד, והאם המחיר הוגן?"]
      : b >= 5 ? ["bad", "הרבה דגלים אדומים. דרוש מרווח ביטחון גדול — או לוותר."]
      : ["mid", "תמונה מעורבת. בדוק את המגמה של 5-10 שנים, לא רק שנה אחת."];
    $("#r_out").innerHTML = `<div class="result"><p class="${summary[0]}"><b>🟢 ${g} · 🔴 ${b} — ${summary[1]}</b></p>${html}</div>`;
  });
};

// ---------- COMPOUND ----------
ToolViews.compound = function (el) {
  el.innerHTML = `
    <h2>📈 מחשבון ריבית דריבית</h2>
    <div class="form">
      ${field("c_init", "סכום התחלתי", 20000)}
      ${field("c_month", "הפקדה חודשית", 1000)}
      ${field("c_rate", "תשואה שנתית צפויה (%)", 8, "S&P 500 היסטורית ~10% נומינלי")}
      ${field("c_years", "מספר שנים", 30, "", "1")}
      ${field("c_fee", "דמי ניהול / עלויות שנתיות (%)", 0.1, "השווה 0.1% מול 1.5%")}
    </div>
    <div id="c_out"></div>`;

  bindInputs(el, () => {
    const P = num("c_init") || 0, m = num("c_month") || 0, r = num("c_rate") / 100, y = Math.min(80, Math.max(1, Math.round(num("c_years")))), fee = (num("c_fee") || 0) / 100;
    const sim = (rate) => {
      let v = P; const pts = [v];
      for (let i = 1; i <= y; i++) {
        for (let k = 0; k < 12; k++) v = v * Math.pow(1 + rate, 1 / 12) + m;
        pts.push(v);
      }
      return pts;
    };
    const a = sim(r - fee), noFee = sim(r), hiFee = sim(r - 0.015);
    const deposits = P + m * 12 * y;
    const final = a[y];
    const W = 800, H = 260, pad = 40;
    const max = Math.max(...noFee);
    const X = i => pad + i / y * (W - pad * 1.5), Y = v => H - 24 - v / max * (H - 44);
    const line = (pts, color) => `<polyline fill="none" stroke="${color}" stroke-width="2.5" points="${pts.map((v, i) => X(i) + "," + Y(v)).join(" ")}"/>`;
    const depLine = Array.from({ length: y + 1 }, (_, i) => P + m * 12 * i);
    $("#c_out").innerHTML = `
      <div class="result">
        <div class="kv">
          <div><div class="k">שווי סופי</div><div class="v big">${fmt(final)}</div></div>
          <div><div class="k">סך הפקדות</div><div class="v">${fmt(deposits)}</div></div>
          <div><div class="k">רווח מריבית דריבית</div><div class="v good">${fmt(final - deposits)}</div></div>
          <div><div class="k">פי כמה מההפקדות</div><div class="v">${(final / deposits).toFixed(2)}×</div></div>
        </div>
        <div class="sim-canvas-wrap mt"><svg viewBox="0 0 ${W} ${H}" style="width:100%">
          ${[0, 0.25, 0.5, 0.75, 1].map(f => `<line x1="${pad}" x2="${W - pad / 2}" y1="${Y(max * f)}" y2="${Y(max * f)}" style="stroke:var(--line)"/><text x="${pad - 4}" y="${Y(max * f) + 4}" style="fill:var(--muted)" font-size="10" text-anchor="end">${fmt(max * f / 1000)}K</text>`).join("")}
          ${line(depLine, "#9aa8c3")}${line(hiFee, "#ff6b6b")}${line(a, "#f2c14e")}
          ${[0, Math.round(y / 2), y].map(i => `<text x="${X(i)}" y="${H - 6}" style="fill:var(--muted)" font-size="11" text-anchor="middle">שנה ${i}</text>`).join("")}
        </svg>
        <div class="legend"><span><i style="background:#f2c14e"></i>התיק שלך (אחרי ${pct(fee, 2)} עלויות)</span><span><i style="background:#ff6b6b"></i>עם דמי ניהול 1.5%</span><span><i style="background:#9aa8c3"></i>סך ההפקדות</span></div></div>
        <p class="mt">💸 ההבדל בין העלויות שלך לדמי ניהול של 1.5%: <b class="bad">${fmt(a[y] - hiFee[y])}</b> לאורך ${y} שנה.
        ${y >= 20 ? `<br>⏳ אם תתחיל 10 שנים מאוחר יותר (${y - 10} שנים בלבד), תסיים עם <b>${fmt(a[y - 10])}</b> — כ-${pct(1 - a[y - 10] / a[y], 0)} פחות.` : ""}</p>
      </div>`;
  });
};

// =================== SWING SIMULATOR ===================
const Sim = { candles: [], visible: 120, future: 40, plan: null, revealed: false };

function genCandles(n) {
  const out = [];
  let price = 20 + Math.random() * 180;
  let drift = 0, vol = 0.018, left = 0;
  const regimes = [-0.003, -0.001, 0, 0.0015, 0.003, 0.004];
  for (let i = 0; i < n; i++) {
    if (left-- <= 0) { drift = regimes[Math.floor(Math.random() * regimes.length)]; vol = 0.01 + Math.random() * 0.022; left = 15 + Math.floor(Math.random() * 40); }
    const o = price * (1 + (Math.random() - 0.5) * vol * 0.6);
    const c = o * (1 + drift + (Math.random() - 0.5) * 2 * vol);
    const h = Math.max(o, c) * (1 + Math.random() * vol * 0.8);
    const l = Math.min(o, c) * (1 - Math.random() * vol * 0.8);
    const v = Math.round((0.6 + Math.random()) * 1e6 * (1 + Math.abs(c - o) / o * 40));
    out.push({ o, h, l, c, v });
    price = c;
  }
  return out;
}
const sma = (arr, n, i) => i + 1 < n ? NaN : arr.slice(i + 1 - n, i + 1).reduce((s, x) => s + x.c, 0) / n;
function atrAt(arr, i, n = 14) {
  let s = 0, k = 0;
  for (let j = Math.max(1, i - n + 1); j <= i; j++) { const a = arr[j], p = arr[j - 1]; s += Math.max(a.h - a.l, Math.abs(a.h - p.c), Math.abs(a.l - p.c)); k++; }
  return s / k;
}

Routes.simulator = function () {
  const st = State.data.sim || { n: 0, R: 0, wins: 0 };
  app().innerHTML = `
    <h1>🎯 סימולטור סווינג</h1>
    <p class="muted">גרף אקראי של 120 ימי מסחר. נתח את המגמה, החלט אם להיכנס ללונג, קבע סטופ ויעד — וראה מה קרה ב-40 הימים הבאים.
    <b>המטרה היא לא לנחש</b> — אלא לתרגל ניהול סיכונים: לזהות מגמה, לקבוע סטופ הגיוני ולשמור על יחס סיכוי-סיכון טוב. בטווח ארוך, תוחלת חיובית מנצחת.</p>
    <div class="grid grid-3 mb">
      <div class="card stat"><div class="num">${st.n}</div><div class="lbl">עסקאות בסימולטור</div></div>
      <div class="card stat"><div class="num ${st.R >= 0 ? "good" : "bad"}">${st.R >= 0 ? "+" : ""}${st.R.toFixed(1)}R</div><div class="lbl">סך הכול R</div></div>
      <div class="card stat"><div class="num">${st.n ? pct(st.wins / st.n, 0) : "—"}</div><div class="lbl">אחוז הצלחה</div></div>
    </div>
    <div class="card">
      <div class="sim-canvas-wrap"><canvas id="simCanvas" height="460" role="img" aria-label="גרף נרות של מניה אקראית עם ממוצעים נעים 20 ו-50, נפח מסחר, וקווי כניסה, סטופ ויעד"></canvas>
        <div class="legend"><span><i style="background:#5aa9ff"></i>ממוצע 20</span><span><i style="background:#a78bfa"></i>ממוצע 50</span><span><i style="background:#2ecc8f"></i>יעד</span><span><i style="background:#ff6b6b"></i>סטופ</span></div>
      </div>
      <div id="simInfo" class="mt"></div>
      <div class="form mt" id="simForm">
        ${field("s_stop", "סטופ לוס", 0)}
        ${field("s_target", "יעד", 0)}
      </div>
      <div class="row mt" id="simBtns">
        <button class="btn green" id="simLong">📈 נכנס ללונג</button>
        <button class="btn ghost" id="simSkip">⏭ לא נכנס (דלג)</button>
        <span class="spacer"></span>
        <button class="btn ghost" id="simNew">🔄 גרף חדש</button>
      </div>
      <div id="simResult"></div>
    </div>`;
  newSim();
  $("#simNew").onclick = newSim;
  $("#simLong").onclick = () => runSim(true);
  $("#simSkip").onclick = () => runSim(false);
  ["s_stop", "s_target"].forEach(id => $("#" + id).addEventListener("input", () => { Sim.plan = readPlan(); drawSim(); updateSimInfo(); }));
  window.onresize = () => { if (location.hash.includes("simulator")) drawSim(); };
};

function readPlan() {
  const C = Sim.candles, i = Sim.visible - 1;
  return { entry: C[i].c, stop: num("s_stop"), target: num("s_target") };
}

function newSim() {
  Sim.candles = genCandles(Sim.visible + Sim.future);
  Sim.revealed = false;
  const C = Sim.candles, i = Sim.visible - 1, e = C[i].c, atr = atrAt(C, i);
  $("#s_stop").value = (e - 2 * atr).toFixed(2);
  $("#s_target").value = (e + 5 * atr).toFixed(2);
  Sim.plan = readPlan();
  $("#simResult").innerHTML = "";
  $("#simLong").disabled = $("#simSkip").disabled = false;
  drawSim(); updateSimInfo();
}

function trendReport() {
  const C = Sim.candles, i = Sim.visible - 1, c = C[i].c;
  const m20 = sma(C, 20, i), m50 = sma(C, 50, i), m50p = sma(C, 50, i - 10);
  const hi = Math.max(...C.slice(0, Sim.visible).map(x => x.h));
  const checks = [
    [c > m50, "המחיר מעל ממוצע 50"],
    [m20 > m50, "ממוצע 20 מעל ממוצע 50"],
    [m50 > m50p, "ממוצע 50 עולה"],
    [c >= hi * 0.85, "המחיר בטווח 15% מהשיא בגרף"]
  ];
  return { checks, score: checks.filter(x => x[0]).length };
}

function updateSimInfo() {
  const C = Sim.candles, i = Sim.visible - 1, p = Sim.plan, atr = atrAt(C, i);
  const risk = p.entry - p.stop, rr = (p.target - p.entry) / risk;
  $("#simInfo").innerHTML = `
    <div class="kv">
      <div><div class="k">מחיר כניסה (סגירה אחרונה)</div><div class="v">${p.entry.toFixed(2)}</div></div>
      <div><div class="k">ATR (14)</div><div class="v">${atr.toFixed(2)}</div></div>
      <div><div class="k">סיכון (1R)</div><div class="v ${risk > 0 ? "" : "bad"}">${risk > 0 ? risk.toFixed(2) + ` (${pct(risk / p.entry)})` : "הסטופ חייב להיות מתחת לכניסה"}</div></div>
      <div><div class="k">יחס סיכוי-סיכון</div><div class="v ${cls(rr, 2, 1.5)}">${risk > 0 && isFinite(rr) ? rr.toFixed(2) + " : 1" : "—"}</div></div>
    </div>`;
}

function drawSim() {
  const cv = $("#simCanvas"); if (!cv) return;
  const C = Sim.candles, n = Sim.revealed ? C.length : Sim.visible;
  const dpr = window.devicePixelRatio || 1;
  const W = cv.clientWidth, H = 460;
  cv.width = W * dpr; cv.height = H * dpr;
  const g = cv.getContext("2d"); g.scale(dpr, dpr);
  g.clearRect(0, 0, W, H);
  const priceH = 360, volTop = 375, volH = 70, padR = 56;
  const show = C.slice(0, n);
  let lo = Math.min(...show.map(x => x.l)), hi = Math.max(...show.map(x => x.h));
  const p = Sim.plan;
  if (p && p.stop > 0) lo = Math.min(lo, p.stop); if (p && p.target > 0) hi = Math.max(hi, p.target);
  const padP = (hi - lo) * 0.06; lo -= padP; hi += padP;
  const total = C.length;
  const cw = (W - padR - 10) / total;
  const X = i => 10 + i * cw + cw / 2;
  const Y = v => 10 + (hi - v) / (hi - lo) * (priceH - 20);
  const maxV = Math.max(...show.map(x => x.v));

  // grid
  g.strokeStyle = cssVar("--line"); g.fillStyle = cssVar("--muted"); g.font = "11px Heebo, Arial"; g.textAlign = "left";
  for (let k = 0; k <= 5; k++) {
    const v = lo + (hi - lo) * k / 5, y = Y(v);
    g.beginPath(); g.moveTo(10, y); g.lineTo(W - padR, y); g.stroke();
    g.fillText(v.toFixed(2), W - padR + 4, y + 4);
  }
  // future zone
  g.fillStyle = Sim.revealed ? "rgba(242,193,78,0.05)" : "rgba(255,255,255,0.02)";
  g.fillRect(X(Sim.visible) - cw / 2, 0, W - padR - X(Sim.visible) + cw / 2, priceH);
  if (!Sim.revealed) { g.fillStyle = cssVar("--muted"); g.font = "14px Heebo, Arial"; g.textAlign = "center"; g.fillText("❓ העתיד", (X(Sim.visible) + W - padR) / 2, priceH / 2); }

  // candles + volume
  show.forEach((x, i) => {
    const up = x.c >= x.o, col = up ? "#2ecc8f" : "#ff6b6b";
    g.strokeStyle = col; g.fillStyle = col;
    g.beginPath(); g.moveTo(X(i), Y(x.h)); g.lineTo(X(i), Y(x.l)); g.stroke();
    const bw = Math.max(1, cw * 0.65);
    g.fillRect(X(i) - bw / 2, Y(Math.max(x.o, x.c)), bw, Math.max(1, Math.abs(Y(x.o) - Y(x.c))));
    g.globalAlpha = 0.45;
    const vh = x.v / maxV * volH;
    g.fillRect(X(i) - bw / 2, volTop + volH - vh, bw, vh);
    g.globalAlpha = 1;
  });
  // MAs
  [[20, "#5aa9ff"], [50, "#a78bfa"]].forEach(([len, col]) => {
    g.strokeStyle = col; g.lineWidth = 1.8; g.beginPath(); let started = false;
    for (let i = 0; i < n; i++) { const m = sma(C, len, i); if (!isFinite(m)) continue; started ? g.lineTo(X(i), Y(m)) : g.moveTo(X(i), Y(m)); started = true; }
    g.stroke(); g.lineWidth = 1;
  });
  // plan lines
  if (p) {
    const ln = (v, col, label) => { if (!(v > 0)) return; g.strokeStyle = col; g.setLineDash([6, 4]); g.beginPath(); g.moveTo(X(Sim.visible - 1), Y(v)); g.lineTo(W - padR, Y(v)); g.stroke(); g.setLineDash([]); g.fillStyle = col; g.textAlign = "right"; g.fillText(label, W - padR - 4, Y(v) - 4); };
    ln(p.target, "#2ecc8f", "יעד"); ln(p.stop, "#ff6b6b", "סטופ"); ln(p.entry, "#f2c14e", "כניסה");
  }
  // entry marker
  g.strokeStyle = "#f2c14e"; g.beginPath(); g.moveTo(X(Sim.visible - 1) + cw / 2, 0); g.lineTo(X(Sim.visible - 1) + cw / 2, H); g.stroke();
}

function runSim(tookTrade) {
  const p = readPlan();
  if (tookTrade && !(p.stop < p.entry && p.target > p.entry)) { toast("בלונג: הסטופ מתחת לכניסה והיעד מעליה"); return; }
  Sim.plan = p; Sim.revealed = true;
  $("#simLong").disabled = $("#simSkip").disabled = true;
  const C = Sim.candles, risk = p.entry - p.stop;
  let outcome = "time", exit = C[C.length - 1].c, day = Sim.future;
  for (let i = Sim.visible; i < C.length; i++) {
    const x = C[i];
    if (x.o <= p.stop) { outcome = "gap"; exit = x.o; day = i - Sim.visible + 1; break; }
    if (x.l <= p.stop) { outcome = "stop"; exit = p.stop; day = i - Sim.visible + 1; break; }
    if (x.h >= p.target) { outcome = "target"; exit = Math.max(p.target, x.o); day = i - Sim.visible + 1; break; }
  }
  const R = (exit - p.entry) / risk;
  const tr = trendReport();
  const msgs = { stop: "🔴 הסטופ נפגע", gap: "🔴 גאפ מתחת לסטופ — יצאת בפתיחה (מחיר גרוע מהסטופ!)", target: "🟢 היעד הושג!", time: "⏳ הזמן נגמר — יציאה בסגירה האחרונה" };
  if (tookTrade) {
    const st = State.data.sim || { n: 0, R: 0, wins: 0 };
    st.n++; st.R += R; if (R > 0) st.wins++;
    State.data.sim = st; State.save();
  }
  drawSim();
  $("#simResult").innerHTML = `
    <div class="result mt">
      <h3 style="margin-top:0">${tookTrade ? msgs[outcome] : "⏭ דילגת. כך הייתה מתנהלת העסקה לפי התוכנית:"}</h3>
      <p>${tookTrade ? "" : msgs[outcome] + " · "}יציאה ב-<b>${exit.toFixed(2)}</b> אחרי ${day} ימים → <b class="${R > 0 ? "good" : "bad"}">${R >= 0 ? "+" : ""}${R.toFixed(2)}R</b></p>
      <h4>🔍 ניתוח המגמה בנקודת ההחלטה (${tr.score}/4)</h4>
      <ul>${tr.checks.map(c => `<li class="${c[0] ? "good" : "bad"}">${c[0] ? "✔" : "✘"} ${c[1]}</li>`).join("")}</ul>
      <p class="small">${tr.score >= 3
        ? (tookTrade ? "✅ החלטה טובה תהליכית — נכנסת עם המגמה." : "🤔 המגמה הייתה חיובית — זה היה Setup לגיטימי.") + (R < 0 ? " גם עסקאות טובות מפסידות לפעמים — זה בסדר כל עוד ההפסד הוא 1R." : "")
        : (tookTrade ? "⚠️ נכנסת למניה בלי מגמת עלייה ברורה. גם אם הרווחת — זה מזל, לא שיטה." : "✅ החלטה טובה — המגמה לא תמכה בלונג.")}</p>
      <button class="btn" onclick="Routes.simulator()">גרף הבא ←</button>
    </div>`;
}

// =================== BUFFETT CHECKLIST ===================
const CHECKLIST = [
  ["🧩 העסק", [
    ["אני מבין איך החברה מרוויחה כסף ויכול להסביר את זה בשתי דקות", "מעגל הכשירות + הסיפור של לינץ'"],
    ["העסק יהיה רלוונטי וסביר שיהיה גדול יותר בעוד 10 שנים", "עמידות לאורך זמן"],
    ["ללקוחות יש סיבה חזקה לקנות דווקא כאן", "בידול"],
  ]],
  ["🏰 חפיר", [
    ["יש יתרון תחרותי מזוהה (מותג, רשת, עלויות מעבר, עלות, רגולציה)", "סוג החפיר"],
    ["לחברה יש כוח תמחור — יכולה להעלות מחירים בלי לאבד לקוחות", "מבחן העלאת המחיר"],
    ["החפיר מתרחב ולא מצטמצם (נתח שוק יציב/עולה)", "כיוון החפיר"],
  ]],
  ["📊 מספרים (10 שנים)", [
    ["ROIC מעל 15% באופן עקבי", "איכות"],
    ["הכנסות ורווח למניה צומחים באופן עקבי", "צמיחה"],
    ["שולי רווח גולמיים ותפעוליים יציבים או עולים", "כוח תמחור"],
    ["FCF חיובי וקרוב לרווח הנקי (המרה > 80%)", "איכות רווחים"],
    ["מספר המניות יורד או יציב (אין דילול משמעותי)", "רכישות חוזרות / SBC"],
  ]],
  ["🛡️ מאזן", [
    ["חוב נטו קטן מ-3 שנות FCF", "חוזק"],
    ["החברה תשרוד מיתון של שנתיים בלי גיוס הון", "מבחן לחץ"],
  ]],
  ["👔 הנהלה", [
    ["הנהלה ישרה וכנה — מודה בטעויות, מה שהבטיחה התממש", "יושרה"],
    ["היסטוריה טובה של הקצאת הון", "רכישות, דיבידנדים, רכישות חוזרות"],
    ["למנהלים יש החזקה משמעותית ותגמול שמיושר עם בעלי המניות", "Skin in the game"],
  ]],
  ["💰 מחיר", [
    ["המחיר נמוך מהשווי הפנימי במרווח ביטחון מספק", "DCF / Reverse DCF"],
    ["התשואה הצפויה (FCF Yield + צמיחה) מעל 10%", "תשואה צפויה"],
    ["ההשקעה עדיפה על הרעיון הטוב ביותר הנוכחי שלי (עלות אלטרנטיבית)", "מאנגר"],
  ]],
  ["🔄 היפוך", [
    ["כתבתי את טיעון הדובים החזק ביותר — ועדיין משוכנע", "הטיית אישוש"],
    ["הגדרתי מראש מה יוכיח שטעיתי", "תזה כתובה"],
    ["הייתי שמח להחזיק גם אם הבורסה הייתה נסגרת ל-5 שנים", "מבחן באפט"],
  ]]
];

Routes.checklist = function () {
  const saved = State.data.checklist.saved || [];
  const cur = State.data.checklist.cur || { name: "", ans: {}, notes: "" };
  State.data.checklist.cur = cur;
  let qi = 0;
  app().innerHTML = `
    <h1>✅ צ'קליסט באפט — ניתוח חברה</h1>
    <p class="muted">עבור על כל שאלה בכנות. "כן" = 2 נק', "חלקית" = 1, "לא" = 0. השתמש בשיעור "תהליך ניתוח מניה מלא" כמדריך.</p>
    <div class="card">
      <div class="row"><div class="field" style="flex:1;min-width:220px"><label for="ck_name">שם החברה / סימול</label><input id="ck_name" value="${esc(cur.name)}" placeholder="למשל: KO — קוקה-קולה" /></div></div>
      ${CHECKLIST.map(([sec, items]) => `<h3>${sec}</h3>` + items.map(([q, s]) => {
        const k = qi++; const a = cur.ans[k];
        return `<div class="chk"><div class="qs"><b>${q}</b><span>${s}</span></div>
          <div class="seg" data-k="${k}" role="group" aria-label="${esc(q)}">
            <button type="button" data-v="2" aria-pressed="${a === 2}" class="${a === 2 ? "on-yes" : ""}">כן</button>
            <button type="button" data-v="1" aria-pressed="${a === 1}" class="${a === 1 ? "on-mid" : ""}">חלקית</button>
            <button type="button" data-v="0" aria-pressed="${a === 0}" class="${a === 0 ? "on-no" : ""}">לא</button>
          </div></div>`;
      }).join("")).join("")}
      <div class="field mt"><label for="ck_notes">הערות ותזה</label><textarea id="ck_notes" rows="4" placeholder="למה העסק מצוין? מה המחיר מפספס? מה יוכיח שטעיתי?">${esc(cur.notes)}</textarea></div>
      <div id="ck_out"></div>
      <div class="row mt">
        <button class="btn" id="ck_save">💾 שמור ניתוח</button>
        <button class="btn ghost" id="ck_new">ניתוח חדש</button>
      </div>
    </div>
    ${saved.length ? `<h2 class="mt">ניתוחים שמורים</h2>
      <div class="card"><table class="data"><tr><th>חברה</th><th>ציון</th><th>תאריך</th><th></th></tr>
      ${saved.map((s, i) => `<tr><td>${esc(s.name)}</td><td class="${s.score >= 80 ? "good" : s.score >= 60 ? "mid" : "bad"}">${s.score}%</td><td>${esc(s.date)}</td>
        <td><button class="btn ghost small" onclick="loadCheck(${i})">פתח</button> <button class="btn ghost small" onclick="delCheck(${i})">🗑</button></td></tr>`).join("")}
      </table></div>` : ""}`;

  const total = qi;
  const score = () => {
    const vals = Object.values(cur.ans);
    const s = vals.reduce((a, b) => a + b, 0);
    return { pctv: Math.round(s / (total * 2) * 100), answered: vals.length };
  };
  const drawOut = () => {
    const { pctv, answered } = score();
    const verdict = answered < total ? ["muted", `ענית על ${answered} מתוך ${total} שאלות.`]
      : pctv >= 80 ? ["good", "🏆 מועמד חזק בסגנון באפט. וודא שהמחיר באמת מספק מרווח ביטחון, והחלט על גודל פוזיציה."]
      : pctv >= 60 ? ["mid", "👀 עסק מעניין עם חולשות. רשימת מעקב — חכה למחיר טוב יותר או לבהירות."]
      : ["bad", "🚫 לא עומד בסטנדרט. 'אין עונש על חבטה שלא הונפה' — המשך הלאה."];
    $("#ck_out").innerHTML = `<div class="result mt"><div class="row"><div class="big">${pctv}%</div><div class="spacer"></div></div>
      <div class="progress mt"><div style="width:${pctv}%"></div></div><p class="mt ${verdict[0]}"><b>${verdict[1]}</b></p></div>`;
  };
  $$(".seg").forEach(seg => seg.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const k = +seg.dataset.k, v = +b.dataset.v;
    cur.ans[k] = v;
    $$("button", seg).forEach(x => { x.className = ""; x.setAttribute("aria-pressed", "false"); });
    b.className = v === 2 ? "on-yes" : v === 1 ? "on-mid" : "on-no";
    b.setAttribute("aria-pressed", "true");
    State.save(); drawOut();
  }));
  $("#ck_name").addEventListener("input", e => { cur.name = e.target.value; State.save(); });
  $("#ck_notes").addEventListener("input", e => { cur.notes = e.target.value; State.save(); });
  $("#ck_save").onclick = () => {
    if (!cur.name.trim()) return toast("הכנס שם חברה");
    const list = State.data.checklist.saved = State.data.checklist.saved || [];
    const entry = { name: cur.name, ans: Object.assign({}, cur.ans), notes: cur.notes, score: score().pctv, date: new Date().toLocaleDateString("he-IL") };
    const ex = list.findIndex(s => s.name === cur.name);
    ex >= 0 ? list[ex] = entry : list.unshift(entry);
    State.save(); toast("הניתוח נשמר"); Routes.checklist();
  };
  $("#ck_new").onclick = () => { State.data.checklist.cur = { name: "", ans: {}, notes: "" }; State.save(); Routes.checklist(); };
  drawOut();
};
function loadCheck(i) { const s = State.data.checklist.saved[i]; State.data.checklist.cur = { name: s.name, ans: Object.assign({}, s.ans), notes: s.notes }; State.save(); Routes.checklist(); }
function delCheck(i) { if (!confirm("למחוק את הניתוח?")) return; State.data.checklist.saved.splice(i, 1); State.save(); Routes.checklist(); }

// =================== TRADE JOURNAL ===================
const SETUPS = ["פריצה מבסיס", "דגל שורי", "תיקון לממוצע", "VCP", "Retest של פריצה", "Gap אחרי דוח", "השקעת ערך ארוכה", "אחר"];

Routes.journal = function () {
  const J = State.data.journal;
  const closed = J.filter(t => Number.isFinite(t.R));
  const wins = closed.filter(t => t.R > 0), losses = closed.filter(t => t.R <= 0);
  const avgW = wins.length ? wins.reduce((s, t) => s + t.R, 0) / wins.length : 0;
  const avgL = losses.length ? -losses.reduce((s, t) => s + t.R, 0) / losses.length : 0;
  const wr = closed.length ? wins.length / closed.length : 0;
  const E = wr * avgW - (1 - wr) * avgL;
  const pnl = closed.reduce((s, t) => s + t.pnl, 0);
  const followed = closed.length ? closed.filter(t => t.plan === "yes").length / closed.length : 0;
  const bySetup = {};
  closed.forEach(t => { const b = bySetup[t.setup] = bySetup[t.setup] || { n: 0, R: 0, w: 0 }; b.n++; b.R += t.R; if (t.R > 0) b.w++; });
  const rPlan = closed.filter(t => t.plan === "yes").reduce((s, t) => s + t.R, 0);
  const rNoPlan = closed.filter(t => t.plan === "no").reduce((s, t) => s + t.R, 0);
  const today = new Date().toISOString().slice(0, 10);

  app().innerHTML = `
    <h1>📓 יומן מסחר</h1>
    <p class="muted">תעד כל עסקה — אמיתית או בדמו. אחרי 30-50 עסקאות הנתונים יגלו לך את האמת על השיטה שלך. הנתונים נשמרים רק בדפדפן הזה.</p>
    <div class="grid grid-3 mb">
      <div class="card stat"><div class="num">${closed.length}</div><div class="lbl">עסקאות סגורות</div></div>
      <div class="card stat"><div class="num">${closed.length ? pct(wr, 0) : "—"}</div><div class="lbl">אחוז הצלחה</div></div>
      <div class="card stat"><div class="num ${E > 0 ? "good" : E < 0 ? "bad" : ""}">${closed.length ? (E >= 0 ? "+" : "") + E.toFixed(2) + "R" : "—"}</div><div class="lbl">תוחלת לעסקה</div></div>
      <div class="card stat"><div class="num">${closed.length ? avgW.toFixed(2) + " / " + avgL.toFixed(2) : "—"}</div><div class="lbl">רווח ממוצע / הפסד ממוצע (R)</div></div>
      <div class="card stat"><div class="num ${pnl >= 0 ? "good" : "bad"}">${fmt(pnl)}</div><div class="lbl">רווח/הפסד כולל</div></div>
      <div class="card stat"><div class="num ${followed >= 0.9 ? "good" : "mid"}">${closed.length ? pct(followed, 0) : "—"}</div><div class="lbl">עקבתי אחרי התוכנית</div></div>
    </div>
    ${closed.length >= 3 ? `<div class="card mb"><h3 style="margin-top:0">🔍 תובנות</h3><ul>
      <li>עסקאות לפי התוכנית: <b class="${rPlan >= 0 ? "good" : "bad"}">${rPlan.toFixed(1)}R</b> · עסקאות ששברו את התוכנית: <b class="${rNoPlan >= 0 ? "good" : "bad"}">${rNoPlan.toFixed(1)}R</b></li>
      ${Object.entries(bySetup).sort((a, b) => b[1].R - a[1].R).map(([k, b]) => `<li>${esc(k)}: ${b.n} עסקאות, ${pct(b.w / b.n, 0)} הצלחה, <b class="${b.R >= 0 ? "good" : "bad"}">${b.R >= 0 ? "+" : ""}${b.R.toFixed(1)}R</b></li>`).join("")}
      ${closed.length < 30 ? `<li class="muted">המדגם עדיין קטן (${closed.length}). מסקנות אמינות יותר אחרי 30+ עסקאות.</li>` : ""}
    </ul></div>` : ""}
    <div class="card mb">
      <h2>➕ עסקה חדשה</h2>
      <div class="form">
        <div class="field"><label for="j_date">תאריך</label><input id="j_date" type="date" value="${today}"/></div>
        <div class="field"><label for="j_tk">סימול</label><input id="j_tk" placeholder="AAPL"/></div>
        <div class="field"><label for="j_setup">Setup</label><select id="j_setup">${SETUPS.map(s => `<option>${s}</option>`).join("")}</select></div>
        <div class="field"><label for="j_dir">כיוון</label><select id="j_dir"><option value="long">לונג</option><option value="short">שורט</option></select></div>
        ${field("j_entry", "כניסה", "")}
        ${field("j_stop", "סטופ התחלתי", "")}
        ${field("j_target", "יעד", "")}
        ${field("j_qty", "כמות", "")}
        ${field("j_exit", "מחיר יציאה", "", "השאר ריק אם העסקה פתוחה")}
        <div class="field"><label for="j_plan">עקבתי אחרי התוכנית?</label><select id="j_plan"><option value="yes">כן</option><option value="no">לא</option></select></div>
      </div>
      <div class="field mt"><label for="j_notes">למה נכנסתי / מה למדתי / מה הרגשתי</label><textarea id="j_notes" rows="2"></textarea></div>
      <div class="row mt"><button class="btn" id="j_add">הוסף ליומן</button><span class="spacer"></span>
        ${J.length ? `<button class="btn ghost" id="j_csv">⬇ ייצוא CSV</button>` : ""}</div>
    </div>
    ${J.length ? `<div class="card" style="overflow-x:auto"><table class="data">
      <tr><th>תאריך</th><th>סימול</th><th>Setup</th><th>כיוון</th><th>כניסה</th><th>סטופ</th><th>יציאה</th><th>R</th><th>רווח/הפסד</th><th>תוכנית</th><th></th></tr>
      ${J.map((t, i) => `<tr title="${esc(t.notes)}">
        <td>${esc(t.date)}</td><td><b>${esc(t.tk)}</b></td><td>${esc(t.setup)}</td><td>${t.dir === "long" ? "לונג" : "שורט"}</td>
        <td>${t.entry}</td><td>${t.stop}</td><td>${Number.isFinite(t.exit) ? t.exit : `<button class="btn ghost small" onclick="closeTrade(${i})">סגור</button>`}</td>
        <td class="${t.R > 0 ? "good" : t.R < 0 ? "bad" : ""}">${Number.isFinite(t.R) ? (t.R >= 0 ? "+" : "") + t.R.toFixed(2) : "פתוחה"}</td>
        <td class="${t.pnl > 0 ? "good" : t.pnl < 0 ? "bad" : ""}">${Number.isFinite(t.R) ? fmt(t.pnl) : "—"}</td>
        <td>${t.plan === "yes" ? "✅" : "❌"}</td>
        <td><button class="btn ghost small" onclick="delTrade(${i})">🗑</button></td></tr>`).join("")}
    </table></div>` : ""}`;

  $("#j_add").onclick = () => {
    const t = { date: $("#j_date").value, tk: $("#j_tk").value.trim().toUpperCase(), setup: $("#j_setup").value, dir: $("#j_dir").value,
      entry: num("j_entry"), stop: num("j_stop"), target: num("j_target"), qty: num("j_qty"), exit: num("j_exit"), plan: $("#j_plan").value, notes: $("#j_notes").value };
    if (!t.tk || !Number.isFinite(t.entry) || !Number.isFinite(t.stop) || !Number.isFinite(t.qty) || t.entry === t.stop) return toast("מלא סימול, כניסה, סטופ (שונה מהכניסה) וכמות");
    calcTrade(t);
    State.data.journal.unshift(t); State.save(); toast("העסקה נוספה"); Routes.journal();
  };
  const csv = $("#j_csv");
  if (csv) csv.onclick = () => {
    const head = ["date", "ticker", "setup", "dir", "entry", "stop", "target", "qty", "exit", "R", "pnl", "followed_plan", "notes"];
    const rows = J.map(t => [t.date, t.tk, t.setup, t.dir, t.entry, t.stop, t.target, t.qty, t.exit, t.R, t.pnl, t.plan, t.notes].map(v => `"${String(v ?? "").replace(/"/g, '""')}"`).join(","));
    const blob = new Blob(["﻿" + head.join(",") + "\n" + rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "trade-journal.csv"; a.click();
  };
};
function calcTrade(t) {
  const sign = t.dir === "long" ? 1 : -1;
  if (Number.isFinite(t.exit)) {
    t.R = sign * (t.exit - t.entry) / Math.abs(t.entry - t.stop);
    t.pnl = sign * (t.exit - t.entry) * t.qty;
  } else { t.R = NaN; t.pnl = NaN; }
}
function closeTrade(i) {
  const v = parseFloat(prompt("מחיר יציאה:"));
  if (!isFinite(v)) return;
  const t = State.data.journal[i]; t.exit = v; calcTrade(t); State.save(); Routes.journal();
}
function delTrade(i) { if (!confirm("למחוק את העסקה?")) return; State.data.journal.splice(i, 1); State.save(); Routes.journal(); }
