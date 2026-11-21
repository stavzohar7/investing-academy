// ===================================================================
//  עמוד "הניתוח השבועי" — 5 המניות המעניינות + 5 הגדולות בעולם
//  הדוחות נטענים מ-weekly/<תאריך>.js לפי weekly/manifest.js
// ===================================================================
TITLES.weekly = "הניתוח השבועי";

const TONE = { good: "good", mid: "mid", bad: "bad" };
const TONE_ICON = { good: "🟢", mid: "🟡", bad: "🔴" };

function loadWeekly(id, cb) {
  window.WEEKLY_REPORTS = window.WEEKLY_REPORTS || {};
  if (window.WEEKLY_REPORTS[id]) return cb(window.WEEKLY_REPORTS[id]);
  const s = document.createElement("script");
  s.src = `weekly/${id}.js`;
  s.onload = () => cb(window.WEEKLY_REPORTS[id]);
  s.onerror = () => cb(null);
  document.body.appendChild(s);
}

const lessonTitle = id => { const l = ALL_LESSONS().find(x => x.id === resolveLessonId(id)); return l ? `${l.levelIcon} ${l.title}` : id; };

// פס טווח השווי: פסימי / בסיס / אופטימי מול המחיר הנוכחי
function valueBar(sc, price) {
  const lo = Math.min(sc.bear, price) * 0.85, hi = Math.max(sc.bull, price) * 1.1;
  const X = v => ((v - lo) / (hi - lo) * 100).toFixed(1);
  const gap = sc.base > 0 ? price / sc.base - 1 : Infinity;
  return `
  <div class="vbar" dir="ltr" role="img" aria-label="טווח שווי: פסימי ${sc.bear}, בסיס ${sc.base}, אופטימי ${sc.bull}, מחיר נוכחי ${price}">
    <div class="vbar-track"><div class="vbar-range" style="left:${X(sc.bear)}%;width:${X(sc.bull) - X(sc.bear)}%"></div></div>
    <div class="vbar-mark bear" style="left:${X(sc.bear)}%"><span>פסימי<br><b>$${sc.bear}</b></span></div>
    <div class="vbar-mark base" style="left:${X(sc.base)}%"><span>בסיס<br><b>$${sc.base}</b></span></div>
    <div class="vbar-mark bull" style="left:${X(sc.bull)}%"><span>אופטימי<br><b>$${sc.bull}</b></span></div>
    <div class="vbar-price" style="left:${X(price)}%"><span>מחיר<br><b>$${price}</b></span></div>
  </div>
  <p class="small center">המחיר הנוכחי ${isFinite(gap) ? (gap >= 0 ? `<b class="bad">גבוה ב-${pct(gap, 0)}</b> מ` : `<b class="good">נמוך ב-${pct(-gap, 0)}</b> מ`) : "לעומת "}שווי תרחיש הבסיס שלנו</p>`;
}

function stockCard(s, rep, open, repId) {
  const preset = rep.dcf && rep.dcf[s.ticker];
  return `
  <article class="stock card" id="stk-${s.ticker}" aria-labelledby="h-${s.ticker}">
    <header class="stock-head">
      <div class="ticker" lang="en">${s.ticker}</div>
      <div class="stock-title">
        <h3 id="h-${s.ticker}">${esc(s.he)} <span class="muted small" lang="en">${esc(s.name)}</span></h3>
        <div class="small muted">${esc(s.sector)} · שווי שוק ${s.mcap}</div>
      </div>
      <div class="stock-price"><div class="big" dir="ltr">$${s.price.toFixed(2)}</div><div class="small muted">${s.move}</div></div>
    </header>
    <p class="stock-headline">${s.headline}</p>
    <div class="row"><span class="verdict ${TONE[s.verdict.tone]}">${TONE_ICON[s.verdict.tone]} ${s.verdict.label}</span></div>

    <details ${open ? "open" : ""}>
      <summary>📖 הניתוח המלא</summary>
      <div class="stock-body">
        <section><h4>📰 מה קרה השבוע</h4><ul>${s.news.map(n => `<li>${n}</li>`).join("")}</ul></section>
        <section><h4>🏰 העסק והחפיר</h4><p>${s.business}</p></section>
        <section><h4>📊 המספרים</h4>
          <div class="kv">${s.metrics.map(m => `<div><div class="k">${m[0]}</div><div class="v ${TONE[m[2]] || ""}">${m[1]}</div></div>`).join("")}</div>
        </section>
        <section class="grid grid-2">
          <div class="bullbear bull"><h4>🐂 טיעוני השוורים</h4><ul>${s.bull.map(x => `<li>${x}</li>`).join("")}</ul></div>
          <div class="bullbear bear"><h4>🐻 טיעוני הדובים</h4><ul>${s.bear.map(x => `<li>${x}</li>`).join("")}</ul></div>
        </section>
        <section><h4>🧮 הערכת שווי — שלושה תרחישים</h4>
          <p class="small muted">${s.valuation.method}</p>
          ${valueBar(s.valuation.scenarios, s.price)}
          <p class="small">${s.valuation.note}</p>
          ${preset ? `<button type="button" class="btn ghost small" data-dcf="${s.ticker}">🧮 פתח את ההנחות במחשבון DCF ושנה אותן</button>` : ""}
        </section>
        <section class="opinion"><h4>🧠 חוות הדעת — בראש של באפט</h4><p>${s.verdict.text}</p></section>
        <section><h4>🔭 על מה לעקוב ומה צפוי</h4><ul>${s.future.map(x => `<li>${x}</li>`).join("")}</ul></section>
        ${rep.technical && rep.technical.stocks[s.ticker] ? `<p class="small">📉 <a href="#weekly/${repId}/technical/${s.ticker}">הניתוח הטכני של ${s.ticker}</a> · 🧩 <a href="#weekly/${repId}/combined">השילוב בין שתי העדשות</a></p>` : ""}
        <section><h4>🎓 השיעורים שהניתוח הזה מתרגל</h4>
          <ul class="learn-links">${s.learn.map(id => `<li><a href="#lesson/${id}">${esc(lessonTitle(id))}</a></li>`).join("")}</ul>
        </section>
      </div>
    </details>
  </article>`;
}

// ---------- כרטיס ביצועים ומכתבים ----------
function scoreRows() {
  const S = window.SCORECARD || { analyses: [], marks: [], benchmarkAt: {} };
  return S.analyses.map(a => {
    const m = [...S.marks].reverse().find(x => x.date > a.date && x.prices && x.prices[a.ticker] != null);
    if (!m) return Object.assign({ pending: true }, a);
    const ret = m.prices[a.ticker] / a.price - 1;
    const spy = m.spy / S.benchmarkAt[a.date] - 1;
    return Object.assign({ now: m.prices[a.ticker], at: m.date, ret, spy, excess: ret - spy }, a);
  });
}

function renderScorecard() {
  const S = window.SCORECARD;
  document.title = "כרטיס הביצועים — הניתוח השבועי";
  if (!S) { app().innerHTML = `<h1>📈 כרטיס הביצועים</h1><p class="muted">לא נמצאו נתונים.</p>`; return; }
  const rows = scoreRows();
  const measured = rows.filter(r => !r.pending);
  const avg = arr => arr.length ? arr.reduce((s, x) => s + x, 0) / arr.length : NaN;
  const byTone = t => measured.filter(r => r.tone === t);
  const fmtPct = v => isFinite(v) ? `<span class="${v >= 0 ? "good" : "bad"}" dir="ltr">${v >= 0 ? "+" : ""}${(v * 100).toFixed(1)}%</span>` : "—";
  const lastMark = S.marks.length ? S.marks[S.marks.length - 1].date : null;

  app().innerHTML = `
    <div class="row"><h1 style="margin:0">📈 כרטיס הביצועים ומה למדנו</h1><span class="spacer"></span><a class="btn ghost small" href="#weekly">→ לדוח השבועי</a></div>
    <p class="muted">כמו באפט במכתבים השנתיים: כל ניתוח נמדד בגלוי מול מדד S&amp;P 500 (קרן ${S.benchmark}), כולל הטעויות. ${lastMark ? `מדידה אחרונה: ${lastMark.split("-").reverse().join(".")}` : "המדידה הראשונה תתווסף בדוח הבא."}</p>

    <div class="grid grid-3 mb">
      <div class="card stat"><div class="num">${rows.length}</div><div class="lbl">ניתוחים במעקב</div><div class="small muted">${measured.length} נמדדו</div></div>
      <div class="card stat"><div class="num">${measured.length ? fmtPct(avg(byTone("good").map(r => r.excess))) : "—"}</div><div class="lbl">🟢 "נראה זול" מול המדד</div><div class="small muted">ממוצע תשואה עודפת</div></div>
      <div class="card stat"><div class="num">${measured.length ? fmtPct(avg(byTone("bad").map(r => r.excess))) : "—"}</div><div class="lbl">🔴 "נראה יקר" מול המדד</div><div class="small muted">אם השיטה עובדת — לאורך זמן נמוך מהירוק</div></div>
    </div>

    <div class="disclaimer" role="note"><b>איך לקרוא את זה:</b> תוצאות של שבועות או חודשים הן בעיקר רעש. ניתוח ערך נבחן לאורך שנים. אנחנו מציגים את המספרים כדי ללמוד מהם בכנות — לא כדי להוכיח שצדקנו.</div>

    <section class="card mb" style="overflow-x:auto" aria-labelledby="scTbl">
      <h2 id="scTbl">כל הניתוחים</h2>
      <table class="data">
        <caption class="sr-only">ביצועי הניתוחים מול המדד</caption>
        <tr><th scope="col">תאריך</th><th scope="col">מניה</th><th scope="col">הערכה</th><th scope="col">מחיר בניתוח</th><th scope="col">שווי בסיס</th><th scope="col">מחיר אחרון</th><th scope="col">תשואה</th><th scope="col">המדד</th><th scope="col">מול המדד</th></tr>
        ${rows.map(r => `<tr>
          <td>${r.date.split("-").reverse().join(".")}</td>
          <td><a href="#weekly/${r.date}/${r.ticker}" lang="en"><b>${r.ticker}</b></a></td>
          <td>${TONE_ICON[r.tone]}</td>
          <td dir="ltr" style="text-align:right">$${r.price.toFixed(2)}</td>
          <td dir="ltr" style="text-align:right">$${r.base}</td>
          ${r.pending ? `<td colspan="4" class="muted">ממתין למדידה הראשונה</td>` : `
          <td dir="ltr" style="text-align:right">$${r.now.toFixed(2)}</td><td>${fmtPct(r.ret)}</td><td>${fmtPct(r.spy)}</td><td><b>${fmtPct(r.excess)}</b></td>`}
        </tr>`).join("")}
      </table>
    </section>

    <h2>✉️ המכתבים — מה למדנו</h2>
    <p class="muted">סיכום שבועי כן: מה עבד, מה לא, אילו הנחות השתנו ומה זה מלמד על השקעות.</p>
    ${[...S.letters].reverse().map(l => `
      <article class="card mb letter" aria-labelledby="lt-${l.date}">
        <div class="small muted">${l.date.split("-").reverse().join(".")}</div>
        <h3 id="lt-${l.date}" style="margin-top:4px">${l.title}</h3>
        <div class="lesson-body">${l.body}</div>
      </article>`).join("")}`;
}

function fundamentalTab(rep, id, ticker) {
  return `
    <p class="muted">הלשונית הזו עוסקת ב<b>עסק</b>: מה הוא שווה, ומה המחיר כבר מניח. לתזמון, מגמה וסיכון — ראה את <a href="#weekly/${id}/technical">הלשונית הטכנית</a>.</p>
    ${rep.sections.map(sec => `
      <section class="mb" aria-labelledby="sec-${sec.id}">
        <h2 id="sec-${sec.id}">${sec.title}</h2>
        <p class="muted">${sec.subtitle}</p>
        <div class="card mb" style="overflow-x:auto">
          <table class="data">
            <caption class="sr-only">סיכום ${sec.title}</caption>
            <tr><th scope="col">מניה</th><th scope="col">מחיר (12.11)</th><th scope="col">שווי בסיס (שלנו)</th><th scope="col">הערכה</th></tr>
            ${sec.stocks.map(s => `<tr>
              <td><a href="#weekly/${id}/fundamental/${s.ticker}"><b lang="en">${s.ticker}</b> ${esc(s.he)}</a></td>
              <td dir="ltr" style="text-align:right">$${s.price.toFixed(2)}</td>
              <td dir="ltr" style="text-align:right">$${s.valuation.scenarios.base}</td>
              <td><span class="${TONE[s.verdict.tone]}">${TONE_ICON[s.verdict.tone]} ${s.verdict.label}</span></td>
            </tr>`).join("")}
          </table>
        </div>
        ${sec.stocks.map(s => stockCard(s, rep, s.ticker === ticker, id)).join("")}
      </section>`).join("")}
    <section class="card mb" aria-labelledby="mtTitle">
      <h2 id="mtTitle">🧭 איך לקרוא את הניתוח הפונדמנטלי</h2>
      <ul>
        <li><b>שלושה תרחישים</b> — במקום "מחיר יעד" אחד. שווי הוא טווח, לא נקודה (שיעור DCF).</li>
        <li><b>Reverse DCF</b> — מה המחיר הנוכחי כבר מניח. זו לרוב השאלה החשובה ביותר.</li>
        <li><b>חוות הדעת</b> — איך משקיע בסגנון באפט היה שוקל את העסק, ההנהלה, החפיר והמחיר. תרגיל חשיבה, לא הוראה לפעולה.</li>
        <li><b>הכי חשוב:</b> פתח את ההנחות במחשבון, שנה אותן, ותגיע למסקנה <b>שלך</b>.</li>
      </ul>
    </section>`;
}

Routes.weekly = function (id, a, b) {
  if (id === "scorecard") return renderScorecard();
  const list = window.WEEKLY_MANIFEST || [];
  if (!list.length) { app().innerHTML = `<h1>📰 הניתוח השבועי</h1><p class="muted">עדיין אין דוחות.</p>`; return; }
  id = list.includes(id) ? id : list[0];
  let tab = "overview", ticker = null;
  if (a && WEEK_TABS.some(t => t[0] === a)) { tab = a; ticker = b || null; } else if (a) { tab = "fundamental"; ticker = a; }
  app().innerHTML = `<h1>📰 הניתוח השבועי</h1><p class="muted">טוען את הדוח...</p>`;
  loadWeekly(id, rep => {
    if (!rep) { app().innerHTML = `<h1>📰 הניתוח השבועי</h1><p class="bad">לא הצלחנו לטעון את הדוח ${esc(id)}.</p>`; return; }
    const tabName = WEEK_TABS.find(t => t[0] === tab)[1];
    document.title = `${tabName} · ${rep.title} — הניתוח השבועי`;
    const body = tab === "fundamental" ? fundamentalTab(rep, id, ticker) : tab === "technical" ? techTab(rep, id) : tab === "combined" ? combinedTab(rep, id) : tab === "outlook" ? outlookTab(rep, id) : overviewTab(rep, id);
    const srcs = [...rep.sources, ...((rep.technical && rep.technical.sources) || [])];
    app().innerHTML = `
    <div class="row">
      <h1 style="margin:0">📰 הניתוח השבועי</h1><span class="spacer"></span>
      <a class="btn ghost small" href="#weekly/scorecard">📈 כרטיס ביצועים ומה למדנו</a>
      <div class="field"><label for="weekSel" class="sr-only">בחר שבוע</label>
        <select id="weekSel">${list.map(w => `<option value="${w}" ${w === id ? "selected" : ""}>${w === list[0] ? "האחרון · " : ""}${w.split("-").reverse().join(".")}</option>`).join("")}</select></div>
    </div>
    <p class="muted"><b>${rep.title}</b> · ${rep.asOf}</p>
    <nav class="tabs weektabs" aria-label="סוג ניתוח">${WEEK_TABS.map(t => `<a href="#weekly/${id}/${t[0]}" ${t[0] === tab ? 'aria-current="page"' : ""} title="${t[2]}">${t[1]}</a>`).join("")}</nav>

    <div class="disclaimer" role="note">
      <b>⚠️ חשוב לקרוא:</b> זהו <b>ניתוח לימודי</b> שמדגים איך משקיעים בסגנון באפט, מאנגר ולינץ' חושבים על חברות, ואיך קוראים גרף — <b>לא המלצה לקנות, למכור או להחזיק</b> אף נייר ערך, ולא ייעוץ השקעות המותאם אישית.
      ערכי השווי נובעים מהנחות שלנו שיכולות להיות שגויות לגמרי, והתרחישים אינם תחזית. מחירים משתנים כל יום — בדוק נתונים עדכניים לפני כל החלטה.
    </div>

    ${body}

    <details class="card mt">
      <summary>📚 מקורות לדוח הזה</summary>
      <ul class="small">${srcs.map(s => `<li><a href="${s[1]}" target="_blank" rel="noopener noreferrer">${esc(s[0])}</a></li>`).join("")}</ul>
    </details>`;

    $("#weekSel").onchange = e => go("weekly/" + e.target.value + "/" + tab);
    $$("[data-dcf]").forEach(bt => bt.onclick = () => {
      const t = bt.dataset.dcf;
      window.DCF_PRESET = Object.assign({ name: t, mos: 30 }, rep.dcf[t]);
      go("tools/dcf");
    });
    if (ticker) {
      const el = $(tab === "technical" ? "#tk-" + ticker : tab === "outlook" ? "#ok-" + ticker : "#stk-" + ticker);
      if (el) { setTimeout(() => { el.scrollIntoView({ behavior: "smooth", block: "start" }); const s = el.querySelector("summary"); (s || el).setAttribute("tabindex", "-1"); (s || el).focus({ preventScroll: true }); }, 50); }
    }
  });
};


// טיזר לדף הבית
function weeklyTeaser(el) {
  const list = window.WEEKLY_MANIFEST || [];
  if (!list.length || !el) return;
  loadWeekly(list[0], rep => {
    if (!rep) return;
    const all = rep.sections.flatMap(s => s.stocks);
    el.innerHTML = `
      <a class="card plain weekly-teaser" href="#weekly">
        <div class="row"><span style="font-size:1.6rem" aria-hidden="true">📰</span><div><b>הניתוח השבועי · ${esc(rep.title)}</b>
          <div class="small muted">10 מניות: ניתוח פונדמנטלי, ניתוח טכני, והשילוב ביניהם</div></div><span class="spacer"></span><span class="btn small">לקריאה ←</span></div>
        <div class="chips mt">${all.map(s => `<span class="chip ${TONE[s.verdict.tone]}" lang="en">${TONE_ICON[s.verdict.tone]} ${s.ticker}</span>`).join("")}</div>
      </a>`;
  });
}
