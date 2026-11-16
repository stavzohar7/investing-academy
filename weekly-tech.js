// ===================================================================
//  לשוניות הניתוח השבועי: סקירה · פונדמנטלי · טכני · משולב
//  כאן: חישובי הניתוח הטכני, הכרטיסים והמטריצה המשולבת
// ===================================================================

const WEEK_TABS = [
  ["overview", "🏠 סקירה", "מצב השוק ותמונה כללית"],
  ["fundamental", "🏢 פונדמנטלי", "מה העסק שווה — ומה המחיר מניח"],
  ["technical", "📉 טכני", "מגמה, ממוצעים, תנודתיות וסיכון"],
  ["combined", "🧩 משולב", "מתי שתי העדשות מסכימות — ומתי לא"]
];

// ---------- חישובים טכניים ----------
function techDerive(t) {
  const sma20 = t.price / (1 + t.d20 / 100), sma50 = t.price / (1 + t.d50 / 100), sma200 = t.price / (1 + t.d200 / 100);
  const atrPct = t.atr / t.price * 100, stopPct = 2 * atrPct;
  return { sma20, sma50, sma200, atrPct, stopPct, posPct: 100 / stopPct, hiDist: (t.price / t.hi - 1) * 100, loDist: (t.price / t.lo - 1) * 100 };
}
// הגדרת שלב לפי מיקום המחיר מול ה-50 וה-200 ויחס ה-50 ל-200
function techStage(t) {
  const d = techDerive(t), a50 = t.d50 > 0, a200 = t.d200 > 0, up = d.sma50 > d.sma200;
  if (a50 && a200 && up) return { key: "2", label: "שלב 2 · עלייה", tone: "good", hint: "מעל ה-50 וה-200, וה-50 מעל ה-200" };
  if (a50 && a200) return { key: "1-2", label: "מעבר 1→2", tone: "mid", hint: "מעל שניהם, אך ה-50 עדיין מתחת ל-200" };
  if (!a50 && !a200) return up ? { key: "3-4", label: "שבירה 3→4", tone: "bad", hint: "מתחת לשניהם, אבל ה-50 עוד מעל ה-200" } : { key: "4", label: "שלב 4 · ירידה", tone: "bad", hint: "מתחת ל-50 ול-200, וה-50 מתחת ל-200" };
  if (!a50) return { key: "3", label: "שלב 3 · היחלשות", tone: "mid", hint: "מתחת ל-50 אבל מעל ה-200" };
  return { key: "1", label: "שלב 1 · בסיס", tone: "mid", hint: "מעל ה-50 אבל מתחת ל-200" };
}
function techFill(txt, d) {
  return (txt || "").replace(/\{sma20\}/g, fmt(d.sma20, 1)).replace(/\{sma50\}/g, fmt(d.sma50, 1)).replace(/\{sma200\}/g, fmt(d.sma200, 1));
}
// התאמה בין העדשות: tone של הפונדמנטלי מול tone של הטכני
function lensAgree(fTone, tTone) {
  const s = x => x === "good" ? 1 : x === "bad" ? -1 : 0, f = s(fTone), t = s(tTone);
  if (f * t === -1) return { cls: "bad", icon: "⚡", label: "סותרים" };
  if (f === 1 && t === 1) return { cls: "good", icon: "✅", label: "מסכימים — חיובי" };
  if (f === -1 && t === -1) return { cls: "mid", icon: "✅", label: "מסכימים — זהירות" };
  if (f + t > 0) return { cls: "good", icon: "↗", label: "נוטים לחיובי" };
  if (f + t < 0) return { cls: "mid", icon: "↘", label: "נוטים לזהירות" };
  return { cls: "mid", icon: "↔", label: "ניטרלי" };
}

const pc = (v, d = 1) => v == null ? "—" : `<span class="${v >= 0 ? "good" : "bad"}" dir="ltr">${v >= 0 ? "+" : ""}${v.toFixed(d)}%</span>`;

// ---------- רכיבים ויזואליים ----------
function rangeBar(t, d) {
  const lo = t.lo, hi = t.hi, X = v => Math.max(0, Math.min(100, (v - lo) / (hi - lo) * 100)).toFixed(1);
  return `
  <div class="rbar" dir="ltr" role="img" aria-label="טווח 52 שבועות: שפל ${t.lo}, שיא ${t.hi}. המחיר ${t.price}. ממוצע 20: ${fmt(d.sma20, 1)}, ממוצע 50: ${fmt(d.sma50, 1)}, ממוצע 200: ${fmt(d.sma200, 1)}">
    <div class="rbar-track"></div>
    <span class="rbar-pin p20" style="left:${X(d.sma20)}%"></span>
    <span class="rbar-pin p50" style="left:${X(d.sma50)}%"></span>
    <span class="rbar-pin p200" style="left:${X(d.sma200)}%"></span>
    <span class="rbar-pin pp" style="left:${X(t.price)}%"><i>$${t.price.toFixed(2)}</i></span>
    <span class="rbar-end l">שפל שנתי<br>$${t.lo}</span><span class="rbar-end r">שיא שנתי<br>$${t.hi}</span>
  </div>
  <div class="rbar-legend small muted"><span><i class="lg p20"></i>ממוצע 20</span><span><i class="lg p50"></i>ממוצע 50</span><span><i class="lg p200"></i>ממוצע 200</span><span><i class="lg pp"></i>מחיר</span></div>`;
}
function rsiBar(rsi) {
  if (rsi == null) return `<div class="small muted">RSI: נתון המקור נראה שגוי — לא מוצג.</div>`;
  const zone = rsi < 30 ? ["bad", "מכור יתר"] : rsi > 70 ? ["mid", "קנוי יתר"] : ["good", "אזור נייטרלי"];
  return `<div class="rsi" dir="ltr" role="img" aria-label="RSI ${rsi}: ${zone[1]}"><div class="rsi-track"><span class="rsi-pin" style="left:${rsi}%"></span></div>
    <div class="rsi-scale"><span>0</span><span>30</span><span>70</span><span>100</span></div></div>
    <div class="small">RSI <b dir="ltr">${rsi}</b> · <span class="${zone[0]}">${zone[1]}</span></div>`;
}

function techCard(f, t, repId) {
  const d = techDerive(t), st = techStage(t);
  const perf = [["שבוע", t.perfW], ["חודש", t.perfM], ["רבעון", t.perfQ], ["חצי שנה", t.perfH], ["שנה", t.perfY]];
  const risk = `סטופ של 2×ATR = <b>${d.stopPct.toFixed(1)}%</b> מהמחיר (≈ $${(2 * t.atr).toFixed(2)}). כדי לסכן 1% מהתיק, הגודל המרבי הוא <b>${d.posPct.toFixed(1)}%</b> מהתיק${d.posPct < 8 ? " — תנודתיות גבוהה מחייבת פוזיציה קטנה" : ""}.`;
  return `
  <article class="stock card tech-card" id="tk-${f.ticker}" aria-labelledby="th-${f.ticker}">
    <header class="stock-head">
      <div class="ticker" lang="en">${f.ticker}</div>
      <div class="stock-title"><h3 id="th-${f.ticker}">${esc(f.he)} <span class="muted small" lang="en">${esc(f.name)}</span></h3>
        <div class="small muted">${esc(f.sector)}</div></div>
      <div class="stock-price"><div class="big" dir="ltr">$${t.price.toFixed(2)}</div><div class="small muted">סגירה 13.11</div></div>
    </header>
    <div class="row mt"><span class="stage st-${st.key}" title="${st.hint}">${st.label}</span><span class="small muted">${st.hint}</span></div>
    <div class="kv">
      <div><div class="k">מול ממוצע 20</div><div class="v">${pc(t.d20)}</div></div>
      <div><div class="k">מול ממוצע 50</div><div class="v">${pc(t.d50)}</div></div>
      <div><div class="k">מול ממוצע 200</div><div class="v">${pc(t.d200)}</div></div>
      <div><div class="k">מהשיא השנתי</div><div class="v">${pc(d.hiDist)}</div></div>
      <div><div class="k">תנודתיות (ATR)</div><div class="v ${d.atrPct > 6 ? "bad" : d.atrPct > 3.5 ? "mid" : "good"}">${d.atrPct.toFixed(1)}%</div></div>
    </div>
    ${rangeBar(t, d)}
    ${rsiBar(t.rsi)}
    <div class="perf-row mt" role="list" aria-label="ביצועים">${perf.map(p => `<span class="perf" role="listitem"><span class="small muted">${p[0]}</span>${pc(p[1])}</span>`).join("")}</div>
    <section class="mt"><h4>👁️ מה הגרף אומר</h4><p>${techFill(t.read, d)}</p></section>
    <section><h4>🎯 מה לעקוב אחריו</h4><ul>${t.watch.map(w => `<li>${techFill(w, d)}</li>`).join("")}</ul></section>
    <section class="riskbox"><h4>🛡️ סיכון בכסף (תרגיל מספרי)</h4><p>${risk}</p></section>
    <p class="small"><a href="#weekly/${repId}/fundamental/${f.ticker}">🏢 הניתוח הפונדמנטלי של ${f.ticker}</a> · ${t.learn.map(id => `<a href="#lesson/${id}">${esc(lessonTitle(id))}</a>`).join(" · ")}</p>
  </article>`;
}

// ---------- לשונית: טכני ----------
function techTab(rep, id) {
  const T = rep.technical;
  if (!T) return `<div class="card"><p class="muted">לדוח הזה אין עדיין ניתוח טכני.</p></div>`;
  const all = rep.sections.flatMap(s => s.stocks);
  const rows = all.map(f => ({ f, t: T.stocks[f.ticker], st: techStage(T.stocks[f.ticker]) }));
  const order = { "2": 0, "1-2": 1, "1": 2, "3": 3, "3-4": 4, "4": 5 };
  const sorted = [...rows].sort((a, b) => order[a.st.key] - order[b.st.key]);
  const below50 = rows.filter(r => r.t.d50 < 0).length, above200 = rows.filter(r => r.t.d200 > 0).length;
  return `
    <section class="card mb" aria-labelledby="tmk">
      <h2 id="tmk">🧭 תמונת השוק הטכנית ${T.market.stance}</h2>
      <p><b>${esc(T.market.stanceLabel)}</b></p>
      <div class="lesson-body">${T.market.summary}</div>
    </section>

    <section class="card mb" aria-labelledby="tst">
      <h2 id="tst">📊 מי בכל שלב</h2>
      <p class="muted small"><b>${below50} מתוך ${rows.length}</b> המניות מתחת לממוצע 50, ורק <b>${above200}</b> מעל ה-200. הגדרות השלבים — בשיעור <a href="#lesson/l4-7">כרטיס טכני בשבע בדיקות</a>.</p>
      <div style="overflow-x:auto"><table class="data">
        <caption class="sr-only">שלב טכני לכל מניה</caption>
        <tr><th scope="col">מניה</th><th scope="col">שלב</th><th scope="col">מול 50</th><th scope="col">מול 200</th><th scope="col">חודש</th><th scope="col">ATR</th></tr>
        ${sorted.map(r => `<tr><td><a href="#weekly/${id}/technical/${r.f.ticker}"><b lang="en">${r.f.ticker}</b> ${esc(r.f.he)}</a></td>
          <td><span class="stage st-${r.st.key}">${r.st.label}</span></td><td>${pc(r.t.d50)}</td><td>${pc(r.t.d200)}</td><td>${pc(r.t.perfM)}</td><td dir="ltr" style="text-align:right">${(r.t.atr / r.t.price * 100).toFixed(1)}%</td></tr>`).join("")}
      </table></div>
    </section>

    ${rep.sections.map(sec => `<section class="mb" aria-labelledby="ts-${sec.id}"><h2 id="ts-${sec.id}">${sec.title}</h2>
      ${sec.stocks.map(f => techCard(f, T.stocks[f.ticker], id)).join("")}</section>`).join("")}

    <section class="card mb" aria-labelledby="tlm"><h2 id="tlm">⚠️ מגבלות</h2><ul class="small">${T.limits.map(l => `<li>${l}</li>`).join("")}</ul>
      <p class="small muted">${T.asOf}</p></section>`;
}

// ---------- לשונית: משולב ----------
function combinedTab(rep, id) {
  const T = rep.technical;
  if (!T) return `<div class="card"><p class="muted">לדוח הזה אין עדיין ניתוח טכני, ולכן אין שילוב.</p></div>`;
  const all = rep.sections.flatMap(s => s.stocks);
  const rows = all.map(f => { const t = T.stocks[f.ticker], st = techStage(t); return { f, t, st, ag: lensAgree(f.verdict.tone, st.tone) }; });
  const conflicts = rows.filter(r => r.ag.label === "סותרים");
  return `
    <section class="card mb"><h2>🧩 למה לשלב</h2>
      <p>הפונדמנטלי עונה על <b>"מה העסק שווה"</b>; הטכני על <b>"מה השוק עושה עכשיו"</b>. כשהם מסכימים — התמונה ברורה. כשהם סותרים — זה בדיוק המקום ללמוד. (שיעור: <a href="#lesson/l7-9">שתי עדשות על אותה מניה</a>.)</p>
      <p class="small muted">ההתאמה מחושבת כך: הערכת המחיר מול השווי (🟢🟡🔴 מהלשונית הפונדמנטלית) מול השלב הטכני (עלייה / ניטרלי / ירידה). זה תרגיל לימודי, לא איתות.</p></section>

    <section class="card mb" aria-labelledby="cmt"><h2 id="cmt">מטריצה: שתי העדשות זו לצד זו</h2>
      <div style="overflow-x:auto"><table class="data">
        <caption class="sr-only">השוואה בין הערכה פונדמנטלית לשלב טכני</caption>
        <tr><th scope="col">מניה</th><th scope="col">🏢 פונדמנטלי</th><th scope="col">📉 טכני</th><th scope="col">התאמה</th></tr>
        ${rows.map(r => `<tr><td><b lang="en">${r.f.ticker}</b> ${esc(r.f.he)}</td>
          <td><span class="${TONE[r.f.verdict.tone]}">${TONE_ICON[r.f.verdict.tone]} ${r.f.verdict.label}</span></td>
          <td><span class="stage st-${r.st.key}">${r.st.label}</span></td>
          <td><b class="${r.ag.cls}">${r.ag.icon} ${r.ag.label}</b></td></tr>`).join("")}
      </table></div>
      ${conflicts.length ? `<p class="mt">⚡ <b>העדשות סותרות ב-${conflicts.length} מניות</b> (${conflicts.map(r => r.f.ticker).join(", ")}) — כאן יש הכי הרבה מה ללמוד.</p>` : ""}
    </section>

    <h2>המסקנה המשולבת לכל מניה</h2>
    ${rows.map(r => `
      <article class="card mb comb-card" id="cb-${r.f.ticker}">
        <div class="row"><span class="ticker" lang="en">${r.f.ticker}</span><b>${esc(r.f.he)}</b><span class="spacer"></span><b class="${r.ag.cls}">${r.ag.icon} ${r.ag.label}</b></div>
        <div class="row small mt"><span class="${TONE[r.f.verdict.tone]}">🏢 ${TONE_ICON[r.f.verdict.tone]} ${r.f.verdict.label}</span><span class="stage st-${r.st.key}">📉 ${r.st.label}</span></div>
        <p class="mt">${r.t.combined}</p>
        <p class="small"><a href="#weekly/${id}/fundamental/${r.f.ticker}">פונדמנטלי ←</a> · <a href="#weekly/${id}/technical/${r.f.ticker}">טכני ←</a></p>
      </article>`).join("")}
    <p class="small muted">הערה: הערכת השווי מבוססת על מחירי 12.11, והנתונים הטכניים על סגירת 13.11 — שני תאריכים סמוכים אך לא זהים.</p>`;
}

// ---------- לשונית: סקירה ----------
function overviewTab(rep, id) {
  const m = rep.market, T = rep.technical;
  let glance = "";
  if (T) {
    const all = rep.sections.flatMap(s => s.stocks);
    const rows = all.map(f => { const t = T.stocks[f.ticker], st = techStage(t); return { f, st, ag: lensAgree(f.verdict.tone, st.tone) }; });
    glance = `
    <section class="card mb" aria-labelledby="gl"><h2 id="gl">👀 עשר המניות במבט אחד</h2>
      <p class="muted small">משמאל לימין: הערכת המחיר מול השווי (פונדמנטלי), השלב הטכני, והאם שתי העדשות מסכימות.</p>
      <div style="overflow-x:auto"><table class="data">
        <caption class="sr-only">סיכום פונדמנטלי וטכני לעשר המניות</caption>
        <tr><th scope="col">מניה</th><th scope="col">🏢 פונדמנטלי</th><th scope="col">📉 טכני</th><th scope="col">התאמה</th></tr>
        ${rows.map(r => `<tr><td><b lang="en">${r.f.ticker}</b> ${esc(r.f.he)}</td>
          <td><span class="${TONE[r.f.verdict.tone]}">${TONE_ICON[r.f.verdict.tone]} ${r.f.verdict.label}</span></td>
          <td><span class="stage st-${r.st.key}">${r.st.label}</span></td><td><b class="${r.ag.cls}">${r.ag.icon} ${r.ag.label}</b></td></tr>`).join("")}
      </table></div>
      <div class="row mt"><a class="btn small" href="#weekly/${id}/fundamental">🏢 לניתוח הפונדמנטלי</a><a class="btn small" href="#weekly/${id}/technical">📉 לניתוח הטכני</a><a class="btn small ghost" href="#weekly/${id}/combined">🧩 למשולב</a></div>
    </section>`;
  }
  return `
    <section class="card mb" aria-labelledby="mkTitle">
      <h2 id="mkTitle">🌡️ מצב השוק השבוע</h2>
      <div class="thermo" role="img" aria-label="טמפרטורת השוק: ${m.temperature} מתוך 100 — ${esc(m.tempLabel)}">
        <div class="thermo-bar"><div class="thermo-pin" style="right:${m.temperature}%"></div></div>
        <div class="row small muted"><span>🧊 קר — פחד, הזדמנויות</span><span class="spacer"></span><span>🔥 חם — אופוריה, זהירות</span></div>
        <p class="center"><b>${esc(m.tempLabel)}</b></p>
      </div>
      <div class="lesson-body">${m.summary}</div>
      <div class="kv">${m.indicators.map(i => `<div><div class="k">${i[0]}</div><div class="v ${TONE[i[2]]}">${i[1]}</div><div class="small muted">${i[3]}</div></div>`).join("")}</div>
    </section>
    ${glance}
    <section class="card mb insight" aria-labelledby="inTitle">
      <h2 id="inTitle">💡 ${rep.insight.title}</h2>
      <div class="lesson-body">${rep.insight.body}</div>
      <p class="small">שיעורים קשורים: ${rep.insight.lessons.map(l => `<a href="#lesson/${l}">${esc(lessonTitle(l))}</a>`).join(" · ")}</p>
    </section>`;
}
