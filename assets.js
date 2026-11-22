// ===================================================================
//  🧱 במה להתמקד בבניית תיק: סדר חשיבות, מפת סוגי השקעות, ובודק היגיון לימודי לתיק שאתם בונים.
//  זה לימוד כללי: הוא מסביר מה משפיע יותר ופחות, ולא ממליץ על מוצר, קרן, ברוקר או תיק אישי.
// ===================================================================
TITLES.assets = "במה להתמקד בבניית תיק";

const AS_CATS = [
  { id: "cash", n: "מזומן / פיקדון", role: "נזילות ויציבות; כסף לטווח קצר וכרית", vol: "נמוכה מאוד", cost: "אפס עד נמוכה", shock: 0, fee: 0, tier: "תומך (לפי אופק)" },
  { id: "bonds", n: "אג\"ח (ממשלתי או איכותי)", role: "יציבות יחסית, תזרים; מקור למזומן", vol: "נמוכה עד בינונית (תלוי מח\"מ ואשראי)", cost: "דמי ניהול נמוכים בקרנות רחבות", shock: -5, fee: 0.3, tier: "תומך (לפי אופק וסבלנות)" },
  { id: "world", n: "מניות — קרן מדד רחבה ומפוזרת", role: "צמיחה לטווח ארוך בפיזור גבוה", vol: "גבוהה (ירידות של 30%–50% קרו)", cost: "נמוכה בקרנות מדד", shock: -40, fee: 0.2, tier: "ליבה לכסף ארוך טווח" },
  { id: "country", n: "מניות — מדינה אחת או אזור אחד", role: "חשיפה ממוקדת", vol: "גבוהה ומרוכזת יותר", cost: "נמוכה בקרנות מדד", shock: -45, fee: 0.2, tier: "תומך — בחשבון ריכוז גיאוגרפי" },
  { id: "stocks", n: "מניות בודדות", role: "ניסיון לבחור עסקים; מרכיב לימודי", vol: "גבוהה מאוד לחברה", cost: "עמלות קנייה ומכירה", shock: -55, fee: 0.1, tier: "לוויין קטן, עם תזה כתובה" },
  { id: "active", n: "קרן מנוהלת אקטיבית בעמלה גבוהה", role: "ניסיון לנצח את השוק", vol: "כמו השוק ועוד", cost: "גבוהה", shock: -42, fee: 1.5, tier: "בדרך כלל פחות מועדף — ראו מחקר" },
  { id: "reit", n: "נדל\"ן מניב / REIT", role: "חשיפה לנדל\"ן ותזרים מדיבידנד", vol: "בינונית עד גבוהה", cost: "בינונית", shock: -35, fee: 0.5, tier: "תומך קטן" },
  { id: "gold", n: "זהב וסחורות", role: "גידור אפשרי; אינו מייצר תזרים", vol: "בינונית עד גבוהה", cost: "בינונית", shock: -15, fee: 0.4, tier: "תומך קטן, אופציונלי" },
  { id: "crypto", n: "קריפטו", role: "נכס ספקולטיבי מאוד", vol: "גבוהה מאוד", cost: "משתנה", shock: -70, fee: 0.5, tier: "ספקולטיבי: אחוז קטן שמוכנים להפסיד" },
  { id: "spec", n: "אופציות, מינוף, מוצרים מובנים", role: "הימור או מבנים מורכבים", vol: "גבוהה מאוד, אפשר להפסיד הכול", cost: "גבוהה ולא שקופה", shock: -80, fee: 1.0, tier: "בדרך כלל להימנע בתחילת הדרך" },
  { id: "employer", n: "מניית המעסיק", role: "הון שתלוי באותה חברה כמו המשכורת", vol: "גבוהה, ומתואמת עם הכנסה", cost: "תלוי", shock: -60, fee: 0, tier: "לשמור על משקל קטן — ריכוז כפול" }
];

Routes.assets = function () {
  let w = { cash: 10, bonds: 20, world: 55, country: 0, stocks: 10, active: 0, reit: 0, gold: 5, crypto: 0, spec: 0, employer: 0 };
  try { Object.assign(w, JSON.parse(localStorage.getItem("ia-assets"))); } catch (e) { /* ignore */ }
  app().innerHTML = `
    <h1>🧱 במה להתמקד בבניית תיק</h1>
    <div class="box warn"><b>זה לימוד כללי, לא ייעוץ השקעות.</b> אנחנו מסבירים מה משפיע יותר ומה פחות, ומה נחשב בדרך כלל כליבה, תומך או ספקולטיבי. אנחנו לא ממליצים על קרן, ברוקר, מניה או תיק אישי. את ההחלטות עושים אתם, ובמקרה הצורך עם יועץ מורשה.</div>

    <section class="card mt" aria-labelledby="asA"><h2 id="asA">1. מה משפיע על התוצאה שלכם — לפי סדר חשיבות</h2>
      <ol>
        <li><b>כמה אתם חוסכים, וכמה זמן.</b> שיעור החיסכון וההתמדה (הפקדה קבועה לאורך שנים) משפיעים יותר מכל בחירת מוצר. <a href="#lesson/l1-1">ריבית דריבית</a></li>
        <li><b>הסדר הפיננסי.</b> כרית ביטחון וסגירת חוב יקר לפני השקעה — כדי שלא תצטרכו למכור בירידה. <a href="#lesson/lf-2">שיעור</a></li>
        <li><b>ההקצאה בין מניות לאג"ח ומזומן.</b> היא קובעת כמה התיק יתנודד, ולכן אם תעמדו בו. <a href="#portfolio">מבחן קיצון</a></li>
        <li><b>עלויות.</b> דמי ניהול ועמלות מצטברים לאורך עשורים וזה בשליטתכם. <a href="#compare">השוואת עלויות</a></li>
        <li><b>פיזור.</b> מפחית את הסיכון שחברה, ענף או מדינה אחת תפיל את התיק.</li>
        <li><b>התנהגות.</b> מכירה בפאניקה, רדיפה אחר טיפים ומסחר תכוף פוגעים בתוצאות (ראו את <a href="#lesson/l1-9">המלכודות של משקיע מתחיל</a>).</li>
        <li><b>בחירת מניות ותזמון השוק</b> — בדרך כלל ההשפעה הקטנה ביותר <i>בשליטתכם</i>, והקשה ביותר לעשות נכון. כ-90% מהקרנות האקטיביות לא ניצחו את ה-S&amp;P 500 ב-15 שנה (SPIVA, ארה"ב).</li>
      </ol>
      <p class="small muted">הרעיון: להשקיע את רוב המאמץ בשלושת הראשונים, שבשליטתכם ושמשפיעים הרבה.</p></section>

    <section class="card mt" aria-labelledby="asB"><h2 id="asB">2. מפת סוגי ההשקעות: מה התפקיד ואיזה משקל מקובל</h2>
      <div class="table-wrap"><table><caption class="sr-only">מפת סוגי השקעות</caption>
        <thead><tr><th scope="col">סוג</th><th scope="col">תפקיד</th><th scope="col">תנודתיות</th><th scope="col">עלות</th><th scope="col">מקובל לראות אותו כ…</th></tr></thead>
        <tbody>${AS_CATS.map(c => `<tr><th scope="row">${c.n}</th><td>${c.role}</td><td>${c.vol}</td><td>${c.cost}</td><td><b>${c.tier}</b></td></tr>`).join("")}</tbody></table></div>
      <p class="small muted">התיוגים הם עקרונות כלליים של חשיבה על סיכון ועלות, לא הוראה. לא כל מי שמחזיק נכס "קטן" טועה, ולא כל נכס "ליבה" מתאים לכל אחד. אופק ההשקעה והסבלנות להפסד קובעים.</p></section>

    <section class="card mt" aria-labelledby="asC"><h2 id="asC">3. שווה יותר ופחות — כללי אצבע</h2>
      <div class="grid grid-2">
        <div><h3>נוטה להיות שווה יותר מאמץ</h3><ul>
          <li>הפקדה קבועה ואוטומטית, גם אם קטנה.</li>
          <li>פיזור רחב וזול (קרן מדד מפוזרת) כבסיס לכסף ארוך טווח.</li>
          <li>כרית ביטחון ופירעון חובות יקרים.</li>
          <li>בדיקת פנסיה וקרן השתלמות ודמי הניהול שלהן.</li>
          <li>תוכנית כתובה ומבחן קיצון לפני שיש הפסד.</li></ul></div>
        <div><h3>נוטה להיות שווה פחות (או מסוכן יותר) למתחילים</h3><ul>
          <li>מסחר תכוף וניסיון לתזמן: מחקרים מראים שזה פוגע בתוצאות.</li>
          <li>קרנות וביטוחי חיסכון בעמלה גבוהה, מוצרים מובנים שלא מבינים.</li>
          <li>מינוף ואופציות — אפשר להפסיד יותר ממה שהושקע.</li>
          <li>ריכוז: מניית המעסיק, מניה אחת או סקטור אחד.</li>
          <li>טיפים מרשתות חברתיות ו"הזדמנות שלא חוזרת".</li></ul></div>
      </div></section>

    <section class="card mt" aria-labelledby="asD"><h2 id="asD">4. בודק היגיון לתיק שאתם בונים</h2>
      <p class="small muted">הזינו אחוזים לכל רכיב (הסכום אמור להיות 100). ערכי ברירת המחדל הם דוגמה ללימוד בלבד. הכלי לא קובע מה נכון, אלא מצביע על דברים שכדאי לחשוב עליהם: ריכוז, ספקולציה, עלות והפסד בתרחיש קיצון.</p>
      <div class="grid grid-3">${AS_CATS.map(c => `<div class="field"><label for="as_${c.id}">${c.n} (%)</label><input id="as_${c.id}" type="number" inputmode="decimal" min="0" max="100" step="1"></div>`).join("")}</div>
      <p id="asSum" class="small" aria-live="polite"></p>
      <div id="asRes" aria-live="polite"></div>
      <p class="small muted">לא בטוחים כמה הפסד תעמדו בו? <a href="#risk">בוחן הסבלנות שלי לסיכון</a></p></section>

    <p class="small muted mt">התוכן לימודי בלבד ואינו ייעוץ השקעות, פנסיה, ביטוח או מס. ההפסדים בתרחיש הם הדגמה, ולא תחזית — היו ירידות קטנות וגדולות מהן.</p>`;

  const $v = id => document.getElementById(id);
  AS_CATS.forEach(c => { $v("as_" + c.id).value = w[c.id]; });
  function check() {
    const v = {}; AS_CATS.forEach(c => { v[c.id] = Math.max(0, +$v("as_" + c.id).value || 0); });
    try { localStorage.setItem("ia-assets", JSON.stringify(v)); } catch (e) { /* ignore */ }
    const sum = Object.values(v).reduce((a, b) => a + b, 0);
    $v("asSum").innerHTML = sum === 100 ? '<span class="good">✔ הסכום 100%</span>' : `<span class="bad">הסכום ${fmt(sum, 1)}%. החישוב מנרמל ל-100%.</span>`;
    if (!sum) { $v("asRes").innerHTML = ""; return; }
    const p = {}; AS_CATS.forEach(c => { p[c.id] = v[c.id] / sum * 100; });
    const equity = p.world + p.country + p.stocks + p.active + p.employer + p.reit;
    const spec = p.crypto + p.spec, conc = p.stocks + p.employer;
    const loss = -AS_CATS.reduce((a, c) => a + p[c.id] * c.shock / 100, 0);
    const fee = AS_CATS.reduce((a, c) => a + p[c.id] * c.fee / 100, 0);
    const flags = [];
    if (conc > 20) flags.push(["bad", `מניות בודדות ומניית המעסיק יחד הן ${fmt(conc, 0)}% — ריכוז גבוה. מה יקרה לתיק אם חברה אחת תיפול 70%?`]);
    else if (conc > 10) flags.push(["mid", `מניות בודדות ומניית המעסיק הן ${fmt(conc, 0)}% — ודאו שיש תזה כתובה ושההפסד האפשרי נסבל.`]);
    if (p.employer > 5) flags.push(["mid", `מניית המעסיק ${fmt(p.employer, 0)}% — המשכורת וההון תלויים באותה חברה.`]);
    if (spec > 10) flags.push(["bad", `נכסים ספקולטיביים (קריפטו, אופציות, מוצרים מובנים) ${fmt(spec, 0)}% — כמות שאפשר להפסיד כמעט בשלמותה. האם אתם מוכנים לכך?`]);
    else if (spec > 5) flags.push(["mid", `נכסים ספקולטיביים ${fmt(spec, 0)}% — מעל מה שמקובל לראות כ"אחוז קטן".`]);
    if (p.active > 10) flags.push(["mid", `קרנות אקטיביות בעמלה גבוהה ${fmt(p.active, 0)}% — בדקו מה הן נותנות מעבר לקרן מדד זולה.`]);
    if (equity > 0 && p.country / equity * 100 > 50) flags.push(["mid", "רוב המניות מרוכזות במדינה או באזור אחד — ריכוז גיאוגרפי."]);
    if (equity > 0 && p.world / equity * 100 < 40 && equity > 40) flags.push(["mid", "חלק קטן מהמניות הוא פיזור רחב — כלומר רוב החשיפה לא מפוזרת."]);
    if (fee > 0.6) flags.push(["mid", `עלות משוערת משוקללת ${fmt(fee, 2)}% בשנה — ייתכן שיש חלופות זולות יותר. (הערכות להדגמה)`]);
    if (!flags.length) flags.push(["good", "לא נמצאו דגלים בולטים לפי הבדיקות הכלליות. זה לא אומר שהתיק מתאים — זה תלוי באופק ובסבלנות שלכם."]);
    $v("asRes").innerHTML = `
      <div class="grid grid-3">
        <div class="card center"><div class="small muted">מניות וחשיפה למניות</div><b style="font-size:1.4rem">${fmt(equity, 0)}%</b></div>
        <div class="card center"><div class="small muted">הפסד בתרחיש קיצון (הדגמה)</div><b class="bad" style="font-size:1.4rem">−${fmt(loss, 1)}%</b></div>
        <div class="card center"><div class="small muted">עלות שנתית משוקללת (הערכה)</div><b style="font-size:1.4rem">${fmt(fee, 2)}%</b></div>
      </div>
      <h3>נקודות למחשבה</h3>
      <ul>${flags.map(f => `<li class="${f[0]}">${esc(f[1])}</li>`).join("")}</ul>
      <p><button type="button" class="btn" id="asToPf">➡️ העבר את התיק למבחן הקיצון המלא</button></p>
      <p class="small muted">ההעברה ממפה את הרכיבים לארבע הקטגוריות של כלי התיק: <b>קרן מדד</b> = מניות מפוזרות + מדינה אחת + קרן אקטיבית + נדל"ן + זהב; <b>אג"ח</b>; <b>מניות בודדות ושאר הריכוז</b> = מניות בודדות + מניית המעסיק + קריפטו + אופציות ומינוף; <b>מזומן</b>. זו הפשטה — אפשר לשנות שם את הערכים.</p>
      <p class="small muted">תרחיש הקיצון משתמש בירידות לדוגמה לכל נכס (למשל מניות מפוזרות −40%, מניות בודדות −55%, קריפטו −70%, אג"ח −5%). עלויות ההדגמה: כמה אחוזים בשנה לפי סוג הנכס. בדקו עלויות אמיתיות לפני כל החלטה. <a href="#portfolio">למבחן קיצון מלא</a> · <a href="#youthplan">להתנהלות לפי עבודה וחיסכון</a></p>`;
  }
  $v("asRes").addEventListener("click", e => {
    if (!e.target.closest("#asToPf")) return;
    const v = {}; AS_CATS.forEach(c => { v[c.id] = Math.max(0, +$v("as_" + c.id).value || 0); });
    const sum = Object.values(v).reduce((a, b) => a + b, 0); if (!sum) return;
    const pc = x => Math.round(x / sum * 1000) / 10;
    const alloc = [pc(v.world + v.country + v.active + v.reit + v.gold), pc(v.bonds), pc(v.stocks + v.employer + v.crypto + v.spec)]; alloc.push(Math.round((100 - alloc[0] - alloc[1] - alloc[2]) * 10) / 10);
    let st = {}; try { st = JSON.parse(localStorage.getItem("ia-portfolio")) || {}; } catch (err) { /* ignore */ }
    st = Object.assign({ value: 400000, preset: "sharp", shocks: [-30, -5, -45, 0], band: 5 }, st, { alloc });
    try { localStorage.setItem("ia-portfolio", JSON.stringify(st)); } catch (err) { /* ignore */ }
    location.hash = "#portfolio";
  });
  AS_CATS.forEach(c => $v("as_" + c.id).addEventListener("input", check));
  check();
};
