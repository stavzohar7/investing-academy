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
      <section class="card mb" aria-labelledby="nw0">
        <p class="small muted">${esc(e.session)}</p>
        <h2 id="nw0">${esc(e.headline)}</h2>
        <p>${esc(e.summary)}</p>
        <div class="table-wrap"><table><caption class="sr-only">תנועות המדדים</caption>
          <thead><tr><th scope="col">מדד</th><th scope="col">שינוי</th><th scope="col">הערה</th></tr></thead>
          <tbody>${e.market.map(m => `<tr><th scope="row">${esc(m.name)}</th><td>${m.move}</td><td class="small">${esc(m.note)}</td></tr>`).join("")}</tbody></table></div>
        ${e.conflicts ? `<p class="small muted">⚠️ ${esc(e.conflicts)}</p>` : ""}
      </section>
      <h2>מניות שהיו בחדשות</h2>
      ${e.stories.map(storyCard).join("")}
      <section class="card mb tip"><h2>💡 לקח היום: ${esc(e.lessonOfDay.title)}</h2><p>${esc(e.lessonOfDay.text)}</p><p><a href="${e.lessonOfDay.link}">${esc(e.lessonOfDay.linkText)}</a></p></section>
      <section class="card mb"><h2>⚠️ מה לא אומת</h2><ul>${e.notVerified.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        <p class="small muted">התוכן לימודי בלבד ואינו ייעוץ השקעות. טעינו? <a href="#about">יומן התיקונים</a>.</p></section>`;
    $("#edSel").addEventListener("change", ev => { location.hash = "#news/" + ev.target.value; });
  });
};

// כרטיס קטן לעמוד הבית
window.newsTeaser = function (el) {
  const man = window.NEWS_MANIFEST || [];
  if (!el || !man.length) return;
  el.innerHTML = `<a class="card today-card" href="#news"><div class="small muted">🗞️ חדשות מהמהדורה האחרונה · ${heDate(man[0].id)}</div><b>${esc(man[0].title)}</b></a>`;
};
