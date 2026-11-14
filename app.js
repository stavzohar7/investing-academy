// ===================================================================
//  מנוע האפליקציה: מצב, העדפות, ניתוב, מסלול, שיעורים, בחנים, מילון
// ===================================================================
const STORE_KEY = "invest-academy-v1";
const PREFS_KEY = "ia-prefs";

const State = {
  data: { done: {}, xp: 0, answered: {}, checklist: {}, journal: [], notes: {}, days: [], cards: {}, track: "all" },
  load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) this.data = Object.assign(this.data, JSON.parse(raw));
    } catch (e) { /* ignore */ }
  },
  save() { localStorage.setItem(STORE_KEY, JSON.stringify(this.data)); }
};

const Prefs = {
  get() { try { return JSON.parse(localStorage.getItem(PREFS_KEY) || "{}"); } catch (e) { return {}; } },
  set(k, v) { const p = this.get(); p[k] = v; localStorage.setItem(PREFS_KEY, JSON.stringify(p)); }
};

// ---------- learning tracks ----------
const TRACKS = {
  all: { name: "המסלול המלא", icon: "🎓", desc: "כל השלבים — מומלץ להבנה מלאה", skip: [] },
  long: { name: "משקיע לטווח ארוך", icon: "🏛️", desc: "דוחות, ערך, סקטורים, מאקרו — בלי ניתוח טכני", skip: ["l4", "la"] },
  swing: { name: "סוחר סווינג", icon: "⚡", desc: "טכני, סווינג מתקדם וניהול סיכונים — עם יסודות פונדמנטליים", skip: ["l3", "ls"] }
};
const inTrack = levelId => !(TRACKS[State.data.track] || TRACKS.all).skip.includes(levelId);

const levelNum = id => window.CURRICULUM.findIndex(l => l.id === id) + 1;
const ALL_LESSONS = () => window.CURRICULUM.flatMap((l, li) => l.lessons.map((x, xi) =>
  Object.assign({ levelId: l.id, levelTitle: l.title, levelIcon: l.icon, levelNo: li + 1, lessonNo: xi + 1 }, x)));

// דרגות לפי אחוז השיעורים שהושלמו
const RANKS = [
  { min: 0, name: "מתחיל", icon: "🌱" },
  { min: 0.08, name: "חובב השקעות", icon: "📘" },
  { min: 0.2, name: "קורא דוחות", icon: "📑" },
  { min: 0.35, name: "משקיע ערך צעיר", icon: "🏛️" },
  { min: 0.5, name: "סוחר סווינג", icon: "📉" },
  { min: 0.65, name: "מנהל סיכונים", icon: "🛡️" },
  { min: 0.8, name: "משקיע מאסטר", icon: "🧠" },
  { min: 2, name: "האורקל מאומהה", icon: "👑" }
];
function currentRank() {
  const total = ALL_LESSONS().length;
  const f = Object.keys(State.data.done).length / total;
  if (f >= 1 && State.data.done["l7-5"] >= 80) return RANKS[RANKS.length - 1];
  let r = RANKS[0];
  for (const x of RANKS) if (f >= x.min && x.min <= 1) r = x;
  return r;
}

// רצף ימי לימוד
const todayStr = (d = new Date()) => d.toISOString().slice(0, 10);
function markStudyDay() {
  const t = todayStr();
  if (!State.data.days.includes(t)) State.data.days.push(t);
}
function streak() {
  const set = new Set(State.data.days);
  const d = new Date();
  if (!set.has(todayStr(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (set.has(todayStr(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

const QUOTES = [
  ["בטווח הקצר השוק הוא מכונת הצבעה, בטווח הארוך — מכונת שקילה.", "בנג'מין גרהאם"],
  ["כלל מספר 1: אל תפסיד כסף. כלל מספר 2: אל תשכח את כלל מספר 1.", "וורן באפט"],
  ["היה פחדן כשאחרים חמדנים, וחמדן כשאחרים פוחדים.", "וורן באפט"],
  ["מחיר זה מה שאתה משלם. ערך זה מה שאתה מקבל.", "וורן באפט"],
  ["עדיף עסק נפלא במחיר הוגן מאשר עסק הוגן במחיר נפלא.", "וורן באפט"],
  ["הסיכון נובע מכך שאינך יודע מה אתה עושה.", "וורן באפט"],
  ["הפוך, תמיד הפוך.", "צ'רלי מאנגר"],
  ["הכסף הגדול לא נמצא בקנייה ובמכירה, אלא בהמתנה.", "צ'רלי מאנגר"],
  ["תדע מה אתה מחזיק, ותדע למה אתה מחזיק את זה.", "פיטר לינץ'"],
  ["מאחורי כל מניה יש חברה. תגלה מה היא עושה.", "פיטר לינץ'"],
  ["השוק הוא מנגנון להעברת כסף מחסרי הסבלנות לסבלניים.", "וורן באפט"],
  ["חתוך הפסדים מהר. זה הכלל החשוב ביותר.", "ויליאם או'ניל"],
  ["הסיכון הגדול ביותר נובע מהאמונה שאין סיכון.", "הווארד מרקס"],
  ["ההשקעה הטובה ביותר שאתה יכול לעשות היא בעצמך.", "וורן באפט"]
];

// ---------- helpers ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const app = () => $("#app");
const fmt = (n, d = 0) => isFinite(n) ? Number(n).toLocaleString("he-IL", { maximumFractionDigits: d, minimumFractionDigits: d }) : "—";
const pct = (n, d = 1) => isFinite(n) ? (n * 100).toFixed(d) + "%" : "—";
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const stripHtml = h => { const d = document.createElement("div"); d.innerHTML = h; return d.textContent.replace(/\s+/g, " ").trim(); };

function announce(msg) { const l = $("#live"); l.textContent = ""; setTimeout(() => l.textContent = msg, 50); }
function toast(msg) {
  const t = document.createElement("div");
  t.className = "toast"; t.textContent = msg; t.setAttribute("aria-hidden", "true");
  document.body.appendChild(t);
  announce(msg);
  setTimeout(() => t.remove(), 2800);
}
function updateRankChip() {
  const r = currentRank();
  $("#rankChip").innerHTML = `${r.icon} <b>${r.name}</b> · ${State.data.xp} XP`;
  $("#rankChip").setAttribute("aria-label", `הדרגה שלך: ${r.name}, ${State.data.xp} נקודות ניסיון`);
}

// ---------- preferences: theme & font ----------
function applyPrefs() {
  const root = document.documentElement;
  const theme = root.dataset.theme || "dark";
  $("#themeBtn").textContent = theme === "dark" ? "☀️" : "🌙";
  $("#themeBtn").setAttribute("aria-label", theme === "dark" ? "עבור למצב בהיר" : "עבור למצב כהה");
  const f = +(root.dataset.font || 0);
  $("#fontDown").disabled = f <= 0; $("#fontUp").disabled = f >= 2;
}
function setupPrefs() {
  $("#themeBtn").onclick = () => {
    const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = t; Prefs.set("theme", t); applyPrefs();
    if (location.hash.includes("simulator") && window.drawSim) drawSim();
  };
  const font = d => {
    const f = Math.min(2, Math.max(0, +(document.documentElement.dataset.font || 0) + d));
    document.documentElement.dataset.font = f; Prefs.set("font", f); applyPrefs();
    announce(["גודל טקסט רגיל", "גודל טקסט גדול", "גודל טקסט גדול מאוד"][f]);
  };
  $("#fontUp").onclick = () => font(1);
  $("#fontDown").onclick = () => font(-1);
  $("#menuBtn").onclick = () => {
    const open = $("#mainNav").classList.toggle("open");
    $("#menuBtn").setAttribute("aria-expanded", open);
    $("#menuBtn").textContent = open ? "✕" : "☰";
  };
  applyPrefs();
}

// ---------- routing ----------
const Routes = {};
// קבוצות עמודים: כל קבוצה מופיעה כפריט אחד בתפריט הראשי, עם תפריט משנה
const PAGE_GROUPS = [
  { nav: "practice", label: "תרגול", pages: [["practice", "🧠 אימון יומי"], ["scenarios", "🤔 מה באפט היה עושה?"], ["lab", "🧪 מעבדת תרגול"], ["timemachine", "🕰️ מכונת הזמן"], ["glossary/cards", "🃏 כרטיסיות"]] },
  { nav: "tools", label: "כלים", pages: [["tools", "🧮 מחשבונים"], ["watchlist", "👁️ רשימת מעקב"], ["checklist", "✅ צ'קליסט באפט"], ["simulator", "🎯 סימולטור סווינג"], ["journal", "📓 יומן מסחר"]] },
  { nav: "library", label: "ידע", pages: [["library", "📚 ספרייה"], ["timeline", "📜 ציר הזמן"], ["formulas", "📐 דף נוסחאות"], ["glossary", "📖 מילון"], ["faq", "❓ שאלות נפוצות"]] }
];
const groupOf = (page, h) => PAGE_GROUPS.find(g => g.pages.some(p => p[0] === h || p[0] === page));
const TITLES = { home: "בית", path: "מסלול לימוד", tools: "כלים", simulator: "סימולטור סווינג", checklist: "צ'קליסט באפט", journal: "יומן מסחר", glossary: "מילון" };
function go(hash) { location.hash = hash; }
let firstRoute = true;
function router() {
  const h = location.hash.replace(/^#\/?/, "") || "home";
  const [page, ...rest] = h.split("/");
  const grp = groupOf(page, h);
  const navPage = page === "lesson" ? "path" : grp ? grp.nav : page;
  $$(".nav a").forEach(a => a.dataset.page === navPage ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  $("#mainNav").classList.remove("open"); $("#menuBtn").setAttribute("aria-expanded", "false"); $("#menuBtn").textContent = "☰";
  if (window.speechSynthesis) speechSynthesis.cancel();
  window.onscroll = null; $("#readbar").style.width = "0";
  const fn = Routes[page] || Routes.home;
  document.title = `${TITLES[page] || "בית"} — אקדמיית המשקיע`; // עמוד יכול לדרוס כותרת ספציפית
  fn(...rest);
  // תפריט משנה לקבוצת העמודים
  const cur = grp && (grp.pages.find(p => p[0] === h) || grp.pages.find(p => p[0] === page));
  $("#subnav").innerHTML = grp
    ? `<nav class="subnav" aria-label="${grp.label}">${grp.pages.map(p => `<a href="#${p[0]}" ${p === cur ? 'aria-current="page"' : ""}>${p[1]}</a>`).join("")}</nav>`
    : "";
  updateRankChip();
  window.scrollTo(0, 0);
  if (!firstRoute) app().focus({ preventScroll: true });
  firstRoute = false;
}

// ---------- HOME ----------
function nextLesson() {
  const lessons = ALL_LESSONS().filter(l => inTrack(l.levelId));
  return lessons.find(l => !(l.id in State.data.done)) || lessons[lessons.length - 1];
}

Routes.home = function () {
  const lessons = ALL_LESSONS();
  const doneN = Object.keys(State.data.done).length;
  const next = nextLesson();
  const q = QUOTES[new Date().getDate() % QUOTES.length];
  const r = currentRank();
  const st = streak();

  app().innerHTML = `
  <section class="card hero" aria-labelledby="heroTitle">
    <div>
      <h1 id="heroTitle">ללמוד להשקיע כמו <span>המשקיעים הגדולים בעולם</span></h1>
      <p class="muted">מסלול מובנה מאפס: יסודות, דוחות כספיים, הדרך של באפט וגרהאם, ניתוח לפי סקטורים, ניתוח טכני וסווינג מתקדם, ניהול סיכונים, פסיכולוגיה, מאקרו — ועד רמת מאסטר. עם בחנים, כלים, סימולטור ויומן מסחר.</p>
      <div class="row mt">
        <a class="btn" href="#lesson/${next.id}">${doneN ? "המשך ללמוד ←" : "התחל מאפס ←"}</a>
        <a class="btn ghost" href="#path">למסלול המלא</a>
      </div>
      <p class="small muted mt">השיעור הבא: <b>${next.levelIcon} ${esc(next.title)}</b></p>
    </div>
    <blockquote class="quote">"${q[0]}"<span class="who">— ${q[1]}</span></blockquote>
  </section>

  ${!State.data.profile ? `<a class="card plain start-banner mb" href="#start">
    <div class="row"><span style="font-size:2rem" aria-hidden="true">🚀</span>
      <div><b>חדש כאן? התחל כאן</b><div class="small muted">ענה על 4 שאלות וקבל תוכנית לימוד אישית: מסלול, שיעורים ראשונים וקצב.</div></div>
      <span class="spacer"></span><span class="btn small">בנה לי תוכנית ←</span></div></a>`
  : `<p class="small muted mb">🗓️ התוכנית שלך: ${TRACKS[State.data.profile.goal].name} · ${{ 1: 2, 3: 4, 5: 7 }[State.data.profile.time]} שיעורים בשבוע · <a href="#start">עדכון התוכנית</a></p>`}

  <div id="weeklyTeaser" class="mb"></div>
  ${window.homeDaily ? homeDaily() : ""}

  <h2>בחר את המסלול שלך</h2>
  <div class="track-grid mb" role="group" aria-label="בחירת מסלול לימוד">
    ${Object.entries(TRACKS).map(([k, t]) => `<button type="button" class="track" data-track="${k}" aria-pressed="${State.data.track === k}">
      <span aria-hidden="true" style="font-size:1.5rem">${t.icon}</span><b>${t.name}</b><span class="small muted">${t.desc}</span></button>`).join("")}
  </div>

  <div class="grid grid-3 mb">
    <div class="card stat"><div class="num">${doneN}/${lessons.length}</div><div class="lbl">שיעורים שהושלמו</div>
      <div class="progress mt" role="progressbar" aria-label="התקדמות במסלול" aria-valuemin="0" aria-valuemax="${lessons.length}" aria-valuenow="${doneN}"><div style="width:${(doneN / lessons.length * 100).toFixed(0)}%"></div></div></div>
    <div class="card stat"><div class="num" aria-hidden="true">${r.icon}</div><div class="lbl">הדרגה שלך: <b>${r.name}</b></div><div class="small muted">${State.data.xp} XP</div></div>
    <div class="card stat"><div class="num">${st} <span aria-hidden="true">🔥</span></div><div class="lbl">ימי לימוד ברצף</div><div class="small muted">${st ? "המשך כך! השלם שיעור היום" : "השלם שיעור כדי להתחיל רצף"}</div>
      ${window.dueCount ? `<a class="btn small mt" href="#practice">🧠 אימון יומי · ${dueCount()} שאלות</a>` : ""}</div>
  </div>

  <h2>🗺️ מפת המסע שלך</h2>
  <p class="small muted">${window.CURRICULUM.length} שלבים מאפס ועד רמת מאסטר. לחץ על שלב כדי להמשיך מהשיעור הבא בו.</p>
  ${window.journeyHTML ? journeyHTML() : ""}

  <h2 class="mt">כלי העבודה שלך</h2>
  <div class="grid grid-3">
    ${[
      ["🕰️", "מכונת הזמן", "חזור למשבר אמיתי — האם היית מחזיק?", "timemachine"],
      ["🧮", "מחשבון DCF ושווי פנימי", "כמה העסק באמת שווה + Reverse DCF", "tools/dcf"],
      ["🧩", "פירוק תשואה", "צמיחה, דיבידנד ושינוי מכפיל — מאיפה תגיע התשואה", "tools/returns"],
      ["📏", "מחשבון גודל פוזיציה", "חוק ה-1%, R:R ותוחלת", "tools/position"],
      ["👁️", "רשימת מעקב ותזות", "כתוב תזה, שווי ומחיר מעניין — וחכה בסבלנות", "watchlist"],
      ["🃏", "כרטיסיות מונחים", "חזרה על 90+ מונחים במשחק זיכרון", "glossary/cards"]
    ].map(t => `<a class="card" href="#${t[3]}"><div aria-hidden="true" style="font-size:1.6rem">${t[0]}</div><b>${t[1]}</b><p class="small muted" style="margin:4px 0 0">${t[2]}</p></a>`).join("")}
  </div>`;

  if (window.weeklyTeaser) weeklyTeaser($("#weeklyTeaser"));
  $$(".track").forEach(b => b.onclick = () => {
    State.data.track = b.dataset.track; State.save();
    toast(`נבחר: ${TRACKS[b.dataset.track].name}`);
    Routes.home();
  });
};

// ---------- PATH ----------
Routes.path = function () {
  app().innerHTML = `
    <h1>🗺️ מסלול הלימוד</h1>
    <p class="muted">מומלץ ללמוד לפי הסדר. שיעור נחשב שהושלם כשעוברים את הבוחן ב-70% ומעלה. מסלול נוכחי: <b>${TRACKS[State.data.track].icon} ${TRACKS[State.data.track].name}</b> (<a href="#home">שינוי</a>)</p>
    <div class="row mb">
      <div class="field" style="flex:1;min-width:240px">
        <label for="pathSearch">חיפוש בכל השיעורים</label>
        <input id="pathSearch" type="search" placeholder="למשל: ROIC, סטופ, דיבידנד, בועה..." autocomplete="off" />
      </div>
      <label class="row small" style="margin-top:22px;cursor:pointer"><input type="checkbox" id="onlyOpen" /> הצג רק שיעורים שלא הושלמו</label>
    </div>
    <div id="searchOut" aria-live="polite"></div>
    <a class="card plain capstone-banner mb" href="#capstone">
      <div class="row"><span style="font-size:1.8rem" aria-hidden="true">🎓</span>
        <div><b>מבנה הקורס</b><div class="small muted">כל שלב: שיעורים עם בוחן → משימה מעשית → מבחן שלב → תעודה. בסוף: מבחן גמר ופרויקט גמר — ניתוח מלא של חברה לבחירתך — ותעודת סיום הקורס.</div></div>
        <span class="spacer"></span><span class="btn small">לפרויקט הגמר ←</span></div></a>
    <div id="levelsOut"></div>
    <div class="row"><span class="spacer"></span>
      <button class="btn ghost small" type="button" onclick="resetProgress()">איפוס התקדמות</button>
    </div>`;

  const drawLevels = () => {
    const only = $("#onlyOpen").checked;
    $("#levelsOut").innerHTML = window.CURRICULUM.map((lv, i) => {
      const d = lv.lessons.filter(x => x.id in State.data.done).length;
      const items = lv.lessons.filter(ls => !only || !(ls.id in State.data.done));
      if (!items.length) return "";
      return `<section class="level ${inTrack(lv.id) ? "" : "dim"}" aria-labelledby="lv-${lv.id}">
        <div class="level-head">
          <div class="level-num" aria-hidden="true">${lv.icon}</div>
          <div><h2 id="lv-${lv.id}"><a class="plain-link" href="#level/${lv.id}">שלב ${i + 1}: ${esc(lv.title)}</a></h2><p>${esc(lv.subtitle)}${inTrack(lv.id) ? "" : " · לא במסלול שבחרת"}</p>
            <div class="row small level-links"><a href="#level/${lv.id}">📘 פתיחת השלב ומשימה</a><a href="#level/${lv.id}/exam">📝 מבחן שלב${window.lvExamScore && lvExamScore(lv.id) != null ? ` (${lvExamScore(lv.id)}%)` : ""}</a><a href="#summary/${lv.id}">📋 סיכום</a>
              ${window.lvExamScore && lvExamScore(lv.id) >= 80 && d === lv.lessons.length ? `<a href="#certificate/${lv.id}">🎓 תעודה</a>` : ""}</div></div>
          <div class="lvl-progress">${d}/${lv.lessons.length}<div class="progress" aria-hidden="true"><div style="width:${d / lv.lessons.length * 100}%"></div></div></div>
        </div>
        <ul class="lessons">
          ${items.map(ls => {
            const done = ls.id in State.data.done;
            const no = lv.lessons.indexOf(ls) + 1;
            return `<li><a class="lesson-tile ${done ? "done" : ""}" href="#lesson/${ls.id}">
              <span class="check" aria-hidden="true">${done ? "✅" : "○"}</span>
              <div class="t">${i + 1}.${no} ${esc(ls.title)}</div>
              <div class="m">⏱ ${ls.minutes} דק' · ${ls.quiz.length} שאלות${done ? ` · <span class="good">הושלם (${State.data.done[ls.id]}%)</span>` : ""}</div>
            </a></li>`;
          }).join("")}
        </ul>
      </section>`;
    }).join("") || `<p class="muted">כל הכבוד — השלמת את כל השיעורים! 🎉</p>`;
  };

  const index = ALL_LESSONS().map(l => ({ l, text: stripHtml(l.body + " " + l.takeaways.join(" ")) }));
  const search = q => {
    q = q.trim();
    if (q.length < 2) { $("#searchOut").innerHTML = ""; return; }
    const ql = q.toLowerCase();
    const hits = index.filter(x => x.l.title.toLowerCase().includes(ql) || x.text.toLowerCase().includes(ql)).slice(0, 12);
    const mark = s => esc(s).replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), m => `<mark>${m}</mark>`);
    $("#searchOut").innerHTML = `<h2 class="small muted">${hits.length ? `נמצאו ${hits.length} שיעורים` : "לא נמצאו תוצאות"}</h2>
      <ul class="search-results">${hits.map(({ l, text }) => {
        const p = text.toLowerCase().indexOf(ql);
        const snip = p >= 0 ? (p > 60 ? "…" : "") + text.slice(Math.max(0, p - 60), p + 100) + "…" : "";
        return `<li><a href="#lesson/${l.id}"><b>${l.levelIcon} ${mark(l.title)}</b><div class="small muted">${mark(snip)}</div></a></li>`;
      }).join("")}</ul>`;
  };
  $("#pathSearch").addEventListener("input", e => search(e.target.value));
  $("#onlyOpen").addEventListener("change", drawLevels);
  drawLevels();
};

function resetProgress() {
  if (!confirm("לאפס את כל ההתקדמות בשיעורים וה-XP? (היומן, הצ'קליסט וההערות יישמרו)")) return;
  State.data.done = {}; State.data.xp = 0; State.data.answered = {};
  State.save(); router();
}

// ---------- LESSON ----------
Routes.lesson = function (id) {
  const lessons = ALL_LESSONS();
  const idx = lessons.findIndex(l => l.id === id);
  if (idx < 0) return go("path");
  const L = lessons[idx];
  const level = window.CURRICULUM.find(l => l.id === L.levelId);
  const prev = lessons[idx - 1], next = lessons[idx + 1];
  document.title = `${L.title} — אקדמיית המשקיע`;

  app().innerHTML = `
  <div class="lesson-wrap">
    <article class="card" aria-labelledby="lessonTitle">
      <nav class="small muted" aria-label="מיקום"><a href="#path">מסלול</a> › <a href="#level/${level.id}">שלב ${L.levelNo}: ${esc(level.title)}</a></nav>
      <h1 id="lessonTitle">${esc(L.title)}</h1>
      <div class="row mb">
        <span class="pill">⏱ ${L.minutes} דקות</span><span class="pill">שיעור ${L.levelNo}.${L.lessonNo} · ${idx + 1} מתוך ${lessons.length}</span>
        ${L.id in State.data.done ? `<span class="pill green">✅ הושלם · ${State.data.done[L.id]}%</span>` : ""}
      </div>
      <div class="lesson-tools mb">
        <button class="btn ghost small" type="button" id="speakBtn" aria-pressed="false">🔊 הקרא לי</button>
        <a class="btn ghost small" href="#quiz">📝 קפוץ לבוחן</a>
        <a class="btn ghost small" href="#notesBox">✏️ ההערות שלי</a>
      </div>
      <div class="lesson-body" id="lessonBody">${L.body}</div>
      <section class="takeaways" aria-labelledby="tkTitle"><h2 id="tkTitle">✨ נקודות מפתח</h2><ul>${L.takeaways.map(t => `<li>${esc(t)}</li>`).join("")}</ul></section>

      <section class="quiz" id="quiz" aria-labelledby="quizTitle" tabindex="-1">
        <h2 id="quizTitle">📝 בוחן</h2>
        <p class="muted small">ענה על כל השאלות. 70% ומעלה = השיעור הושלם.</p>
        ${L.quiz.map((q, qi) => `
          <fieldset class="q" data-qi="${qi}">
            <legend>${qi + 1}. ${esc(q.q)}</legend>
            ${q.options.map((o, oi) => `<button type="button" class="opt" data-oi="${oi}">${esc(o)}</button>`).join("")}
            <div class="explain" aria-live="polite"></div>
          </fieldset>`).join("")}
        <div id="quizResult" aria-live="polite"></div>
      </section>

      <section class="notes mt" id="notesBox" aria-labelledby="notesTitle" tabindex="-1">
        <h2 id="notesTitle" style="font-size:1.15rem">✏️ ההערות שלי לשיעור</h2>
        <div class="field"><label for="lessonNotes" class="sr-only">ההערות שלי</label>
          <textarea id="lessonNotes" placeholder="מה למדתי? איך אשתמש בזה? שאלות לבדוק...">${esc(State.data.notes[L.id] || "")}</textarea>
          <div class="hint">נשמר אוטומטית בדפדפן הזה.</div></div>
      </section>

      <nav class="row mt" aria-label="ניווט בין שיעורים">
        ${prev ? `<a class="btn ghost" href="#lesson/${prev.id}" rel="prev">→ הקודם</a>` : ""}
        <span class="spacer"></span>
        ${next ? `<a class="btn ghost" href="#lesson/${next.id}" rel="next">הבא ←</a>` : ""}
      </nav>
    </article>
    <aside class="card lesson-side" aria-label="תוכן השיעור">
      <h2>בשיעור הזה</h2>
      <ol id="toc"></ol>
      <div class="lvl-list">
        <h2>שלב ${L.levelNo}: ${esc(level.title)}</h2>
        <ol>${level.lessons.map(x => `<li><a href="#lesson/${x.id}" ${x.id === id ? 'aria-current="page"' : ""}>${x.id in State.data.done ? "✅ " : ""}${esc(x.title)}</a></li>`).join("")}</ol>
      </div>
    </aside>
  </div>`;

  // wrap tables for horizontal scroll, build TOC
  $$("#lessonBody table").forEach(t => { const w = document.createElement("div"); w.className = "table-wrap"; w.tabIndex = 0; w.setAttribute("role", "region"); w.setAttribute("aria-label", "טבלה"); t.parentNode.insertBefore(w, t); w.appendChild(t); });
  const heads = $$("#lessonBody h3");
  heads.forEach((h, i) => h.id = "sec-" + i);
  $("#toc").innerHTML = heads.map((h, i) => `<li><a href="#" data-sec="sec-${i}">${esc(h.textContent)}</a></li>`).join("") +
    `<li><a href="#" data-sec="quiz">📝 בוחן</a></li>`;
  $$("#toc a, .lesson-tools a[href^='#quiz'], .lesson-tools a[href^='#notesBox']").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    const target = $("#" + (a.dataset.sec || a.getAttribute("href").slice(1)));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
    target.focus({ preventScroll: true });
  }));

  // reading progress
  window.onscroll = () => {
    const art = $(".lesson-wrap article"); if (!art) return;
    const r = art.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    $("#readbar").style.width = (p * 100) + "%";
  };

  // notes
  $("#lessonNotes").addEventListener("input", e => { State.data.notes[L.id] = e.target.value; State.save(); });

  // read aloud
  $("#speakBtn").onclick = () => {
    const btn = $("#speakBtn");
    if (!window.speechSynthesis) return toast("הדפדפן לא תומך בהקראה");
    if (speechSynthesis.speaking) { speechSynthesis.cancel(); btn.textContent = "🔊 הקרא לי"; btn.setAttribute("aria-pressed", "false"); return; }
    const voices = speechSynthesis.getVoices();
    const he = voices.find(v => /^he|^iw/i.test(v.lang));
    if (voices.length && !he) toast("לא נמצא קול עברי במכשיר — ההקראה עשויה להישמע לא טבעית");
    const text = L.title + ". " + stripHtml(L.body) + ". נקודות מפתח: " + L.takeaways.join(". ");
    // חלוקה למשפטים כדי לעקוף מגבלות אורך בדפדפנים
    const parts = text.match(/[^.!?。\n]+[.!?]?/g) || [text];
    parts.forEach((s, i) => {
      const u = new SpeechSynthesisUtterance(s);
      u.lang = "he-IL"; if (he) u.voice = he; u.rate = 1;
      if (i === parts.length - 1) u.onend = () => { btn.textContent = "🔊 הקרא לי"; btn.setAttribute("aria-pressed", "false"); };
      speechSynthesis.speak(u);
    });
    btn.textContent = "⏹ עצור הקראה"; btn.setAttribute("aria-pressed", "true");
  };

  // quiz
  const answers = {};
  $$(".q", app()).forEach(qEl => {
    const qi = +qEl.dataset.qi;
    const q = L.quiz[qi];
    $$(".opt", qEl).forEach(btn => btn.addEventListener("click", () => {
      if (qi in answers) return;
      const oi = +btn.dataset.oi;
      answers[qi] = oi === q.answer;
      $$(".opt", qEl).forEach((b, i) => {
        b.disabled = true;
        if (i === q.answer) { b.classList.add("correct"); b.setAttribute("aria-label", b.textContent + " — התשובה הנכונה"); }
        else if (i === oi) { b.classList.add("wrong"); b.setAttribute("aria-label", b.textContent + " — הבחירה שלך, שגויה"); }
      });
      $(".explain", qEl).textContent = (answers[qi] ? "✅ נכון! " : "❌ לא בדיוק. ") + q.explain;

      const key = L.id + ":" + qi;
      if (answers[qi] && !State.data.answered[key]) { State.data.answered[key] = 1; State.data.xp += 10; }
      if (Object.keys(answers).length === L.quiz.length) finishQuiz(L, answers, next);
      State.save(); updateRankChip();
    }));
  });
};

function finishQuiz(L, answers, next) {
  const correct = Object.values(answers).filter(Boolean).length;
  const score = Math.round(correct / L.quiz.length * 100);
  const passed = score >= 70;
  const wasDone = L.id in State.data.done;
  const before = currentRank().name;
  if (passed) {
    if (!wasDone) State.data.xp += 20;
    State.data.done[L.id] = Math.max(score, State.data.done[L.id] || 0);
    markStudyDay();
  }
  State.save();
  const after = currentRank();
  $("#quizResult").innerHTML = `
    <div class="result center">
      <div class="big">${score}%</div>
      <p>${correct} מתוך ${L.quiz.length} תשובות נכונות</p>
      ${passed
        ? `<p class="good"><b>🎉 כל הכבוד! השיעור הושלם.</b> ${streak() > 1 ? `🔥 רצף של ${streak()} ימים!` : ""}</p>
           ${(() => { const lv = window.CURRICULUM.find(l => l.id === L.levelId); return lv.lessons.every(x => x.id in State.data.done) ? `<p><b>🏅 השלמת את כל שיעורי השלב!</b> הצעד הבא: <a class="btn green small" href="#level/${lv.id}/exam">📝 מבחן השלב</a> <a class="btn ghost small" href="#level/${lv.id}">🛠️ המשימה המעשית</a></p>` : ""; })()}
           ${next ? `<a class="btn" href="#lesson/${next.id}">לשיעור הבא ←</a>` : `<a class="btn" href="#home">סיימת את כל המסלול! 👑</a>`}`
        : `<p class="bad"><b>צריך 70% כדי להשלים. קרא שוב את השיעור ונסה שוב.</b></p>
           <button class="btn" type="button" onclick="router()">נסה שוב</button>`}
    </div>`;
  if (after.name !== before) setTimeout(() => toast(`עלית דרגה! ${after.icon} ${after.name}`), 400);
  updateRankChip();
}

// ---------- GLOSSARY + FLASHCARDS ----------
Routes.glossary = function (mode = "list") {
  app().innerHTML = `
    <h1>📖 מילון מונחים</h1>
    <div class="tabs" role="tablist" aria-label="מצב תצוגה">
      <button role="tab" aria-selected="${mode === "list"}" onclick="go('glossary')">📋 רשימה</button>
      <button role="tab" aria-selected="${mode === "cards"}" onclick="go('glossary/cards')">🃏 כרטיסיות חזרה</button>
    </div>
    <div id="glBody"></div>`;
  mode === "cards" ? drawCards() : drawGlossaryList();
};

function drawGlossaryList() {
  $("#glBody").innerHTML = `
    <div class="field mb" style="max-width:420px"><label for="glq">חיפוש מונח</label><input id="glq" type="search" placeholder="עברית או אנגלית..." autocomplete="off" /></div>
    <p class="small muted" id="glCount" aria-live="polite"></p>
    <dl class="grid grid-2" id="gllist" style="margin:0"></dl>`;
  const draw = (q = "") => {
    const ql = q.trim().toLowerCase();
    const items = window.GLOSSARY.filter(g => !ql || g.join(" ").toLowerCase().includes(ql));
    $("#glCount").textContent = `${items.length} מונחים`;
    $("#gllist").innerHTML = items.map(g => `<div class="gl-item"><dt><b>${esc(g[0])}</b><span class="en" lang="en">${esc(g[1])}</span></dt><dd class="small">${esc(g[2])}</dd></div>`).join("");
  };
  $("#glq").addEventListener("input", e => draw(e.target.value));
  draw();
}

function drawCards() {
  const G = window.GLOSSARY;
  const known = State.data.cards;
  const knownN = G.filter(g => known[g[0]]).length;
  let deck = G.filter(g => !known[g[0]]).sort(() => Math.random() - 0.5);
  if (!deck.length) {
    $("#glBody").innerHTML = `<div class="card center"><div class="big">🏆</div><p>ידעת את כל ${G.length} המונחים!</p>
      <button class="btn" type="button" id="resetCards">התחל סבב חדש</button></div>`;
    $("#resetCards").onclick = () => { State.data.cards = {}; State.save(); drawCards(); };
    return;
  }
  let i = 0, shown = false;
  const render = () => {
    const g = deck[i];
    $("#glBody").innerHTML = `
      <p class="center muted">ידועים: <b>${G.filter(x => known[x[0]]).length}</b> מתוך ${G.length} · כרטיס ${i + 1} מתוך ${deck.length} בסבב</p>
      <div class="progress mb" style="max-width:560px;margin-inline:auto" aria-hidden="true"><div style="width:${G.filter(x => known[x[0]]).length / G.length * 100}%"></div></div>
      <div class="card flashcard" aria-live="polite">
        <div>
          <div class="term">${esc(g[0])}</div>
          <div class="muted" lang="en" dir="ltr">${esc(g[1])}</div>
          ${shown ? `<p class="mt">${esc(g[2])}</p>` : `<p class="mt muted small">נסה להיזכר בהגדרה, ואז הצג אותה</p>`}
        </div>
      </div>
      <div class="row mt" style="justify-content:center">
        ${shown
          ? `<button class="btn green" type="button" id="cKnow">✔ ידעתי</button><button class="btn red" type="button" id="cAgain">↻ עוד לא</button>`
          : `<button class="btn" type="button" id="cShow">הצג הגדרה</button>`}
      </div>
      <p class="center small muted mt">קיצורי מקלדת: רווח = הצג · 1 = ידעתי · 2 = עוד לא</p>`;
    const focusBtn = $("#cShow") || $("#cKnow");
    focusBtn.focus();
    if ($("#cShow")) $("#cShow").onclick = () => { shown = true; render(); };
    if ($("#cKnow")) $("#cKnow").onclick = () => { known[g[0]] = 1; State.save(); advance(); };
    if ($("#cAgain")) $("#cAgain").onclick = () => advance();
  };
  const advance = () => { shown = false; i++; if (i >= deck.length) { drawCards(); return; } render(); };
  document.onkeydown = e => {
    if (!location.hash.includes("glossary/cards") || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key === " " && $("#cShow")) { e.preventDefault(); $("#cShow").click(); }
    if (e.key === "1" && $("#cKnow")) $("#cKnow").click();
    if (e.key === "2" && $("#cAgain")) $("#cAgain").click();
  };
  render();
}

// ---------- boot ----------
window.addEventListener("hashchange", router);
window.addEventListener("load", () => {
  State.load();
  setupPrefs();
  // כפתור חזרה למעלה
  const top = $("#toTop");
  window.addEventListener("scroll", () => { top.hidden = window.scrollY < 700; }, { passive: true });
  top.onclick = () => { window.scrollTo({ top: 0, behavior: "smooth" }); app().focus({ preventScroll: true }); };
  if (window.speechSynthesis) speechSynthesis.getVoices();
  router();
});
