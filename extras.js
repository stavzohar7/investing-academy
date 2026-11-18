// ===================================================================
//  התחל כאן · מכונת הזמן · שאלות נפוצות · נגישות · מפת המסע
// ===================================================================
TITLES.start = "התחל כאן";
TITLES.timemachine = "מכונת הזמן";
TITLES.faq = "שאלות נפוצות";
TITLES.accessibility = "הצהרת נגישות";

// ===================== התחל כאן: תוכנית לימוד אישית =====================
const START_FIRST = {
  none: ["l1-1", "l1-2", "l1-7"],
  some: { all: ["l1-7", "l2-1", "l3-1"], long: ["l1-7", "l2-1", "l3-1"], swing: ["l1-7", "l4-1", "l5-1"] },
  pro: { all: ["l3-5", "l5-1", "l7-3"], long: ["l3-3", "l3-5", "l7-3"], swing: ["l4-5", "l5-1", "la-1"] }
};

Routes.start = function () {
  const p = State.data.profile || {};
  const radio = (name, opts) => opts.map(([v, l, d]) => `
    <label class="choice"><input type="radio" name="${name}" value="${v}" ${p[name] === v ? "checked" : ""}/>
      <span><b>${l}</b>${d ? `<span class="small muted">${d}</span>` : ""}</span></label>`).join("");
  app().innerHTML = `
    <h1>🚀 התחל כאן</h1>
    <p class="muted">ענה על ארבע שאלות קצרות ותקבל <b>תוכנית לימוד אישית</b>: באיזה מסלול להתחיל, אילו שיעורים קודם, ובאיזה קצב. זו תוכנית <b>לימוד</b> — לא ייעוץ השקעות.</p>
    <form id="startForm" class="card">
      <fieldset class="qset"><legend>1. מה הניסיון שלך בהשקעות?</legend>
        ${radio("exp", [["none", "אין בכלל", "אף פעם לא קניתי מניה או קרן"], ["some", "קצת", "יש לי קרן או כמה מניות, אבל בלי שיטה"], ["pro", "מנוסה", "אני משקיע כבר כמה שנים"]])}
      </fieldset>
      <fieldset class="qset"><legend>2. מה הכי מעניין אותך?</legend>
        ${radio("goal", [["long", "השקעה לטווח ארוך", "לבנות הון לאורך שנים, בדרך של באפט"], ["swing", "סווינג טריידינג", "מסחר של ימים עד שבועות"], ["all", "הכול", "להבין לעומק את שני העולמות"]])}
      </fieldset>
      <fieldset class="qset"><legend>3. כמה זמן בשבוע תוכל להקדיש ללמידה?</legend>
        ${radio("time", [["1", "עד שעה"], ["3", "1-3 שעות"], ["5", "יותר מ-3 שעות"]])}
      </fieldset>
      <fieldset class="qset"><legend>4. מה נכון לגבי המצב שלך? (אפשר לסמן כמה, או אף אחד)</legend>
        <label class="choice"><input type="checkbox" name="debt" ${p.debt ? "checked" : ""}/><span><b>יש לי חוב בריבית גבוהה</b><span class="small muted">מינוס קבוע, כרטיס אשראי, הלוואה צרכנית</span></span></label>
        <label class="choice"><input type="checkbox" name="cushion" ${p.cushion ? "checked" : ""}/><span><b>יש לי כרית ביטחון</b><span class="small muted">3-6 חודשי הוצאות בצד</span></span></label>
      </fieldset>
      <div class="row mt"><button type="submit" class="btn">בנה לי תוכנית ←</button></div>
    </form>
    <div id="planOut" aria-live="polite"></div>`;

  const show = prof => {
    const track = prof.goal;
    const firsts = prof.exp === "none" ? START_FIRST.none : START_FIRST[prof.exp][track];
    const perWeek = { 1: 2, 3: 4, 5: 7 }[prof.time];
    const inTrackLessons = ALL_LESSONS().filter(l => !TRACKS[track].skip.includes(l.levelId)).length;
    const weeks = Math.ceil(inTrackLessons / perWeek);
    $("#planOut").innerHTML = `
      <section class="card mt plan" aria-labelledby="planT">
        <h2 id="planT">🗺️ התוכנית שלך</h2>
        <div class="kv">
          <div><div class="k">מסלול</div><div class="v">${TRACKS[track].icon} ${TRACKS[track].name}</div></div>
          <div><div class="k">קצב</div><div class="v">${perWeek} שיעורים בשבוע</div></div>
          <div><div class="k">זמן משוער לסיום המסלול</div><div class="v">כ-${weeks} שבועות</div></div>
        </div>
        ${prof.debt ? `<div class="disclaimer mt" role="note">💡 סימנת שיש לך חוב בריבית גבוהה. השיעור הראשון בתוכנית שלך מסביר למה, ברוב המקרים, משקיעים נבונים מטפלים בזה <b>לפני</b> שהם קונים מניות.</div>` : ""}
        ${!prof.cushion ? `<div class="disclaimer mt" role="note">💡 לא סימנת כרית ביטחון. בשיעור "סדר העדיפויות הפיננסי" תבין למה היא הבסיס שמאפשר להחזיק מניות גם במשבר.</div>` : ""}
        <h3>שלושת השיעורים הראשונים</h3>
        <ol>${[...new Set(prof.debt || !prof.cushion ? ["l1-7", ...firsts] : firsts)].slice(0, 3).map(id => `<li><a href="#lesson/${id}">${esc(lessonTitle(id))}</a></li>`).join("")}</ol>
        <h3>השגרה השבועית שלך</h3>
        <ul>
          <li>📘 <b>${perWeek} שיעורים</b> לפי הסדר במסלול, כולל הבוחן.</li>
          <li>🧠 <b>5 דקות ביום</b> של <a href="#practice">אימון יומי</a> — כדי לזכור את מה שלמדת.</li>
          <li>📰 <b>פעם בשבוע</b> קריאת <a href="#weekly">הניתוח השבועי</a> — לראות את העקרונות על חברות אמיתיות.</li>
          ${track !== "long" ? `<li>🎯 <b>3-5 עסקאות</b> ב<a href="#simulator">סימולטור</a>, ותיעוד ב<a href="#journal">יומן המסחר</a>.</li>` : `<li>✅ <b>פעם בחודש</b> ניתוח של חברה אחת עם <a href="#checklist">צ'קליסט באפט</a>, ושמירת התזה ב<a href="#watchlist">רשימת המעקב</a>.</li>`}
          <li>📚 ספר אחד בכל פעם מ<a href="#library">הספרייה</a> — מומלץ להתחיל ב"הפסיכולוגיה של הכסף".</li>
        </ul>
        <div class="row mt"><a class="btn" href="#lesson/${prof.debt || !prof.cushion ? "l1-7" : firsts[0]}">לשיעור הראשון ←</a><a class="btn ghost" href="#home">לדף הבית</a></div>
      </section>`;
  };
  if (p.goal) show(p);
  $("#startForm").onsubmit = e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const prof = { exp: f.get("exp"), goal: f.get("goal"), time: f.get("time"), debt: !!f.get("debt"), cushion: !!f.get("cushion") };
    if (!prof.exp || !prof.goal || !prof.time) return toast("ענה על שאלות 1-3 כדי לבנות תוכנית");
    State.data.profile = prof; State.data.track = prof.goal; State.save();
    show(prof);
    $("#planT").setAttribute("tabindex", "-1"); $("#planT").focus();
  };
};

// ===================== מכונת הזמן: האם היית שורד משבר? =====================
// רמות סגירה מקורבות של מדד S&P 500 (ללא דיבידנדים) בנקודות מפתח.
const CRISES = [
  { id: "gfc", title: "המשבר הפיננסי הגדול", years: "2007-2013", icon: "🏦",
    start: { label: "אוקטובר 2007", level: 1565, text: "השוק בשיא כל הזמנים. הכלכלה נראית חזקה, ודיבורים על בעיות במשכנתאות נשמעים רחוקים." },
    steps: [
      { label: "ספטמבר 2008", level: 1252, text: "בנק ההשקעות ליהמן ברדרס קורס. הכותרות מדברות על קריסה של המערכת הפיננסית כולה. התיק שלך ירד בכ-20%." },
      { label: "נובמבר 2008", level: 752, text: "הירידות ממשיכות. אנשים מאבדים עבודות, וחברים מספרים שמכרו הכול \"לפני שיהיה מאוחר מדי\". התיק ירד בכמעט חצי." },
      { label: "מרץ 2009", level: 677, text: "השפל. התיק ירד ביותר מ-55%. רוב הפרשנים צופים עוד ירידות. נדמה שזה לא ייגמר לעולם." }
    ],
    end: { label: "דצמבר 2013", level: 1848 } },
  { id: "dotcom", title: "התפוצצות בועת הדוט-קום", years: "2000-2007", icon: "💻",
    start: { label: "מרץ 2000", level: 1527, text: "השוק בשיא. כולם מדברים על \"הכלכלה החדשה\" ועל מניות אינטרנט שרק עולות." },
    steps: [
      { label: "אפריל 2001", level: 1103, text: "מניות הטכנולוגיה קורסות. התיק שלך ירד בכ-28%. \"זה רק תיקון\", אומרים חלק. אחרים כבר מוכרים." },
      { label: "ספטמבר 2001", level: 966, text: "אחרי פיגועי 11 בספטמבר הבורסה נסגרה לכמה ימים, ונפתחה בירידות חדות. התיק ירד בכ-37%." },
      { label: "אוקטובר 2002", level: 777, text: "השפל, אחרי שנתיים וחצי של ירידות ושערוריות חשבונאיות (אנרון, וורלדקום). התיק ירד בכמעט חצי." }
    ],
    end: { label: "מאי 2007", level: 1531 } },
  { id: "covid", title: "מפולת הקורונה", years: "2020", icon: "🦠",
    start: { label: "פברואר 2020", level: 3386, text: "השוק בשיא. מגיעות ידיעות על נגיף חדש, אבל רוב האנשים לא מודאגים." },
    steps: [
      { label: "12 במרץ 2020", level: 2481, text: "העולם נכנס לסגר. אחד מימי הירידה החדים בהיסטוריה. התיק ירד בכ-27% בשלושה שבועות." },
      { label: "23 במרץ 2020", level: 2237, text: "השפל. התיק ירד בכשליש. אין חיסון, אין ודאות, הכלכלה עומדת." }
    ],
    end: { label: "דצמבר 2020", level: 3756 } },
  { id: "y2022", title: "שנת הריבית 2022", years: "2022-2024", icon: "📈",
    start: { label: "ינואר 2022", level: 4797, text: "השוק בשיא אחרי שנתיים של עליות. האינפלציה מתחילה לטפס." },
    steps: [
      { label: "יוני 2022", level: 3667, text: "הבנק המרכזי מעלה ריבית בקצב המהיר מזה עשורים. מניות צמיחה קורסות. התיק ירד בכ-24%." },
      { label: "אוקטובר 2022", level: 3577, text: "השפל. גם האג\"ח ירדו השנה — אין מקום מסתור. התחזיות מדברות על מיתון." }
    ],
    end: { label: "דצמבר 2024", level: 5882 } }
];

Routes.timemachine = function (cid) {
  const c = CRISES.find(x => x.id === cid);
  if (!c) {
    app().innerHTML = `
      <h1>🕰️ מכונת הזמן: האם היית שורד את המשבר?</h1>
      <p class="muted">קל לומר "הייתי מחזיק" כשיודעים איך הסיפור נגמר. כאן תחזור לרגע שלפני משבר אמיתי, עם תיק של 100,000 ₪ במדד S&amp;P 500 ועוד 20,000 ₪ בצד, ותחליט מה לעשות בכל נקודה — <b>בלי לדעת מה יקרה אחר כך</b>. בסוף תראה מה היה קורה.</p>
      <div class="grid grid-2">${CRISES.map(x => `
        <a class="card" href="#timemachine/${x.id}"><div style="font-size:2rem" aria-hidden="true">${x.icon}</div>
          <b>${x.title}</b><div class="small muted">${x.years} · ${x.steps.length} נקודות החלטה</div></a>`).join("")}
      </div>
      <p class="small muted mt">הנתונים: רמות סגירה מקורבות של מדד S&amp;P 500 בנקודות מפתח, ללא דיבידנדים, מסים ועמלות — כדי לפשט. עם דיבידנדים, התוצאות של מי שהחזיק טובות עוד יותר.</p>`;
    return;
  }
  const S = { units: 100000 / c.start.level, cash: 0, reserve: 20000, log: [] };
  let step = -1;
  const money = v => `${fmt(Math.round(v))} ₪`;
  const render = () => {
    if (step >= c.steps.length) return finish();
    const pt = step < 0 ? c.start : c.steps[step];
    const value = S.units * pt.level + S.cash + S.reserve; // סך הכסף, מתוך 120,000 ₪ בהתחלה
    const isStart = step < 0;
    app().innerHTML = `
      <div class="row"><h1 style="margin:0">${c.icon} ${c.title}</h1><span class="spacer"></span><a class="btn ghost small" href="#timemachine">→ בחירת משבר אחר</a></div>
      <ol class="tm-steps" aria-label="ציר זמן">${[c.start, ...c.steps].map((s, k) => `<li class="${k - 1 < step ? "past" : k - 1 === step ? "now" : ""}">${s.label}</li>`).join("")}<li>?</li></ol>
      <section class="card tm-card" aria-live="polite">
        <div class="small muted">📅 ${pt.label}</div>
        <p class="tm-text">${pt.text}</p>
        <div class="kv">
          <div><div class="k">שווי ההשקעה במניות</div><div class="v">${money(S.units * pt.level)}</div></div>
          <div><div class="k">מזומן שמכרת</div><div class="v">${money(S.cash)}</div></div>
          <div><div class="k">כרית בצד (לא הושקעה)</div><div class="v">${money(S.reserve)}</div></div>
          <div><div class="k">סך הכסף שלך (מתוך 120,000 ₪)</div><div class="v ${value >= 120000 ? "good" : "bad"}">${money(value)} (${pct(value / 120000 - 1)})</div></div>
        </div>
        ${isStart ? `<div class="row mt"><button type="button" class="btn" data-act="go">מתחילים ←</button></div>` : `
        <h2 class="mt" style="font-size:1.1rem">מה אתה עושה?</h2>
        <div class="row tm-actions">
          ${S.units > 0 ? `<button type="button" class="btn ghost" data-act="hold">🧘 מחזיק ולא נוגע</button>
          <button type="button" class="btn red" data-act="sell">🏃 מוכר הכול</button>` : `<button type="button" class="btn ghost" data-act="hold">⏳ נשאר במזומן</button>
          <button type="button" class="btn" data-act="reenter">↩️ חוזר להשקיע את המזומן</button>`}
          ${S.reserve > 0 ? `<button type="button" class="btn green" data-act="buy">🛒 משקיע את הכרית (20,000 ₪)</button>` : ""}
        </div>`}
      </section>`;
    $$("[data-act]").forEach(b => b.onclick = () => act(b.dataset.act, pt));
    const first = $("[data-act]"); if (first) first.focus();
  };
  const act = (a, pt) => {
    if (a === "sell") { S.cash += S.units * pt.level; S.units = 0; S.log.push(`${pt.label}: מכרת הכול`); }
    if (a === "buy") { S.units += S.reserve / pt.level; S.reserve = 0; S.log.push(`${pt.label}: השקעת את הכרית`); }
    if (a === "reenter") { S.units += S.cash / pt.level; S.cash = 0; S.log.push(`${pt.label}: חזרת להשקיע`); }
    if (a === "hold" && step >= 0) S.log.push(`${pt.label}: ${S.units > 0 ? "החזקת" : "נשארת במזומן"}`);
    step++; render();
  };
  const finish = () => {
    const E = c.end.level, bottom = Math.min(...c.steps.map(s => s.level));
    const yours = S.units * E + S.cash + S.reserve;
    const hold = 100000 * E / c.start.level + 20000;
    const best = 100000 * E / c.start.level + 20000 * E / bottom;
    const sellBottom = 100000 * bottom / c.start.level + 20000;
    const reentered = S.log.some(l => l.includes("חזרת להשקיע"));
    const verdict = yours >= hold * 0.999 ? ["good", "🏆 עברת את המבחן — נשארת בשוק בזמן הכי מפחיד."]
      : reentered ? ["mid", "😬 חזרת לשוק — וזה תיקן חלק מהנזק. אבל היציאה באמצע המשבר עלתה לך ביוקר."]
      : ["bad", `💔 הפחד ניצח: יצאת מהשוק ולא חזרת. ${yours > sellBottom ? "יצאת לפני השפל, אבל" : ""} פספסת את כל ההתאוששות — בדיוק מה שקרה למיליוני משקיעים אמיתיים.`];
    app().innerHTML = `
      <div class="row"><h1 style="margin:0">${c.icon} ${c.title} — הסוף</h1><span class="spacer"></span><a class="btn ghost small" href="#timemachine">→ בחירת משבר אחר</a></div>
      <section class="card tm-card" aria-labelledby="tmEnd">
        <h2 id="tmEnd">📅 ${c.end.label}: המדד הגיע ל-${fmt(E)} (${pct(E / c.start.level - 1, 0)} מהשיא שלפני המשבר)</h2>
        <p class="${verdict[0]}"><b>${verdict[1]}</b></p>
        <div class="kv">
          <div><div class="k">התוצאה שלך</div><div class="v big">${money(yours)}</div></div>
          <div><div class="k">אם רק היית מחזיק</div><div class="v">${money(hold)}</div></div>
          <div><div class="k">מחזיק + משקיע את הכרית בשפל</div><div class="v good">${money(best)}</div></div>
          <div><div class="k">מוכר בשפל ונשאר בחוץ</div><div class="v bad">${money(sellBottom)}</div></div>
        </div>
        <h3>ההחלטות שלך</h3>
        <ul>${S.log.map(l => `<li>${l}</li>`).join("")}</ul>
        <div class="lesson-body"><div class="box buffett">"<strong>השוק הוא מנגנון להעברת כסף מחסרי הסבלנות לסבלניים.</strong>" שים לב: אף אחד לא ידע מראש איפה השפל. מי שהחזיק לא היה צריך לדעת — הוא רק היה צריך <b>לא למכור</b>. ומי שהחזיק כסף בצד (כרית ביטחון) ולא היה ממונף, יכול היה אפילו לקנות בזול. בדיוק בשביל זה בונים את הבסיס ואת תוכנית ההשקעה <em>לפני</em> המשבר.</div></div>
        <div class="row mt"><a class="btn" href="#timemachine/${c.id}" onclick="setTimeout(router,0)">נסה שוב</a><a class="btn ghost" href="#lesson/lp-1">לשיעור על תוכנית השקעה כתובה</a><a class="btn ghost" href="#lesson/lm-3">לשיעור על בועות וקריסות</a></div>
      </section>`;
    $("#tmEnd").setAttribute("tabindex", "-1"); $("#tmEnd").focus();
  };
  render();
};

// ===================== שאלות נפוצות =====================
const FAQ = [
  ["כמה כסף צריך כדי להתחיל להשקיע?", "אפשר להתחיל בסכום קטן — בקרנות מחקות ובקופות גמל להשקעה אפשר להפקיד גם מאות שקלים בחודש. מה שחשוב יותר מהסכום הוא <b>ההרגל</b> וההתחלה המוקדמת, בזכות ריבית דריבית. רק שים לב לעמלות מינימום, שפוגעות בסכומים קטנים בחשבון מסחר.", ["l1-2", "l1-8"]],
  ["אולי כדאי לחכות לירידה לפני שמתחילים?", "אף אחד לא יודע לתזמן את השוק באופן עקבי, ומי שמחכה לירידה מפספס לעיתים קרובות את העליות שלפניה. הפתרון הנפוץ הוא הפקדה קבועה כל חודש — כך קונים גם ביוקר וגם בזול, בלי לנחש. ובמניות בודדות — לחכות למחיר עם מרווח ביטחון זה דבר נכון לגמרי.", ["l1-6", "l3-2"]],
  ["מה עדיף: קרן מדד או מניות בודדות?", "לרוב האנשים קרן מדד זולה היא בחירה מצוינת — כך ממליץ גם באפט. מניות בודדות מתאימות למי שמוכן להשקיע זמן רב במחקר, ובחלק מהתיק. אמת המידה תמיד: האם אחרי כמה שנים אתה עושה טוב יותר מהמדד?", ["l1-4", "l7-4"]],
  ["מה קורה אם תהיה מפולת?", "מפולות של 30%-50% קרו כמה פעמים בכל דור. מי שלא היה ממונף, החזיק כרית ביטחון ולא מכר — התאושש בכל המקרים בהיסטוריה של מדד S&amp;P 500. נסה את <a href=\"#timemachine\">מכונת הזמן</a> כדי להרגיש את זה בעצמך.", ["lm-3", "l5-4"]],
  ["להשקיע בשקלים או בדולרים?", "השקעה בשוק האמריקאי או העולמי מוסיפה פיזור מטבעי — וגם חשיפה לשינויי שער. אין תשובה נכונה אחת; חשוב להבין שהתשואה בשקלים תלויה גם בשער הדולר, ולבדוק אם הקרן מגדרת מטבע.", ["l1-6", "ls-6"]],
  ["מתי מוכרים מניה?", "בהשקעה ארוכה — כשהתזה נשברת, כשמוצאים הזדמנות טובה בהרבה, או כשהמחיר מנותק לגמרי מהשווי. לא כי המחיר ירד. בסווינג — לפי הסטופ והתוכנית שקבעת מראש.", ["l5-3", "la-5"]],
  ["כמה זמן לוקח ללמוד להשקיע?", "את הבסיס אפשר ללמוד תוך כמה שבועות. להפוך למשקיע טוב לוקח שנים של תרגול, טעויות ולמידה. באפט עצמו אומר שהוא ממשיך ללמוד כל יום. <a href=\"#start\">התחל כאן</a> יבנה לך תוכנית מותאמת.", ["l6-2"]],
  ["האם האתר ממליץ לי מה לקנות?", "לא. האתר מלמד <b>איך לחשוב</b> ומדגים ניתוחים על חברות אמיתיות, אבל הוא לא נותן המלצות לקנות או למכור ולא ייעוץ אישי. ההחלטות שלך — ואם אתה צריך ייעוץ מותאם, פנה ליועץ השקעות מורשה.", []],
  ["אפשר להתעשר מהר בבורסה?", "רוב מי שמנסה להתעשר מהר מפסיד — בגלל מינוף, הימורים, הונאות או מסחר רגשי. ההון של באפט נבנה במשך יותר משבעים שנה. הדרך הבטוחה יותר היא איטית: תשואה סבירה לאורך הרבה שנים.", ["l1-9", "l1-2"]],
  ["האם סווינג מתאים לי?", "סווינג דורש זמן קבוע, משמעת ויכולת לחתוך הפסדים בלי רגשות. רוב הסוחרים הפרטיים לא מנצחים את המדד. אם אתה רוצה לנסות — התחל בסימולטור ויומן מסחר, אחר כך בסכום קטן, והגדל רק אחרי שהנתונים מראים יתרון.", ["l1-5", "l7-4"]],
  ["למה לכתוב תזה לפני שקונים?", "כי אחרי הקנייה המוח מתחיל להצדיק את ההחלטה (הטיית אישוש). תזה כתובה — כולל מה יוכיח שטעית — היא הדרך לבחון את עצמך בכנות. אפשר לשמור תזות ב<a href=\"#watchlist\">רשימת המעקב</a>.", ["l6-1", "l7-3"]],
  ["מה ההבדל בין חיסכון להשקעה?", "חיסכון שומר על הכסף (כמעט בלי סיכון, ותשואה נמוכה). השקעה מקבלת סיכון של ירידות בתמורה לתשואה גבוהה יותר לאורך זמן. כסף לטווח קצר — בחיסכון; כסף לשנים רבות — בהשקעה.", ["l1-7"]],
  ["מה עם קריפטו?", "יש שיעור שלם על זה מנקודת מבט של משקיע ערך: מה מייצר ערך, למה קשה להעריך שווי, ומה כללי הזהירות.", ["lp-4"]],
  ["איך אני יודע שאפשר לסמוך על המידע באתר?", "אנחנו בודקים חישובים ועובדות מול מקורות, מציינים כשמקורות סותרים, ומפרסמים יומן תיקונים פומבי. עדיין — האתר לימודי בלבד, ומומלץ לבדוק מספרים חשובים גם במקור. ראה את <a href=\"#about\">עמוד האמינות והתיקונים</a>.", ["l6-4"]],
  ["האם הנתונים בדוח השבועי מעודכנים?", "הם מתעדכנים פעם בשבוע ומציינים את התאריך והמקור. מחירים משתנים כל יום — לכן בדוק מחיר עדכני בעצמך לפני כל החלטה. נתון שלא הצלחנו לאמת מסומן ככזה.", ["l7-7"]],
  ["איך מזהים הונאה?", "תשואה מובטחת, לחץ זמן, גוף לא מורשה, בקשה להתקין תוכנה או פרסומת עם ידוען — עצור מיד.", ["l1-9"]],
  ["ניתוח פונדמנטלי או טכני — מה עדיף?", "הם עונים על שאלות שונות: הפונדמנטלי על <b>\"מה העסק שווה\"</b> (שנים), הטכני על <b>\"מה השוק עושה ומתי/כמה\"</b> (ימים עד חודשים). משקיע ארוך טווח נשען בעיקר על הפונדמנטלי; סוחר סווינג על הטכני עם סינון איכות. רבים משלבים — מחקר מצא שערך ומומנטום מתואמים שלילית ולכן משלימים זה את זה.", ["l7-9", "l1-5"]],
  ["האם ניתוח טכני באמת עובד?", "יש ראיות טובות למומנטום ולמעקב מגמה (פבר, ג'גדיש-טיטמן), עם סייגים: עלויות, שווקים מדשדשים וקריסות מומנטום. תבניות גרף ונרות — ראיות צנועות; מסחר יומי — רוב המתמידים בברזיל הפסידו. לכן הקורס מלמד סווינג עם סטופ וגודל פוזיציה, לא ניחושים.", ["l4-6", "l4-7"]]
];

Routes.faq = function () {
  app().innerHTML = `
    <h1>❓ שאלות נפוצות של משקיעים חדשים</h1>
    <p class="muted">התשובות הקצרות לשאלות שכמעט כל מתחיל שואל — עם קישור לשיעור שמסביר לעומק.</p>
    <div class="field mb" style="max-width:420px"><label for="faqQ">חיפוש שאלה</label><input id="faqQ" type="search" autocomplete="off" placeholder="למשל: מפולת, דולר, למכור..." /></div>
    <div id="faqList"></div>`;
  const draw = (q = "") => {
    const ql = q.trim();
    const items = FAQ.filter(f => !ql || (f[0] + f[1]).includes(ql));
    $("#faqList").innerHTML = items.map(f => `
      <details class="card faq">
        <summary>${f[0]}</summary>
        <p class="mt">${f[1]}</p>
        ${f[2].length ? `<p class="small">להרחבה: ${f[2].map(id => `<a href="#lesson/${id}">${esc(lessonTitle(id))}</a>`).join(" · ")}</p>` : ""}
      </details>`).join("") || `<p class="muted">לא נמצאה שאלה כזו.</p>`;
  };
  $("#faqQ").addEventListener("input", e => draw(e.target.value));
  draw();
};

// ===================== הצהרת נגישות =====================
Routes.accessibility = function () {
  app().innerHTML = `
    <h1>♿ הצהרת נגישות</h1>
    <div class="card lesson-body">
      <p>האתר נבנה מתוך מטרה שכל אחד ואחת יוכלו ללמוד להשקיע, כולל אנשים עם מוגבלות. השאיפה היא לעמוד בדרישות התקן הישראלי ת"י 5568 ובהנחיות WCAG 2.1 ברמה AA.</p>
      <h3>מה עשינו</h3>
      <ul>
        <li><b>ניווט מלא במקלדת</b>: כל הקישורים, הכפתורים והטפסים נגישים במקש Tab, עם סימון פוקוס בולט וקישור "דלג לתוכן הראשי".</li>
        <li><b>קוראי מסך</b>: מבנה כותרות היררכי, תוויות לכל שדות הטופס, אזורי ניווט מסומנים, והכרזה על תשובות בבחנים ועל הודעות מערכת.</li>
        <li><b>תפריט נגישות</b> (כפתור ♿ בראש העמוד): ניגודיות גבוהה, גופן קריא עם ריווח מוגדל, הדגשת קישורים ועצירת אנימציות.</li>
        <li><b>גודל טקסט</b>: שלוש רמות (כפתורי א−/א+), ואפשר גם להגדיל בדפדפן עד 200% בלי לאבד תוכן.</li>
        <li><b>מצב בהיר וכהה</b>, שמתאים את עצמו להגדרת המערכת.</li>
        <li><b>תצוגה מותאמת לטלפון</b> ולמסכים קטנים, עם כפתורים גדולים למגע.</li>
        <li><b>כיבוד העדפת "הפחתת תנועה"</b> של מערכת ההפעלה.</li>
        <li><b>תיאור טקסטואלי לגרפים</b>, והנתונים החשובים מוצגים גם כטקסט.</li>
        <li><b>הקראת שיעורים</b> בקול (כפתור "הקרא לי"), בכפוף לתמיכת הדפדפן.</li>
      </ul>
      <h3>מגבלות ידועות</h3>
      <ul>
        <li>הגרף בסימולטור הסווינג הוא תמונה דינמית; התיאור והנתונים העיקריים (מחיר, סטופ, יעד, ATR) מוצגים כטקסט, אבל לא כל נר בגרף.</li>
        <li>קישורים לאתרים חיצוניים (מקורות בדוחות השבועיים) אינם בשליטתנו.</li>
      </ul>
      <h3>נתקלת בבעיה?</h3>
      <p>נשמח לשמוע ולתקן. אפשר לדווח על בעיית נגישות (או על טעות בתוכן) בפתיחת פנייה במאגר האתר: <a href="https://github.com/stavzohar7/investing-academy/issues" target="_blank" rel="noopener noreferrer">github.com/stavzohar7/investing-academy/issues</a> (נדרש חשבון GitHub חינמי). אנחנו מתעדים תיקוני תוכן ב<a href="#about">יומן התיקונים</a>.</p>
      <p class="small muted">ההצהרה עודכנה לאחרונה: נובמבר 2026.</p>
    </div>`;
};

// ===================== תפריט נגישות =====================
const A11Y = [["contrast", "ניגודיות גבוהה"], ["readable", "גופן קריא וריווח מוגדל"], ["links", "הדגשת קישורים"], ["still", "עצירת אנימציות ותנועה"]];
function applyA11y() {
  const a = (Prefs.get().a11y) || {};
  A11Y.forEach(([k]) => document.documentElement.classList.toggle("a11y-" + k, !!a[k]));
}
function setupA11y() {
  const dlg = $("#a11yDlg");
  if (!dlg) return;
  const a = Prefs.get().a11y || {};
  $("#a11yOpts").innerHTML = A11Y.map(([k, l]) => `<label class="choice"><input type="checkbox" data-a11y="${k}" ${a[k] ? "checked" : ""}/><span><b>${l}</b></span></label>`).join("");
  $$("[data-a11y]").forEach(c => c.onchange = () => {
    const cur = Prefs.get().a11y || {}; cur[c.dataset.a11y] = c.checked; Prefs.set("a11y", cur); applyA11y();
    announce(`${A11Y.find(x => x[0] === c.dataset.a11y)[1]} ${c.checked ? "הופעל" : "כובה"}`);
  });
  $("#a11yBtn").onclick = () => dlg.showModal();
  $("#a11yClose").onclick = () => dlg.close();
  $("#a11yReset").onclick = () => { Prefs.set("a11y", {}); $$("[data-a11y]").forEach(c => c.checked = false); applyA11y(); announce("הגדרות הנגישות אופסו"); };
  $("#a11yStatement").onclick = () => dlg.close();
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
}
applyA11y();
window.addEventListener("load", setupA11y);

// ===================== מפת המסע (דף הבית) =====================
function journeyHTML() {
  return `<ol class="journey" aria-label="מפת המסע — השלבים במסלול">
    ${window.CURRICULUM.map((lv, i) => {
      const d = lv.lessons.filter(x => x.id in State.data.done).length, n = lv.lessons.length;
      const p = Math.round(d / n * 100);
      const first = lv.lessons.find(x => !(x.id in State.data.done)) || lv.lessons[0];
      return `<li class="${p === 100 ? "done" : d ? "started" : ""} ${inTrack(lv.id) ? "" : "off"}">
        <a href="#lesson/${first.id}" aria-label="שלב ${i + 1}: ${esc(lv.title)} — ${d} מתוך ${n} שיעורים הושלמו${inTrack(lv.id) ? "" : ", לא במסלול שבחרת"}">
          <span class="ring" style="--p:${p}"><span aria-hidden="true">${p === 100 ? "✓" : lv.icon}</span></span>
          <span class="j-no">שלב ${i + 1}</span>
          <span class="j-title">${esc(lv.title)}</span>
          <span class="j-prog">${d}/${n}</span>
        </a></li>`;
    }).join("")}
  </ol>`;
}
