// ===================================================================
//  🎓 מסלול 12 חודשים לצעירים: צ'קליסט חודש-חודש מהמשכורת הראשונה ועד תמונת מצב שנתית.
//  ההתקדמות נשמרת בדפדפן בלבד. אינו ייעוץ פיננסי.
// ===================================================================
TITLES.youth = "מסלול 12 חודשים לצעירים";

const YOUTH_PLAN = [
  { t: "תמונת מצב ראשונה", tasks: [
    ["רשמו את כל ההוצאות שלכם ל-30 הימים האחרונים (דפי בנק ואשראי).", "#money/budget"],
    ["חשבו שיעור חיסכון: (הכנסה נטו − הוצאות) ÷ הכנסה.", "#money/budget"],
    ["פתחו חשבון חיסכון נפרד, כדי שהחיסכון לא יתערבב עם העו\"ש.", null]] },
  { t: "כרית ויסודות", tasks: [
    ["קבעו יעד כרית ביטחון: 3 חודשי הוצאות לפי תקציב החיים בחוץ.", "#money/moveout"],
    ["הגדירו הוראת קבע לחיסכון ביום המשכורת.", null],
    ["קראו תלוש שכר אחד: ברוטו, נטו, ניכויים והפרשות לפנסיה.", "#lesson/lf-3"]] },
  { t: "ניקוי חיובים קבועים", tasks: [
    ["עברו על כל החיובים הקבועים ובטלו מנוי אחד שלא השתמשתם בו.", null],
    ["השוו תעריף טלפון ואינטרנט והחליפו אם זול יותר.", null],
    ["כרטיס אשראי: ודאו שמשלמים את כל החיוב במלואו בכל חודש.", "#lesson/lf-2"]] },
  { t: "תקציב החיים בחוץ", tasks: [
    ["בנו תקציב \"חיים בחוץ\" (שכר דירה, חשבונות, מזון, תחבורה) במחשבון יציאה מהבית.", "#money/moveout"],
    ["הפעילו \"שכר דירה וירטואלי\": הפקדה חודשית בגובה ההפרש (או כמה שאפשר).", "#lesson/lf-5"],
    ["בדקו אם שכר הדירה בתוך כלל האצבע של כשליש מההכנסה.", "#money/moveout"]] },
  { t: "פנסיה, ביטוח וקרנות", tasks: [
    ["בדקו בתלוש או במסלקה הפנסיונית מה מופרש לפנסיה ולקרן השתלמות, ומתי.", "#lesson/lf-3"],
    ["בדקו דמי ניהול ומסלול השקעה בפנסיה — האם מתאים לגילכם?", "#lesson/lf-3"],
    ["בדקו אילו כיסויים ביטוחיים יש לכם (אובדן כושר עבודה, בריאות) ומה חסר.", "#lesson/lf-2"]] },
  { t: "להגדיל הכנסה", tasks: [
    ["כתבו שלוש מיומנויות או הסמכות שיגדילו את ההכנסה שלכם בשנים הקרובות.", null],
    ["הכינו נימוקים לשיחה על שכר: מה עשיתם, מה תרמתם, מה השוק משלם.", null],
    ["קבעו יעד הכנסה לשנה הבאה וצעד אחד לקראתו.", null]] },
  { t: "היכרות עם השקעות", tasks: [
    ["למדו מהו קרן מדד ולמה פיזור חשוב (שיעור על סיכון, טווח וקרנות מדד).", "#lesson/l1-4"],
    ["חשבו מה ההשפעה של התחלה מוקדמת במחשבון ריבית דריבית.", "#tools/compound"],
    ["רק אם הכרית מלאה ואין חוב יקר: קבעו סכום קטן ואוטומטי להשקעה לטווח ארוך.", "#lesson/lf-5"]] },
  { t: "מבחן קיצון", tasks: [
    ["הריצו מבחן קיצון להקצאה שלכם (גם אם הוא קטן): כמה הייתם מפסידים בירידה של 30%?", "#portfolio"],
    ["כתבו תוכנית השקעה קצרה: יעד, אופק, מה לא עושים (למשל לא למכור בפאניקה).", "#lesson/lp-1"],
    ["בדקו את דמי הניהול בכל מוצר שיש לכם.", "#portfolio"]] },
  { t: "אשראי והיסטוריה", tasks: [
    ["שלמו כל חיוב בזמן והימנעו ממשיכת יתר. זה בונה היסטוריית אשראי טובה.", null],
    ["בדקו אפשרות לבקש דוח נתוני אשראי אישי ממקור מורשה, ובדקו שהמידע נכון.", null],
    ["לפני הלוואה או רכב: חשבו עלות כוללת חודשית ולא רק החזר.", "#lesson/lf-4"]] },
  { t: "יעדים גדולים", tasks: [
    ["כתבו יעד אחד גדול (דירה, יציאה מהבית, לימודים) עם סכום ותאריך.", "#money/goal"],
    ["חשבו הפקדה חודשית נדרשת לאותו יעד.", "#money/goal"],
    ["חשבו, לצורך למידה, מה היה ההחזר על משכנתא או הלוואה לפי הנתונים.", "#money/mortgage"]] },
  { t: "שיחות וחוזים", tasks: [
    ["שוחחו עם ההורים על תקציב הבית, השתתפות ותוכניות יציאה.", null],
    ["אם עוברים לדירה: קראו חוזה שכירות בעיון — פיקדון, ערבויות, תנאי יציאה — ואל תחתמו מתחת לחץ.", null],
    ["אל תחתמו כערבים להלוואה של אחרים בלי להבין את המשמעות.", null]] },
  { t: "סיכום שנה", tasks: [
    ["מלאו את עמוד ההתנהלות הכספית ושמרו תמונת מצב.", "#finance"],
    ["השוו לתמונה מהחודש הראשון: שיעור חיסכון, כרית, שווי נקי.", "#finance"],
    ["הגדירו עד שלושה יעדים לשנה הבאה בתוכנית 12 החודשים.", "#finance"]] }
];

Routes.youth = function () {
  const KEY = "ia-youth";
  let st = { start: null, done: {} };
  try { Object.assign(st, JSON.parse(localStorage.getItem(KEY))); } catch (e) { /* ignore */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* ignore */ } };
  const total = YOUTH_PLAN.reduce((a, m) => a + m.tasks.length, 0);

  const render = () => {
    const done = Object.keys(st.done).filter(k => st.done[k]).length;
    const cur = st.start ? Math.min(11, Math.max(0, Math.floor((Date.now() - st.start) / (30.4 * 86400000)))) : -1;
    app().innerHTML = `
      <h1>🎓 מסלול 12 חודשים לצעירים</h1>
      <p class="muted">מסלול צעד-צעד לשנה הראשונה של ניהול כסף עצמאי — מתאים במיוחד לבני 23–24 שגרים אצל ההורים, ולכל מי שמתחיל. לכל חודש שלוש משימות קצרות, רובן עם קישור לכלי או לשיעור באתר. מסמנים בעצמכם; ההתקדמות נשמרת בדפדפן בלבד. <a href="#lesson/lf-5">לשיעור לצעירים</a> · <a href="#youthplan">ההתנהלות שלי לפי עבודה וחיסכון</a></p>
      <section class="card" aria-label="התקדמות כללית">
        <div class="row"><b>הושלמו ${done} מתוך ${total} משימות</b><span class="spacer"></span>${st.start ? `<span class="pill green">אתם בחודש ${cur + 1}</span>` : ""}</div>
        <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}" aria-label="התקדמות במסלול"><div style="width:${done / total * 100}%"></div></div>
        <div class="row mt">${st.start ? `<span class="small muted">התחלתם ב-${new Date(st.start).toLocaleDateString("he-IL")}</span><button class="btn ghost small" type="button" id="yReset">איפוס מסלול</button>` : `<button class="btn" type="button" id="yStart">התחילו את המסלול (מסמן היום כחודש 1)</button>`}</div>
      </section>
      <div class="youth-list mt">${YOUTH_PLAN.map((m, mi) => `
        <details class="card mb youth-month${mi === cur ? " current" : ""}" ${mi === cur || (cur < 0 && mi === 0) ? "open" : ""}>
          <summary><b>חודש ${mi + 1} — ${m.t}</b> <span class="small muted">(${m.tasks.filter((_, ti) => st.done[mi + "-" + ti]).length}/${m.tasks.length})</span></summary>
          <ul class="youth-tasks">${m.tasks.map((t, ti) => `<li><label><input type="checkbox" data-k="${mi}-${ti}" ${st.done[mi + "-" + ti] ? "checked" : ""}> ${esc(t[0])}</label>${t[1] ? ` <a class="small" href="${t[1]}">פתחו ←</a>` : ""}</li>`).join("")}</ul>
        </details>`).join("")}</div>
      <p class="small muted">התוכן לימודי בלבד ואינו ייעוץ פיננסי. אפשר לעבור על המסלול בקצב שלכם — אין חובה לעמוד בחודש מסוים.</p>`;
    $$("input[data-k]").forEach(cb => cb.onchange = () => { if (cb.checked) st.done[cb.dataset.k] = true; else delete st.done[cb.dataset.k]; save(); const open = $$("details.youth-month").map(d => d.open); render(); $$("details.youth-month").forEach((d, i) => { d.open = open[i]; }); });
    const s = $("#yStart"); if (s) s.onclick = () => { st.start = Date.now(); save(); render(); };
    const r = $("#yReset"); if (r) r.onclick = () => { if (confirm("לאפס את כל ההתקדמות במסלול?")) { st = { start: null, done: {} }; save(); render(); } };
  };
  render();
};

// ===================================================================
//  🧭 ההתנהלות שלי לפי עבודה וחיסכון: הסבר לפי סוג העבודה, מדרגות חיסכון, ובנייה לימודית של מבנה תיק.
//  זה כלי לימוד: הוא מציג עקרונות וטווחים כלליים — לא ממליץ על מוצרים, מניות או תזמון, ולא ייעוץ השקעות.
// ===================================================================
TITLES.youthplan = "ההתנהלות שלי לפי עבודה וחיסכון";

const YP_JOBS = {
  employee: { name: "שכיר/ה בהכנסה יציבה", months: 3, stab: 0, tips: [
    "בדקו בתלוש שההפרשות לפנסיה ולקרן השתלמות אכן מתבצעות ומה שיעורן — זה חיסכון שנצבר גם בלי שתעשו כלום.",
    "הכנסה קבועה מאפשרת הוראות קבע אוטומטיות לכל יעד — הפכו את החיסכון להחלטה חד-פעמית.",
    "בקשו תלוש ומסלקה פנסיונית מדי שנה ובדקו כפילויות בקופות."] },
  hitech: { name: "שכיר/ה בהייטק או בחברה עם מניות/אופציות", months: 4, stab: 1, tips: [
    "שכר גבוה ובונוסים/מניות של המעסיק מגדילים את היכולת לחסוך, אבל גם יוצרים ריכוז: המשכורת וההון שלכם תלויים באותה חברה. אל תחזיקו חלק גדול מהחיסכון במניית המעסיק.",
    "הבינו את תנאי הענקה, מועדי הבשלה ומיסוי אופציות/יחידות מניה לפני שמתכננים סביבן; בדקו עם גורם מקצועי.",
    "כרית של 4 חודשים ומעלה — לתקופות שבהן מחפשים עבודה אחרי פיטורים או סבבי קיצוצים."] },
  public: { name: "שכיר/ה במגזר הציבורי או בעבודה בטוחה", months: 3, stab: 0, tips: [
    "יציבות בהכנסה מקטינה את צורך הכרית, אבל לא מבטלת אותו — הוצאות פתאומיות קורות לכולם.",
    "בדקו את זכויות הפנסיה וההטבות הייחודיות במקום העבודה ואת תנאי קרן ההשתלמות.",
    "הכנסה צפויה היא יתרון להפקדות קבועות לאורך שנים."] },
  freelance: { name: "עצמאי/ת או הכנסה משתנה", months: 6, stab: 2, tips: [
    "הכנסה לא קבועה → כרית גדולה יותר: 6 חודשי הוצאות ויותר. הכרית היא משכורת לחודשים חלשים.",
    "הפרישו מכל תשלום חלק למסים (בדקו עם רואה חשבון מה השיעור המתאים לכם) — כך שלא תתבלבלו בין כסף שלכם לכסף של המדינה.",
    "בפנסיה לעצמאים אתם אחראים לבצע את ההפקדות: בדקו עם גורם מקצועי מה חובת ההפרשה ומה מתאים לכם, ופתחו הפקדה קבועה.",
    "שלמו לעצמכם 'משכורת' קבועה מהחשבון העסקי, והשאר נשאר כרית."] },
  student: { name: "סטודנט/ית עם עבודה חלקית", months: 3, stab: 1, tips: [
    "הכנסה נמוכה אבל הוצאות נמוכות: כל סכום קבוע, אפילו קטן, בונה הרגל.",
    "הימנעו מחובות צרכניים; הלוואות לימודים ותנאיהן — קראו היטב לפני חתימה.",
    "השקעה בהכנסה עתידית (מקצוע, ניסיון, הסמכה) היא לרוב ההשקעה הכי רווחית בגיל הזה."] },
  between: { name: "בין עבודות או בחיפוש עבודה", months: 6, stab: 2, tips: [
    "כרגע חשוב לשמור על נזילות. אל תשקיעו כסף שאתם עשויים להצטרך בחודשים הקרובים.",
    "צמצמו הוצאות רצוניות לתקופה, והפכו את התקציב החודשי לברור ומדויק.",
    "אחרי שמוצאים עבודה — חזרו להפקדות הקבועות ולמילוי הכרית."] }
};
const YP_TIERS = [
  [500, "עד 500 ₪ בחודש", "סכומים קטנים מתחזקים הרגל, וחשוב לבדוק שדמי הניהול והעמלות לא אוכלים חלק גדול מהם. עדיף מוצר אחד פשוט ומפוזר. כרית קודם."],
  [1500, "500–1,500 ₪ בחודש", "אפשר לבנות כרית תוך חודשים ספורים-שנים, ואז הפקדה קבועה להשקעה. שימו לב לעמלות קבועות (לעיתים משמעותיות ביחס לסכום)."],
  [3000, "1,500–3,000 ₪ בחודש", "קצב חיסכון טוב. אפשר לפצל לכמה מטרות (כרית, קרן יציאה, השקעה לטווח ארוך) ולכתוב תוכנית קצרה."],
  [Infinity, "מעל 3,000 ₪ בחודש", "קצב חיסכון גבוה: חשוב לנהל מבנה ברור (כרית, יעדים קצרים, טווח ארוך), לשים לב לריכוז, ולהימנע מהחלטות רגשיות כשהסכומים גדלים."]
];
const YP_TOL = [[10, "עד 10%", 20, 40], [20, "עד 20%", 40, 60], [30, "עד 30%", 60, 80], [40, "עד 40% ויותר", 70, 90]];

Routes.youthplan = function () {
  let s = { job: "employee", age: 24, income: 9000, expenses: 5000, saving: 2000, liquid: 15000, tol: 30, need3: 0 };
  try { Object.assign(s, JSON.parse(localStorage.getItem("ia-youthplan"))); } catch (e) { /* ignore */ }
  app().innerHTML = `
    <h1>🧭 ההתנהלות שלי לפי עבודה וחיסכון</h1>
    <div class="box warn"><b>זה כלי לימוד, לא ייעוץ השקעות.</b> אנחנו לא מורשים לתת המלצות אישיות, לא ממליצים על מניות, קרנות או מוצרים ספציפיים, ולא מנסים לתזמן את השוק. הכלי מסביר עקרונות ומציג <i>טווחים כלליים</i> כדי שתוכלו לחשוב ולבנות תוכנית משלכם — ולהתייעץ עם יועץ מורשה לפני החלטה.</div>
    <div class="grid grid-2 mt">
      <section class="card" aria-labelledby="ypA"><h2 id="ypA">מי אתם</h2>
        <div class="field"><label for="ypJob">סוג עבודה</label><select id="ypJob">${Object.entries(YP_JOBS).map(([k, j]) => `<option value="${k}">${j.name}</option>`).join("")}</select></div>
        <div class="field"><label for="ypAge">גיל</label><input id="ypAge" type="number" inputmode="numeric" min="18" max="45"></div>
        <div class="field"><label for="ypIncome">הכנסה נטו חודשית (₪)</label><input id="ypIncome" type="number" inputmode="numeric" min="0" step="100"></div>
        <div class="field"><label for="ypExp">הוצאות חודשיות (₪) — או תקציב החיים בחוץ אם אתם מתכננים לצאת</label><input id="ypExp" type="number" inputmode="numeric" min="0" step="100"></div>
      </section>
      <section class="card" aria-labelledby="ypB"><h2 id="ypB">חיסכון ויעדים</h2>
        <div class="field"><label for="ypSave">כמה אתם חוסכים בחודש (₪)</label><input id="ypSave" type="number" inputmode="numeric" min="0" step="100"></div>
        <div class="field"><label for="ypLiquid">כמה כסף נזיל יש לכם היום בחיסכון (₪)</label><input id="ypLiquid" type="number" inputmode="numeric" min="0" step="1000"></div>
        <div class="field"><label for="ypNeed">כסף שתצטרכו בתוך 3 שנים (דירה, רכב, לימודים) (₪)</label><input id="ypNeed" type="number" inputmode="numeric" min="0" step="1000"></div>
        <div class="field"><label for="ypTol">בירידה בשוק, כמה הפסד בתיק ההשקעה הייתם מצליחים לראות בלי למכור?</label><select id="ypTol">${YP_TOL.map(t => `<option value="${t[0]}">${t[1]}</option>`).join("")}</select></div>
      </section>
    </div>
    <div id="ypOut" class="mt" aria-live="polite"></div>
    <p class="small muted mt">הנתונים נשמרים בדפדפן בלבד. התוכן לימודי ואינו ייעוץ השקעות, פנסיה, ביטוח או מס.</p>`;

  const $v = id => document.getElementById(id);
  const map = { job: "ypJob", age: "ypAge", income: "ypIncome", expenses: "ypExp", saving: "ypSave", liquid: "ypLiquid", tol: "ypTol", need3: "ypNeed" };
  Object.entries(map).forEach(([k, id]) => { $v(id).value = s[k]; });

  function calc() {
    const v = {}; Object.entries(map).forEach(([k, id]) => { v[k] = (k === "job") ? $v(id).value : (+$v(id).value || 0); });
    try { localStorage.setItem("ia-youthplan", JSON.stringify(v)); } catch (e) { /* ignore */ }
    const job = YP_JOBS[v.job], rate = v.income ? v.saving / v.income : 0;
    const tier = YP_TIERS.find(t => v.saving <= t[0]);
    const efNeed = job.months * v.expenses, efGap = Math.max(0, efNeed - v.liquid), efMonths = v.saving > 0 ? Math.ceil(efGap / v.saving) : null;
    const goalMonthly = v.need3 > 0 ? Math.min(v.saving * .6, v.need3 / 36) : 0;
    const longMonthly = Math.max(0, v.saving - goalMonthly);
    // טווח מניות להשקעה ארוכת טווח (הדגמה): לפי סבלנות להפסד, ופחות אם ההכנסה לא יציבה
    const tol = YP_TOL.find(t => t[0] === +v.tol) || YP_TOL[2];
    let lo = tol[2] - job.stab * 5, hi = tol[3] - job.stab * 5;
    if (v.age >= 40) { lo -= 5; hi -= 5; }
    lo = Math.max(10, lo); hi = Math.max(lo + 10, hi);
    const mid = Math.round((lo + hi) / 2 / 5) * 5;
    const equityDrop = 40, bondDrop = 5;   // תרחיש הדגמה
    const loss = (mid * equityDrop + (100 - mid) * bondDrop) / 100;
    const toleratedOk = loss <= v.tol;
    const lastNews = (window.NEWS_MANIFEST || [])[0];

    $v("ypOut").innerHTML = `
      <section class="card" aria-labelledby="ypR1"><h2 id="ypR1">1. מה חשוב לכם לפי סוג העבודה (${esc(job.name)})</h2>
        <ul>${job.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul></section>

      <section class="card mt" aria-labelledby="ypR2"><h2 id="ypR2">2. מה אומר קצב החיסכון שלכם</h2>
        <p>אתם חוסכים ${fmt(v.saving)} ₪ בחודש — <b>${fmt(rate * 100, 1)}%</b> מההכנסה (${esc(tier[1])}).</p>
        <p>${esc(tier[2])}</p></section>

      <section class="card mt" aria-labelledby="ypR3"><h2 id="ypR3">3. סדר פעולות לחיסכון החודשי</h2>
        <ol>
          <li><b>כרית ביטחון:</b> לפי סוג העבודה כדאי כרית של כ-${job.months} חודשי הוצאות = <b>${fmt(efNeed)} ₪</b>. יש לכם ${fmt(v.liquid)} ₪ → ${efGap > 0 ? `חסרים <b>${fmt(efGap)} ₪</b>${efMonths ? ` (כ-${efMonths} חודשים בחיסכון של ${fmt(v.saving)} ₪)` : ""}.` : '<span class="good">הכרית מלאה</span>.'}</li>
          <li><b>כסף לתוך 3 שנים:</b> ${v.need3 > 0 ? `${fmt(v.need3)} ₪ → כ-${fmt(goalMonthly)} ₪ בחודש בפיקדון או בקרן כספית — לא בשוק המניות, כי אין זמן להתאושש מירידה.` : "לא הוגדר יעד קרוב."}</li>
          <li><b>טווח ארוך:</b> כ-${fmt(longMonthly)} ₪ בחודש נשארים להשקעה לטווח של 10 שנים ויותר — <b>אחרי</b> שהכרית מלאה ואין חוב יקר.</li>
        </ol>
        ${efGap > 0 ? '<p class="small muted">כל עוד הכרית לא מלאה, מקובל להפנות את רוב החיסכון אליה לפני השקעה לטווח ארוך.</p>' : ""}</section>

      <section class="card mt" aria-labelledby="ypR4"><h2 id="ypR4">4. מבנה תיק לימודי לכסף ארוך הטווח (הדגמה, לא המלצה)</h2>
        <p>לפי הסבלנות שציינתם להפסד (${esc(tol[1])}) ולפי סוג ההכנסה, טווח <b>הדגמה</b> לחלק המניות בכסף ארוך הטווח הוא <b>${lo}%–${hi}%</b>, והשאר באג"ח/מזומן. הטווחים כלליים — יש מודלים אחרים ואין "הקצאה נכונה" אחת.</p>
        <div class="table-wrap"><table><caption class="sr-only">מבנה לדוגמה</caption>
          <thead><tr><th scope="col">רכיב</th><th scope="col">חלק לדוגמה (באמצע הטווח)</th><th scope="col">תפקיד</th></tr></thead>
          <tbody>
            <tr><th scope="row">מניות מפוזרות (קרן מדד רחבה, לאו דווקא מדינה אחת)</th><td>${mid}%</td><td>צמיחה לטווח ארוך, תנודתי</td></tr>
            <tr><th scope="row">אג"ח / מזומן</th><td>${100 - mid}%</td><td>יציבות ונזילות</td></tr>
          </tbody></table></div>
        <p><b>מבחן קיצון להדגמה:</b> בתרחיש שבו המניות יורדות ${equityDrop}% והאג"ח ${bondDrop}%, התיק הזה יורד בערך <b>${fmt(loss, 1)}%</b>. ${toleratedOk ? `<span class="good">זה בתוך מה שאמרתם שתעמדו בו (${v.tol}%).</span>` : `<span class="bad">זה מעבר למה שאמרתם שתעמדו בו (${v.tol}%) — כדאי לשקול נתח מניות נמוך יותר.</span>`}</p>
        <p class="small muted">היסטורית היו ירידות גדולות יותר מ-40% (ראו שיעור בועות וקריסות). המספרים הם הדגמה בלבד. <a href="#portfolio">למבחן קיצון מלא</a></p>
        <h3>עקרונות בבחירת מוצר (בלי שמות)</h3>
        <ul><li>פיזור רחב במקום מניות בודדות, במיוחד כשמתחילים.</li><li>דמי ניהול ועמלות נמוכים — הפרש של אחוז מצטבר לסכומים גדולים (ראו כלי התיק).</li><li>הפקדה קבועה ואוטומטית במקום ניסיון לבחור רגע כניסה.</li><li>אל תקנו מה שאתם לא מבינים, ואל תפעלו לפי טיפים ברשתות.</li><li>פנסיה וקרן השתלמות הן חלק מהתמונה: בדקו מה כבר מושקע שם לפני שמוסיפים.</li></ul>
      </section>

      <section class="card mt" aria-labelledby="ypR5"><h2 id="ypR5">5. ומה לגבי מצב השוק היום?</h2>
        <p>הקצאת היעד שלכם נקבעת לפי <b>הסבלנות שלכם לסיכון, האופק והיציבות של ההכנסה</b> — לא לפי כותרות היום. ניסיון לנחש מתי להיכנס או לצאת מהשוק פוגע לרוב בתוצאות (ראו את השיעור על המלכודות של משקיע מתחיל ואת השיעור על כסף חד-פעמי מול הפקדות).</p>
        <p>מה כן אפשר לעשות כשהשוק נראה יקר או מפחיד: להמשיך בהפקדה קבועה (כך מחיר הכניסה מתפזר לאורך זמן), לדרוש מרווח ביטחון בהחלטות על מניות בודדות, ולוודא שהכרית מלאה כדי שלא תצטרכו למכור בירידה.</p>
        <ul>
          <li><a href="#news">מהדורת החדשות היומית</a> ${lastNews ? `(האחרונה: ${esc(lastNews.title)})` : ""} — לקריאה והבנה, לא כסיגנל לפעולה.</li>
          <li><a href="#lesson/lm-2">מחזור כלכלי והאם השוק כולו יקר</a> · <a href="#lesson/lp-1">תוכנית השקעה כתובה והפקדות</a> · <a href="#lesson/l1-9">המלכודות של משקיע מתחיל</a></li>
        </ul>
        <p class="small muted">אנחנו לא מנבאים את השוק ולא נותנים המלצות. לייעוץ אישי פנו ליועץ השקעות מורשה.</p></section>`;
  }
  Object.values(map).forEach(id => $v(id).addEventListener("input", calc));
  calc();
};
