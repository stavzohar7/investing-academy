// ===================================================================
//  🔍 חיפוש בכל האתר · 📊 ההתקדמות שלי + גיבוי · 📐 דף נוסחאות · 📋 סיכומי שלבים
// ===================================================================
TITLES.progress = "ההתקדמות שלי";
TITLES.formulas = "דף נוסחאות";
TITLES.summary = "סיכום שלב";

// ===================== חיפוש בכל האתר =====================
const PAGES_INDEX = [
  ["🚀 התחל כאן", "start", "תוכנית לימוד אישית שאלון התחלה"], ["🗞️ חדשות ומניות — מהדורה יומית", "news", "חדשות מניות יומי וול סטריט שוק מהדורה כתבות"], ["📰 הניתוח השבועי", "weekly", "מניות השבוע ניתוח שבועי באפט"],
  ["📈 כרטיס הביצועים", "weekly/scorecard", "מכתבים ביצועים מדד"], ["🗺️ מסלול הלימוד", "path", "שיעורים שלבים"],
  ["🧠 אימון יומי", "practice", "חזרה מרווחת שאלות"], ["🧪 מעבדת תרגול", "lab", "תרגילים חישובים דוחות"],
  ["🧮 מחשבון DCF", "tools/dcf", "שווי פנימי היוון מרווח ביטחון"], ["📏 מחשבון גודל פוזיציה", "tools/position", "סיכון סטופ יחס סיכוי תוחלת קלי"],
  ["🔬 מנתח יחסים", "tools/ratios", "ROE ROIC מכפילים יחסים"], ["📈 ריבית דריבית", "tools/compound", "חיסכון דמי ניהול"],
  ["🧩 פירוק תשואה", "tools/returns", "מכפיל צמיחה דיבידנד בוגל"], ["🏝️ עצמאות כלכלית", "tools/fi", "פרישה כלל 4% FIRE"],
  ["👁️ רשימת מעקב ותזות", "watchlist", "תזה מעקב מחיר"], ["✅ צ'קליסט באפט", "checklist", "ניתוח חברה"],
  ["🎯 סימולטור סווינג", "simulator", "גרף תרגול סטופ יעד"], ["📓 יומן מסחר", "journal", "עסקאות תיעוד"],
  ["🕰️ מכונת הזמן", "timemachine", "משבר מפולת 2008 קורונה"], ["📚 ספריית המשקיע", "library", "ספרים קריאה"],
  ["📖 מילון", "glossary", "מונחים כרטיסיות"], ["❓ שאלות נפוצות", "faq", "שאלות מתחילים"],
  ["📐 דף נוסחאות", "formulas", "נוסחאות סיכום"], ["📊 ההתקדמות שלי", "progress", "התקדמות גיבוי שחזור"],
  ["♿ הצהרת נגישות", "accessibility", "נגישות"],
  ["🛡️ אמינות ותיקונים", "about", "אמינות תיקונים טעויות דיוק מקורות שקיפות"],
  ["📜 תסריטים לסרטוני שיעור", "scripts", "תסריט סרטון וידאו דמות מדברת הפקה"],
  ["🎬 קורס מוקרן — שיעורים בקול", "watch", "וידאו מצגת קריינות הקראה שמע לימוד בקול כתוביות"],
  ["🧭 ההתנהלות שלי לפי עבודה וחיסכון — מבנה תיק לימודי", "youthplan", "צעירים עבודה שכיר עצמאי הייטק חיסכון חודשי תיק השקעות הקצאה מצב השוק מבחן"],
  ["🎓 מסלול 12 חודשים לצעירים — צ'קליסט חודש-חודש", "youth", "צעירים מסלול שנה צ'קליסט משימות חודש חודש בית ההורים"],
  ["🎓 לצעירים בני 23-24 בבית ההורים — צעדים כספיים", "lesson/lf-5", "צעירים גר אצל ההורים יציאה מהבית שכר דירה חיסכון ראשון משכורת ראשונה"],
  ["💸 התנהלות כספית — תמונת מצב ותוכנית אישית", "finance", "התנהלות כספית רווק נשוי ילדים תקציב כרית חיסכון השקעה פנסיה תוכנית אישית מצב כלכלי"],
  ["💰 ניהול כסף — תקציב, חובות, מטרות", "money", "תקציב חיסכון חובות הלוואה כרטיס אשראי כרית ביטחון מטרה פנסיה שווי נקי כסף אישי משכנתא אינפלציה"],
  ["💼 מבחן קיצון לתיק", "portfolio", "תיק הקצאה איזון ירידה סימולציה סיכון תרחיש מבחן קיצון"],
  ["🕵️ בלש הדוחות — תיקי חקירה", "detective", "משחק דוחות כספיים דגלים אדומים חברות בדיוניות חקירה"],
  ["🧬 איזה סגנון משקיע אתה?", "style", "שאלון סגנון משקיע גרהאם באפט לינץ בוגל סוחר מגמה"],
  ["🤔 מה באפט היה עושה?", "scenarios", "תרחישים משחק החלטות שיקול דעת"],
  ["🧭 מפת האתר", "sitemap", "כל האתר במקום אחד ניווט"],
  ["🏢 ניתוח שבועי — פונדמנטלי", "weekly", "ניתוח פונדמנטלי שווי מניות השבוע"],
  ["🔮 תחזית ומחיר — אזורי מרווח ביטחון", "weekly", "תחזית תרחישים אזור מחיר מרווח ביטחון האם המחיר שווה"],
  ["📉 ניתוח שבועי — טכני", "weekly", "ניתוח טכני גרף ממוצעים RSI ATR מניות השבוע"],
  ["🎓 פרויקט הגמר", "capstone", "פרויקט גמר ניתוח חברה תעודה רובריקה"],
  ["🎓 תעודת סיום הקורס", "certificate/course", "תעודה סיום קורס"],
  ["📜 ציר הזמן של השווקים", "timeline", "היסטוריה בועות קריסות 1929 2008 צבעונים"]
];
let SEARCH_IDX = null;
function buildSearchIndex() {
  const items = [];
  ALL_LESSONS().forEach(l => items.push({ type: "שיעור", icon: l.levelIcon, title: l.title, href: `#lesson/${l.id}`, text: stripHtml(l.body + " " + l.takeaways.join(" ")) }));
  (window.GLOSSARY || []).forEach(g => items.push({ type: "מונח", icon: "📖", title: `${g[0]} (${g[1]})`, href: `#glossary`, text: g[2], term: g[0] }));
  if (typeof FAQ !== "undefined") FAQ.forEach(f => items.push({ type: "שאלה נפוצה", icon: "❓", title: f[0], href: "#faq", text: stripHtml(f[1]) }));
  if (typeof BOOKS !== "undefined") BOOKS.forEach(b => items.push({ type: "ספר", icon: "📚", title: `${b.t} — ${b.a}`, href: "#library", text: b.en + " " + b.why + " " + b.ideas.join(" ") }));
  PAGES_INDEX.forEach(p => items.push({ type: "עמוד", icon: "🧭", title: p[0], href: "#" + p[1], text: p[2] }));
  return items;
}
function searchSite(q) {
  q = q.trim().toLowerCase();
  if (q.length < 2) return [];
  SEARCH_IDX = SEARCH_IDX || buildSearchIndex();
  const words = q.split(/\s+/);
  return SEARCH_IDX.map(it => {
    const t = it.title.toLowerCase(), x = it.text.toLowerCase();
    let s = 0;
    for (const w of words) {
      if (t.includes(w)) s += 10; else if (x.includes(w)) s += 2; else return null;
    }
    if (t.startsWith(q)) s += 5;
    if (it.type === "עמוד") s += 1;
    return { it, s };
  }).filter(Boolean).sort((a, b) => b.s - a.s).slice(0, 14).map(r => r.it);
}
function snippet(text, q) {
  const w = q.trim().split(/\s+/)[0].toLowerCase();
  const i = text.toLowerCase().indexOf(w);
  if (i < 0) return text.slice(0, 110) + "…";
  return (i > 50 ? "…" : "") + text.slice(Math.max(0, i - 50), i + 80) + "…";
}
function setupSearch() {
  const dlg = $("#searchDlg"); if (!dlg) return;
  const inp = $("#siteQ"), out = $("#siteResults");
  const mark = (s, q) => esc(s).replace(new RegExp(q.trim().split(/\s+/).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "gi"), m => `<mark>${m}</mark>`);
  const draw = () => {
    const q = inp.value, res = searchSite(q);
    out.innerHTML = q.trim().length < 2 ? `<li class="muted small">הקלד לפחות שתי אותיות — שיעורים, מונחים, ספרים, שאלות וכלים.</li>`
      : res.length ? res.map(r => `<li><a href="${r.href}" data-term="${esc(r.term || "")}"><span class="pill">${r.icon} ${r.type}</span> <b>${mark(r.title, q)}</b><div class="small muted">${mark(snippet(r.text, q), q)}</div></a></li>`).join("")
      : `<li class="muted">לא נמצאו תוצאות ל"${esc(q)}".</li>`;
    $("#siteCount").textContent = q.trim().length >= 2 ? `${res.length} תוצאות` : "";
  };
  const open = () => { dlg.showModal(); inp.value = ""; draw(); inp.focus(); };
  $("#searchBtn").onclick = open;
  inp.addEventListener("input", draw);
  out.addEventListener("click", e => {
    const a = e.target.closest("a"); if (!a) return;
    if (a.dataset.term) sessionStorage.setItem("glossaryQ", a.dataset.term);
    dlg.close();
  });
  dlg.addEventListener("keydown", e => {
    const links = $$("#siteResults a");
    const i = links.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); (links[i + 1] || links[0])?.focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); i <= 0 ? inp.focus() : links[i - 1].focus(); }
  });
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  document.addEventListener("keydown", e => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) { e.preventDefault(); if (!dlg.open) open(); }
  });
}
window.addEventListener("load", setupSearch);

// מעבר מתוצאת חיפוש למונח במילון
const _glossaryRoute = Routes.glossary;
Routes.glossary = function (mode) {
  _glossaryRoute(mode);
  const t = sessionStorage.getItem("glossaryQ");
  if (t && mode !== "cards") { sessionStorage.removeItem("glossaryQ"); const i = $("#glq"); if (i) { i.value = t; i.dispatchEvent(new Event("input")); } }
};

// ===================== ההתקדמות שלי + גיבוי =====================
Routes.progress = function () {
  const D = State.data, lessons = ALL_LESSONS();
  const doneIds = Object.keys(D.done);
  const scores = doneIds.map(id => D.done[id]);
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const srs = D.srs || {};
  const weakSrs = {};
  Object.entries(srs).forEach(([k, v]) => { if (v.box <= 1) { const id = k.split(":")[0]; weakSrs[id] = (weakSrs[id] || 0) + 1; } });
  const toReview = [...new Set([...doneIds.filter(id => D.done[id] < 80), ...Object.keys(weakSrs)])]
    .map(id => lessons.find(l => l.id === id)).filter(Boolean).slice(0, 8);
  // מפת חום: 12 שבועות אחרונים
  const days = new Set(D.days || []);
  const cells = [];
  const start = new Date(); start.setDate(start.getDate() - 83);
  for (let i = 0; i < 84; i++) { const d = new Date(start); d.setDate(start.getDate() + i); const s = todayStr(d); cells.push([s, days.has(s)]); }
  const active84 = cells.filter(c => c[1]).length;

  app().innerHTML = `
    <h1>📊 ההתקדמות שלי</h1>
    <div class="grid grid-3 mb">
      <div class="card stat"><div class="num">${doneIds.length}/${lessons.length}</div><div class="lbl">שיעורים שהושלמו</div></div>
      <div class="card stat"><div class="num">${scores.length ? avg + "%" : "—"}</div><div class="lbl">ציון ממוצע בבחנים</div></div>
      <div class="card stat"><div class="num">${streak()} <span aria-hidden="true">🔥</span></div><div class="lbl">ימי לימוד ברצף · ${(D.days || []).length} ימי לימוד בסך הכול</div></div>
    </div>

    <section class="card mb" aria-labelledby="hmT">
      <h2 id="hmT">🗓️ ימי הלימוד שלך — 12 השבועות האחרונים</h2>
      <div class="heatmap" role="img" aria-label="${active84} ימי לימוד מתוך 84 הימים האחרונים">${cells.map(c => `<span class="${c[1] ? "on" : ""}" title="${c[0].split("-").reverse().join(".")}${c[1] ? " — למדת" : ""}"></span>`).join("")}</div>
      <p class="small muted mt">${active84} ימי לימוד מתוך 84. גם 5 דקות של <a href="#practice">אימון יומי</a> נספרות.</p>
    </section>

    <section class="card mb" aria-labelledby="lvT">
      <h2 id="lvT">🗺️ התקדמות לפי שלב</h2>
      <div class="lvl-bars">${window.CURRICULUM.map((lv, i) => {
        const d = lv.lessons.filter(x => x.id in D.done), p = d.length / lv.lessons.length;
        const a = d.length ? Math.round(d.reduce((s, x) => s + D.done[x.id], 0) / d.length) : null;
        return `<div class="lvl-bar"><a href="#summary/${lv.id}">${lv.icon} שלב ${i + 1}: ${esc(lv.title)}</a>
          <div class="progress" aria-label="שלב ${i + 1}: ${d.length} מתוך ${lv.lessons.length}" role="progressbar" aria-valuemin="0" aria-valuemax="${lv.lessons.length}" aria-valuenow="${d.length}"><div style="width:${p * 100}%"></div></div>
          <span class="small">${d.length}/${lv.lessons.length}${a != null ? ` · ${a}%` : ""}${(D.levelExam || {})[lv.id] != null ? ` · 📝 ${(D.levelExam || {})[lv.id]}%` : ""}${p === 1 && (D.levelExam || {})[lv.id] >= 80 ? ` · <a href="#certificate/${lv.id}" aria-label="תעודה">🎓</a>` : ""}</span></div>`;
      }).join("")}</div>
    </section>

    <div class="grid grid-2 mb">
      <section class="card" aria-labelledby="rvT">
        <h2 id="rvT">🔁 כדאי לחזור עליהם</h2>
        ${toReview.length ? `<ul>${toReview.map(l => `<li><a href="#lesson/${l.id}">${l.levelIcon} ${esc(l.title)}</a> <span class="small muted">${D.done[l.id] != null ? `ציון ${D.done[l.id]}%` : ""}${weakSrs[l.id] ? ` · ${weakSrs[l.id]} שאלות לחזרה` : ""}</span></li>`).join("")}</ul>`
          : `<p class="muted">אין כרגע שיעורים חלשים. 💪 שיעורים עם ציון מתחת ל-80% או עם שאלות שטעית בהן באימון היומי יופיעו כאן.</p>`}
      </section>
      <section class="card" aria-labelledby="otT">
        <h2 id="otT">🧰 עוד הישגים</h2>
        <ul>
          <li>🧪 מעבדת תרגול: <b>${Object.keys(D.lab || {}).length}</b> תרגילים נפתרו</li>
          <li>🧠 אימון יומי: <b>${Object.values(srs).filter(v => v.box >= 4).length}</b> שאלות שנשלטו</li>
          <li>📚 ספרים שקראת: <b>${Object.keys(D.books || {}).length}</b></li>
          <li>📖 מונחים שאתה מכיר: <b>${Object.keys(D.cards || {}).length}</b></li>
          <li>👁️ תזות ברשימת המעקב: <b>${(D.watch || []).length}</b></li>
          <li>📓 עסקאות ביומן: <b>${(D.journal || []).length}</b></li>
          <li>⭐ ${State.data.xp} XP · ${currentRank().icon} ${currentRank().name}</li>
        </ul>
      </section>
    </div>

    <section class="card mb" aria-labelledby="bkT">
      <h2 id="bkT">💾 גיבוי ושחזור</h2>
      <p class="muted">כל ההתקדמות נשמרת רק בדפדפן הזה. אם תנקה את הדפדפן או תעבור למכשיר אחר — היא תאבד. שמור קובץ גיבוי מדי פעם, ושחזר ממנו בכל מכשיר.</p>
      <div class="row">
        <button type="button" class="btn" id="bkExport">⬇️ הורד קובץ גיבוי</button>
        <label class="btn ghost" for="bkFile" style="cursor:pointer">⬆️ שחזור מקובץ</label>
        <input type="file" id="bkFile" accept=".json,application/json" class="sr-only" />
      </div>
      <p class="small muted mt">הקובץ כולל את ההתקדמות, הציונים, ההערות, היומן, רשימת המעקב וההגדרות. הוא נשאר אצלך ולא נשלח לשום מקום.</p>
    </section>`;

  $("#bkExport").onclick = () => {
    const payload = { app: "investing-academy", version: 1, exported: new Date().toISOString(), data: State.data, prefs: Prefs.get() };
    const blob = new Blob([JSON.stringify(payload, null, 1)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `investing-academy-backup-${todayStr()}.json`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast("קובץ הגיבוי ירד");
  };
  $("#bkFile").onchange = e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const p = JSON.parse(r.result);
        if (p.app !== "investing-academy" || typeof p.data !== "object") throw new Error("bad");
        if (!confirm(`לשחזר את הגיבוי מ-${new Date(p.exported).toLocaleDateString("he-IL")}? ההתקדמות הנוכחית בדפדפן הזה תוחלף.`)) return;
        localStorage.setItem(STORE_KEY, JSON.stringify(p.data));
        if (p.prefs) localStorage.setItem(PREFS_KEY, JSON.stringify(p.prefs));
        location.reload();
      } catch (err) { toast("הקובץ לא נראה כמו גיבוי של אקדמיית המשקיע"); }
    };
    r.readAsText(f);
  };
};

// ===================== דף נוסחאות =====================
const FORMULAS = [
  ["📑 דוחות ואיכות", [
    ["שולי רווח גולמי", "רווח גולמי ÷ הכנסות", "מעל 40% לאורך זמן = רמז לכוח תמחור", "l2-1"],
    ["תזרים חופשי (FCF)", "תזרים מפעילות שוטפת − CAPEX", "המזומן ששייך באמת לבעלים", "l2-3"],
    ["רווחי בעלים (באפט)", "רווח נקי + פחת − CAPEX לתחזוקה (± הון חוזר)", "", "l2-3"],
    ["ROE", "רווח נקי ÷ הון עצמי", "בדוק שלא נובע מחוב", "l2-4"],
    ["ROIC", "EBIT × (1 − מס) ÷ (הון עצמי + חוב − מזומן)", "מעל 15% לאורך זמן = עסק איכותי", "l2-4"],
    ["פירוק DuPont", "ROE = שולי נקי × מחזור נכסים × מינוף", "", "l2-4"],
    ["כיסוי ריבית", "EBIT ÷ הוצאות ריבית", "מעל 8 = נוח", "l2-4"],
    ["ימי גבייה (DSO)", "לקוחות ÷ הכנסות × 365", "עלייה חדה = דגל", "l2-6"],
    ["Altman Z", "1.2·X1 + 1.4·X2 + 3.3·X3 + 0.6·X4 + 1.0·X5", "מעל 2.99 בטוח · מתחת ל-1.81 מצוקה", "l2-7"],
    ["Piotroski F-Score", "סכום 9 בדיקות כן/לא (רווחיות, מינוף, יעילות)", "8-9 חזק · 0-2 חלש", "l2-7"]
  ]],
  ["💰 מכפילים והערכת שווי", [
    ["P/E", "מחיר ÷ רווח למניה", "ההופכי = תשואת רווח", "l2-5"],
    ["PEG (לינץ')", "P/E ÷ צמיחת רווח שנתית (%)", "~1 הוגן", "l2-5"],
    ["שווי פירמה (EV)", "שווי שוק + חוב − מזומן", "", "l2-5"],
    ["תשואת FCF", "FCF ÷ שווי שוק", "+ צמיחה ≈ תשואה צפויה", "l2-5"],
    ["מספר גרהאם", "√(22.5 × EPS × ערך בספרים למניה)", "שמרני מאוד", "l3-1"],
    ["ערך נוכחי", "PV = CF ÷ (1 + r)^t", "", "l3-5"],
    ["ערך שארית", "TV = FCF × (1 + g) ÷ (r − g)", "r חייב להיות גדול מ-g", "l3-5"],
    ["מרווח ביטחון", "(שווי פנימי − מחיר) ÷ שווי פנימי", "", "l3-2"],
    ["פירוק תשואה (בוגל)", "≈ צמיחת רווח + דיבידנד + שינוי שנתי במכפיל", "", "lm-6"],
    ["הנוסחה הקסומה", "EBIT ÷ (הון חוזר נטו + רכוש קבוע נטו) ו-EBIT ÷ EV", "", "lg-1"]
  ]],
  ["📈 צמיחה וריבית", [
    ["ריבית דריבית", "FV = PV × (1 + r)^n", "", "l1-2"],
    ["כלל ה-72", "שנים להכפלה ≈ 72 ÷ תשואה (%)", "", "l1-2"],
    ["תשואה ריאלית", "≈ תשואה נומינלית − אינפלציה", "", "lm-5"],
    ["כלל ה-4%", "יעד ≈ הוצאות שנתיות × 25", "", "lp-5"],
    ["מח\"מ אג\"ח", "שינוי מחיר ≈ − מח\"מ × שינוי בריבית", "", "lp-2"],
    ["פרמיית סיכון מניות", "(1 ÷ P/E של השוק) − תשואת אג\"ח ממשלתית", "", "lm-6"]
  ]],
  ["🛡️ סיכון ומסחר", [
    ["גודל פוזיציה", "(תיק × % סיכון) ÷ (כניסה − סטופ)", "", "l5-1"],
    ["יחס סיכוי-סיכון", "(יעד − כניסה) ÷ (כניסה − סטופ)", "", "l5-2"],
    ["אחוז הצלחה לאיזון", "1 ÷ (1 + R:R)", "", "l5-2"],
    ["תוחלת", "W% × רווח ממוצע − L% × הפסד ממוצע", "", "l5-2"],
    ["קריטריון קלי", "f = W − (1 − W) ÷ R", "השתמש ברבע עד חצי", "l5-4"],
    ["סטופ ATR", "כניסה − (1.5 עד 2) × ATR", "", "l4-4"],
    ["ערך צפוי", "Σ (הסתברות × תוצאה)", "", "l6-5"],
    ["אחוז סטופ מה-ATR", "2 × ATR ÷ מחיר", "גודל פוזיציה = % סיכון ÷ אחוז הסטופ", "l4-7"]
  ]],
  ["🏦 סקטורים", [
    ["יחס משולב (ביטוח)", "(תביעות + הוצאות) ÷ פרמיות", "מתחת ל-100% = רווח מחיתום", "ls-1"],
    ["FFO (נדל\"ן)", "רווח נקי + פחת − רווחים ממכירת נכסים", "", "ls-2"],
    ["Cap Rate", "NOI ÷ שווי הנכס", "", "ls-2"],
    ["LTV", "חוב ÷ שווי נכסים", "מעל 60% = מינוף גבוה", "ls-2"],
    ["Rule of 40 (תוכנה)", "צמיחה (%) + שולי FCF (%) ≥ 40", "", "ls-3"],
    ["rNPV (ביוטק)", "Σ ערך נוכחי של מכירות × הסתברות לאישור", "", "ls-7"]
  ]]
];

Routes.formulas = function () {
  app().innerHTML = `
    <div class="row no-print"><h1 style="margin:0">📐 דף נוסחאות</h1><span class="spacer"></span><button type="button" class="btn ghost" onclick="window.print()">🖨️ הדפסה</button></div>
    <p class="muted">כל הנוסחאות החשובות של הקורס במקום אחד — עם קישור לשיעור שמסביר כל אחת. מומלץ להדפיס ולהחזיק ליד המחשב בזמן ניתוח.</p>
    ${FORMULAS.map(([sec, rows]) => `
      <section class="card mb formula-sec" aria-labelledby="fs-${esc(sec)}">
        <h2 id="fs-${esc(sec)}" style="font-size:1.2rem">${sec}</h2>
        <dl class="formula-list">${rows.map(r => `
          <div><dt><a href="#lesson/${r[3]}">${r[0]}</a></dt><dd><span class="fx">${r[1]}</span>${r[2] ? `<span class="small muted">${r[2]}</span>` : ""}</dd></div>`).join("")}
        </dl>
      </section>`).join("")}`;
};

// ===================== סיכום שלב =====================
Routes.summary = function (lid) {
  const idx = window.CURRICULUM.findIndex(l => l.id === lid);
  const lv = window.CURRICULUM[idx];
  if (!lv) return go("path");
  const complete = lv.lessons.every(x => x.id in State.data.done);
  app().innerHTML = `
    <div class="row no-print"><h1 style="margin:0">📋 סיכום שלב ${idx + 1}</h1><span class="spacer"></span>
      <button type="button" class="btn ghost" onclick="window.print()">🖨️ הדפסה</button>
      ${complete ? `<a class="btn green" href="#certificate/${lv.id}">🎓 תעודה</a>` : ""}</div>
    <p class="muted">${lv.icon} <b>${esc(lv.title)}</b> — ${esc(lv.subtitle)}. כל נקודות המפתח של השלב בעמוד אחד, לחזרה מהירה.</p>
    ${lv.lessons.map((x, i) => `
      <section class="card mb" aria-labelledby="sm-${x.id}">
        <div class="row"><h2 id="sm-${x.id}" style="font-size:1.1rem;margin:0">${idx + 1}.${i + 1} ${esc(x.title)}</h2><span class="spacer"></span>
          ${x.id in State.data.done ? `<span class="pill green">✅ ${State.data.done[x.id]}%</span>` : `<a class="small no-print" href="#lesson/${x.id}">לשיעור ←</a>`}</div>
        <ul class="mt">${x.takeaways.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      </section>`).join("")}
    <div class="row no-print">
      ${idx > 0 ? `<a class="btn ghost" href="#summary/${window.CURRICULUM[idx - 1].id}">→ השלב הקודם</a>` : ""}<span class="spacer"></span>
      ${idx < window.CURRICULUM.length - 1 ? `<a class="btn ghost" href="#summary/${window.CURRICULUM[idx + 1].id}">השלב הבא ←</a>` : ""}
    </div>`;
};

// ===================== אפליקציה מותקנת ועבודה בלי אינטרנט =====================
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
