// ===================================================================
//  💸 התנהלות כספית: ממלאים תמונת מצב (מצב משפחתי, כמה יש, כמה מושקע, כמה נכנס ויוצא),
//  ומקבלים תמונה, סדר עדיפויות וראייה עתידית — לפי העקרונות שנלמדו באתר.
//  הכול מחושב בדפדפן ונשמר בו בלבד; שום נתון לא נשלח לשום מקום. אינו ייעוץ פיננסי.
// ===================================================================
TITLES.finance = "התנהלות כספית";

const FIN_KEY = "ia-finance";
const FIN_DEFAULT = { status: "single", kids: 0, age: 32, work: "employee", income: 12000, expenses: 9500, monthlyInvest: 1000,
  cash: 40000, invested: 30000, pension: 150000, debtHi: 0, debtHiRate: 18, debtOther: 0, retire: 67, ret: 5 };

function finMonths(target, start, pmt, r) {   // חודשים עד יעד, הפקדה בתחילת חודש, תשואה חודשית r
  let v = start, m = 0;
  while (v < target && m < 1200) { v = (v + pmt) * (1 + r); m++; }
  return v >= target ? m : null;
}
const finFV = (start, pmt, annual, years) => { const r = annual / 100 / 12, n = Math.round(years * 12); let v = start; for (let i = 0; i < n; i++) v = (v + pmt) * (1 + r); return v; };

Routes.finance = function () {
  let s = Object.assign({}, FIN_DEFAULT);
  try { Object.assign(s, JSON.parse(localStorage.getItem(FIN_KEY))); } catch (e) { /* ignore */ }

  app().innerHTML = `
    <h1>💸 התנהלות כספית</h1>
    <p class="muted">ממלאים כמה פרטים — המצב המשפחתי, כמה יש עכשיו, כמה מזה מושקע וכמה נכנס ויוצא בחודש — ומקבלים תמונת מצב, סדר עדיפויות והקרנה לעתיד. הכול מחושב אצלכם בדפדפן ונשמר בו בלבד; שום נתון לא נשלח לשום מקום. זו מסגרת חשיבה לפי מה שנלמד באתר — <b>לא ייעוץ פיננסי</b>.</p>

    <div class="grid grid-2">
      <section class="card" aria-labelledby="fnP"><h2 id="fnP">1. מי אתם</h2>
        <div class="field"><label for="fnStatus">מצב משפחתי</label><select id="fnStatus"><option value="single">רווק/ה</option><option value="couple">נשוי/ה או בזוגיות</option><option value="single_parent">הורה יחיד/ה</option></select></div>
        <div class="field"><label for="fnKids">מספר ילדים</label><input id="fnKids" type="number" inputmode="numeric" min="0" max="10" step="1"></div>
        <div class="field"><label for="fnAge">גיל</label><input id="fnAge" type="number" inputmode="numeric" min="16" max="90" step="1"></div>
        <div class="field"><label for="fnWork">סוג תעסוקה</label><select id="fnWork"><option value="employee">שכיר/ה</option><option value="self">עצמאי/ת או הכנסה לא קבועה</option></select></div>
        <p class="small muted">בזוגיות: הזינו נתוני משק הבית יחד (הכנסה והוצאות משותפות, נכסים וחובות של שניכם).</p>
      </section>
      <section class="card" aria-labelledby="fnM"><h2 id="fnM">2. כל חודש</h2>
        <div class="field"><label for="fnIncome">הכנסה נטו חודשית (₪)</label><input id="fnIncome" type="number" inputmode="numeric" min="0" step="100"></div>
        <div class="field"><label for="fnExpenses">הוצאות חודשיות כוללות (₪)</label><input id="fnExpenses" type="number" inputmode="numeric" min="0" step="100"></div>
        <div class="field"><label for="fnMonthlyInvest">כמה מזה מופקד/מושקע כל חודש (₪)</label><input id="fnMonthlyInvest" type="number" inputmode="numeric" min="0" step="100"><span class="small muted">הפקדה לחיסכון או השקעה (לא כולל פנסיה שמנוכה מהמשכורת).</span></div>
      </section>
      <section class="card" aria-labelledby="fnN"><h2 id="fnN">3. כמה יש עכשיו</h2>
        <div class="field"><label for="fnCash">מזומן ופיקדונות נזילים (₪)</label><input id="fnCash" type="number" inputmode="numeric" min="0" step="1000"></div>
        <div class="field"><label for="fnInvested">מושקע בשוק: מניות, קרנות, ETF (₪)</label><input id="fnInvested" type="number" inputmode="numeric" min="0" step="1000"></div>
        <div class="field"><label for="fnPension">צבירה פנסיונית וקרן השתלמות (₪)</label><input id="fnPension" type="number" inputmode="numeric" min="0" step="1000"></div>
      </section>
      <section class="card" aria-labelledby="fnD"><h2 id="fnD">4. חובות</h2>
        <div class="field"><label for="fnDebtHi">חובות יקרים: אשראי, מינוס, הלוואות יקרות (₪)</label><input id="fnDebtHi" type="number" inputmode="numeric" min="0" step="500"></div>
        <div class="field"><label for="fnDebtHiRate">ריבית שנתית משוערת עליהם (%)</label><input id="fnDebtHiRate" type="number" inputmode="decimal" min="0" max="60" step="0.5"></div>
        <div class="field"><label for="fnDebtOther">חובות אחרים: משכנתא והלוואות זולות (₪)</label><input id="fnDebtOther" type="number" inputmode="numeric" min="0" step="1000"></div>
      </section>
    </div>
    <section class="card mt" aria-labelledby="fnA"><h2 id="fnA">5. הנחות להקרנה</h2>
      <div class="grid grid-2">
        <div class="field"><label for="fnRetire">גיל פרישה מתוכנן</label><input id="fnRetire" type="number" inputmode="numeric" min="40" max="80" step="1"></div>
        <div class="field"><label for="fnRet">תשואה שנתית משוערת על ההשקעות (%)</label><input id="fnRet" type="number" inputmode="decimal" min="0" max="15" step="0.5"><span class="small muted">הנחה להדגמה, לא תחזית. בדקו גם 3% ו-7%.</span></div>
      </div>
    </section>

    <div id="fnOut" class="mt" aria-live="polite"></div>
    <section class="card mt no-print" aria-labelledby="fnH"><h2 id="fnH">🕒 מעקב לאורך זמן</h2>
      <p class="small muted">שמרו תמונת מצב אחת לכמה חודשים כדי לראות אם המצב משתפר. התמונות נשמרות בדפדפן בלבד.</p>
      <div class="row"><button class="btn" type="button" id="fnSnap">📌 שמור תמונת מצב להיום</button><button class="btn ghost" type="button" id="fnExport">⬇️ ייצוא (קובץ)</button><label class="btn ghost" for="fnImport">⬆️ ייבוא</label><input id="fnImport" type="file" accept="application/json" class="sr-only"></div>
      <div id="fnHist" class="mt" aria-live="polite"></div></section>
    <div class="row mt no-print"><button class="btn" type="button" id="fnPrint">🖨️ הדפס / שמור כ-PDF</button><button class="btn ghost" type="button" id="fnReset">איפוס</button></div>
    <p class="small muted mt">התוכן לימודי בלבד ואינו ייעוץ השקעות, פנסיה, ביטוח או מס. החישובים מפושטים: ללא מס, אינפלציה ותנודתיות. להחלטות משמעותיות — התייעצו עם יועץ מורשה.</p>`;

  const $v = id => document.getElementById(id);
  const ids = { status: "fnStatus", kids: "fnKids", age: "fnAge", work: "fnWork", income: "fnIncome", expenses: "fnExpenses", monthlyInvest: "fnMonthlyInvest", cash: "fnCash", invested: "fnInvested", pension: "fnPension", debtHi: "fnDebtHi", debtHiRate: "fnDebtHiRate", debtOther: "fnDebtOther", retire: "fnRetire", ret: "fnRet" };
  Object.entries(ids).forEach(([k, id]) => { $v(id).value = s[k]; });

  function read() {
    const v = {};
    Object.entries(ids).forEach(([k, id]) => { v[k] = (k === "status" || k === "work") ? $v(id).value : (+$v(id).value || 0); });
    v.kids = Math.max(0, Math.round(v.kids)); return v;
  }

  function render() {
    const v = read();
    try { localStorage.setItem(FIN_KEY, JSON.stringify(v)); } catch (e) { /* ignore */ }
    const out = $v("fnOut");
    if (!v.income) { out.innerHTML = `<section class="card"><p class="muted">הזינו הכנסה חודשית כדי לראות את התוצאה.</p></section>`; return; }

    // ----- תמונת מצב -----
    const surplus = v.income - v.expenses, rate = surplus / v.income;
    const netWorth = v.cash + v.invested + v.pension - v.debtHi - v.debtOther;
    const dependents = v.kids > 0 || v.status === "couple";
    let target = v.kids > 0 ? 6 : v.status === "couple" ? 4 : 3;
    if (v.work === "self") target = Math.max(target, 6);
    const efNeed = target * v.expenses, efHave = v.expenses ? v.cash / v.expenses : 0;
    const hiInterest = v.debtHi * v.debtHiRate / 100;
    const liquid = v.cash + v.invested, investedShare = liquid ? v.invested / liquid : 0;
    const chips = [
      ["שיעור חיסכון", fmt(rate * 100, 1) + "%", rate >= .15 ? "good" : rate >= .05 ? "mid" : "bad", "יעד נפוץ: 15–20%"],
      ["כרית ביטחון", fmt(efHave, 1) + " חודשים", efHave >= target ? "good" : efHave >= target / 2 ? "mid" : "bad", "יעד לפי הפרופיל: " + target + " חודשים"],
      ["שווי נקי", fmt(netWorth) + " ₪", netWorth > 0 ? "good" : "bad", "נכסים פחות חובות"],
      ["מהנזיל מושקע בשוק", fmt(investedShare * 100, 0) + "%", "mid", "תלוי באופק ובסבלנות לסיכון"]
    ];

    // ----- סדר עדיפויות -----
    const steps = [];
    if (surplus < 0) steps.push({ t: "bad", h: "ההוצאות גבוהות מההכנסה", p: `כל חודש חסרים ${fmt(-surplus)} ₪. לפני כל דבר אחר: לאתר ולצמצם הוצאות (רצוניות, מנויים, חיובים קבועים) או להגדיל הכנסה. בלי זה כל שאר הצעדים לא יחזיקו.`, l: ["מתכנן תקציב", "#money/budget"] });
    if (v.debtHi > 0 && v.debtHiRate >= 8) steps.push({ t: "bad", h: "לסגור חוב יקר", p: `חוב של ${fmt(v.debtHi)} ₪ בריבית ${v.debtHiRate}% עולה בערך ${fmt(hiInterest)} ₪ בשנה (כ-${fmt(hiInterest / 12)} ₪ בחודש). סגירה מהירה שווה "תשואה" בטוחה בגובה הריבית — לפני השקעה ועם שמירה על כרית בסיסית.`, l: ["מחשבון חובות", "#money/debt"] });
    if (efHave < target) {
      const need = Math.max(0, efNeed - v.cash), mo = surplus > 0 ? Math.ceil(need / Math.max(1, Math.min(surplus, Math.max(v.monthlyInvest, surplus * .5)))) : null;
      steps.push({ t: efHave < target / 2 ? "bad" : "mid", h: "להשלים כרית ביטחון", p: `לפי הפרופיל (${v.kids > 0 ? "ילדים" : v.status === "couple" ? "זוגיות" : "יחיד/ה"}${v.work === "self" ? ", הכנסה לא קבועה" : ""}) כדאי כרית של כ-${target} חודשי הוצאות: ${fmt(efNeed)} ₪. חסרים ${fmt(need)} ₪${mo ? ` — כ-${mo} חודשים בהפקדה של ${fmt(Math.min(surplus, Math.max(v.monthlyInvest, surplus * .5)))} ₪` : ""}. הכרית נשמרת בפיקדון או בקרן כספית נזילה.`, l: ["מחשבון כרית ומטרות", "#money/goal"] });
    }
    if (rate < .10 && surplus >= 0) steps.push({ t: "mid", h: "להעלות את שיעור החיסכון", p: `שיעור החיסכון הוא ${fmt(rate * 100, 1)}%. כל 500 ₪ נוספים בחודש בתשואה של ${v.ret}% מוסיפים כ-${fmt(finFV(0, 500, v.ret, 20))} ₪ אחרי 20 שנה. בודקים רצוניות, מנויים והוצאות קבועות.`, l: ["מתכנן תקציב", "#money/budget"] });
    if (dependents) steps.push({ t: "mid", h: v.kids > 0 ? "הגנה על המשפחה: ביטוחים" : "ביטוחים ושיתוף כספי בזוגיות", p: v.kids > 0 ? "יש תלויים — בדקו כיסוי למקרה פטירה ואובדן כושר עבודה של כל מפרנס (לעיתים חלק מהכיסוי כבר קיים בפנסיה), כפילויות ועלות. בדקו גם אם נפתח חיסכון לכל ילד, ושקלו הגדרת יעד לימודים או עצמאות עתידי." : "הסכימו ביחד על יעדים, על חשבון משותף להוצאות, ועל מי עושה מה. בדקו כיסוי ביטוחי הדדי ופנסיה לכל אחד מבני הזוג.", l: ["שיעור כרית, חובות וביטוחים", "#lesson/lf-2"] });
    else steps.push({ t: "mid", h: "ביטוח אובדן כושר עבודה ובריאות", p: "אתם מפרנסים את עצמכם — הסיכון הגדול הוא אובדן כושר עבודה. בדקו מה כבר מכוסה בפנסיה ובביטוח הבריאות, ומה חסר.", l: ["שיעור כרית, חובות וביטוחים", "#lesson/lf-2"] });
    steps.push({ t: "mid", h: "לבדוק פנסיה ודמי ניהול", p: `בצבירה של ${fmt(v.pension)} ₪, הפרש של אחוז בדמי ניהול הוא עשרות אלפי שקלים לאורך השנים. בדקו דמי ניהול, מסלול (מתאים לגיל ${v.age}?), ריבוי קופות ומסלקה פנסיונית.`, l: ["מטרות, שווי נקי ופנסיה", "#lesson/lf-3"] });
    const canInvest = efHave >= Math.min(target, 3) && !(v.debtHi > 0 && v.debtHiRate >= 8);
    if (canInvest && surplus > 0) {
      const unplaced = Math.max(0, surplus - v.monthlyInvest);
      steps.push({ t: "good", h: "להשקיע לפי תוכנית כתובה", p: `כרית בסיסית קיימת ואין חוב יקר, אז אפשר לשקול השקעה לטווח ארוך — בפיזור (למשל קרן מדד זולה), לפי תוכנית כתובה (IPS) ולפי סבלנות לירידות.${unplaced > 0 ? ` שימו לב: ${fmt(unplaced)} ₪ בחודש נשארים ללא ייעוד — האם הם יושבים בעו"ש?` : ""} אל תשקיעו כסף שדרוש בשנתיים-שלוש הקרובות.`, l: ["מבחן קיצון לתיק", "#portfolio"] });
    }
    if (v.age >= 50) steps.push({ t: "mid", h: "ככל שמתקרבים לפרישה — סיכון הרצף", p: "ירידה חדה סמוך לפרישה פוגעת יותר מירידה בגיל צעיר. בדקו את ההקצאה ואת תוכנית המשיכה לפני שמתחילים למשוך.", l: ["סיכון הרצף בכלי התיק", "#portfolio"] });

    // ----- ראייה עתידית -----
    const yrsToRetire = Math.max(1, v.retire - v.age);
    const start = v.invested + Math.max(0, v.cash - efNeed);
    const rows = [10, 20, yrsToRetire].filter((y, i, a) => a.indexOf(y) === i).sort((a, b) => a - b);
    const scen = [["בקצב הנוכחי", v.monthlyInvest], ["+10% מההכנסה", v.monthlyInvest + v.income * .1], ["+500 ₪ בחודש", v.monthlyInvest + 500]];
    const nest = v.expenses * 12 * 25;
    const mNow = finMonths(nest, start, v.monthlyInvest, v.ret / 100 / 12), mUp = finMonths(nest, start, v.monthlyInvest + v.income * .1, v.ret / 100 / 12);
    const yr = m => m == null ? "מעל 100 שנה" : fmt(m / 12, 1) + " שנים";

    window.__finLast = { netWorth, rate, efMonths: efHave, invested: v.invested, income: v.income, expenses: v.expenses, debt: v.debtHi + v.debtOther, liquid };
    out.innerHTML = `
      <section class="card" aria-labelledby="fnR1"><h2 id="fnR1">📊 תמונת מצב</h2>
        <div class="grid grid-3">${chips.map(c => `<div class="card center"><div class="small muted">${c[0]}</div><b class="${c[2]}" style="font-size:1.4rem">${c[1]}</b><div class="small muted">${c[3]}</div></div>`).join("")}</div>
        <p class="small muted mt">כרית ביטחון = מזומן ÷ הוצאות חודשיות. שווי נקי כולל פנסיה וקרנות (בלי דירת מגורים).</p>
      </section>
      <section class="card mt" aria-labelledby="fnR2"><h2 id="fnR2">🧭 מה כדאי לעשות — לפי סדר עדיפויות</h2>
        <ol class="fin-steps">${steps.map(x => `<li class="fin-step ${x.t}"><b>${esc(x.h)}</b><p>${esc(x.p)}</p>${x.l ? `<a href="${x.l[1]}">${esc(x.l[0])} ←</a>` : ""}</li>`).join("")}</ol>
        <p class="small muted">הסדר מבוסס על העקרונות בשלב "ניהול כסף אישי": קודם יציבות (תקציב, כרית, חוב יקר), אחר כך הגנה, ורק אז השקעה. זו מסגרת חשיבה, לא המלצה אישית.</p>
      </section>
      <section class="card mt" aria-labelledby="fnR3"><h2 id="fnR3">🔭 ראייה עתידית (בתשואה של ${v.ret}%)</h2>
        <p class="small muted">נקודת התחלה להקרנה: ${fmt(start)} ₪ (המושקע + מזומן מעל כרית היעד). ההפקדה החודשית: כפי שהוזנה.</p>
        <div class="table-wrap"><table><caption class="sr-only">הקרנת שווי בעוד שנים</caption>
          <thead><tr><th scope="col">תרחיש</th>${rows.map(y => `<th scope="col">בעוד ${y} שנים${y === yrsToRetire ? " (פרישה)" : ""}</th>`).join("")}</tr></thead>
          <tbody>${scen.map(sc => `<tr><th scope="row">${sc[0]} (${fmt(sc[1])} ₪ בחודש)</th>${rows.map(y => `<td>${fmt(finFV(start, sc[1], v.ret, y))} ₪</td>`).join("")}</tr>`).join("")}</tbody></table></div>
        <p><b>יעד "עצמאות" מחוש בגסות:</b> הוצאות שנתיות × 25 = ${fmt(nest)} ₪ (כלל 4%, הערכה גסה בלבד, ללא פנסיה והכנסות אחרות). בקצב הנוכחי תגיעו אליו בכ-<b>${yr(mNow)}</b>; עם תוספת של 10% מההכנסה — בכ-<b>${yr(mUp)}</b>.</p>
        ${v.kids > 0 ? `<p>👨‍👩‍👧 ${v.kids === 1 ? "יש ילד" : "יש " + v.kids + " ילדים"}: שקלו יעדים נפרדים (לימודים, התחלה עצמאית) וחשבו הפקדה במחשבון המטרות. <a href="#money/goal">למחשבון ←</a></p>` : ""}
        <p class="small muted">ההקרנה ללא מס, אינפלציה ותנודתיות; בפועל התשואות משתנות משנה לשנה (ראו את סיכון הרצף בכלי התיק).</p>
      </section>`;
  }
  // ----- היסטוריה -----
  const HKEY = "ia-finance-history";
  const loadH = () => { try { return JSON.parse(localStorage.getItem(HKEY)) || []; } catch (e) { return []; } };
  const saveH = h => { try { localStorage.setItem(HKEY, JSON.stringify(h)); } catch (e) { /* ignore */ } };
  function histChart(h) {
    if (h.length < 2) return "";
    const W = 640, Hh = 200, pad = 36, vals = h.map(x => x.netWorth), mn = Math.min(...vals, 0), mx = Math.max(...vals, 1);
    const X = i => pad + i * (W - 2 * pad) / (h.length - 1), Y = v => Hh - pad - (v - mn) / (mx - mn || 1) * (Hh - 2 * pad);
    return `<div dir="ltr"><svg viewBox="0 0 ${W} ${Hh}" role="img" aria-label="גרף שווי נקי לאורך זמן" style="width:100%;height:auto;max-width:720px;background:var(--card2);border-radius:10px">
      <polyline points="${h.map((x, i) => X(i).toFixed(1) + "," + Y(x.netWorth).toFixed(1)).join(" ")}" fill="none" style="stroke:var(--green)" stroke-width="2.5"/>
      ${h.map((x, i) => `<circle cx="${X(i).toFixed(1)}" cy="${Y(x.netWorth).toFixed(1)}" r="4" style="fill:var(--green)"/>`).join("")}
      <text x="${pad}" y="16" font-size="11" style="fill:var(--muted)">net worth over time</text></svg></div>`;
  }
  function renderHist() {
    const h = loadH(), el = $v("fnHist");
    if (!h.length) { el.innerHTML = '<p class="muted">עדיין לא נשמרו תמונות. לחצו "שמור תמונת מצב" אחרי שמילאתם את הפרטים.</p>'; return; }
    const arrow = (a, b, goodUp = true) => { if (b == null) return ""; const d = a - b; if (Math.abs(d) < 1e-9) return " ="; return (d > 0) === goodUp ? ' <span class="good">▲</span>' : ' <span class="bad">▼</span>'; };
    const rows = h.map((x, i) => { const p = h[i - 1]; return `<tr><th scope="row">${esc(x.date)}</th><td>${fmt(x.netWorth)} ₪${p ? arrow(x.netWorth, p.netWorth) : ""}</td><td>${fmt(x.rate * 100, 1)}%${p ? arrow(x.rate, p.rate) : ""}</td><td>${fmt(x.efMonths, 1)}${p ? arrow(x.efMonths, p.efMonths) : ""}</td><td>${fmt(x.debt)} ₪${p ? arrow(x.debt, p.debt, false) : ""}</td><td><button type="button" class="btn ghost small" data-del="${i}" aria-label="מחק תמונה מ-${esc(x.date)}">מחק</button></td></tr>`; }).join("");
    const first = h[0], last = h[h.length - 1];
    el.innerHTML = histChart(h) + `<div class="table-wrap"><table><caption class="sr-only">היסטוריית תמונות מצב</caption><thead><tr><th scope="col">תאריך</th><th scope="col">שווי נקי</th><th scope="col">שיעור חיסכון</th><th scope="col">כרית (חודשים)</th><th scope="col">חובות</th><th scope="col"></th></tr></thead><tbody>${rows}</tbody></table></div>` +
      (h.length > 1 ? `<p>מאז ${esc(first.date)}: שווי נקי ${last.netWorth >= first.netWorth ? "עלה" : "ירד"} ב-${fmt(Math.abs(last.netWorth - first.netWorth))} ₪.</p>` : "");
    el.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { const hh = loadH(); hh.splice(+b.dataset.del, 1); saveH(hh); renderHist(); });
  }
  $v("fnSnap").onclick = () => {
    const m = window.__finLast; if (!m) return toast("מלאו קודם הכנסה");
    const h = loadH(), d = new Date(), date = d.toLocaleDateString("he-IL");
    h.push({ date, netWorth: Math.round(m.netWorth), rate: +m.rate.toFixed(4), efMonths: +m.efMonths.toFixed(2), debt: Math.round(m.debt), invested: Math.round(m.invested), income: Math.round(m.income), expenses: Math.round(m.expenses) });
    saveH(h.slice(-24)); renderHist(); toast("תמונת המצב נשמרה");
  };
  $v("fnExport").onclick = () => {
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify({ profile: read(), history: loadH() }, null, 1)], { type: "application/json" })); a.download = "finance-snapshots.json"; a.click();
  };
  $v("fnImport").onchange = e => {
    const f = e.target.files[0]; if (!f) return; const rd = new FileReader();
    rd.onload = () => { try { const j = JSON.parse(rd.result); if (Array.isArray(j.history)) saveH(j.history.slice(-24)); if (j.profile) { localStorage.setItem(FIN_KEY, JSON.stringify(j.profile)); } toast("יובא בהצלחה"); Routes.finance(); } catch (err) { toast("הקובץ אינו תקין"); } };
    rd.readAsText(f);
  };
  Object.values(ids).forEach(id => $v(id).addEventListener("input", render));
  renderHist();
  $v("fnPrint").onclick = () => window.print();
  $v("fnReset").onclick = () => { localStorage.removeItem(FIN_KEY); Routes.finance(); };
  render();
};
