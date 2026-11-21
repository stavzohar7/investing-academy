// ===================================================================
//  🎬 שיעור מוקרן: מצגת עם קריינות קולית (הקראה בעברית של הדפדפן), כתוביות ושליטה במהירות
//  נבנה אוטומטית מכל שיעור: שקף לכל כותרת משנה + שקף נקודות מפתח.
//  הערה: זה לא סרטון מצולם — הקול מגיע מהמכשיר, ואיכות העברית תלויה בקולות המותקנים בו.
// ===================================================================
TITLES.present = "שיעור מוקרן";
TITLES.watch = "קורס מוקרן";

function buildSlides(L) {
  const doc = new DOMParser().parseFromString("<div>" + L.body + "</div>", "text/html");
  const root = doc.body.firstChild;
  const raw = [{ title: L.title, nodes: [], intro: true }];
  let cur = raw[0];
  [...root.childNodes].forEach(n => {
    if (n.nodeType === 1 && n.tagName === "H3") { cur = { title: n.textContent.trim(), nodes: [] }; raw.push(cur); }
    else if (n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim())) cur.nodes.push(n);
  });
  const clean = s => s.replace(/[←→↑↓]/g, " ").replace(/\s+/g, " ").trim();
  const narr = n => {
    if (n.nodeType !== 1) return clean(n.textContent);
    if (n.tagName === "TABLE") return "הנתונים מוצגים בטבלה שעל המסך";
    return clean(n.textContent);
  };
  const slides = raw.filter(s => s.nodes.length).map(s => ({
    title: s.title, html: s.nodes.map(n => n.outerHTML || esc(n.textContent)).join(""),
    text: (s.intro ? s.title + ". " : s.title + ". ") + s.nodes.map(narr).filter(Boolean).join(". ")
  }));
  if (L.practical) slides.push({ title: "מה עושים בפועל", html: "<ol>" + L.practical.map(t => `<li>${esc(t)}</li>`).join("") + "</ol>", text: "מה עושים בפועל. " + L.practical.join(". ") });
  slides.push({ title: "סיכום השיעור", html: "<ul>" + L.takeaways.map(t => `<li>${esc(t)}</li>`).join("") + "</ul>", text: "נקודות מפתח. " + L.takeaways.join(". ") });
  return slides;
}

function videoBlock(v) {
  const el = v.yt ? `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(v.yt)}" title="סרטון השיעור" allowfullscreen loading="lazy" style="width:100%;aspect-ratio:16/9;border:0;border-radius:12px"></iframe>` : `<video controls preload="none" src="${esc(v.src)}" style="width:100%;border-radius:12px"></video>`;
  return `<section class="card mb"><h2 style="margin-top:0">🎥 סרטון השיעור</h2>${el}</section>`;
}
Routes.present = function (id) {
  const L = ALL_LESSONS().find(x => x.id === resolveLessonId(id));
  if (!L) { Routes.watch(); return; }
  document.title = `🎬 ${L.title} — אקדמיית המשקיע`;
  const slides = buildSlides(L);
  const all = ALL_LESSONS(), nextL = all[all.findIndex(x => x.id === id) + 1];
  let si = 0, ci = 0, playing = false, gen = 0, chunks = [], rate = +(Prefs.get().presRate) || 1, caps = true, timer = null;
  const hasTTS = !!window.speechSynthesis;
  const voices = () => hasTTS ? speechSynthesis.getVoices() : [];
  const heVoice = () => voices().find(v => /^he|^iw/i.test(v.lang));
  const stillHere = g => g === gen && location.hash.startsWith("#present");

  app().innerHTML = `
    <p class="small"><a href="#lesson/${esc(id)}">← לשיעור הכתוב</a> · <a href="#watch">כל השיעורים המוקרנים</a></p>
    ${(window.LESSON_VIDEOS || {})[id] ? videoBlock((window.LESSON_VIDEOS || {})[id]) : ""}
    <section class="pstage card" id="stage" aria-label="שיעור מוקרן: ${esc(L.title)}">
      <div class="stage-top"><span class="avatar" id="avatar" aria-hidden="true">🎙️</span><div><div class="small muted" id="stageCount"></div><h1 id="stageTitle" class="stage-h"></h1></div></div>
      <div class="stage-body lesson-body" id="stageBody" tabindex="0"></div>
      <p class="caption" id="caption" aria-live="off"></p>
      <div class="progress" aria-hidden="true"><div id="presBar" style="width:0"></div></div>
      <div class="controls row" role="group" aria-label="בקרת הקרנה">
        <button type="button" class="btn ghost" id="pPrev" aria-label="שקף קודם">⏮</button>
        <button type="button" class="btn" id="pPlay" aria-label="נגן">▶ נגן</button>
        <button type="button" class="btn ghost" id="pNext" aria-label="שקף הבא">⏭</button>
        <label class="small">מהירות <select id="pRate"><option value="0.8">0.8×</option><option value="1">1×</option><option value="1.2">1.2×</option><option value="1.5">1.5×</option></select></label>
        <button type="button" class="btn ghost small" id="pCaps" aria-pressed="true">כתוביות: פעיל</button>
        <button type="button" class="btn ghost small" id="pFull">מסך מלא</button>
      </div>
      <p class="small muted" id="pNote"></p>
    </section>
    <p class="small muted">קיצורים: רווח = נגן/השהה · ← → = שקף הבא/קודם. זו הקראה אוטומטית של תוכן השיעור, לא סרטון מצולם.</p>`;
  $("#pRate").value = String(rate);
  if (!hasTTS) $("#pNote").textContent = "הדפדפן אינו תומך בהקראה — אפשר לעבור בין השקפים ידנית או בטיימר.";
  else {
    const chk = () => { if (voices().length && !heVoice()) $("#pNote").textContent = "לא נמצא קול עברי במכשיר זה, לכן הקריינות עשויה להישמע לא טבעית או לא להישמע. ב-Windows/Android/iOS אפשר להתקין קול עברי בהגדרות השפה והדיבור."; };
    chk(); speechSynthesis.onvoiceschanged = chk;
  }

  const split = t => (t.match(/[^.!?\n]+[.!?]?/g) || [t]).map(s => s.trim()).filter(s => s.length > 1);
  function stop() { gen++; clearTimeout(timer); if (hasTTS) speechSynthesis.cancel(); $("#avatar").classList.remove("talk"); }
  function setPlaying(p) { playing = p; $("#pPlay").textContent = p ? "⏸ השהה" : "▶ נגן"; $("#pPlay").setAttribute("aria-label", p ? "השהה" : "נגן"); if (!p) $("#avatar").classList.remove("talk"); }
  function render() {
    const s = slides[si];
    $("#stageCount").textContent = `שקף ${si + 1} מתוך ${slides.length} · ${L.levelIcon || ""} ${L.title}`;
    $("#stageTitle").textContent = s.title;
    $("#stageBody").innerHTML = s.html + (si === slides.length - 1 ? `<div class="row mt"><a class="btn" href="#lesson/${esc(id)}">לבוחן ←</a>${nextL ? `<a class="btn ghost" href="#present/${esc(nextL.id)}">השיעור המוקרן הבא ←</a>` : ""}</div>` : "");
    $("#presBar").style.width = ((si + 1) / slides.length * 100) + "%";
    $("#caption").textContent = ""; chunks = split(s.text); ci = 0;
  }
  function speak() {
    if (!playing) return; const g = gen;
    if (ci >= chunks.length) {
      if (si < slides.length - 1) { si++; stop(); render(); speak(); }
      else { setPlaying(false); stop(); if (window.State) { State.data.xp += 5; State.save(); } }
      return;
    }
    const text = chunks[ci];
    if (caps) $("#caption").textContent = text;
    $("#avatar").classList.add("talk");
    const done = () => { if (!stillHere(g)) return; ci++; speak(); };
    if (!hasTTS) { timer = setTimeout(done, Math.max(1200, text.length * 70 / rate)); return; }
    const u = new SpeechSynthesisUtterance(text); u.lang = "he-IL"; const v = heVoice(); if (v) u.voice = v; u.rate = rate;
    u.onend = done; u.onerror = e => { if (e.error !== "interrupted" && e.error !== "canceled") done(); };
    speechSynthesis.speak(u);
  }
  const go = d => { const wasPlaying = playing; stop(); si = Math.max(0, Math.min(slides.length - 1, si + d)); render(); if (wasPlaying) { playing = true; speak(); } };
  $("#pPlay").onclick = () => { if (playing) { setPlaying(false); stop(); } else { setPlaying(true); stop(); speak(); } };
  $("#pNext").onclick = () => go(1); $("#pPrev").onclick = () => go(-1);
  $("#pRate").onchange = e => { rate = +e.target.value; Prefs.set("presRate", rate); if (playing) { stop(); speak(); } };
  $("#pCaps").onclick = e => { caps = !caps; e.target.setAttribute("aria-pressed", caps); e.target.textContent = "כתוביות: " + (caps ? "פעיל" : "כבוי"); if (!caps) $("#caption").textContent = ""; };
  $("#pFull").onclick = () => { const st = $("#stage"); if (document.fullscreenElement) document.exitFullscreen(); else if (st.requestFullscreen) st.requestFullscreen(); };
  window.onkeydown = e => {
    if (!location.hash.startsWith("#present") || /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
    if (e.key === " ") { e.preventDefault(); $("#pPlay").click(); }
    else if (e.key === "ArrowLeft") go(1); else if (e.key === "ArrowRight") go(-1);
  };
  render();
};

Routes.watch = function () {
  const mins = L => Math.max(2, Math.round(stripHtml(L.body).split(/\s+/).length / 130));
  app().innerHTML = `<h1>🎬 קורס מוקרן</h1>
    <p class="muted">כל שיעור כמצגת עם קריינות קולית וכתוביות, כדי ללמוד בנסיעה, בהליכה או בלי לקרוא. ההקראה נעשית במכשיר שלך (קול עברי של הדפדפן) — זו לא הקלטה, ואיכותה תלויה במכשיר.</p>
    ${CURRICULUM.map(l => `<section class="card mb"><h2>${l.icon || ""} ${esc(l.title)}</h2><ul class="watch-list">${l.lessons.map(s => `<li><a href="#present/${s.id}">▶ ${esc(s.title)}</a> <span class="small muted">· כ-${mins(s)} דק׳</span></li>`).join("")}</ul></section>`).join("")}`;
};

// ===================== תסריטים לסרטונים =====================
TITLES.scripts = "תסריטים לסרטוני שיעור";
function lessonScriptAuto(L) {
  const slides = buildSlides(L);
  const sentences = t => (t.match(/[^.!?\n]+[.!?]?/g) || [t]).map(s => s.trim()).filter(s => s.length > 3);
  const parts = slides.map((s, i) => {
    if (i === slides.length - 2 && L.practical) return "מה עושים בפועל:\n" + L.practical.map((t, k) => `${k + 1}. ${t}`).join("\n");
    if (i === slides.length - 1) return "סיכום — נקודות המפתח:\n" + L.takeaways.map((t, k) => `${k + 1}. ${t}`).join("\n");
    const body = sentences(s.text.slice(s.title.length + 1)).slice(0, 3).join(" ");
    return `${i === 0 ? "פתיחה" : s.title}:\n${body}`;
  });
  return `שיעור: ${L.title}\nמשך מוערך: כ-${Math.max(2, Math.round(parts.join(" ").split(/\s+/).length / 130))} דקות\n\n` + parts.join("\n\n") + "\n\nסיום: בדקו את עצמכם בבוחן שבסוף השיעור באתר. התוכן לימודי בלבד ואינו ייעוץ השקעות.";
}
Routes.scripts = function () {
  app().innerHTML = `<h1>📜 תסריטים לסרטוני שיעור</h1>
    <p class="muted">טיוטות תסריט לכל שיעור, שנבנו אוטומטית מתוכן השיעור (פתיחה, שלושת המשפטים הראשונים בכל חלק, וסיכום). הן נועדו להדבקה בכלי להפקת סרטון עם דמות מדברת. <b>עברו עליהן לפני ההפקה</b> — טבלאות ומספרים כדאי לוודא מול השיעור המלא.</p>
    <p><button type="button" class="btn" id="dlAll">⬇️ הורד את כל התסריטים (קובץ טקסט)</button></p>
    ${CURRICULUM.map(l => `<section class="card mb"><h2>${l.icon || ""} ${esc(l.title)}</h2>${l.lessons.map(s => `<details><summary>${esc(s.title)}${window.HAND_SCRIPTS && (s.parts || [s.id]).every(i => HAND_SCRIPTS[i]) ? ' <span class="pill green">✍️ תסריט ערוך</span>' : ''}</summary><pre class="script" dir="rtl">${esc(lessonScript(Object.assign({ levelIcon: l.icon }, s)))}</pre><button type="button" class="btn ghost small" data-copy="${s.id}">העתק תסריט</button></details>`).join("")}</section>`).join("")}`;
  $$("[data-copy]").forEach(b => b.onclick = () => {
    const L = ALL_LESSONS().find(x => x.id === b.dataset.copy);
    (navigator.clipboard ? navigator.clipboard.writeText(lessonScript(L)) : Promise.reject()).then(() => toast("התסריט הועתק"), () => toast("ההעתקה נכשלה — סמן והעתק ידנית"));
  });
  $("#dlAll").onclick = () => {
    const txt = ALL_LESSONS().map(L => lessonScript(L)).join("\n\n==========\n\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([txt], { type: "text/plain;charset=utf-8" })); a.download = "video-scripts.txt"; a.click();
  };
};

function lessonScript(L) {
  const H = window.HAND_SCRIPTS || {}, ids = L.parts || [L.id], hs = ids.filter(i => H[i]);
  const hand = hs.map(i => H[i]).join("\n\n==========\n\n");
  if (hs.length === ids.length) return hand;
  const auto = lessonScriptAuto(L);
  return hs.length ? hand + "\n\n==========\n\n[טיוטה אוטומטית לכל השיעור המאוחד — החלקים שלא נערכו ידנית]\n\n" + auto : auto;
}
