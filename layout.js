// ===================================================================
//  דף הבית, מסלול הלימוד ומפת האתר — מסודרים לפי חלקי הקורס
//  (נטען אחרון, אחרי כל שאר הקבצים)
// ===================================================================
TITLES.sitemap = "מפת האתר";

function firstOpenLesson(levelIds) {
  const ls = levelIds.flatMap(id => (window.CURRICULUM.find(l => l.id === id) || { lessons: [] }).lessons);
  return ls.find(x => !(x.id in State.data.done)) || ls[0];
}

function partCard(p) {
  const pr = partProgress(p), next = firstOpenLesson(p.levels);
  const state = pr.done === pr.total ? "✅ הושלם" : pr.done ? `${pr.done}/${pr.total} שיעורים` : `${pr.total} שיעורים`;
  return `<a class="card part-card kind-${p.kind}" href="#lesson/${next.id}" aria-label="${esc(p.title)} — ${state}">
    <div class="row"><span class="part-ic" aria-hidden="true">${p.icon}</span><b>${esc(p.title)}</b></div>
    <p class="small muted">${esc(p.desc)}</p>
    <div class="progress" aria-hidden="true"><div style="width:${pr.pct * 100}%"></div></div>
    <div class="small muted mt">${state} · ${p.levels.length} ${p.levels.length === 1 ? "שלב" : "שלבים"}</div>
  </a>`;
}

function termCard() {
  const G = window.GLOSSARY, g = G[Math.floor(Date.now() / 86400000) % G.length];
  return `<section class="card" aria-labelledby="dTerm"><div class="small muted">📖 מושג היום</div>
    <h2 id="dTerm" style="font-size:1.15rem;margin:6px 0 2px;color:var(--gold)">${esc(g[0])} <span class="small muted" lang="en" dir="ltr">${esc(g[1])}</span></h2>
    <p class="small">${esc(g[2])}</p><a class="small" href="#glossary/cards">חזרה בכרטיסיות ←</a></section>`;
}

Routes.home = function () {
  const lessons = ALL_LESSONS();
  const doneN = Object.keys(State.data.done).length;
  const next = nextLesson();
  const q = QUOTES[new Date().getDate() % QUOTES.length];
  const r = currentRank(), st = streak();
  const due = window.dueCount ? dueCount() : 0;

  app().innerHTML = `
  <section class="card hero" aria-labelledby="heroTitle">
    <div>
      <h1 id="heroTitle">ללמוד להשקיע כמו <span>המשקיעים הגדולים בעולם</span></h1>
      <p class="muted">קורס חינמי בעברית, מאפס: <b>ניתוח פונדמנטלי</b> (מה עסק שווה), <b>ניתוח טכני</b> (מתי ובאיזה סיכון), ניהול סיכונים ופסיכולוגיה — עם תרגול, כלים וניתוח שבועי.</p>
      <div class="row mt">
        <a class="btn" href="#lesson/${next.id}">${doneN ? "המשך ללמוד ←" : "התחל מאפס ←"}</a>
        ${State.data.profile ? `<a class="btn ghost" href="#path">למסלול המלא</a>` : `<a class="btn ghost" href="#start">🚀 תוכנית אישית</a>`}
      </div>
      <p class="small muted mt">השיעור הבא: <b>${next.levelIcon} ${esc(next.title)}</b></p>
    </div>
    <blockquote class="quote">"${q[0]}"<span class="who">— ${q[1]}</span></blockquote>
  </section>

  <div class="stats-strip" role="group" aria-label="ההתקדמות שלי">
    <a href="#progress"><b>${doneN}/${lessons.length}</b><span>שיעורים</span></a>
    <a href="#progress"><b>${r.icon} ${r.name}</b><span>${State.data.xp} XP</span></a>
    <a href="#progress"><b>${st} 🔥</b><span>ימי רצף</span></a>
  </div>

  <h2>היום</h2>
  <div class="today-row mb">
    <a class="card today-card" href="#practice"><div class="small muted">🧠 אימון יומי</div><h2 style="font-size:1.15rem;margin:6px 0">${due ? `${due} שאלות מחכות` : "חזרה מרווחת"}</h2><p class="small muted">5 דקות ביום ששומרות על מה שלמדת.</p><span class="btn small">לאימון ←</span></a>
    ${termCard()}
    <div id="weeklyTeaser"></div>
    <div id="newsTeaser"></div>
  </div>

  <h2>🗺️ הדרך שלך — ${PARTS.length} חלקים</h2>
  <p class="small muted">הניתוח הפונדמנטלי והניתוח הטכני לומדים בנפרד, ומשלבים ביניהם בחלק האחרון. לחץ על חלק כדי להמשיך מהשיעור הבא בו.</p>
  <div class="parts-grid">${PARTS.map(partCard).join("")}</div>

  <h2 class="mt">כלים מהירים</h2>
  <div class="quick-links">
    ${[["🧮", "מחשבון DCF", "tools/dcf"], ["📏", "גודל פוזיציה", "tools/position"], ["🔬", "מנתח יחסים", "tools/ratios"], ["🎯", "סימולטור סווינג", "simulator"], ["✅", "צ'קליסט באפט", "checklist"], ["👁️", "רשימת מעקב", "watchlist"], ["🤔", "מה באפט היה עושה?", "scenarios"], ["🕰️", "מכונת הזמן", "timemachine"], ["📐", "דף נוסחאות", "formulas"], ["🧭", "כל האתר", "sitemap"]]
      .map(t => `<a href="#${t[2]}"><span aria-hidden="true">${t[0]}</span> ${t[1]}</a>`).join("")}
  </div>

  <details class="card mt">
    <summary>⚙️ התאמת מסלול הלימוד${State.data.track !== "all" ? ` · נבחר: ${TRACKS[State.data.track].name}` : ""}</summary>
    <p class="small muted mt">המסלול קובע אילו שלבים מסומנים כ"שלך" ומה "השיעור הבא". תמיד אפשר ללמוד הכול.</p>
    <div class="track-grid" role="group" aria-label="בחירת מסלול לימוד">
      ${Object.entries(TRACKS).map(([k, t]) => `<button type="button" class="track" data-track="${k}" aria-pressed="${State.data.track === k}">
        <span aria-hidden="true" style="font-size:1.5rem">${t.icon}</span><b>${t.name}</b><span class="small muted">${t.desc}</span></button>`).join("")}
    </div>
  </details>`;

  if (window.weeklyTeaser) weeklyTeaser($("#weeklyTeaser"));
  if (window.newsTeaser) newsTeaser($("#newsTeaser"));
  $$(".track").forEach(b => b.onclick = () => {
    State.data.track = b.dataset.track; State.save();
    toast(`נבחר: ${TRACKS[b.dataset.track].name}`);
    Routes.home();
  });
};

// ===================== מסלול הלימוד =====================
Routes.path = function () {
  const track = TRACKS[State.data.track];
  app().innerHTML = `
    <h1>🗺️ מסלול הלימוד</h1>
    <p class="muted">${PARTS.length} חלקים · ${window.CURRICULUM.length} שלבים · ${ALL_LESSONS().length} שיעורים. שיעור נחשב שהושלם כשעוברים את הבוחן ב-70% ומעלה. מסלול נוכחי: <b>${track.icon} ${track.name}</b> (<a href="#home">שינוי</a>)</p>
    <div class="row mb">
      <div class="field" style="flex:1;min-width:240px">
        <label for="pathSearch">חיפוש בכל השיעורים</label>
        <input id="pathSearch" type="search" placeholder="למשל: ROIC, סטופ, דיבידנד, בועה..." autocomplete="off" />
      </div>
      <label class="row small" style="margin-top:22px;cursor:pointer"><input type="checkbox" id="onlyOpen" /> רק שיעורים שלא הושלמו</label>
    </div>
    <div class="row small mb"><button type="button" class="btn ghost small" id="openAll">פתח את כל השלבים</button><button type="button" class="btn ghost small" id="closeAll">סגור הכול</button>
      <a class="btn ghost small" href="#capstone">🎓 פרויקט גמר ותעודה</a><a class="btn ghost small" href="#sitemap">🧭 מפת האתר</a></div>
    <div id="searchOut" aria-live="polite"></div>
    <div id="levelsOut"></div>
    <div class="row mt"><span class="spacer"></span><button class="btn ghost small" type="button" onclick="resetProgress()">איפוס התקדמות</button></div>`;

  // השלב שבו ממשיכים (הראשון שיש בו שיעור שלא הושלם, במסלול הנוכחי)
  const current = window.CURRICULUM.find(lv => inTrack(lv.id) && !lvLessonsDone(lv)) || window.CURRICULUM[0];

  const drawLevels = (forceOpen) => {
    const only = $("#onlyOpen").checked;
    const html = PARTS.map(p => {
      const pr = partProgress(p);
      const levels = p.levels.map(id => window.CURRICULUM.find(l => l.id === id)).map(lv => {
        const i = window.CURRICULUM.indexOf(lv);
        const d = lv.lessons.filter(x => x.id in State.data.done).length;
        const items = lv.lessons.filter(ls => !only || !(ls.id in State.data.done));
        if (!items.length) return "";
        const ex = lvExamScore(lv.id);
        const open = forceOpen === true || (forceOpen !== false && (only || lv.id === current.id));
        return `<details class="level ${inTrack(lv.id) ? "" : "dim"}" ${open ? "open" : ""}>
          <summary><span class="level-num" aria-hidden="true">${lv.icon}</span>
            <span class="lv-title"><b>שלב ${i + 1}: ${esc(lv.title)}</b><span class="small muted">${esc(lv.subtitle)}${inTrack(lv.id) ? "" : " · לא במסלול שבחרת"}</span></span>
            <span class="lv-prog">${d}/${lv.lessons.length}</span></summary>
          <div class="level-body">
            <div class="row small level-links"><a href="#level/${lv.id}">📘 פתיחת השלב ומשימה</a><a href="#level/${lv.id}/exam">📝 מבחן שלב${ex != null ? ` (${ex}%)` : ""}</a><a href="#summary/${lv.id}">📋 סיכום</a>
              ${ex >= 80 && d === lv.lessons.length ? `<a href="#certificate/${lv.id}">🎓 תעודה</a>` : ""}</div>
            <ul class="lessons">${items.map(ls => {
              const done = ls.id in State.data.done, no = lv.lessons.indexOf(ls) + 1;
              return `<li><a class="lesson-tile ${done ? "done" : ""}" href="#lesson/${ls.id}">
                <span class="check" aria-hidden="true">${done ? "✅" : "○"}</span>
                <div class="t">${i + 1}.${no} ${esc(ls.title)}</div>
                <div class="m">⏱ ${ls.minutes} דק' · ${ls.quiz.length} שאלות${done ? ` · <span class="good">הושלם (${State.data.done[ls.id]}%)</span>` : ""}</div></a></li>`;
            }).join("")}</ul>
          </div></details>`;
      }).join("");
      if (!levels.trim()) return "";
      return `<section class="part-sec kind-${p.kind}" aria-labelledby="ph-${p.id}">
        <header class="part-head"><span class="part-ic" aria-hidden="true">${p.icon}</span>
          <div><h2 id="ph-${p.id}">${esc(p.title)}</h2><p class="small muted">${esc(p.desc)}</p></div>
          <div class="part-prog"><b>${pr.done}/${pr.total}</b><div class="progress" aria-hidden="true"><div style="width:${pr.pct * 100}%"></div></div></div></header>
        ${levels}</section>`;
    }).join("") || `<p class="muted">כל הכבוד — השלמת את כל השיעורים! 🎉</p>`;
    $("#levelsOut").innerHTML = html;
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
  $("#onlyOpen").addEventListener("change", () => drawLevels());
  $("#openAll").onclick = () => drawLevels(true);
  $("#closeAll").onclick = () => drawLevels(false);
  drawLevels();
};

// ===================== מפת האתר =====================
const SITEMAP = [
  ["📚 ללמוד", [["🚀", "התחל כאן — תוכנית אישית", "start", "ארבע שאלות ותוכנית לימוד"], ["🗺️", "מסלול הלימוד", "path", "כל השלבים והשיעורים, לפי חלקים"], ["🎓", "פרויקט הגמר ותעודות", "capstone", "ניתוח מלא של חברה, ותעודות סיום"], ["📋", "סיכומי שלבים", "path", "נקודות המפתח של כל שלב, בעמוד אחד"]]],
  ["🏢📉 ניתוח שבועי", [["🏠", "סקירת השבוע", "weekly/" + ((window.WEEKLY_MANIFEST || [])[0] || "") + "/overview", "מצב השוק ועשר המניות במבט אחד"], ["🏢", "ניתוח פונדמנטלי", "weekly/" + ((window.WEEKLY_MANIFEST || [])[0] || "") + "/fundamental", "שווי, חפיר ומחיר"], ["📉", "ניתוח טכני", "weekly/" + ((window.WEEKLY_MANIFEST || [])[0] || "") + "/technical", "מגמה, ממוצעים וסיכון"], ["🧩", "משולב", "weekly/" + ((window.WEEKLY_MANIFEST || [])[0] || "") + "/combined", "מתי העדשות מסכימות"], ["🔮", "תחזית ומחיר", "weekly/" + ((window.WEEKLY_MANIFEST || [])[0] || "") + "/outlook", "תרחישים ואזורי מרווח ביטחון"], ["📈", "כרטיס ביצועים ומכתבים", "weekly/scorecard", "כך נמדדים הניתוחים מול המדד"]]],
  ["🗞️ חדשות", [["🗞️", "מהדורה יומית — חדשות ומניות", "news", "מה הזיז את וול סטריט, עם מקורות וסימון למה שלא אומת"]]],
  ["🧠 לתרגל", [["🧠", "אימון יומי", "practice", "חזרה מרווחת"], ["🤔", "מה באפט היה עושה?", "scenarios", "תרחישי החלטה"], ["🧪", "מעבדת תרגול", "lab", "חישובים על דוחות"], ["🕰️", "מכונת הזמן", "timemachine", "האם היית שורד משבר?"], ["🃏", "כרטיסיות מונחים", "glossary/cards", "משחק זיכרון"]]],
  ["🧰 כלים", [["🧮", "מחשבונים", "tools", "DCF, פוזיציה, יחסים, ריבית דריבית, עצמאות כלכלית"], ["👁️", "רשימת מעקב ותזות", "watchlist", "כתוב תזה לפני הקנייה"], ["✅", "צ'קליסט באפט", "checklist", "ניתוח חברה צעד אחר צעד"], ["🎯", "סימולטור סווינג", "simulator", "גרפים לתרגול"], ["📓", "יומן מסחר", "journal", "תיעוד ותוחלת"]]],
  ["📖 ידע", [["📚", "ספריית המשקיע", "library", "19 ספרים"], ["📜", "ציר הזמן של השווקים", "timeline", "400 שנה של בועות וקריסות"], ["📐", "דף נוסחאות", "formulas", "כל הנוסחאות במקום אחד"], ["📖", "מילון מונחים", "glossary", "חיפוש מונחים"], ["❓", "שאלות נפוצות", "faq", "תשובות למתחילים"]]],
  ["👤 אישי", [["📊", "ההתקדמות שלי", "progress", "ציונים, גיבוי ושחזור"], ["🛡️", "אמינות ותיקונים", "about", "איך נבדק התוכן ויומן תיקונים"], ["♿", "הצהרת נגישות", "accessibility", "מה נעשה ומה המגבלות"]]]
];

Routes.sitemap = function () {
  app().innerHTML = `
    <h1>🧭 מפת האתר</h1>
    <p class="muted">כל מה שיש באתר במקום אחד. אפשר גם לחפש בכל האתר עם <kbd>Ctrl</kbd>+<kbd>K</kbd> או הקשה על <kbd>/</kbd>.</p>
    <div class="grid grid-2">${SITEMAP.map(([title, items]) => `
      <section class="card" aria-labelledby="sm-${esc(title)}"><h2 id="sm-${esc(title)}" style="font-size:1.15rem">${title}</h2>
        <ul class="sitemap-list">${items.map(i => `<li><a href="#${i[2]}"><span aria-hidden="true">${i[0]}</span> <b>${i[1]}</b></a><span class="small muted">${i[3]}</span></li>`).join("")}</ul></section>`).join("")}
    </div>
    <section class="card mt"><h2 style="font-size:1.15rem">🗺️ חלקי הקורס</h2>
      <ol class="sitemap-list">${PARTS.map(p => `<li><a href="#path"><span aria-hidden="true">${p.icon}</span> <b>${esc(p.title)}</b></a><span class="small muted">${esc(p.desc)}</span></li>`).join("")}</ol></section>`;
};

// ===================== ניווט תחתון בטלפון =====================
window.addEventListener("load", () => {
  const more = $("#bnMore");
  if (more) more.onclick = () => { $("#menuBtn").click(); window.scrollTo({ top: 0, behavior: "smooth" }); };
});
