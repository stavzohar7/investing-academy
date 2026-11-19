// ===================================================================
//  🗞️ חדשות ומניות — מהדורה יומית (מסכמת את יום המסחר הקודם בוול סטריט)
//  המהדורות נטענות מ-daily/<תאריך>.js לפי daily/manifest.js
// ===================================================================
TITLES.news = "חדשות ומניות — מהדורה יומית";

function loadEdition(id, cb) {
  window.NEWS_EDITIONS = window.NEWS_EDITIONS || {};
  if (window.NEWS_EDITIONS[id]) return cb(window.NEWS_EDITIONS[id]);
  const s = document.createElement("script");
  s.src = `daily/${id}.js`;
  s.onload = () => cb(window.NEWS_EDITIONS[id]);
  s.onerror = () => cb(null);
  document.body.appendChild(s);
}

const heDate = d => d.split("-").reverse().join(".");

function storyCard(s) {
  return `<article class="card mb news-story">
    <div class="row"><span class="chip">${esc(s.ticker)}</span><b>${esc(s.name)}</b><span class="spacer"></span><span class="news-move ${esc(s.tone || "mid")}">${s.move}</span></div>
    <h3>${esc(s.headline)}</h3>
    <p>${esc(s.what)}</p>
    <p><b>למה (לפי הדיווחים):</b> ${esc(s.why)}</p>
    <p class="news-lens"><b>🔎 איך לחשוב על זה:</b> ${esc(s.lens)}</p>
    <p class="small muted">✔️ ${esc(s.verified)}</p>
    <p class="small">מקורות: ${s.sources.map(x => `<a href="${esc(x.u)}" target="_blank" rel="noopener noreferrer">${esc(x.t)}</a>`).join(" · ")}${s.weekly ? ` · <a href="#weekly">הניתוח השבועי</a>` : ""}${(s.lessons || []).map(l => ` · <a href="#lesson/${l}">שיעור קשור</a>`).join("")}</p>
  </article>`;
}

Routes.news = function (id) {
  const man = window.NEWS_MANIFEST || [];
  if (!man.length) { app().innerHTML = `<h1>🗞️ חדשות ומניות</h1><p class="muted">אין עדיין מהדורות.</p>`; return; }
  const cur = id && man.find(m => m.id === id) ? id : man[0].id;
  app().innerHTML = `<p class="muted">טוען מהדורה…</p>`;
  loadEdition(cur, e => {
    if (!e) { app().innerHTML = `<h1>🗞️ חדשות ומניות</h1><p class="muted">לא הצלחנו לטעון את המהדורה. נסו לרענן.</p>`; return; }
    app().innerHTML = `
      <h1>🗞️ חדשות ומניות</h1>
      <p class="muted">מהדורה יומית בעברית על מה שהזיז את וול סטריט — בלי המלצות, עם מקורות, ועם סימון ברור למה שלא אימתנו.</p>
      <div class="field"><label for="edSel">מהדורה</label>
        <select id="edSel">${man.map(m => `<option value="${m.id}" ${m.id === cur ? "selected" : ""}>${heDate(m.id)} — ${esc(m.title)}</option>`).join("")}</select></div>
      <section class="card mb" aria-labelledby="nwmy"><h2 id="nwmy">👁️ המניות שלי בחדשות</h2>
        <div class="field"><label for="myTick">סימולי מניות מופרדים בפסיק (למשל NVDA, AAPL)</label><input id="myTick" dir="ltr" autocomplete="off" value="${esc(myTickers().join(", "))}"></div>
        <div id="myNews" aria-live="polite"></div></section>
      <section class="card mb" aria-labelledby="nw0">
        <p class="small muted">${esc(e.session)}${e.updated ? ` · עודכן ${esc(e.updated)}` : ""}</p>
        <h2 id="nw0">${esc(e.headline)}</h2>
        <p>${esc(e.summary)}</p>
        <div class="table-wrap"><table><caption class="sr-only">תנועות המדדים</caption>
          <thead><tr><th scope="col">מדד</th><th scope="col">שינוי</th><th scope="col">הערה</th></tr></thead>
          <tbody>${e.market.map(m => `<tr><th scope="row">${esc(m.name)}</th><td>${m.move}</td><td class="small">${esc(m.note)}</td></tr>`).join("")}</tbody></table></div>
        ${e.conflicts ? `<p class="small muted">⚠️ ${esc(e.conflicts)}</p>` : ""}
      </section>
      ${e.israel ? `<section class="card mb" aria-labelledby="nwil"><h2 id="nwil">🇮🇱 בישראל: ${esc(e.israel.headline)}</h2><ul>${e.israel.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul><p class="small">מקורות: ${e.israel.sources.map(x => `<a href="${esc(x.u)}" target="_blank" rel="noopener noreferrer">${esc(x.t)}</a>`).join(" · ")}</p></section>` : ""}
      <h2>מניות שהיו בחדשות</h2>
      ${e.stories.map(storyCard).join("")}
      <section class="card mb tip"><h2>💡 לקח היום: ${esc(e.lessonOfDay.title)}</h2><p>${esc(e.lessonOfDay.text)}</p><p><a href="${e.lessonOfDay.link}">${esc(e.lessonOfDay.linkText)}</a></p></section>
      <section class="card mb"><h2>⚠️ מה לא אומת</h2><ul>${e.notVerified.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        <p class="small muted">התוכן לימודי בלבד ואינו ייעוץ השקעות. טעינו? <a href="#about">יומן התיקונים</a>.</p></section>`;
    const inp = $("#myTick"); const draw = () => renderMyNews(man, $("#myNews"));
    inp.addEventListener("change", () => { localStorage.setItem(TICK_KEY, JSON.stringify(inp.value.split(/[,s]+/).map(x => x.trim().toUpperCase()).filter(Boolean))); draw(); });
    draw();
    $("#edSel").addEventListener("change", ev => { location.hash = "#news/" + ev.target.value; });
  });
};

// כרטיס קטן לעמוד הבית
window.newsTeaser = function (el) {
  const man = window.NEWS_MANIFEST || [];
  if (!el || !man.length) return;
  el.innerHTML = `<a class="card today-card" href="#news"><div class="small muted">🗞️ חדשות מהמהדורה האחרונה · ${heDate(man[0].id)}</div><b>${esc(man[0].title)}</b></a>`;
};

// ===================== רענון אוטומטי של חדשות =====================
// כל כמה דקות (וכשחוזרים ללשונית) בודקים אם פורסמה מהדורה חדשה, ומציעים לטעון אותה בלי לרענן את כל האתר.
(function () {
  let busy = false;
  function banner(id, title) {
    let b = document.getElementById("newsBanner");
    if (!b) { b = document.createElement("div"); b.id = "newsBanner"; b.className = "news-banner"; b.setAttribute("role", "status"); document.body.appendChild(b); }
    b.innerHTML = `🗞️ מהדורה חדשה: <b>${esc(title)}</b> <a class="btn small" href="#news/${esc(id)}">קרא</a> <button type="button" class="btn ghost small" aria-label="סגור הודעה">✕</button>`;
    b.querySelector("button").onclick = () => b.remove();
    b.querySelector("a").onclick = () => b.remove();
  }
  function check() {
    if (busy || document.hidden || !navigator.onLine) return;
    busy = true;
    fetch("daily/manifest.js?ts=" + Date.now(), { cache: "no-store" })
      .then(r => r.ok ? r.text() : Promise.reject())
      .then(t => {
        const known = (window.NEWS_MANIFEST || []).map(m => m.id);
        const prev = window.NEWS_MANIFEST;
        (0, eval)(t);
        const fresh = (window.NEWS_MANIFEST || []).filter(m => !known.includes(m.id));
        if (!fresh.length) return;
        if (window.newsTeaser && document.getElementById("newsTeaser")) newsTeaser(document.getElementById("newsTeaser"));
        banner(fresh[0].id, fresh[0].title);
      })
      .catch(() => {})
      .finally(() => { busy = false; });
  }
  setInterval(check, 10 * 60 * 1000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) check(); });
  setTimeout(check, 4000);
})();

// ===================== המניות שלי בחדשות =====================
const TICK_KEY = "ia-news-tickers";
function myTickers() { try { return JSON.parse(localStorage.getItem(TICK_KEY)) || []; } catch (e) { return []; } }
function renderMyNews(man, el) {
  const tk = myTickers();
  if (!tk.length) { el.innerHTML = `<p class="small muted">הוסף סימולים ונציג כאן כל כתבה שהזכירה אותם, מכל המהדורות.</p>`; return; }
  el.innerHTML = `<p class="small muted">מחפש…</p>`;
  let left = man.length; const found = [];
  man.forEach(m => loadEdition(m.id, e => {
    if (e) e.stories.forEach(s => { const syms = s.ticker.toUpperCase().split(/[^A-Z0-9.]+/).filter(Boolean); if (tk.some(x => syms.includes(x))) found.push({ id: m.id, s }); });
    if (--left) return;
    found.sort((x, y) => y.id.localeCompare(x.id));
    el.innerHTML = found.length ? found.map(f => `<p><span class="chip">${esc(f.s.ticker)}</span> <a href="#news/${esc(f.id)}">${heDate(f.id.slice(0, 10))}</a> — ${esc(f.s.headline)}</p>`).join("") : `<p class="small muted">לא נמצאו כתבות על ${esc(tk.join(", "))} במהדורות הקיימות.</p>`;
  }));
}
