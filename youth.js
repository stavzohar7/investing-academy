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
      <p class="muted">מסלול צעד-צעד לשנה הראשונה של ניהול כסף עצמאי — מתאים במיוחד לבני 23–24 שגרים אצל ההורים, ולכל מי שמתחיל. לכל חודש שלוש משימות קצרות, רובן עם קישור לכלי או לשיעור באתר. מסמנים בעצמכם; ההתקדמות נשמרת בדפדפן בלבד. <a href="#lesson/lf-5">לשיעור לצעירים</a></p>
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
