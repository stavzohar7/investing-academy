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
        <p class="small muted">היסטורית היו ירידות גדולות יותר מ-40% (ראו שיעור בועות וקריסות). המספרים הם הדגמה בלבד. <a href="#portfolio">למבחן קיצון מלא</a> · <a href="#assets">במה להתמקד בבניית תיק</a> · <a href="#compare">להשוואת עלויות של קרנות וברוקרים</a></p>
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

// ===================================================================
//  ⚖️ השוואת עלויות: קרנות וברוקרים — מסגרת ניטרלית שבה מזינים הצעות שאספתם בעצמכם ורואים מה העלות לאורך זמן.
//  האתר לא ממליץ על גוף, קרן או מוצר ספציפיים, ואינו ייעוץ השקעות.
// ===================================================================
TITLES.compare = "השוואת עלויות: קרנות וברוקרים";

function cmSim(o) {
  // o: monthly, years, gross, fee (שנתי %), fixed (₪ לפעולה), pct (% מהפעולה), fx (% המרה), custody (₪ בשנה)
  const r = (o.gross - o.fee) / 100 / 12, r0 = o.gross / 100 / 12, n = Math.round(o.years * 12);
  let v = 0, v0 = 0, paidCosts = 0;
  for (let m = 1; m <= n; m++) {
    const trade = o.fixed + o.monthly * o.pct / 100 + o.monthly * o.fx / 100;
    paidCosts += trade;
    v = (v + Math.max(0, o.monthly - trade)) * (1 + r);
    v0 = (v0 + o.monthly) * (1 + r0);
    if (m % 12 === 0 && o.custody) { v = Math.max(0, v - o.custody); paidCosts += o.custody; }
  }
  return { v, v0, drag: v0 - v, paidCosts };
}

Routes.compare = function () {
  const KEY = "ia-compare";
  let s = { monthly: 1500, years: 20, gross: 6, opts: [
    { n: "אפשרות א׳ (דוגמה)", fee: 0.1, fixed: 0, pct: 0.1, fx: 0.2, custody: 0 },
    { n: "אפשרות ב׳ (דוגמה)", fee: 0.6, fixed: 5, pct: 0, fx: 0.5, custody: 60 },
    { n: "אפשרות ג׳ (דוגמה)", fee: 1.2, fixed: 0, pct: 0.3, fx: 0.8, custody: 0 }] };
  try { const x = JSON.parse(localStorage.getItem(KEY)); if (x && x.opts) s = x; } catch (e) { /* ignore */ }

  app().innerHTML = `
    <h1>⚖️ השוואת עלויות: קרנות וברוקרים</h1>
    <div class="box warn"><b>האתר לא ממליץ על גוף השקעות, ברוקר, קרן או מוצר ספציפיים ואינו ייעוץ השקעות.</b> אנחנו לא מורשים לתת המלצה אישית, והעלויות והתנאים אצל כל גוף משתנים ועלולים להתעדכן. לכן הכלי הזה עובד הפוך: <b>אתם אוספים הצעות מחיר מהגופים שמעניינים אתכם</b> (באתר או בטלפון), מזינים אותן, ורואים מה העלות הכוללת לאורך השנים.</div>
    <div class="grid grid-2 mt">
      <section class="card" aria-labelledby="cmG"><h2 id="cmG">הנחות כלליות</h2>
        <div class="field"><label for="cmMonthly">הפקדה חודשית (₪)</label><input id="cmMonthly" type="number" inputmode="numeric" min="0" step="100"></div>
        <div class="field"><label for="cmYears">שנים</label><input id="cmYears" type="number" inputmode="numeric" min="1" max="50"></div>
        <div class="field"><label for="cmGross">תשואה שנתית משוערת לפני עלויות (%) — הנחה להדגמה</label><input id="cmGross" type="number" inputmode="decimal" min="0" max="20" step="0.5"></div>
        <p class="small muted">הדגמה: פעולה אחת בחודש (קנייה בהפקדה החודשית). התשואה זהה בכל האפשרויות, כך שההפרש הוא רק עלות.</p>
      </section>
      <section class="card" aria-labelledby="cmO"><h2 id="cmO">הצעות שאספתם</h2>
        <div class="table-wrap"><table><caption class="sr-only">הצעות לעלויות</caption>
          <thead><tr><th scope="col">שם</th><th scope="col">דמי ניהול שנתיים (%)</th><th scope="col">עמלה קבועה לפעולה (₪)</th><th scope="col">עמלה באחוזים (%)</th><th scope="col">עמלת המרת מט"ח (%)</th><th scope="col">דמי משמרת בשנה (₪)</th></tr></thead>
          <tbody>${s.opts.map((o, i) => `<tr><td><input aria-label="שם אפשרות ${i + 1}" id="cmN${i}" value="${esc(o.n)}"></td>${["fee", "fixed", "pct", "fx", "custody"].map(k => `<td><input aria-label="${k} אפשרות ${i + 1}" id="cm_${k}${i}" type="number" inputmode="decimal" step="0.05" min="0" value="${o[k]}"></td>`).join("")}</tr>`).join("")}</tbody></table></div>
        <p class="small muted">ערכי ברירת המחדל הם <b>דוגמה בדיונית</b> ואינם נתוני אמת של גוף כלשהו. החליפו אותם בהצעות המחיר שקיבלתם.</p>
      </section>
    </div>
    <section class="card mt" aria-labelledby="cmR" aria-live="polite"><h2 id="cmR">התוצאה</h2><div id="cmRes"></div></section>

    <section class="card mt" aria-labelledby="cmL"><h2 id="cmL">📋 איך בוחרים ברוקר או בית השקעות</h2>
      <ul>
        <li><b>רישיון ופיקוח:</b> ודאו שהגוף מורשה על ידי הרשות לניירות ערך (אפשר לבדוק באתר הרשות). אל תעבירו כסף לגוף שאינו מורשה.</li>
        <li><b>הפרדת נכסים והגנה:</b> הבינו איפה הנכסים שלכם רשומים ומה קורה אם הגוף נקלע לקשיים.</li>
        <li><b>עלויות מלאות:</b> דמי ניהול, עמלות קנייה ומכירה, דמי משמרת, עמלת המרת מט"ח (לעיתים העלות הגדולה ביותר), מינימום לעמלה, ועלויות הוצאת כסף.</li>
        <li><b>מיסוי:</b> האם הגוף מנכה ומדווח מס אוטומטית (לרוב בגוף ישראלי) או שאתם מדווחים בעצמכם (בגוף זר) — וכל מה שקשור למס על דיבידנד ולמס עיזבון אמריקאי. בדקו עם רואה חשבון.</li>
        <li><b>גישה לשווקים ולמוצרים:</b> אילו בורסות ואילו קרנות זמינות, ושפת השירות והממשק.</li>
        <li><b>שירות וממשק:</b> איכות האפליקציה, זמני תגובה והאם יש אנשים אמיתיים לפנות אליהם.</li>
        <li><b>ביקורות ותלונות:</b> חפשו מידע עצמאי, ולא רק את מה שהגוף מפרסם על עצמו.</li>
      </ul></section>

    <section class="card mt" aria-labelledby="cmF"><h2 id="cmF">📋 איך בודקים קרן מדד או קרן סל</h2>
      <ul>
        <li><b>איזה מדד היא עוקבת:</b> רחב ומפוזר (כמה מדינות וחברות) או צר? האם זה בדיוק מה שרציתם לקנות?</li>
        <li><b>דמי ניהול שנתיים:</b> עלות קבועה שמצטברת לאורך עשורים. השוו קרנות שעוקבות אחרי אותו מדד.</li>
        <li><b>סטיית עקיבה:</b> כמה הקרן מפגרת בפועל אחרי המדד.</li>
        <li><b>גודל, נזילות וספרד:</b> קרן גדולה ונסחרת היטב קל יותר לקנות ולמכור.</li>
        <li><b>צוברת או מחלקת:</b> דיבידנדים מושקעים מחדש או משולמים — יש השלכות מס.</li>
        <li><b>מטבע וחשיפה:</b> מה המטבע שבו נסחרת הקרן, והאם יש גידור מטבע.</li>
        <li><b>מקום הרישום של הקרן:</b> יש השלכות מס שונות; בישראל בדקו במיוחד מס עיזבון אמריקאי בהחזקה ישירה בנכסים אמריקאיים.</li>
        <li><b>מי מנהל ומה המבנה:</b> קרן סל פיזית או סינתטית (ברמת הבנה בסיסית), וגוף מנהל בעל מוניטין.</li>
      </ul>
      <p class="small muted">ראו גם את <a href="#lesson/l1-4">השיעור על קרנות מדד</a> ואת <a href="#portfolio">כלי התיק</a>.</p></section>

    <section class="card mt" aria-labelledby="cmQ"><h2 id="cmQ">❓ שאלות לשאול יועץ מורשה (אם אתם מתייעצים)</h2>
      <ol>
        <li>מה הרישיון שלך, ומי מפקח עליך?</li>
        <li>איך אתה מרוויח — עמלה ממני, עמלות מגורמים אחרים, או שכר קבוע? יש לך ניגוד עניינים?</li>
        <li>מה העלות הכוללת של ההמלצה, בשקלים ובאחוזים, בשנה הראשונה ובכל שנה?</li>
        <li>למה דווקא המוצר הזה ולא חלופה זולה ומפוזרת? מה ההנחות?</li>
        <li>מה הסיכון הגרוע ביותר, ומה קורה אם התיק יורד 30%?</li>
        <li>איך זה מתחבר לכרית שלי, לפנסיה ולמטרות שלי?</li>
        <li>אפשר לקבל את ההמלצה והעלויות בכתב?</li>
      </ol></section>
    <p class="small muted mt">התוכן לימודי בלבד ואינו ייעוץ השקעות, פנסיה, ביטוח או מס.</p>`;

  const $v = id => document.getElementById(id);
  $v("cmMonthly").value = s.monthly; $v("cmYears").value = s.years; $v("cmGross").value = s.gross;
  const read = () => ({ monthly: +$v("cmMonthly").value || 0, years: Math.min(50, Math.max(1, Math.round(+$v("cmYears").value || 1))), gross: +$v("cmGross").value || 0,
    opts: s.opts.map((_, i) => { const o = { n: $v("cmN" + i).value }; ["fee", "fixed", "pct", "fx", "custody"].forEach(k => { o[k] = +$v("cm_" + k + i).value || 0; }); return o; }) });
  function calc() {
    const v = read();
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* ignore */ }
    const res = v.opts.map(o => ({ o, r: cmSim({ ...o, monthly: v.monthly, years: v.years, gross: v.gross }) }));
    const best = Math.max(...res.map(x => x.r.v)), paid = v.monthly * v.years * 12;
    $v("cmRes").innerHTML = `
      <p class="small muted">סך ההפקדות: ${fmt(paid)} ₪ · שווי בלי שום עלות (הדגמה): ${fmt(res[0].r.v0)} ₪</p>
      <div class="table-wrap"><table><caption class="sr-only">תוצאות ההשוואה</caption>
        <thead><tr><th scope="col">אפשרות</th><th scope="col">שווי אחרי ${v.years} שנה</th><th scope="col">עלות כוללת שנגרעה</th><th scope="col">מהשווי ללא עלויות</th><th scope="col">מול הטובה ביותר</th></tr></thead>
        <tbody>${res.map(x => `<tr><th scope="row">${esc(x.o.n)}</th><td>${fmt(x.r.v)} ₪</td><td>${fmt(x.r.drag)} ₪</td><td>${fmt(x.r.v0 ? x.r.drag / x.r.v0 * 100 : 0, 1)}%</td><td>${x.r.v === best ? "הטובה ביותר" : "−" + fmt(best - x.r.v) + " ₪"}</td></tr>`).join("")}</tbody></table></div>
      <p>הפער בין האפשרות הזולה ליקרה ביותר: <b>${fmt(best - Math.min(...res.map(x => x.r.v)))} ₪</b> אחרי ${v.years} שנה — לפני כל שיקול של שירות, מיסוי, נגישות ואיכות המוצר. עלות נמוכה היא קריטריון חשוב, אבל לא היחיד.</p>
      <p class="small muted">המודל מפושט: פעולה אחת בחודש, תשואה קבועה, ללא מס ואינפלציה. "עלות כוללת שנגרעה" = הפרש מול מצב בלי עלויות כלל, וכוללת גם את השפעת דמי הניהול על התשואה.</p>`;
  }
  s.opts.forEach((_, i) => { ["N", "_fee", "_fixed", "_pct", "_fx", "_custody"].forEach(k => { const el = $v(k === "N" ? "cmN" + i : "cm" + k + i); if (el) el.addEventListener("input", calc); }); });
  ["cmMonthly", "cmYears", "cmGross"].forEach(id => $v(id).addEventListener("input", calc));
  calc();
};
