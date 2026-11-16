// ===================================================================
//  מבנה של קורס: פתיחת שלב, מטרות, משימה מעשית, מבחן שלב, פרויקט גמר ותעודות
// ===================================================================
TITLES.level = "פתיחת שלב";
TITLES.capstone = "פרויקט הגמר";

const LEVEL_META = {
  l1: { why: "לפני שמנתחים חברות, צריך להבין מה זו מניה, איך הכסף גדל עם הזמן, ומה הבסיס הפיננסי שמאפשר להישאר בשוק גם במשבר.",
    goals: ["להסביר מה זו מניה ואיך בעלי מניות מרוויחים", "לחשב ריבית דריבית ולהבין למה זמן חשוב יותר מתזמון", "להכיר את סוגי הפקודות, הברוקרים והמעטפות בישראל", "לבנות סדר עדיפויות פיננסי ותוכנית ל-30 הימים הראשונים"],
    task: { title: "תמונת המצב הפיננסית שלי", steps: ["רשום הכנסות והוצאות חודשיות, וחשב כמה נשאר להשקעה בכל חודש.", "רשום את כל החובות והריביות שלהם, וסמן חובות יקרים.", "קבע יעד לכרית ביטחון (3-6 חודשי הוצאות).", "הכנס את ההפקדה החודשית שלך ל<a href=\"#tools/compound\">מחשבון ריבית דריבית</a> ל-20 שנה, ובדוק כמה דמי ניהול גבוהים היו עולים לך."],
      check: ["אני יודע כמה כסף פנוי להשקעה יש לי בכל חודש", "יש לי תוכנית לחובות היקרים", "הרצתי את מחשבון ריבית דריבית עם המספרים שלי"] } },
  l2: { why: "באפט אומר שחשבונאות היא שפת העסקים. בלי לקרוא דוחות — אי אפשר לדעת אם עסק טוב, ואי אפשר לזהות ייפוי.",
    goals: ["לקרוא דוח רווח והפסד, מאזן ודוח תזרים", "לחשב FCF, ROE, ROIC ושולי רווח", "להשתמש במכפילים ולהבין את המגבלות שלהם", "לזהות דגלים אדומים חשבונאיים ולהשתמש ב-Piotroski, Altman ו-Beneish"],
    task: { title: "לקרוא דוח אמיתי", steps: ["בחר חברה ציבורית שאתה מכיר את המוצרים שלה.", "מצא את הדוח השנתי שלה (EDGAR בארה\"ב, מאיה בישראל).", "רשום ל-5 שנים: הכנסות, רווח גולמי, רווח נקי, תזרים מפעילות שוטפת ו-CAPEX.", "הכנס את נתוני השנה האחרונה ל<a href=\"#tools/ratios\">מנתח היחסים</a>.", "השווה רווח נקי לתזרים לאורך השנים — האם הרווח הופך למזומן?"],
      check: ["חישבתי FCF ל-5 שנים", "השוויתי רווח נקי לתזרים", "זיהיתי לפחות חוזקה אחת וחולשה אחת בדוחות"] } },
  l3: { why: "זה הלב של הקורס: איך באפט וגרהאם חושבים על שווי, מחיר, חפיר והנהלה — ואיך מתרגמים את זה למספר.",
    goals: ["להשתמש במשל מר שוק ובמרווח ביטחון בהחלטות", "לזהות חפיר כלכלי ואת הכיוון שלו", "להעריך הנהלה והקצאת הון", "לבנות DCF בשלושה תרחישים ו-Reverse DCF"],
    task: { title: "הערכת השווי הראשונה שלך", steps: ["קח את החברה מהמשימה הקודמת.", "זהה את סוג החפיר שלה, והבא ראיה מהמספרים (ROIC ושוליים לאורך זמן).", "בנה ב<a href=\"#tools/dcf\">מחשבון ה-DCF</a> שלושה תרחישים: פסימי, בסיס ואופטימי.", "בדוק ב-Reverse DCF איזו צמיחה המחיר הנוכחי מגלם.", "כתוב משפט אחד: איפה המחיר ביחס לטווח השווי שלך, ובאיזה תנאי."],
      check: ["כתבתי את סוג החפיר עם ראיה מספרית", "יש לי שלושה תרחישי שווי", "כתבתי מסקנה על מחיר מול שווי"] } },
  ls: { why: "בנק, חברת ביטוח, קרן נדל\"ן וחברת תוכנה נמדדים אחרת. מי שמשתמש באותם כלים לכולן — טועה.",
    goals: ["לנתח בנקים וביטוח (Float, יחס משולב)", "להשתמש ב-FFO ו-NAV בנדל\"ן", "להעריך חברות תוכנה, מחזוריות, דיבידנד ופארמה", "להכיר את המאפיינים של בורסת תל אביב"],
    task: { title: "ניתוח לפי סקטור", steps: ["בחר חברה מסקטור שונה מהקודמת: בנק, ביטוח, נדל\"ן, תוכנה או מחזורית.", "רשום את 3-4 המדדים שמתאימים לסקטור לפי השיעור.", "השווה אותם למתחרה אחת לפחות.", "כתוב מה היה מטעה אם היית משתמש רק ב-P/E."],
      check: ["השתמשתי במדדים הייחודיים לסקטור", "השוויתי למתחרה", "הבנתי למה מכפיל רגיל מטעה כאן"] } },
  l4: { why: "הגרף לא אומר מה העסק שווה — אבל הוא אומר מי שולט כרגע: קונים או מוכרים. בסווינג זה הכלי המרכזי, ולמשקיע ארוך הוא עוזר בסבלנות.",
    goals: ["לקרוא נרות ומבנה מגמה", "לזהות תמיכה, התנגדות ותפקיד הנפח", "להשתמש בממוצעים נעים, RSI ו-ATR", "לדעת מה המחקר אומר על מומנטום ועל מה שלא מוכח", "לקרוא כרטיס טכני בשבע בדיקות ולחשב סטופ וגודל פוזיציה"],
    task: { title: "קריאת גרפים", steps: ["בחר 3 מניות והגדר לכל אחת את השלב שלה (1-4).", "סמן לכל אחת תמיכה, התנגדות ומיקום מול ממוצע 50 ו-200.", "בצע 10 עסקאות ב<a href=\"#simulator\">סימולטור</a>, וכתוב לפני כל אחת למה נכנסת.", "סכם: באילו עסקאות נכנסת נגד המגמה?"],
      check: ["זיהיתי שלב לכל מניה", "ביצעתי 10 עסקאות בסימולטור עם נימוק", "בדקתי את הטעויות שלי מול המגמה"] } },
  la: { why: "כאן הופכים טכניקה לתהליך: מתי ללחוץ על הגז, איך מוצאים מועמדות, איך נכנסים, מוסיפים ויוצאים.",
    goals: ["לקרוא את מצב השוק הכללי ולהתאים חשיפה", "לבנות סורק ורשימת מעקב A/B/C", "לנהל כניסות, הוספה ויציאה", "לזהות תבניות היפוך והמשך"],
    task: { title: "הסורק הראשון שלי", steps: ["בנה סורק עם 4-5 קריטריונים מהשיעור.", "עבור על התוצאות ובחר 10 מועמדות.", "דרג אותן A/B/C.", "לשתי מניות A כתוב תוכנית מלאה: כניסה, סטופ, יעד וגודל פוזיציה (<a href=\"#tools/position\">מחשבון</a>)."],
      check: ["הגדרתי קריטריונים כתובים לסורק", "דירגתי 10 מועמדות", "יש לי שתי תוכניות מלאות — בלי לבצע"] } },
  l5: { why: "זה השלב שמפריד בין מי ששורד למי שנמחק. שיטה מבריקה בלי ניהול סיכונים מסתיימת בהרס.",
    goals: ["לחשב גודל פוזיציה לפי חוק ה-1%", "לחשב יחס סיכוי-סיכון ותוחלת", "לקבוע סטופים ותוכנית יציאה", "לפזר נכון ולהימנע ממינוף והרס"],
    task: { title: "חוקי הסיכון שלי", steps: ["קבע: אחוז סיכון לעסקה, פוזיציה מקסימלית, וסיכון פתוח כולל.", "חשב גודל פוזיציה לשלוש עסקאות לדוגמה.", "חשב תוחלת לפי 10 העסקאות מהסימולטור או מהיומן.", "בדוק את הפיזור של התיק שלך לפי סקטור ומדינה."],
      check: ["כתבתי חוקי סיכון מספריים", "חישבתי תוחלת מנתונים אמיתיים", "בדקתי ריכוזיות בתיק"] } },
  lp: { why: "תיק טוב הוא לא אוסף מניות — הוא תוכנית. כאן כותבים את החוקה של התיק ומכירים את שאר הנכסים.",
    goals: ["לכתוב תוכנית השקעה (IPS)", "להבין אג\"ח ואת התפקיד שלהן", "להכיר אופציות וקריפטו — כולל הסכנות", "לחשב יעד לעצמאות כלכלית"],
    task: { title: "התוכנית הכתובה", steps: ["כתוב IPS מלא לפי התבנית בשיעור.", "קבע חלוקה בין ליבה, מניות נבחרות, סווינג, אג\"ח ומזומן.", "חשב את היעד שלך ב<a href=\"#tools/fi\">מחשבון העצמאות הכלכלית</a>.", "כתוב משפט: מה אעשה אם השוק יירד 35%?"],
      check: ["יש לי IPS כתוב", "יש לי חלוקה מספרית", "כתבתי מראש מה אעשה במשבר"] } },
  l6: { why: "רוב ההפסדים של משקיעים לא נובעים מחוסר ידע, אלא מהתנהגות. כאן לומדים לזהות את עצמך.",
    goals: ["לזהות את ההטיות הקוגניטיביות הנפוצות", "לבנות שגרה, משמעת ויומן", "להשתמש במודלים המנטליים של מאנגר", "לחשוב בהסתברויות ולהפריד החלטה מתוצאה"],
    task: { title: "יומן ההחלטות", steps: ["כתוב 3 החלטות פיננסיות שקיבלת בעבר.", "לכל אחת: האם ההחלטה הייתה טובה, ללא קשר לתוצאה?", "זהה בכל אחת הטיה שהשפיעה.", "כתוב 5 כללי ברזל אישיים ותלה אותם מול העיניים."],
      check: ["ניתחתי 3 החלטות לפי תהליך ולא לפי תוצאה", "זיהיתי הטיות", "כתבתי כללי ברזל"] } },
  lm: { why: "לא חוזים מאקרו — אבל חייבים להבין אותו: ריבית היא כוח המשיכה של מחירי הנכסים, והיסטוריה מלמדת איך בועות נראות מבפנים.",
    goals: ["להבין ריבית, אינפלציה והשפעתן על שווי", "להכיר את המחזור הכלכלי ובועות היסטוריות", "לחשוב כמו הווארד מרקס על המטוטלת", "להעריך אם השוק כולו יקר"],
    task: { title: "תמונת המאקרו", steps: ["בדוק את הריבית, האינפלציה ותשואת האג\"ח הנוכחיות.", "בדוק את ה-CAPE של השוק האמריקאי (למשל באתר multpl.com).", "דרג את 'טמפרטורת השוק' לפי הטבלה של מרקס.", "כתוב איך זה משנה את שיעור ההיוון ואת הציפיות שלך — בלי לחזות."],
      check: ["אספתי נתונים עדכניים", "דירגתי את טמפרטורת השוק", "תרגמתי את זה להנחות — לא לתחזית"] } },
  lg: { why: "ללמוד מהטובים ביותר: כל אחד מהם הוסיף כלי אחר — נוסחה, מסגרת, משמעת או סיפור אזהרה.",
    goals: ["להכיר את הגישות של גרינבלט, קלרמן, פבראי, סמית' וסליפ", "להבין רכישות חוזרות והקצאת הון", "ללמוד מהלקחים של ליברמור ודרבס"],
    task: { title: "שכפול חכם", steps: ["בחר משקיע אחד מהשלב.", "קרא מכתב אחד שלו או את דיווח האחזקות האחרון שלו.", "בחר רעיון אחד — ונתח אותו בעצמך עם הצ'קליסט.", "כתוב: מה היית עושה אחרת ממנו, ולמה?"],
      check: ["קראתי מקור ראשוני של המשקיע", "ניתחתי את הרעיון בעצמי", "גיבשתי דעה עצמאית"] } },
  lc: { why: "סיפורים אמיתיים מלמדים יותר מכל נוסחה: איך חפירים מתאדים, איך מחיר הורס השקעה טובה, ואיך חוב הופך משבר לאסון.",
    goals: ["לזהות דפוסים חוזרים בהצלחות ובכישלונות", "לחבר כל סיפור לעיקרון בקורס", "לשפוט החלטות היסטוריות בלי הטיית 'ידעתי מראש'"],
    task: { title: "מקרה בוחן משלך", steps: ["בחר חברה שעלתה או קרסה בצורה דרמטית.", "תאר מה קרה בחמש נקודות.", "חבר כל נקודה לעיקרון מהקורס (חפיר, מחיר, חוב, הנהלה, פסיכולוגיה).", "שאל: מה היה אפשר לראות מראש, ומה רק בדיעבד?"],
      check: ["תיארתי את הסיפור בעובדות", "חיברתי לעקרונות", "הפרדתי בין מה שנראה מראש למה שרק בדיעבד"] } },
  l7: { why: "השלב שמחבר הכול: תהליך ניתוח מלא, בניית תיק, ומבחן הגמר — ואחריו פרויקט הגמר.",
    goals: ["לבצע תהליך ניתוח מניה מלא מ-A עד Z", "לשלב ניתוח פונדמנטלי וטכני ולהכריע כשהם חלוקים", "לקרוא דוח שנתי אמיתי ולמצוא רעיונות", "לבנות תיק ליבה-לוויין", "לעבור את מבחן הגמר ואת פרויקט הגמר"],
    task: { title: "פרויקט הגמר", steps: ["השלם את <a href=\"#capstone\">פרויקט הגמר</a>: ניתוח מלא של חברה לבחירתך."], check: ["השלמתי את כל חלקי הפרויקט", "עברתי על רשימת הבדיקה העצמית"] } }
};

const levelIdx = id => window.CURRICULUM.findIndex(l => l.id === id);
function lvExamScore(id) { return (State.data.levelExam || {})[id]; }
function lvLessonsDone(lv) { return lv.lessons.every(x => x.id in State.data.done); }

// ===================== עמוד פתיחת שלב + מבחן שלב =====================
Routes.level = function (id, mode) {
  const i = levelIdx(id), lv = window.CURRICULUM[i];
  if (!lv) return go("path");
  if (mode === "exam") return levelExam(lv, i);
  const M = LEVEL_META[id] || { why: lv.subtitle, goals: [], task: null };
  const done = lv.lessons.filter(x => x.id in State.data.done).length;
  const mins = lv.lessons.reduce((s, x) => s + x.minutes, 0);
  const ex = lvExamScore(id);
  const tasks = State.data.tasks = State.data.tasks || {};
  const tk = tasks[id] = tasks[id] || { checks: {}, notes: "" };
  document.title = `שלב ${i + 1}: ${lv.title} — אקדמיית המשקיע`;
  app().innerHTML = `
    <nav class="small muted" aria-label="מיקום"><a href="#path">מסלול</a> › שלב ${i + 1}</nav>
    <section class="card hero-level" aria-labelledby="lvH">
      <div class="row"><span style="font-size:2.6rem" aria-hidden="true">${lv.icon}</span>
        <div><div class="small muted">${(partOfLevel(id) || {}).title || ""} · שלב ${i + 1} מתוך ${window.CURRICULUM.length}</div><h1 id="lvH" style="margin:0">${esc(lv.title)}</h1></div></div>
      <p class="mt" style="font-size:1.08rem">${M.why}</p>
      <div class="row"><span class="pill">📘 ${lv.lessons.length} שיעורים</span><span class="pill">⏱ כ-${Math.round(mins / 5) * 5} דקות קריאה</span><span class="pill">✅ ${done}/${lv.lessons.length} הושלמו</span>
        ${ex != null ? `<span class="pill ${ex >= 80 ? "green" : ""}">📝 מבחן שלב: ${ex}%</span>` : ""}</div>
    </section>

    <div class="grid grid-2 mt">
      <section class="card" aria-labelledby="gT"><h2 id="gT">🎯 בסוף השלב תדע</h2><ul>${M.goals.map(g => `<li>${g}</li>`).join("")}</ul></section>
      <section class="card" aria-labelledby="sT"><h2 id="sT">🗂️ השיעורים</h2>
        <ol class="lvl-lessons">${lv.lessons.map(x => `<li><a href="#lesson/${x.id}">${x.id in State.data.done ? "✅" : "○"} ${esc(x.title)}</a> <span class="small muted">${x.minutes} דק'</span></li>`).join("")}</ol>
        <a class="btn mt" href="#lesson/${(lv.lessons.find(x => !(x.id in State.data.done)) || lv.lessons[0]).id}">${done ? "להמשיך ←" : "להתחיל את השלב ←"}</a></section>
    </div>

    ${M.task ? `<section class="card mt task" aria-labelledby="tT">
      <h2 id="tT">🛠️ משימה מעשית: ${M.task.title}</h2>
      <p class="muted small">המשימה הופכת את הידע להרגל. עשה אותה על חברה או מצב אמיתיים — זה החלק שהכי משפר.</p>
      <ol>${M.task.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      <fieldset class="qset"><legend>בדיקה עצמית</legend>
        ${M.task.check.map((c, k) => `<label class="choice"><input type="checkbox" data-tchk="${k}" ${tk.checks[k] ? "checked" : ""}/><span><b>${c}</b></span></label>`).join("")}
      </fieldset>
      <div class="field"><label for="taskNotes">הסיכום שלי</label><textarea id="taskNotes" rows="4" placeholder="מה עשיתי ומה למדתי...">${esc(tk.notes)}</textarea><div class="hint">נשמר אוטומטית.</div></div>
    </section>` : ""}

    <section class="card mt" aria-labelledby="eT">
      <h2 id="eT">📝 מבחן שלב</h2>
      <p>10 שאלות מכל שיעורי השלב, בסדר אקראי. ציון עובר: <b>80%</b>. מעבר המבחן (יחד עם השלמת כל השיעורים) מזכה ב<b>תעודת סיום השלב</b>.</p>
      ${ex != null ? `<p>הציון הטוב ביותר שלך: <b class="${ex >= 80 ? "good" : "bad"}">${ex}%</b></p>` : ""}
      <div class="row">
        <a class="btn" href="#level/${id}/exam">${ex != null ? "לנסות שוב" : "להתחיל את המבחן"} ←</a>
        ${lvLessonsDone(lv) && ex >= 80 ? `<a class="btn green" href="#certificate/${id}">🎓 התעודה שלי</a>` : ""}
        <a class="btn ghost" href="#summary/${id}">📋 סיכום השלב</a>
      </div>
      ${!lvLessonsDone(lv) ? `<p class="small muted mt">אפשר לגשת למבחן בכל שלב — אבל מומלץ אחרי שמשלימים את השיעורים.</p>` : ""}
    </section>

    <div class="row mt">
      ${i > 0 ? `<a class="btn ghost" href="#level/${window.CURRICULUM[i - 1].id}">→ השלב הקודם</a>` : ""}<span class="spacer"></span>
      ${i < window.CURRICULUM.length - 1 ? `<a class="btn ghost" href="#level/${window.CURRICULUM[i + 1].id}">השלב הבא ←</a>` : ""}
    </div>`;

  $$("[data-tchk]").forEach(c => c.onchange = () => { tk.checks[c.dataset.tchk] = c.checked; State.save(); if (M.task.check.every((_, k) => tk.checks[k])) toast("🛠️ המשימה המעשית הושלמה!"); });
  const tn = $("#taskNotes"); if (tn) tn.addEventListener("input", e => { tk.notes = e.target.value; State.save(); });
};

function levelExam(lv, i) {
  const pool = lv.lessons.flatMap(l => l.quiz.map(q => ({ q, l })));
  const qs = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(10, pool.length));
  document.title = `מבחן שלב ${i + 1} — אקדמיית המשקיע`;
  app().innerHTML = `
    <nav class="small muted" aria-label="מיקום"><a href="#path">מסלול</a> › <a href="#level/${lv.id}">שלב ${i + 1}</a> › מבחן</nav>
    <h1>📝 מבחן שלב ${i + 1}: ${esc(lv.title)}</h1>
    <p class="muted">${qs.length} שאלות. ענה על כולן, ואז תקבל ציון והסברים. ציון עובר: 80%.</p>
    <form id="lvExam">
      ${qs.map((x, k) => {
        const order = x.q.options.map((_, j) => j).sort(() => Math.random() - 0.5);
        return `<fieldset class="q" data-k="${k}"><legend>${k + 1}. ${esc(x.q.q)}</legend>
          ${order.map(j => `<label class="choice"><input type="radio" name="q${k}" value="${j}"/><span>${esc(x.q.options[j])}</span></label>`).join("")}
          <div class="explain" aria-live="polite"></div></fieldset>`;
      }).join("")}
      <button type="submit" class="btn">הגש מבחן ←</button>
    </form>
    <div id="lvRes" aria-live="polite"></div>`;
  $("#lvExam").onsubmit = e => {
    e.preventDefault();
    const f = new FormData(e.target);
    if (qs.some((_, k) => f.get("q" + k) == null)) { toast("ענה על כל השאלות לפני ההגשה"); return; }
    let right = 0;
    qs.forEach((x, k) => {
      const v = +f.get("q" + k), ok = v === x.q.answer; if (ok) right++;
      const fs = $(`fieldset[data-k="${k}"]`);
      $$("input", fs).forEach(inp => { inp.disabled = true; const lab = inp.closest(".choice"); if (+inp.value === x.q.answer) lab.classList.add("ok"); else if (inp.checked) lab.classList.add("no"); });
      $(".explain", fs).innerHTML = `${ok ? "✅" : "❌"} ${esc(x.q.explain)} <a href="#lesson/${x.l.id}">לשיעור</a>`;
    });
    const score = Math.round(right / qs.length * 100);
    State.data.levelExam = State.data.levelExam || {};
    const first = !(State.data.levelExam[lv.id] >= 80) && score >= 80;
    State.data.levelExam[lv.id] = Math.max(score, State.data.levelExam[lv.id] || 0);
    if (first) State.data.xp += 30;
    markStudyDay(); State.save(); updateRankChip();
    $("#lvExam button[type=submit]").remove();
    $("#lvRes").innerHTML = `<div class="result center mt"><div class="big">${score}%</div><p>${right} מתוך ${qs.length}</p>
      ${score >= 80 ? `<p class="good"><b>🎉 עברת את מבחן השלב!</b></p>${lvLessonsDone(lv) ? `<a class="btn green" href="#certificate/${lv.id}">🎓 לתעודה</a>` : `<p class="small">השלם את כל שיעורי השלב כדי לקבל את התעודה.</p>`}`
        : `<p class="bad"><b>צריך 80% כדי לעבור.</b> עבור על השיעורים של השאלות שפספסת ונסה שוב.</p><button type="button" class="btn" onclick="Routes.level('${lv.id}','exam');window.scrollTo(0,0)">נסה שוב</button>`}
      <a class="btn ghost" href="#level/${lv.id}">לעמוד השלב</a></div>`;
    $("#lvRes .big").setAttribute("tabindex", "-1"); $("#lvRes .big").focus();
  };
}

// ===================== פרויקט הגמר =====================
const CAPSTONE = [
  ["biz", "1. העסק במילים שלי", "איך החברה מרוויחה כסף? מי הלקוחות, ולמה הם קונים דווקא כאן? מי המתחרים? האם זה בתוך מעגל הכשירות שלי?", ["l7-3", "l3-4"]],
  ["cls", "2. סיווג", "באיזו קטגוריה של לינץ' היא (צומחת לאט/יציבה/צומחת מהר/מחזורית/תפנית/נכסים)? באיזה שלב במחזור החיים? מה זה אומר על הכלים להערכה?", ["l7-1", "l3-8"]],
  ["moat", "3. החפיר", "איזה סוג חפיר (מבין 7 הכוחות)? מה הראיה במספרים (ROIC, שוליים, נתח שוק לאורך שנים)? האם הוא מתרחב או מצטמצם, ומה יכול לשבור אותו?", ["l3-3", "l3-7"]],
  ["nums", "4. המספרים", "צמיחה בהכנסות וברווח למניה, שוליים, ROIC, המרת רווח לתזרים, חוב נטו מול FCF ושינוי במספר המניות — לאורך 5-10 שנים. דגלים אדומים?", ["l2-4", "l2-6"]],
  ["mgmt", "5. הנהלה והקצאת הון", "האם ההנהלה ישרה ומקצה הון בחוכמה? מה עשתה עם הרווחים (השקעות, רכישות, רכישות חוזרות ובאיזה מחיר)? החזקות ותגמול?", ["l3-4", "lg-4"]],
  ["val", "6. הערכת שווי", "שלושה תרחישים (עם ההנחות), שווי למניה בכל אחד, ו-Reverse DCF: איזו צמיחה המחיר מגלם? האם זה סביר?", ["l3-5", "l7-7"]],
  ["inv", "7. היפוך", "פוסט-מורטם מראש: ההשקעה הפסידה 50% בעוד 3 שנים — למה? מה טיעון הדובים החזק ביותר?", ["l6-3", "l6-5"]],
  ["end", "8. המסקנה", "איפה המחיר ביחס לטווח השווי? מה מרווח הביטחון? אם הייתי משקיע — איזה גודל פוזיציה לפי ה-IPS שלי? מה יוכיח שטעיתי, ומתי אבדוק שוב?", ["l3-2", "lp-1"]]
];
const RUBRIC = ["השתמשתי במקורות ראשוניים (דוח שנתי / הודעות החברה)", "יש מספרים לאורך 5 שנים לפחות", "הבאתי ראיה מספרית לחפיר", "בניתי שלושה תרחישים והרצתי Reverse DCF", "כתבתי את טיעון הדובים החזק ביותר", "כתבתי מראש מה יוכיח שטעיתי", "המסקנה מתארת מחיר מול שווי ותנאים — לא ניחוש של כיוון", "הייתי מוכן להסביר את התזה לחבר בשתי דקות"];
const MIN_CHARS = 150;
const capDone = () => { const c = State.data.capstone || {}; return !!c.company && CAPSTONE.every(s => ((c.s || {})[s[0]] || "").trim().length >= MIN_CHARS) && RUBRIC.every((_, k) => (c.r || {})[k]); };

Routes.capstone = function () {
  const c = State.data.capstone = State.data.capstone || { company: "", s: {}, r: {} };
  const filled = () => CAPSTONE.filter(s => (c.s[s[0]] || "").trim().length >= MIN_CHARS).length;
  app().innerHTML = `
    <div class="row no-print"><h1 style="margin:0">🎓 פרויקט הגמר</h1><span class="spacer"></span>
      <button type="button" class="btn ghost" id="capExport">⬇️ הורד כקובץ טקסט</button><button type="button" class="btn ghost" onclick="window.print()">🖨️ הדפסה</button></div>
    <p class="muted">ניתוח מלא של חברה אמיתית לבחירתך — בדיוק כמו שמשקיע מקצועי עושה לפני החלטה. זה הפרויקט שמחבר את כל הקורס. כל חלק נשמר אוטומטית, ואפשר לעבוד עליו לאורך כמה ימים.</p>
    <div class="row mb"><div class="progress" style="flex:1" role="progressbar" aria-label="התקדמות בפרויקט" aria-valuemin="0" aria-valuemax="${CAPSTONE.length}" aria-valuenow="${filled()}"><div id="capBar" style="width:${filled() / CAPSTONE.length * 100}%"></div></div><b id="capCount">${filled()}/${CAPSTONE.length}</b></div>
    <section class="card mb"><div class="field"><label for="capCo">החברה שבחרתי (שם וסימול)</label><input id="capCo" value="${esc(c.company)}" placeholder="למשל: Costco — COST" /></div>
      <p class="small muted mt">כלים שיעזרו: <a href="#tools/ratios">מנתח יחסים</a> · <a href="#tools/dcf">מחשבון DCF</a> · <a href="#tools/returns">פירוק תשואה</a> · <a href="#checklist">צ'קליסט באפט</a> · <a href="#formulas">דף נוסחאות</a></p></section>
    ${CAPSTONE.map(s => `
      <section class="card mb cap-sec" aria-labelledby="cs-${s[0]}">
        <div class="row"><h2 id="cs-${s[0]}" style="font-size:1.15rem;margin:0">${s[1]}</h2><span class="spacer"></span><span class="pill" id="cc-${s[0]}"></span></div>
        <p class="small muted">${s[2]}</p>
        <div class="field"><label for="ct-${s[0]}" class="sr-only">${s[1]}</label><textarea id="ct-${s[0]}" data-sec="${s[0]}" rows="6">${esc(c.s[s[0]] || "")}</textarea></div>
        <p class="small no-print">שיעורים לעזרה: ${s[3].map(id => `<a href="#lesson/${id}">${esc(lessonTitle(id))}</a>`).join(" · ")}</p>
      </section>`).join("")}
    <section class="card mb" aria-labelledby="rbT"><h2 id="rbT">✅ בדיקה עצמית (רובריקה)</h2>
      <p class="small muted">כך בודקים עבודה טובה. סמן רק מה שבאמת עשית.</p>
      ${RUBRIC.map((r, k) => `<label class="choice"><input type="checkbox" data-rb="${k}" ${c.r[k] ? "checked" : ""}/><span><b>${r}</b></span></label>`).join("")}
    </section>
    <div id="capDone"></div>
    <p class="small muted">זהו תרגיל לימודי. הניתוח והמסקנה שלך אינם המלצה, וגם לא הוראה לפעול.</p>`;

  const refresh = () => {
    CAPSTONE.forEach(s => { const n = (c.s[s[0]] || "").trim().length; const el = $("#cc-" + s[0]); el.textContent = n >= MIN_CHARS ? "✅ מלא" : `${n}/${MIN_CHARS} תווים`; el.className = "pill" + (n >= MIN_CHARS ? " green" : ""); });
    $("#capBar").style.width = (filled() / CAPSTONE.length * 100) + "%"; $("#capCount").textContent = `${filled()}/${CAPSTONE.length}`;
    $("#capDone").innerHTML = capDone() ? `<div class="result center mb"><div class="big">🏆</div><p><b>השלמת את פרויקט הגמר!</b></p>${courseEligible() ? `<a class="btn green" href="#certificate/course">🎓 לתעודת סיום הקורס</a>` : `<p class="small">לתעודת סיום הקורס צריך גם להשלים את כל השיעורים ולעבור את מבחן הגמר ב-80%.</p>`}</div>` : "";
  };
  $("#capCo").addEventListener("input", e => { c.company = e.target.value; State.save(); refresh(); });
  $$("[data-sec]").forEach(t => t.addEventListener("input", () => { c.s[t.dataset.sec] = t.value; State.save(); refresh(); }));
  $$("[data-rb]").forEach(b => b.onchange = () => { c.r[b.dataset.rb] = b.checked; State.save(); refresh(); });
  $("#capExport").onclick = () => {
    const txt = `פרויקט גמר — ${c.company}\n${"=".repeat(30)}\n\n` + CAPSTONE.map(s => `${s[1]}\n${c.s[s[0]] || ""}\n`).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["﻿" + txt], { type: "text/plain;charset=utf-8" })); a.download = "capstone.txt"; a.click();
  };
  refresh();
};

// ===================== תעודות (גרסה מלאה: שלב + קורס) =====================
const courseEligible = () => ALL_LESSONS().every(l => l.id in State.data.done) && State.data.done["l7-5"] >= 80;

Routes.certificate = function (id) {
  const isCourse = id === "course";
  const i = isCourse ? -1 : levelIdx(id), lv = window.CURRICULUM[i];
  if (!isCourse && !lv) return go("path");
  const missing = [];
  if (isCourse) {
    const left = ALL_LESSONS().filter(l => !(l.id in State.data.done)).length;
    if (left) missing.push(`להשלים עוד ${left} שיעורים`);
    if (!(State.data.done["l7-5"] >= 80)) missing.push(`לעבור את <a href="#lesson/l7-5">מבחן הגמר</a> ב-80% ומעלה`);
    if (!capDone()) missing.push(`להשלים את <a href="#capstone">פרויקט הגמר</a>`);
  } else {
    const left = lv.lessons.filter(x => !(x.id in State.data.done)).length;
    if (left) missing.push(`להשלים עוד ${left} שיעורים בשלב`);
    if (!(lvExamScore(id) >= 80)) missing.push(`לעבור את <a href="#level/${id}/exam">מבחן השלב</a> ב-80% ומעלה`);
  }
  if (missing.length) {
    app().innerHTML = `<h1>🎓 ${isCourse ? "תעודת סיום הקורס" : "תעודת סיום שלב"}</h1>
      <div class="card"><p>${isCourse ? "כדי לקבל את תעודת סיום הקורס המלא" : `כדי לקבל את התעודה של <b>שלב ${i + 1}: ${esc(lv.title)}</b>`} נשאר:</p>
      <ul>${missing.map(m => `<li>${m}</li>`).join("")}</ul>
      <a class="btn" href="${isCourse ? "#path" : "#level/" + id}">${isCourse ? "למסלול" : "לעמוד השלב"} ←</a></div>`;
    return;
  }
  const avgOf = ids => Math.round(ids.reduce((s, x) => s + State.data.done[x], 0) / ids.length);
  const date = new Date().toLocaleDateString("he-IL");
  const title = isCourse ? "תעודת סיום הקורס המלא" : "תעודת סיום";
  document.title = `${isCourse ? title : `${title} — שלב ${i + 1}`} — אקדמיית המשקיע`;
  const what = isCourse ? `${window.CURRICULUM.length} שלבים · ${ALL_LESSONS().length} שיעורים · פרויקט גמר: ${esc(State.data.capstone.company)}` : `${lv.icon} שלב ${i + 1}: ${esc(lv.title)}`;
  const detail = isCourse ? `ציון במבחן הגמר: ${State.data.done["l7-5"]}% · ציון ממוצע בבחנים: ${avgOf(Object.keys(State.data.done))}%`
    : `${lv.lessons.length} שיעורים · ממוצע בבחנים: ${avgOf(lv.lessons.map(x => x.id))}% · מבחן שלב: ${lvExamScore(id)}%`;
  app().innerHTML = `
    <div class="row no-print"><h1 style="margin:0">🎓 ${title}</h1><span class="spacer"></span>
      <div class="field"><label for="certName">השם שיופיע בתעודה</label><input id="certName" value="${esc(State.data.certName || "")}" placeholder="השם שלך" /></div>
      <button type="button" class="btn" onclick="window.print()" style="margin-top:22px">🖨️ הדפסה / שמירה כ-PDF</button></div>
    <section class="certificate mt ${isCourse ? "course-cert" : ""}" aria-label="תעודה">
      <div class="cert-inner">
        <div class="cert-logo" aria-hidden="true">${isCourse ? "👑" : "📈"}</div>
        <div class="cert-org">אקדמיית המשקיע · מאפס ועד באפט</div>
        <h2 class="cert-title">${title}</h2>
        <p>מוענקת בזאת ל</p>
        <div class="cert-name" id="certShown">${esc(State.data.certName || "________________")}</div>
        <p>על השלמת</p>
        <div class="cert-level">${what}</div>
        <p class="small">${detail}</p>
        <blockquote class="cert-quote">"ההשקעה הטובה ביותר שאתה יכול לעשות היא בעצמך." — וורן באפט</blockquote>
        <div class="cert-date">${date}</div>
      </div>
    </section>`;
  $("#certName").addEventListener("input", e => { State.data.certName = e.target.value; State.save(); $("#certShown").textContent = e.target.value || "________________"; });
};
