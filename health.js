// ===================================================================
//  🩺 בדיקת בריאות פיננסית: 10 שאלות, ציון בכל תחום וסדר עדיפויות לתיקון
//  כלי לימוד בלבד. הציון מבוסס על כללי אצבע מקובלים ואינו אבחון או ייעוץ.
// ===================================================================
TITLES.health = "בדיקת בריאות פיננסית";

const HEALTH_DOMAINS = {
  cushion: { name: "כרית ביטחון", icon: "🛟", link: "money/goal", linkText: "מחשבון כרית ביטחון", weak: "אין עדיין מספיק כסף נזיל לתקופה בלי הכנסה. זה הבסיס שמגן על כל שאר ההחלטות.", ok: "יש לכם כרית שמגינה מהפתעות." },
  debt: { name: "חובות", icon: "💳", link: "money/debt", linkText: "מחשבון חובות", weak: "חוב בריבית גבוהה גוזל כסף בכל חודש. סגירה שלו היא לרוב ה'תשואה' הבטוחה ביותר שיש.", ok: "החובות בשליטה." },
  budget: { name: "תקציב וחיסכון", icon: "🧾", link: "money/budget", linkText: "מתכנן תקציב", weak: "לא ברור לאן הכסף הולך או כמה נשאר בסוף החודש. תקציב פשוט נותן שליטה.", ok: "אתם יודעים לאן הכסף הולך וחוסכים." },
  pension: { name: "פנסיה וטווח ארוך", icon: "🏛️", link: "compare", linkText: "השוואת עלויות", weak: "חיסכון ארוך טווח הוא התחום שבו הזמן עובד בשבילכם. שווה לבדוק הפקדות ודמי ניהול.", ok: "יש חיסכון ארוך טווח שאתם עוקבים אחריו." },
  plan: { name: "תכנון ומעקב", icon: "🎯", link: "finance", linkText: "תוכנית 12 חודשים", weak: "בלי מטרה כתובה וחזרה קבועה קשה להתקדם. מטרה אחת ובדיקה אחת בשלושה חודשים מספיקות להתחלה.", ok: "יש לכם מטרה ובדיקה קבועה." }
};

// כל שאלה: דומיין, ו-4 תשובות מ-0 (חלש) עד 3 (חזק)
const HEALTH_Q = [
  { d: "cushion", q: "כמה חודשי הוצאות יש לכם בצד, בכסף שאפשר למשוך מהר?", o: ["אין כלום בצד", "פחות מחודש", "בין חודש לשלושה", "שלושה חודשים ויותר"] },
  { d: "cushion", q: "איפה הכסף הזה נמצא?", o: ["אין כסף כזה", "מעורב בחשבון השוטף, קל לבזבז", "בחשבון נפרד אבל לא תמיד נוגעים בו", "בחשבון או פיקדון נפרד, נזיל, ורק לשעת חירום"] },
  { d: "debt", q: "יש לכם חוב בריבית גבוהה (כרטיס אשראי, מינוס קבוע, הלוואה יקרה)?", o: ["כן, והוא גדל", "כן, ואני משלם אותו בעקביות", "יש מעט, ויש תוכנית לסגור", "אין"] },
  { d: "debt", q: "איזה חלק מההכנסה נטו הולך להחזרי הלוואות (לא כולל דיור)?", o: ["מעל 30%", "בין 15% ל-30%", "עד 15%", "אין החזרים"] },
  { d: "budget", q: "האם אתם יודעים בערך כמה אתם מוציאים בחודש?", o: ["לא יודע", "מעריך, בלי מעקב", "עוקב מדי פעם", "יש תקציב ואני עוקב בקביעות"] },
  { d: "budget", q: "איזה חלק מההכנסה נטו נשאר בסוף החודש לחיסכון?", o: ["אני במינוס או על הקצה", "עד 5%", "5% עד 15%", "מעל 15%"] },
  { d: "pension", q: "האם יש הפקדות שוטפות לפנסיה או לחיסכון ארוך טווח?", o: ["לא, או שאיני יודע", "יש, אבל מעולם לא בדקתי פרטים", "יש, ובדקתי את ההפקדות בשנה האחרונה", "יש, וגם מעקב אחר סכום, מסלול ועלויות"] },
  { d: "pension", q: "האם אתם יודעים מה דמי הניהול שאתם משלמים על החיסכון הארוך?", o: ["לא יודע מה זה", "שמעתי, לא בדקתי", "יודע בערך", "בדקתי והשוויתי בכתב"] },
  { d: "plan", q: "האם יש לכם מטרה כספית כתובה, עם סכום ותאריך?", o: ["אין", "יש בראש", "כתובה, בלי תוכנית חודשית", "כתובה, עם הפקדה חודשית"] },
  { d: "plan", q: "מתי בפעם האחרונה עצרתם לבדוק את המצב הכספי הכולל שלכם?", o: ["אף פעם", "לפני יותר משנה", "בחצי השנה האחרונה", "ב-3 החודשים האחרונים"] }
];

const healthLoad = () => { try { const x = JSON.parse(localStorage.getItem("ia-health")); if (x && Array.isArray(x.ans)) { if (x.ans.length !== HEALTH_Q.length) x.ans = Array(HEALTH_Q.length).fill(null); if (!Array.isArray(x.hist)) x.hist = []; return x; } } catch (e) { /* ignore */ } return { ans: Array(HEALTH_Q.length).fill(null), hist: [] }; };

function healthScore(ans) {
  const dom = {};
  Object.keys(HEALTH_DOMAINS).forEach(k => dom[k] = { pts: 0, max: 0, n: 0 });
  HEALTH_Q.forEach((q, i) => { if (ans[i] === null || ans[i] === undefined) return; dom[q.d].pts += ans[i]; dom[q.d].max += 3; dom[q.d].n++; });
  const pts = Object.values(dom).reduce((a, x) => a + x.pts, 0), max = Object.values(dom).reduce((a, x) => a + x.max, 0);
  return { dom, total: max ? Math.round(pts / max * 100) : 0 };
}

Routes.health = function () {
  const st = healthLoad();
  app().innerHTML = `
    <h1>🩺 בדיקת בריאות פיננסית</h1>
    <p class="muted">עשר שאלות, בערך שלוש דקות. בסוף מקבלים ציון בכל תחום ושלושה צעדים לפי סדר עדיפויות, עם קישור לכלי המתאים באתר. אין תשובה "נכונה": המטרה היא לראות איפה כדאי להתחיל.</p>
    <div class="box warn"><b>כלי לימוד כללי, לא אבחון ולא ייעוץ.</b> הציון מבוסס על כללי אצבע מקובלים (למשל כרית של שלושה עד שישה חודשי הוצאות) שאינם מתאימים לכל מצב. התשובות נשמרות בדפדפן שלכם בלבד.</div>
    <form id="hForm" class="mt">${HEALTH_Q.map((q, i) => `<fieldset class="q card mb"><legend><b>${i + 1}. ${esc(q.q)}</b> <span class="small muted">(${HEALTH_DOMAINS[q.d].icon} ${HEALTH_DOMAINS[q.d].name})</span></legend>${q.o.map((o, k) => `<label class="opt-row"><input type="radio" name="hq${i}" value="${k}" ${st.ans[i] === k ? "checked" : ""}> <span>${esc(o)}</span></label>`).join("")}</fieldset>`).join("")}</form>
    <section class="card" aria-labelledby="hR" aria-live="polite"><h2 id="hR">התוצאה</h2><div id="hRes"></div></section>
    <section class="card mt" aria-labelledby="hH"><h2 id="hH">ההיסטוריה שלי</h2><div id="hHist"></div></section>
    <p class="small muted mt">התוכן לימודי בלבד ואינו ייעוץ פיננסי, פנסיוני או מס.</p>`;

  const save = () => { try { localStorage.setItem("ia-health", JSON.stringify(st)); } catch (e) { /* ignore */ } };
  const level = p => p >= 75 ? ["יציב", "good"] : p >= 45 ? ["בדרך", ""] : ["בונים בסיס", "bad"];
  const renderHist = () => {
    const el = document.getElementById("hHist");
    el.innerHTML = st.hist.length ? `<div class="table-wrap"><table><caption class="sr-only">היסטוריית ציונים</caption><thead><tr><th scope="col">תאריך</th><th scope="col">ציון</th></tr></thead><tbody>${st.hist.slice().reverse().map(h => `<tr><td>${esc(h.date.split("-").reverse().join("."))}</td><td>${h.score}</td></tr>`).join("")}</tbody></table></div>
      <p class="small muted">כדאי לחזור על הבדיקה אחרי שלושה חודשים ולראות מה השתנה.</p>` : `<p class="muted">עדיין אין. אחרי שתענו על כל השאלות אפשר לשמור את הציון ולעקוב אחריו.</p>`;
  };
  const render = () => {
    const answered = st.ans.filter(a => a !== null).length, out = document.getElementById("hRes");
    if (answered < HEALTH_Q.length) { out.innerHTML = `<p class="muted">ענו על כל השאלות כדי לראות תוצאה (${answered} מתוך ${HEALTH_Q.length}).</p>`; return; }
    const sc = healthScore(st.ans), lv = level(sc.total);
    const rows = Object.entries(HEALTH_DOMAINS).map(([k, d]) => ({ k, d, p: Math.round(sc.dom[k].pts / sc.dom[k].max * 100) }));
    // סדר עדיפויות קבוע: קודם חוב וכרית (הגנה), אחר כך שאר התחומים; רק תחומים מתחת ל-75
    const order = ["debt", "cushion", "budget", "pension", "plan"];
    const steps = rows.filter(r => r.p < 75).sort((a, b) => order.indexOf(a.k) - order.indexOf(b.k)).slice(0, 3);
    out.innerHTML = `
      <p style="font-size:1.6rem;margin:.2em 0"><b class="${lv[1]}">${sc.total}</b> <span class="small muted">מתוך 100 · ${lv[0]}</span></p>
      <div class="table-wrap"><table><caption class="sr-only">ציון לפי תחום</caption><thead><tr><th scope="col">תחום</th><th scope="col">ציון</th><th scope="col">מצב</th></tr></thead>
      <tbody>${rows.map(r => `<tr><th scope="row">${r.d.icon} ${r.d.name}</th><td>${r.p}</td><td class="small">${r.p >= 75 ? esc(r.d.ok) : esc(level(r.p)[0])}</td></tr>`).join("")}</tbody></table></div>
      ${steps.length ? `<h3>שלושה צעדים להתחלה</h3><ol>${steps.map(r => `<li><b>${r.d.icon} ${r.d.name}:</b> ${esc(r.d.weak)} <a href="#${r.d.link}">${r.d.linkText} ←</a></li>`).join("")}</ol>` : `<p class="good"><b>כל התחומים במצב יציב.</b> המשיכו לבדוק אחת לכמה חודשים ולעדכן מטרות.</p>`}
      <p class="small muted">הסדר: קודם חוב יקר וכרית ביטחון, כי הם מגינים על כל השאר. זה סדר כללי ואינו תחליף לבדיקה של המצב המלא שלכם. להתאמה אישית אפשר להיעזר ביועץ מורשה.</p>
      <button type="button" class="btn small" id="hSave">שמרו את הציון בהיסטוריה</button> <button type="button" class="btn ghost small" id="hReset">התחילו מחדש</button>`;
    document.getElementById("hSave").onclick = () => {
      const today = new Date().toISOString().slice(0, 10);
      st.hist = st.hist.filter(h => h.date !== today).concat([{ date: today, score: sc.total }]).slice(-12);
      save(); renderHist();
    };
    document.getElementById("hReset").onclick = () => { st.ans = Array(HEALTH_Q.length).fill(null); save(); Routes.health(); window.scrollTo({ top: 0 }); };
  };
  document.getElementById("hForm").addEventListener("change", e => {
    const m = /^hq(\d+)$/.exec(e.target.name || "");
    if (!m) return;
    st.ans[+m[1]] = +e.target.value; save(); render();
  });
  render(); renderHist();
};

// הציון האחרון שנשמר בהיסטוריה
window.healthLast = function () { const h = healthLoad().hist; return h.length ? h[h.length - 1] : null; };
// תזכורת בדף הבית: חזרה על הבדיקה אחרי 90 יום (מתווספת לתזכורת התנהלות כספית אם יש)
window.healthReminder = function (el) {
  if (!el) return;
  const l = healthLast(); if (!l) return;
  const days = Math.floor((Date.now() - new Date(l.date).getTime()) / 86400000);
  if (days >= 90) el.insertAdjacentHTML("beforeend", '<a class="card today-card" href="#health"><div class="small muted">🩺 עברו ' + days + ' ימים מבדיקת הבריאות הפיננסית האחרונה</div><b>זמן לבדיקה חוזרת: 3 דקות, ואפשר לראות מה השתנה</b></a>');
};
