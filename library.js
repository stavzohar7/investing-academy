// ===================================================================
//  📚 ספריית המשקיע — תקצירי הספרים הקלאסיים (בניסוח שלנו) + מעקב קריאה
// ===================================================================
TITLES.library = "ספריית המשקיע";

const BOOKS = [
  { t: "המשקיע הנבון", en: "The Intelligent Investor", a: "בנג'מין גרהאם", y: 1949, lvl: 1, track: "long",
    why: "הספר שבאפט קרא בגיל 19 וכינה הטוב ביותר שנכתב על השקעות.",
    ideas: ["ההבדל בין השקעה לספקולציה", "משל 'מר שוק' — השוק משרת אותך, לא מדריך אותך", "מרווח ביטחון כעיקרון המרכזי", "משקיע הגנתי מול משקיע יוזם"],
    read: "התחל מפרקים 8 ו-20 — שם נמצאים מר שוק ומרווח הביטחון.", learn: ["l3-1", "l3-2"] },
  { t: "המכתבים של באפט לבעלי המניות", en: "Berkshire Hathaway Shareholder Letters", a: "וורן באפט", y: "1965-היום", lvl: 1, track: "long",
    why: "חינמיים באתר של ברקשייר, ונחשבים לקורס הטוב ביותר בעולם על עסקים והשקעות.",
    ideas: ["חשיבה כבעלים של עסק", "הקצאת הון ורכישות חוזרות", "ביטוח וה-Float", "הודאה כנה בטעויות"],
    read: "קרא את מכתבי 1977-1990 ואת המכתבים מהשנים האחרונות, והשווה איך החשיבה התפתחה.", learn: ["l7-2", "ls-1"] },
  { t: "מניות רגילות ורווחים לא רגילים", en: "Common Stocks and Uncommon Profits", a: "פיליפ פישר", y: 1958, lvl: 2, track: "long",
    why: "ה-15% של באפט שאינם גרהאם — איך מזהים חברות צמיחה יוצאות דופן ומחזיקים בהן שנים.",
    ideas: ["15 נקודות לבחינת חברה", "Scuttlebutt — מחקר שטח", "הנהלה עמוקה ויושרה", "כמעט אף פעם לא למכור עסק נפלא"],
    read: "", learn: ["l3-6"] },
  { t: "האלמנך של צ'רלי המסכן", en: "Poor Charlie's Almanack", a: "צ'רלי מאנגר", y: 2005, lvl: 2, track: "both",
    why: "אוסף הנאומים של מאנגר — שיעור בחשיבה, לא רק בהשקעות.",
    ideas: ["סריג של מודלים מנטליים", "היפוך — לחשוב איך להיכשל ולהימנע מזה", "הפסיכולוגיה של שיפוט שגוי (25 הטיות)", "תמריצים מסבירים כמעט הכול"],
    read: "הנאום על 'הפסיכולוגיה של שיפוט אנושי שגוי' הוא החשוב ביותר.", learn: ["l6-3", "l6-1"] },
  { t: "לנצח את וול סטריט", en: "One Up on Wall Street", a: "פיטר לינץ'", y: 1989, lvl: 1, track: "long",
    why: "הספר הכי נגיש למתחילים — כתוב בהומור ומלא דוגמאות.",
    ideas: ["היתרון של המשקיע הפרטי", "שש קטגוריות של מניות", "'הסיפור בשתי דקות'", "PEG ו'טן-בגרס'"],
    read: "", learn: ["l7-1"] },
  { t: "הדבר החשוב ביותר", en: "The Most Important Thing", a: "הווארד מרקס", y: 2011, lvl: 2, track: "both",
    why: "באפט אמר שזה ספר נדיר שבאמת שווה לקרוא.",
    ideas: ["חשיבה מסדר שני", "סיכון הוא הסתברות להפסד קבוע", "המטוטלת של פסיכולוגיית המשקיעים", "לדעת איפה אנחנו במחזור"],
    read: "", learn: ["lm-4"] },
  { t: "מרווח ביטחון", en: "Margin of Safety", a: "סת' קלרמן", y: 1991, lvl: 3, track: "long",
    why: "ספר נדיר שיצא מהדפוס — על השקעות ערך כשנאת סיכון.",
    ideas: ["תשואה מוחלטת ולא יחסית", "מזומן כאופציה", "המלכודות של וול סטריט", "מוכרים כפויים כמקור להזדמנויות"],
    read: "", learn: ["lg-2"] },
  { t: "הספר הקטן שמנצח את השוק", en: "The Little Book That Beats the Market", a: "ג'ואל גרינבלט", y: 2005, lvl: 1, track: "long",
    why: "הסבר פשוט מאוד של 'עסק טוב במחיר זול', שנכתב במקור עבור ילדיו של המחבר.",
    ideas: ["הנוסחה הקסומה: תשואה על ההון + תשואת רווח", "למה אסטרטגיה טובה לא עובדת כל שנה", "סבלנות כיתרון"],
    read: "", learn: ["lg-1"] },
  { t: "גם אתה יכול להיות גאון בורסה", en: "You Can Be a Stock Market Genius", a: "ג'ואל גרינבלט", y: 1997, lvl: 3, track: "long",
    why: "השם מטעה — זה ספר רציני על מצבים מיוחדים.",
    ideas: ["פיצולים (Spin-offs)", "ארגונים מחדש ומיזוגים", "חיפוש סיבה מבנית לתמחור שגוי"],
    read: "", learn: ["lg-1"] },
  { t: "האאוטסיידרים", en: "The Outsiders", a: "ויליאם ת'ורנדייק", y: 2012, lvl: 2, track: "long",
    why: "שמונה מנכ\"לים שהשיגו תשואות יוצאות דופן — ומה שהפך אותם למקצי הון מעולים.",
    ideas: ["ערך למניה ולא גודל", "רכישות חוזרות מתחת לשווי", "ביזור וחסכנות", "נכונות להיות שונה"],
    read: "", learn: ["lg-4", "l3-4"] },
  { t: "המשקיע הדאנדו", en: "The Dhandho Investor", a: "מוניש פבראי", y: 2007, lvl: 1, track: "long",
    why: "ספר קצר על השקעות אסימטריות, דרך סיפור של בעלי מוטלים.",
    ideas: ["'עץ — מרוויח הרבה; פלי — מפסיד מעט'", "אי-ודאות גבוהה ≠ סיכון גבוה", "מעט הימורים, גדולים ונדירים", "שכפול רעיונות"],
    read: "", learn: ["lg-2"] },
  { t: "7 הכוחות", en: "7 Powers", a: "המילטון הלמר", y: 2016, lvl: 3, track: "long",
    why: "המסגרת המדויקת ביותר להבנת יתרון תחרותי.",
    ideas: ["כוח = יתרון + מחסום", "שבעה סוגי כוח", "מיצוב נגדי", "מתי כל כוח נבנה במחזור החיים של חברה"],
    read: "", learn: ["l3-7", "l3-3"] },
  { t: "איך להרוויח כסף במניות", en: "How to Make Money in Stocks", a: "ויליאם או'ניל", y: 1988, lvl: 2, track: "swing",
    why: "המקור של CAN SLIM — מחקר על מניות שהכפילו את עצמן ומה היה משותף להן לפני העלייה.",
    ideas: ["CAN SLIM", "קנייה בפריצה מבסיס", "כלל ה-7-8% לחיתוך הפסד", "קריאת מצב השוק הכללי"],
    read: "", learn: ["l4-5", "la-1"] },
  { t: "לסחור כמו קוסם הבורסה", en: "Trade Like a Stock Market Wizard", a: "מארק מינרביני", y: 2013, lvl: 3, track: "swing",
    why: "שיטה מפורטת לסווינג במניות צמיחה, עם דגש חזק על ניהול סיכונים.",
    ideas: ["Trend Template", "תבנית ה-VCP", "גודל פוזיציה ויחס סיכוי-סיכון", "שלבי המניה"],
    read: "", learn: ["l4-3", "l4-5"] },
  { t: "זיכרונותיו של ספקולנט", en: "Reminiscences of a Stock Operator", a: "אדווין לפבר (על ג'סי ליברמור)", y: 1923, lvl: 2, track: "swing",
    why: "ספר בן מאה שנה על פסיכולוגיית המסחר — ועדיין רלוונטי כמעט מילה במילה.",
    ideas: ["הכסף הגדול בישיבה", "השוק תמיד צודק", "נקודות מפנה", "האסון שבמינוף"],
    read: "", learn: ["lg-5"] },
  { t: "איך הרווחתי 2,000,000 דולר בבורסה", en: "How I Made $2,000,000 in the Stock Market", a: "ניקולס דרבס", y: 1960, lvl: 1, track: "swing",
    why: "סיפור אישי קצר וקולח של רקדן שבנה שיטה משלו.",
    ideas: ["שיטת הקופסאות", "שילוב צמיחה ברווחים עם פריצה", "סטופ שעולה עם המחיר", "ריחוק מהרעש"],
    read: "", learn: ["lg-5"] },
  { t: "הפסיכולוגיה של הכסף", en: "The Psychology of Money", a: "מורגן האוזל", y: 2020, lvl: 1, track: "both",
    why: "הספר הטוב ביותר להתחלה — על ההתנהגות שלנו סביב כסף.",
    ideas: ["הצלחה פיננסית היא בעיקר התנהגות", "הכוח של זמן וריבית דריבית", "'מספיק' — לדעת מתי לעצור", "מקום לטעויות בתוכנית"],
    read: "", learn: ["l1-2", "l6-1"] },
  { t: "הספר הקטן של השקעות בשכל ישר", en: "The Little Book of Common Sense Investing", a: "ג'ון בוגל", y: 2007, lvl: 1, track: "long",
    why: "מייסד ואנגארד מסביר למה קרן מדד זולה מנצחת את רוב המקצוענים — אמת המידה של כל משקיע.",
    ideas: ["עלויות אוכלות תשואה", "רוב המנהלים לא מנצחים את המדד לאורך זמן", "פשטות ומשמעת"],
    read: "", learn: ["l1-6", "l1-4"] },
  { t: "הילוך אקראי בוול סטריט", en: "A Random Walk Down Wall Street", a: "ברטון מלכיאל", y: 1973, lvl: 2, track: "both",
    why: "<b>הקול הנגדי</b>: הטענה שקשה מאוד לנצח את השוק. כל משקיע אקטיבי צריך להכיר אותה.",
    ideas: ["השערת השוק היעיל", "בועות לאורך ההיסטוריה", "למה ניתוח טכני מתקשה להוכיח את עצמו", "השקעה במדד כברירת מחדל"],
    read: "קרא אותו כדי לאתגר את עצמך — אם השיטה שלך לא שורדת את הטיעונים שלו, כדאי לבדוק אותה שוב.", learn: ["l1-4", "lm-3"] }
];

const LVL = { 1: "מתחיל", 2: "בינוני", 3: "מתקדם" };
const TRACK_HE = { long: "טווח ארוך", swing: "סווינג", both: "שניהם" };

Routes.library = function () {
  State.data.books = State.data.books || {};
  app().innerHTML = `
    <h1>📚 ספריית המשקיע</h1>
    <p class="muted">הספרים שעיצבו את המשקיעים הגדולים בעולם — עם הרעיונות המרכזיים בניסוח שלנו, ולמה כדאי לקרוא כל אחד. התקצירים לא מחליפים את הספר: הם מפה שעוזרת לבחור מה לקרוא קודם.</p>
    <div class="row mb">
      <div class="field"><label for="libTrack">מסלול</label><select id="libTrack"><option value="">הכול</option><option value="long">טווח ארוך</option><option value="swing">סווינג</option></select></div>
      <div class="field"><label for="libLvl">רמה</label><select id="libLvl"><option value="">הכול</option><option value="1">מתחיל</option><option value="2">בינוני</option><option value="3">מתקדם</option></select></div>
      <span class="spacer"></span>
      <div class="stat"><div class="num" id="libCount"></div><div class="lbl">ספרים שקראתי</div></div>
    </div>
    <div class="card mb"><b>🗺️ סדר קריאה מומלץ למתחיל:</b> הפסיכולוגיה של הכסף ← לנצח את וול סטריט ← הספר הקטן שמנצח את השוק ← המשקיע הנבון ← המכתבים של באפט ← הדבר החשוב ביותר.</div>
    <div class="grid grid-2" id="libList"></div>`;
  const draw = () => {
    const tr = $("#libTrack").value, lv = $("#libLvl").value;
    const list = BOOKS.filter(b => (!tr || b.track === tr || b.track === "both") && (!lv || String(b.lvl) === lv));
    $("#libCount").textContent = `${Object.keys(State.data.books).length}/${BOOKS.length}`;
    $("#libList").innerHTML = list.map(b => {
      const i = BOOKS.indexOf(b), read = !!State.data.books[b.en];
      return `<article class="card book ${read ? "read" : ""}" aria-labelledby="bk-${i}">
        <div class="row"><span class="pill">${LVL[b.lvl]}</span><span class="pill">${TRACK_HE[b.track]}</span><span class="spacer"></span><span class="small muted">${b.y}</span></div>
        <h2 id="bk-${i}" style="font-size:1.2rem;margin:10px 0 2px">${b.t}</h2>
        <div class="small muted"><span lang="en" dir="ltr">${b.en}</span> · ${b.a}</div>
        <p class="mt">${b.why}</p>
        <b class="small">רעיונות מרכזיים:</b>
        <ul class="small">${b.ideas.map(x => `<li>${x}</li>`).join("")}</ul>
        ${b.read ? `<p class="small">💡 ${b.read}</p>` : ""}
        <div class="row small">השיעורים באפליקציה: ${b.learn.map(id => `<a href="#lesson/${id}">${esc(lessonTitle(id))}</a>`).join(" · ")}</div>
        <label class="row mt" style="cursor:pointer"><input type="checkbox" data-book="${esc(b.en)}" ${read ? "checked" : ""}/> קראתי את הספר</label>
      </article>`;
    }).join("");
    $$("[data-book]").forEach(c => c.onchange = () => {
      c.checked ? State.data.books[c.dataset.book] = todayStr() : delete State.data.books[c.dataset.book];
      State.save(); draw();
      if (c.checked) toast("כל הכבוד! עוד ספר בספרייה שלך 📚");
    });
  };
  $("#libTrack").onchange = draw; $("#libLvl").onchange = draw;
  draw();
};
