// ===================================================================
//  📜 החוקה האישית שלי: כללי השקעה כתובים מראש, לפני שהשוק מלחיץ.
//  כלי לימוד בלבד: אינו המלצה, אינו מכיר את מצבכם, והבחירות הן שלכם. נשמר בדפדפן בלבד.
// ===================================================================
TITLES.charter = "החוקה האישית שלי";

const CHARTER_DEFAULT = {
  goal: "", years: 20, monthly: 1000, day: 1, kind: "index",
  cushion: false, debt: false, crash: "keep", review: "half",
  nos: { lever: true, short: true, tips: true, daily: true }, play: 0
};
const CHARTER_KINDS = {
  index: "קרן מדד רחבה ומגוונת (למשל מדד מניות עולמי), בהפקדה קבועה",
  mix: "שילוב של קרן מדד רחבה וחלק יציב יותר (למשל אג\"ח), ביחס שאקבע מראש",
  other: "אחר (אפרט ואבדוק עלויות, פיזור ומה בדיוק מחזיקים)"
};
const CHARTER_CRASH = {
  keep: "ממשיך להפקיד כרגיל ולא מוכר",
  wait: "ממשיך להפקיד, ומקבל כל החלטה אחרת רק אחרי שבוע של הרגעה ובדיקה מול הכללים כאן",
  talk: "לפני כל מכירה אדבר עם אדם נוסף שאני סומך עליו ואבדוק את הכללים כאן"
};
const CHARTER_REVIEW = { quarter: "אחת לרבעון", half: "אחת לחצי שנה", year: "אחת לשנה" };
const CHARTER_NOS = {
  lever: "לא משקיע בכסף שאינו שלי: בלי הלוואה או מינוף להשקעה",
  short: "לא משקיע כסף שאצטרך בתוך 3 שנים בנכסים שיכולים לרדת בחדות",
  tips: "לא קונה בגלל טיפ, המלצה ברשת או הבטחת תשואה",
  daily: "לא בודק את החשבון כל יום ולא פועל מתוך כותרות"
};
const charterLoad = () => { try { const x = JSON.parse(localStorage.getItem("ia-charter")); return Object.assign({}, CHARTER_DEFAULT, x, { nos: Object.assign({}, CHARTER_DEFAULT.nos, (x || {}).nos) }); } catch (e) { return JSON.parse(JSON.stringify(CHARTER_DEFAULT)); } };

Routes.charter = function () {
  const s = charterLoad();
  const opt = (obj, cur) => Object.entries(obj).map(([k, v]) => `<option value="${k}" ${k === cur ? "selected" : ""}>${esc(v)}</option>`).join("");
  app().innerHTML = `
    <h1>📜 החוקה האישית שלי</h1>
    <p class="muted">אנשים מקבלים את ההחלטות הגרועות ביותר כשהשוק יורד או עולה בחדות. לכן כותבים כללים <b>מראש, בראש קר</b>. ממלאים ארבע דקות, ומקבלים עמוד אחד שאפשר להעתיק ולשמור. זה כלי לימוד: אתם בוחרים, והוא רק מסדר את הבחירות שלכם. אינו המלצה לקנות, למכור או לבחור מוצר.</p>
    <div class="grid grid-2">
      <section class="card" aria-labelledby="chF"><h2 id="chF">מה הכללים שלי?</h2>
        <div class="field"><label for="chGoal">בשביל מה הכסף הזה? (משפט קצר)</label><input id="chGoal" type="text" maxlength="120" value="${esc(s.goal)}" placeholder="למשל: הון לטווח ארוך, או חופש כלכלי"></div>
        <div class="field"><label for="chYears">בעוד כמה שנים אצטרך אותו?</label><input id="chYears" type="number" inputmode="numeric" min="1" max="60" value="${s.years}"></div>
        <div class="field"><label for="chMonthly">כמה אפקיד בכל חודש (₪)?</label><input id="chMonthly" type="number" inputmode="numeric" min="0" step="100" value="${s.monthly}"></div>
        <div class="field"><label for="chDay">באיזה יום בחודש (1 עד 28)?</label><input id="chDay" type="number" inputmode="numeric" min="1" max="28" value="${s.day}"></div>
        <div class="field"><label for="chKind">מה אחזיק?</label><select id="chKind">${opt(CHARTER_KINDS, s.kind)}</select></div>
        <fieldset class="qset"><legend>לפני שמתחילים</legend>
          <label class="choice"><input type="checkbox" id="chCushion" ${s.cushion ? "checked" : ""}><span><b>יש לי כרית ביטחון</b><span class="small muted">3 עד 6 חודשי הוצאות בנפרד מההשקעה</span></span></label>
          <label class="choice"><input type="checkbox" id="chDebt" ${s.debt ? "checked" : ""}><span><b>אין לי חוב יקר פתוח</b><span class="small muted">מינוס, אשראי או הלוואה צרכנית בריבית גבוהה</span></span></label>
        </fieldset>
        <div class="field"><label for="chCrash">אם החשבון יורד 30%, אני...</label><select id="chCrash">${opt(CHARTER_CRASH, s.crash)}</select></div>
        <fieldset class="qset"><legend>מה אני לא עושה</legend>
          ${Object.entries(CHARTER_NOS).map(([k, v]) => `<label class="choice"><input type="checkbox" data-no="${k}" ${s.nos[k] ? "checked" : ""}><span><b>${esc(v)}</b></span></label>`).join("")}
        </fieldset>
        <div class="field"><label for="chPlay">שיעור מקסימלי מההשקעות לניסויים ולהתנסות (%)</label><input id="chPlay" type="number" inputmode="numeric" min="0" max="20" step="1" value="${s.play}"></div>
        <div class="field"><label for="chReview">כל כמה זמן בודק את הכללים עצמם?</label><select id="chReview">${opt(CHARTER_REVIEW, s.review)}</select></div>
      </section>
      <section class="card" aria-labelledby="chO" aria-live="polite"><h2 id="chO">העמוד שלי</h2><div id="chOut"></div>
        <div class="row mt"><button type="button" class="btn" id="chCopy">📋 העתק</button><button type="button" class="btn ghost" id="chReset">איפוס</button></div></section>
    </div>
    <p class="small muted mt">הכלי לימודי בלבד ואינו ייעוץ השקעות, מס או פנסיה. הנתונים נשמרים בדפדפן שלכם בלבד. ראו גם את השיעור "תוכנית השקעה כתובה (IPS)" ואת <a href="#lesson/l5-crash">השיעור על ירידה של 30%</a>.</p>`;

  const read = () => {
    const nos = {}; document.querySelectorAll("[data-no]").forEach(c => nos[c.dataset.no] = c.checked);
    const num = (id, d) => { const v = +document.getElementById(id).value; return isFinite(v) && document.getElementById(id).value !== "" ? v : d; };
    return {
      goal: document.getElementById("chGoal").value.trim(), years: Math.min(60, Math.max(1, Math.round(num("chYears", 20)))),
      monthly: Math.max(0, num("chMonthly", 0)), day: Math.min(28, Math.max(1, Math.round(num("chDay", 1)))),
      kind: document.getElementById("chKind").value, cushion: document.getElementById("chCushion").checked, debt: document.getElementById("chDebt").checked,
      crash: document.getElementById("chCrash").value, review: document.getElementById("chReview").value, nos, play: Math.min(20, Math.max(0, num("chPlay", 0)))
    };
  };
  const text = v => {
    const lines = [];
    lines.push("החוקה האישית שלי להשקעה");
    lines.push("מטרה: " + (v.goal || "לא כתבתי עדיין") + " | אופק: " + v.years + " שנים");
    lines.push("הפקדה: " + fmt(v.monthly) + " ₪ בכל חודש, ביום " + v.day + " לחודש");
    lines.push("מה אחזיק: " + CHARTER_KINDS[v.kind]);
    lines.push("כשהשוק יורד 30%: " + CHARTER_CRASH[v.crash]);
    const nos = Object.entries(CHARTER_NOS).filter(([k]) => v.nos[k]).map(([, t]) => "- " + t);
    if (nos.length) { lines.push("מה אני לא עושה:"); lines.push(...nos); }
    if (v.play > 0) lines.push("תקרה לניסויים: עד " + v.play + "% מההשקעות, והשאר לפי הכללים כאן");
    lines.push("בדיקת הכללים: " + CHARTER_REVIEW[v.review] + ". בין הבדיקות אני לא משנה אותם בגלל מצב הרוח של השוק.");
    lines.push("תאריך: " + new Date().toLocaleDateString("he-IL"));
    return lines.join("\n");
  };
  const check = v => {
    const w = [];
    if (!v.cushion) w.push("לא סימנתם שיש כרית ביטחון: לפי הלימוד כדאי להשלים אותה לפני שמסכנים כסף בשוק, כדי שלא תצטרכו למכור בזמן ירידה.");
    if (!v.debt) w.push("לא סימנתם שאין חוב יקר פתוח: אם יש כזה, בדרך כלל סגירתו מקדימה השקעה, כי ריבית גבוהה היא עלות ודאית.");
    if (v.years < 3) w.push("אופק של פחות מ-3 שנים: כסף שנחוץ בטווח הקצר אינו מתאים לנכסים שיכולים לרדת בחדות, ולכן בדקו מחדש את סוג ההחזקה.");
    if (v.kind === "other") w.push("בחרתם \"אחר\": כתבו מה בדיוק, כמה זה עולה בשנה, ואיך זה מפוזר, לפני שמפקידים.");
    if (v.play > 10) w.push("תקרת הניסויים גבוהה: ככל שהיא גבוהה יותר, כך עיקר ההשקעה פחות מוגן מהחלטות רגשיות.");
    return w;
  };
  const render = () => {
    const v = read();
    try { localStorage.setItem("ia-charter", JSON.stringify(v)); } catch (e) { /* ignore */ }
    const w = check(v);
    document.getElementById("chOut").innerHTML = `<pre class="charter-text" style="white-space:pre-wrap;font-family:inherit">${esc(text(v))}</pre>
      ${w.length ? `<h3>נקודות לבדיקה</h3><ul>${w.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p class="small muted">כל הסעיפים הבסיסיים מסומנים. זה לא מבטיח תוצאה, רק מסדר את התהליך.</p>`}`;
  };
  document.querySelectorAll("#chGoal,#chYears,#chMonthly,#chDay,#chKind,#chCushion,#chDebt,#chCrash,#chReview,#chPlay,[data-no]").forEach(e => e.addEventListener("input", render));
  document.querySelectorAll("[data-no],#chCushion,#chDebt").forEach(e => e.addEventListener("change", render));
  document.getElementById("chCopy").onclick = () => {
    const t = text(read());
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast("הועתק"), () => toast("לא הצלחתי להעתיק, אפשר לסמן ולהעתיק ידנית"));
  };
  document.getElementById("chReset").onclick = () => { try { localStorage.removeItem("ia-charter"); } catch (e) { /* ignore */ } Routes.charter(); };
  render();
};
