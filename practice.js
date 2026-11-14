// ===================================================================
//  🧠 אימון יומי (חזרה מרווחת) + 👁️ רשימת מעקב ותזות
// ===================================================================
TITLES.practice = "אימון יומי";
TITLES.watchlist = "רשימת מעקב ותזות";

// ---------- חזרה מרווחת (שיטת לייטנר) ----------
// כל שאלה ממשיכה ל"קופסה" גבוהה יותר כשעונים נכון, וחוזרת לקופסה 1 כשטועים.
const SRS_DAYS = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 };
const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return todayStr(d); };

function srsPool() {
  const done = Object.keys(State.data.done);
  const lessons = ALL_LESSONS();
  // אם עדיין לא הושלמו שיעורים — מתרגלים מהשלב הראשון
  const src = done.length ? lessons.filter(l => done.includes(l.id)) : lessons.filter(l => l.levelId === "l1").slice(0, 3);
  return src.flatMap(l => l.quiz.map((q, i) => ({ key: `${l.id}:${i}`, q, lesson: l })));
}
function dueCards() {
  const srs = State.data.srs = State.data.srs || {};
  const t = todayStr();
  const pool = srsPool();
  const due = pool.filter(c => srs[c.key] && srs[c.key].due <= t).sort((a, b) => srs[a.key].due.localeCompare(srs[b.key].due));
  const fresh = pool.filter(c => !srs[c.key]);
  return { due, fresh, pool };
}
function dueCount() { const d = dueCards(); return Math.min(10, d.due.length + Math.min(d.fresh.length, Math.max(0, 10 - d.due.length))); }

Routes.practice = function () {
  const { due, fresh, pool } = dueCards();
  const srs = State.data.srs;
  const session = [...due, ...fresh.sort(() => Math.random() - 0.5).slice(0, Math.max(0, 10 - due.length))].slice(0, 10);
  const boxes = [1, 2, 3, 4, 5].map(b => pool.filter(c => srs[c.key] && srs[c.key].box === b).length);
  const mastered = boxes[3] + boxes[4];
  const noLessons = !Object.keys(State.data.done).length;

  app().innerHTML = `
    <h1>🧠 אימון יומי</h1>
    <p class="muted">חזרה מרווחת היא אחת השיטות המבוססות ביותר במחקר על למידה: שאלה שענית עליה נכון חוזרת אחרי יום, אחר כך אחרי 3 ימים, שבוע, שבועיים וחודש. שאלה שטעית בה חוזרת מחר. 5-10 דקות ביום מספיקות כדי לזכור את הקורס לאורך שנים.</p>
    ${noLessons ? `<div class="disclaimer" role="note">עדיין לא השלמת שיעורים, אז האימון מתבסס על שלושת השיעורים הראשונים. כל שיעור שתשלים יתווסף למאגר.</div>` : ""}
    <div class="grid grid-3 mb">
      <div class="card stat"><div class="num">${session.length}</div><div class="lbl">שאלות באימון של היום</div></div>
      <div class="card stat"><div class="num">${mastered}/${pool.length}</div><div class="lbl">שאלות שנשלטו (קופסה 4-5)</div></div>
      <div class="card stat"><div class="num">${streak()} <span aria-hidden="true">🔥</span></div><div class="lbl">ימי לימוד ברצף</div></div>
    </div>
    <div class="card mb"><b>הקופסאות שלך:</b>
      <div class="row mt">${boxes.map((n, i) => `<span class="pill">קופסה ${i + 1} (כל ${SRS_DAYS[i + 1]} ימים): <b>${n}</b></span>`).join("")}</div>
    </div>
    <div id="drill"></div>`;

  if (!session.length) {
    $("#drill").innerHTML = `<div class="card center"><div class="big">✅</div><p>אין שאלות לחזרה היום — כל הכבוד! חזור מחר, או <a href="#path">השלם שיעור חדש</a> כדי להוסיף שאלות.</p></div>`;
    return;
  }
  let i = 0, right = 0;
  const show = () => {
    if (i >= session.length) {
      if (right) { markStudyDay(); State.data.xp += right * 2; }
      State.save(); updateRankChip();
      $("#drill").innerHTML = `<div class="card center"><div class="big">${right}/${session.length}</div><p>סיימת את האימון של היום! ${right ? `קיבלת ${right * 2} XP.` : ""}</p>
        <p class="small muted">שאלות שטעית בהן יחזרו מחר. שאלות שענית נכון יחזרו בעוד כמה ימים.</p><a class="btn" href="#home">חזרה לדף הבית</a></div>`;
      return;
    }
    const c = session[i];
    const order = c.q.options.map((o, k) => k).sort(() => Math.random() - 0.5);
    $("#drill").innerHTML = `
      <fieldset class="q card">
        <legend>שאלה ${i + 1} מתוך ${session.length} · <span class="small muted">${c.lesson.levelIcon} ${esc(c.lesson.title)}</span></legend>
        <p class="mt"><b>${esc(c.q.q)}</b></p>
        ${order.map(k => `<button type="button" class="opt" data-k="${k}">${esc(c.q.options[k])}</button>`).join("")}
        <div class="explain" aria-live="polite"></div>
        <div class="row mt" id="drillNext"></div>
      </fieldset>`;
    $$("#drill .opt").forEach(b => b.onclick = () => {
      const k = +b.dataset.k, ok = k === c.q.answer;
      $$("#drill .opt").forEach(x => { x.disabled = true; if (+x.dataset.k === c.q.answer) x.classList.add("correct"); else if (x === b) x.classList.add("wrong"); });
      const cur = State.data.srs[c.key] || { box: 0 };
      const box = ok ? Math.min(5, cur.box + 1) : 1;
      State.data.srs[c.key] = { box, due: addDays(ok ? SRS_DAYS[box] : 1) };
      if (ok) right++;
      State.save();
      $("#drill .explain").textContent = (ok ? `✅ נכון! השאלה תחזור בעוד ${SRS_DAYS[box]} ימים. ` : "❌ לא בדיוק. השאלה תחזור מחר. ") + c.q.explain;
      $("#drillNext").innerHTML = `<button type="button" class="btn">${i + 1 < session.length ? "לשאלה הבאה ←" : "סיום ←"}</button> <a class="small" href="#lesson/${c.lesson.id}">לחזור לשיעור</a>`;
      $("#drillNext .btn").onclick = () => { i++; show(); };
      $("#drillNext .btn").focus();
    });
    $("#drill .opt").focus();
  };
  show();
};

// ---------- רשימת מעקב ותזות ----------
const WL_STATUS = { watch: "👀 במעקב", own: "✅ מחזיק", sold: "💼 נמכר", rejected: "🚫 נפסל" };
const MOATS = ["לא ברור / אין", "מותג", "עלויות מעבר", "אפקט רשת", "יתרון עלות / גודל", "רגולציה / פטנט / משאב ייחודי", "מיצוב נגדי", "כוח תהליך"];

Routes.watchlist = function () {
  const W = State.data.watch = State.data.watch || [];
  const t = todayStr();
  const rows = W.map((w, i) => {
    const buy = w.value * (1 - w.mos / 100);
    const gap = w.price / buy - 1;
    return Object.assign({ i, buy, gap, overdue: w.review && w.review <= t }, w);
  });
  const overdue = rows.filter(r => r.overdue && r.status !== "sold" && r.status !== "rejected");

  app().innerHTML = `
    <h1>👁️ רשימת מעקב ותזות</h1>
    <p class="muted">כמו באפט: כותבים <b>לפני</b> הקנייה למה העסק מצוין, כמה הוא שווה, באיזה מחיר הוא מעניין — ומה יוכיח שטעית. אחר כך מחכים בסבלנות שמר שוק יציע את המחיר. "אין עונש על חבטה שלא הונפה."</p>
    ${overdue.length ? `<div class="disclaimer" role="alert">⏰ הגיע מועד הבדיקה של: <b>${overdue.map(r => esc(r.ticker)).join(", ")}</b>. בדוק שהתזה עדיין שלמה ועדכן את המחיר והשווי.</div>` : ""}

    ${rows.length ? `<section class="card mb" style="overflow-x:auto" aria-labelledby="wlT"><h2 id="wlT">הרשימה שלי</h2>
      <table class="data">
        <caption class="sr-only">מניות במעקב עם שווי ומחיר קנייה</caption>
        <tr><th scope="col">מניה</th><th scope="col">סטטוס</th><th scope="col">מחיר נוכחי</th><th scope="col">שווי שלי</th><th scope="col">מעניין מתחת ל-</th><th scope="col">מרחק</th><th scope="col">בדיקה הבאה</th><th scope="col"></th></tr>
        ${rows.map(r => `<tr>
          <td><b lang="en">${esc(r.ticker)}</b><div class="small muted">${esc(r.name || "")}</div></td>
          <td>${WL_STATUS[r.status]}</td>
          <td><label class="sr-only" for="wp-${r.i}">מחיר נוכחי של ${esc(r.ticker)}</label><input id="wp-${r.i}" class="wl-price" type="number" step="any" value="${r.price}" data-i="${r.i}" style="width:90px"></td>
          <td dir="ltr" style="text-align:right">${fmt(r.value, 2)}</td>
          <td dir="ltr" style="text-align:right">${fmt(r.buy, 2)}</td>
          <td class="${r.gap <= 0 ? "good" : r.gap < 0.15 ? "mid" : "bad"}">${r.gap <= 0 ? "✔ במחיר המעניין" : `עוד ${pct(r.gap, 0)} מעל`}</td>
          <td class="${r.overdue ? "bad" : ""}">${r.review ? r.review.split("-").reverse().join(".") : "—"}</td>
          <td><button type="button" class="btn ghost small" data-edit="${r.i}">✏️ פתח</button></td>
        </tr>`).join("")}
      </table>
      <p class="small muted">"מעניין מתחת ל-" = השווי שהערכת פחות מרווח הביטחון שבחרת. זו לא הוראת קנייה — זו הנקודה שבה, לפי הניתוח שלך, יש מרווח ביטחון.</p>
    </section>` : ""}

    <section class="card" aria-labelledby="wlF">
      <h2 id="wlF">${"➕ תזה חדשה"}</h2>
      <div class="form">
        <div class="field"><label for="w_tk">סימול</label><input id="w_tk" placeholder="KO" /></div>
        <div class="field"><label for="w_name">שם החברה</label><input id="w_name" placeholder="קוקה-קולה" /></div>
        <div class="field"><label for="w_status">סטטוס</label><select id="w_status">${Object.entries(WL_STATUS).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select></div>
        <div class="field"><label for="w_moat">סוג החפיר</label><select id="w_moat">${MOATS.map(m => `<option>${m}</option>`).join("")}</select></div>
        ${field("w_price", "מחיר נוכחי", "")}
        ${field("w_value", "שווי פנימי שהערכתי (למניה)", "", "מהמחשבון DCF או מהניתוח שלך")}
        ${field("w_mos", "מרווח ביטחון רצוי (%)", 25)}
        <div class="field"><label for="w_review">תאריך בדיקה הבא</label><input id="w_review" type="date" value="${(() => { const d = new Date(); d.setMonth(d.getMonth() + 3); return todayStr(d); })()}" /><div class="hint">למשל אחרי הדוח הרבעוני הבא</div></div>
      </div>
      <div class="field mt"><label for="w_thesis">התזה: למה העסק מצוין, ומה המחיר מפספס?</label><textarea id="w_thesis" rows="3"></textarea></div>
      <div class="field mt"><label for="w_wrong">מה יוכיח שטעיתי?</label><textarea id="w_wrong" rows="2" placeholder="למשל: ROIC יורד מתחת ל-12% שנתיים ברציפות; אובדן נתח שוק משמעותי"></textarea></div>
      <div class="row mt"><button type="button" class="btn" id="w_save">💾 שמור</button><button type="button" class="btn ghost" id="w_clear">נקה טופס</button><span class="spacer"></span><a class="small" href="#checklist">פתח את צ'קליסט באפט</a></div>
    </section>`;

  let editing = -1;
  const fill = w => {
    $("#w_tk").value = w.ticker || ""; $("#w_name").value = w.name || ""; $("#w_status").value = w.status || "watch";
    $("#w_moat").value = w.moat || MOATS[0]; $("#w_price").value = w.price ?? ""; $("#w_value").value = w.value ?? "";
    $("#w_mos").value = w.mos ?? 25; $("#w_review").value = w.review || ""; $("#w_thesis").value = w.thesis || ""; $("#w_wrong").value = w.wrong || "";
  };
  $$("[data-edit]").forEach(b => b.onclick = () => {
    editing = +b.dataset.edit; fill(W[editing]);
    $("#wlF").textContent = `✏️ עריכת ${W[editing].ticker}`;
    if (!$("#w_del")) $("#w_clear").insertAdjacentHTML("afterend", `<button type="button" class="btn red" id="w_del">🗑 מחק</button>`);
    $("#w_del").onclick = () => { if (confirm("למחוק את התזה?")) { W.splice(editing, 1); State.save(); Routes.watchlist(); } };
    $("#w_tk").focus(); $("#wlF").scrollIntoView({ behavior: "smooth" });
  });
  $$(".wl-price").forEach(inp => inp.onchange = () => { const v = parseFloat(inp.value); if (isFinite(v)) { W[+inp.dataset.i].price = v; State.save(); Routes.watchlist(); } });
  $("#w_clear").onclick = () => Routes.watchlist();
  $("#w_save").onclick = () => {
    const w = { ticker: $("#w_tk").value.trim().toUpperCase(), name: $("#w_name").value.trim(), status: $("#w_status").value, moat: $("#w_moat").value,
      price: num("w_price"), value: num("w_value"), mos: num("w_mos") || 0, review: $("#w_review").value, thesis: $("#w_thesis").value, wrong: $("#w_wrong").value, updated: todayStr() };
    if (!w.ticker || !isFinite(w.price) || !isFinite(w.value)) return toast("מלא סימול, מחיר נוכחי ושווי פנימי");
    if (!w.wrong.trim()) toast("טיפ: כתוב גם מה יוכיח שטעית — זה מה שמגן מהטיית אישוש");
    editing >= 0 ? W[editing] = w : W.push(w);
    State.save(); Routes.watchlist(); toast("התזה נשמרה");
  };
};
