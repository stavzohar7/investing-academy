// ===================================================================
//  🏁 אתגר 30 יום לסדר כלכלי: משימה קטנה ביום, 5 עד 15 דקות
//  כלי לימוד בלבד. המשימות כלליות ואינן ייעוץ פיננסי. ההתקדמות נשמרת בדפדפן בלבד.
// ===================================================================
TITLES.challenge = "אתגר 30 יום";

const CHALLENGE_WEEKS = [
  { title: "שבוע 1: רואים את התמונה", tasks: [
    ["רשמו את ההכנסה נטו החודשית הממוצעת שלכם."],
    ["פתחו את דף החשבון של החודש שעבר וסכמו בערך כמה הוצאתם."],
    ["סמנו את שלוש ההוצאות הגדולות ביותר שלכם."],
    ["מצאו כל מנוי חודשי קבוע (סטרימינג, אפליקציות, חדר כושר) ורשמו כמה הוא עולה."],
    ["בטלו או הקפיאו מנוי אחד שלא השתמשתם בו החודש."],
    ["רשמו כל חוב: יתרה, ריבית ותשלום חודשי.", "money/debt", "מחשבון חובות"],
    ["עשו את בדיקת הבריאות הפיננסית וצלמו את הציון.", "health", "בדיקת בריאות"]
  ] },
  { title: "שבוע 2: לוקחים שליטה", tasks: [
    ["הגדירו תקציב חודשי פשוט.", "money/budget", "מתכנן תקציב"],
    ["בדקו כמה אתם משלמים בחודש על עמלות בנק וכרטיס אשראי, ורשמו."],
    ["בחרו קטגוריה רצונית אחת (בילויים, משלוחים, קניות) וקבעו לה תקרה חודשית."],
    ["בדקו איך פותחים חשבון או פיקדון נפרד לכרית ביטחון, ובאילו תנאים."],
    ["הגדירו הפקדה אוטומטית קטנה לחיסכון ביום המשכורת, גם אם הסכום צנוע."],
    ["רשמו הוצאות שמגיעות פעם בשנה וחשבו כמה לשים בצד כל חודש.", "money/annual", "הוצאות שנתיות"],
    ["סיכום שבוע: מה הפתיע אתכם בנתונים? כתבו משפט אחד."]
  ] },
  { title: "שבוע 3: חובות וריביות", tasks: [
    ["מצאו בדף החשבון את הריבית על המינוס או על כרטיס האשראי."],
    ["אם תכננתם קנייה בתשלומים, חשבו כמה היא עולה לעומת מזומן.", "money/credit", "עלות אשראי"],
    ["מיינו את החובות מהריבית הגבוהה לנמוכה."],
    ["אפשר לבקש מהבנק או מחברת האשראי הצעה בכתב להפחתת ריבית או לאיחוד חובות. תבקשו, ותשוו בכתב."],
    ["קבעו סכום תוספת חודשי לחוב היקר ביותר, אם יש.", "money/debt", "מחשבון חובות"],
    ["קבעו יעד לכרית ביטחון במספר חודשי הוצאות, וכמה להפקיד בחודש.", "money/goal", "מטרות וכרית"],
    ["סיכום שבוע: מה אפשר לעשות כבר החודש?"]
  ] },
  { title: "שבוע 4: מסתכלים קדימה", tasks: [
    ["מצאו את הדוח האחרון של החיסכון הפנסיוני שלכם, אם יש."],
    ["חפשו בדוח את דמי הניהול ורשמו אותם.", "compare", "השוואת עלויות"],
    ["עברו על הביטוחים שלכם וכתבו בקצרה מה מכוסה."],
    ["כתבו מטרה כספית אחת עם סכום ותאריך."],
    ["בדקו כמה עולה לדחות חיסכון בכמה שנים.", "money/delay", "עלות ההמתנה"],
    ["למדו מונח אחד חדש מהמילון.", "glossary", "המילון"],
    ["עדכנו תמונת מצב כספית.", "finance", "התנהלות כספית"],
    ["חזרו על בדיקת הבריאות הפיננסית והשוו לציון מהשבוע הראשון.", "health", "בדיקת בריאות"],
    ["כתבו שלושה הרגלים שתמשיכו איתם אחרי האתגר. סיימתם!"]
  ] }
];
const CHALLENGE_TASKS = CHALLENGE_WEEKS.flatMap((w, wi) => w.tasks.map(t => ({ text: t[0], link: t[1], linkText: t[2], week: wi })));

const chLoad = () => { try { const x = JSON.parse(localStorage.getItem("ia-challenge")); if (x && x.done) return x; } catch (e) { /* ignore */ } return { done: {}, started: null }; };

Routes.challenge = function () {
  const st = chLoad(), N = CHALLENGE_TASKS.length;
  const save = () => { try { localStorage.setItem("ia-challenge", JSON.stringify(st)); } catch (e) { /* ignore */ } };
  app().innerHTML = `
    <h1>🏁 אתגר 30 יום לסדר כלכלי</h1>
    <p class="muted">משימה קטנה ביום, חמש עד חמש-עשרה דקות. בסוף החודש יש לכם תמונה ברורה, תקציב, תוכנית לחובות וכרית, ומטרה כתובה. <b>אין מועד קבוע ואין "פיגור"</b>: אם פספסתם יום, ממשיכים מהמשימה הבאה.</p>
    <div class="box warn">המשימות כלליות, לימודיות בלבד, ואינן ייעוץ פיננסי. אל תקבלו החלטות על חיסכון, חובות או ביטוח רק על סמך משימה אחת.</div>
    <section class="card mt" aria-labelledby="chN" aria-live="polite"><h2 id="chN">המשימה הבאה</h2><div id="chNext"></div></section>
    <div id="chList" class="mt"></div>`;
  const render = () => {
    const doneN = CHALLENGE_TASKS.filter((_, i) => st.done[i]).length, nextI = CHALLENGE_TASKS.findIndex((_, i) => !st.done[i]);
    document.getElementById("chNext").innerHTML = nextI < 0
      ? `<p class="good"><b>סיימתם את כל ${N} המשימות. כל הכבוד!</b></p><p class="small muted">כדאי לחזור על בדיקת הבריאות הפיננסית בעוד שלושה חודשים ולראות מה השתנה.</p><button type="button" class="btn ghost small" id="chReset">להתחיל אתגר חדש</button>`
      : `<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${N}" aria-valuenow="${doneN}" aria-label="התקדמות באתגר"><div style="width:${doneN / N * 100}%"></div></div>
         <p class="small muted">${doneN} מתוך ${N} משימות</p>
         <p style="font-size:1.1rem"><b>משימה ${nextI + 1}:</b> ${esc(CHALLENGE_TASKS[nextI].text)}</p>
         ${CHALLENGE_TASKS[nextI].link ? `<p><a href="#${CHALLENGE_TASKS[nextI].link}">${esc(CHALLENGE_TASKS[nextI].linkText)} ←</a></p>` : ""}
         <button type="button" class="btn" id="chDone">סיימתי את המשימה ✓</button>`;
    const d = document.getElementById("chDone"); if (d) d.onclick = () => { st.done[nextI] = true; if (!st.started) st.started = new Date().toISOString().slice(0, 10); save(); render(); };
    const r = document.getElementById("chReset"); if (r) r.onclick = () => { st.done = {}; st.started = null; save(); render(); };
    let i = 0;
    document.getElementById("chList").innerHTML = CHALLENGE_WEEKS.map(w => `<section class="card mb"><h2 style="font-size:1.1rem">${esc(w.title)}</h2>${w.tasks.map(t => { const k = i++; return `<label class="opt-row"><input type="checkbox" data-i="${k}" ${st.done[k] ? "checked" : ""}> <span><b>${k + 1}.</b> ${esc(t[0])}${t[1] ? ` <a href="#${t[1]}">${esc(t[2])}</a>` : ""}</span></label>`; }).join("")}</section>`).join("");
    document.querySelectorAll("#chList input[type=checkbox]").forEach(c => c.onchange = () => { if (c.checked) st.done[c.dataset.i] = true; else delete st.done[c.dataset.i]; save(); render(); });
  };
  render();
};
