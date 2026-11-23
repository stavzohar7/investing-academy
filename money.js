// ===================================================================
//  💰 ניהול כסף: מתכנן תקציב · מחשבון חובות (מפולת מול כדור שלג) · מטרות וכרית ביטחון
//  כלי לימוד בלבד — אינו ייעוץ פיננסי. החישובים פשוטים ואינם כוללים מס, אינפלציה או שינויי ריבית.
// ===================================================================
TITLES.money = "ניהול כסף";

const MONEY_TABS = [["budget", "🧾 תקציב"], ["debt", "💳 חובות"], ["goal", "🎯 מטרות וכרית"], ["mortgage", "🏠 משכנתא והלוואה"], ["inflation", "📉 אינפלציה"], ["moveout", "🏡 יציאה מהבית"], ["delay", "⏳ עלות ההמתנה"], ["credit", "💳 עלות אשראי"]];
const MV = {};   // תצוגות הכלים

Routes.money = function (tab) {
  tab = MV[tab] ? tab : "budget";
  app().innerHTML = `
    <h1>💰 ניהול כסף</h1>
    <p class="muted">כלים פשוטים שעוזרים להבין לאן הכסף הולך, איך לסגור חובות, ואיך להגיע ליעד. הערכים נשמרים בדפדפן שלכם בלבד. <a href="#path">לשלב "ניהול כסף אישי" בקורס</a></p>
    <div class="tabs" role="tablist" aria-label="כלי ניהול כסף">${MONEY_TABS.map(t => `<button role="tab" aria-selected="${t[0] === tab}" class="${t[0] === tab ? "active" : ""}" onclick="go('money/${t[0]}')">${t[1]}</button>`).join("")}</div>
    <div id="moneyBody" class="mt"></div>
    <p class="small muted mt">התוכן לימודי בלבד ואינו ייעוץ פיננסי, פנסיוני או מס.</p>`;
  MV[tab](document.getElementById("moneyBody"));
};

const mLoad = (k, d) => { try { return Object.assign({}, d, JSON.parse(localStorage.getItem("ia-money-" + k))); } catch (e) { return d; } };
const mSave = (k, v) => { try { localStorage.setItem("ia-money-" + k, JSON.stringify(v)); } catch (e) { /* ignore */ } };
const mNum = id => +document.getElementById(id).value || 0;
const mField = (id, label, val, extra = "") => `<div class="field"><label for="${id}">${label}</label><input id="${id}" type="number" inputmode="decimal" value="${val}" ${extra}></div>`;

// ---------- תקציב ----------
MV.budget = function (el) {
  const s = mLoad("budget", { income: 12000, needs: 8100, wants: 2200, rate: 6, years: 30 });
  el.innerHTML = `<div class="grid grid-2">
    <section class="card" aria-labelledby="mbIn"><h2 id="mbIn">הנתונים החודשיים</h2>
      ${mField("mbIncome", "הכנסה נטו (₪)", s.income, 'min="0" step="100"')}
      ${mField("mbNeeds", "הוצאות הכרחיות (₪): דיור, חשבונות, תחבורה, מזון, ביטוחים, חובות מינימליים", s.needs, 'min="0" step="100"')}
      ${mField("mbWants", "הוצאות רצוניות (₪)", s.wants, 'min="0" step="100"')}
      ${mField("mbRate", "תשואה שנתית משוערת להקרנה (%)", s.rate, 'min="0" max="20" step="0.5"')}
      ${mField("mbYears", "שנים להקרנה", s.years, 'min="1" max="50" step="1"')}
    </section>
    <section class="card" aria-labelledby="mbOut" aria-live="polite"><h2 id="mbOut">התוצאה</h2><div id="mbRes"></div></section></div>`;
  const calc = () => {
    const v = { income: mNum("mbIncome"), needs: mNum("mbNeeds"), wants: mNum("mbWants"), rate: mNum("mbRate"), years: Math.min(50, Math.max(1, Math.round(mNum("mbYears")))) };
    mSave("budget", v);
    if (!v.income) { document.getElementById("mbRes").innerHTML = `<p class="muted">הזינו הכנסה.</p>`; return; }
    const sav = v.income - v.needs - v.wants, pc = x => fmt(x / v.income * 100, 1) + "%";
    const r = v.rate / 100 / 12, n = v.years * 12, fvp = x => r ? x * ((Math.pow(1 + r, n) - 1) / r) : x * n;
    const t = [[.5, "הכרחיות", v.needs], [.3, "רצוניות", v.wants], [.2, "חיסכון", sav]];
    document.getElementById("mbRes").innerHTML = `
      <p><b>נשאר לחיסכון:</b> <span class="${sav >= 0 ? "good" : "bad"}">${fmt(sav)} ₪</span> · <b>שיעור חיסכון:</b> ${pc(sav)}</p>
      ${sav < 0 ? `<p class="bad">ההוצאות גבוהות מההכנסה. התחילו מהרצוניות ומהמנויים.</p>` : ""}
      <div class="table-wrap"><table><caption class="sr-only">השוואה לכלל 50/30/20</caption>
        <thead><tr><th scope="col">קטגוריה</th><th scope="col">שלכם</th><th scope="col">אחוז</th><th scope="col">כלל 50/30/20</th></tr></thead>
        <tbody>${t.map(x => `<tr><th scope="row">${x[1]}</th><td>${fmt(x[2])}</td><td>${pc(x[2])}</td><td>${fmt(x[0] * v.income)} (${x[0] * 100}%)</td></tr>`).join("")}</tbody></table></div>
      <p class="small muted">הכלל הוא נקודת התחלה בלבד — עלות דיור בישראל מביאה הרבה אנשים ל-50% הכרחיות ומעלה.</p>
      <h3>מה זה שווה לאורך ${v.years} שנה?</h3>
      <p>הפקדה חודשית של ${fmt(Math.max(0, sav))} ₪ בתשואה של ${v.rate}% בשנה (הנחה, לא תחזית): <b>${fmt(fvp(Math.max(0, sav)))} ₪</b>. כל 500 ₪ נוספים בחודש מוסיפים כ-<b>${fmt(fvp(500))} ₪</b>.</p>`;
  };
  ["mbIncome", "mbNeeds", "mbWants", "mbRate", "mbYears"].forEach(id => document.getElementById(id).addEventListener("input", calc));
  calc();
};

// ---------- חובות ----------
function mDebtSim(debts, extra, order) {
  const d = debts.map(x => ({ ...x })), base = d.reduce((s, x) => s + x.min, 0), total = base + extra;
  let month = 0, interest = 0;
  while (d.some(x => x.bal > 0.005) && month < 600) {
    month++;
    d.forEach(x => { if (x.bal > 0) { const i = x.bal * x.rate / 100 / 12; x.bal += i; interest += i; } });
    let avail = total;
    d.forEach(x => { if (x.bal > 0) { const p = Math.min(x.min, x.bal); x.bal -= p; avail -= p; } });
    for (const k of order) { const x = d[k]; if (x.bal > 0 && avail > 0) { const p = Math.min(avail, x.bal); x.bal -= p; avail -= p; } }
  }
  return { month, interest, done: month < 600 && d.every(x => x.bal <= 0.005) };
}
MV.debt = function (el) {
  const s = mLoad("debt", { extra: 500, rows: [["כרטיס אשראי", 8000, 22, 250], ["הלוואה", 25000, 8, 500], ["חוב קטן", 4000, 15, 150]] });
  el.innerHTML = `<section class="card" aria-labelledby="mdT"><h2 id="mdT">החובות שלכם</h2>
    <div class="table-wrap"><table><caption class="sr-only">טבלת חובות</caption><thead><tr><th scope="col">שם</th><th scope="col">יתרה (₪)</th><th scope="col">ריבית שנתית (%)</th><th scope="col">מינימום חודשי (₪)</th></tr></thead>
      <tbody>${s.rows.map((r, i) => `<tr><td><input aria-label="שם חוב ${i + 1}" id="mdN${i}" value="${esc(r[0])}"></td><td><input aria-label="יתרה חוב ${i + 1}" id="mdB${i}" type="number" inputmode="decimal" value="${r[1]}" min="0"></td><td><input aria-label="ריבית חוב ${i + 1}" id="mdR${i}" type="number" inputmode="decimal" value="${r[2]}" min="0" step="0.5"></td><td><input aria-label="מינימום חוב ${i + 1}" id="mdM${i}" type="number" inputmode="decimal" value="${r[3]}" min="0"></td></tr>`).join("")}</tbody></table></div>
    ${mField("mdExtra", "תוספת חודשית מעבר למינימום (₪)", s.extra, 'min="0" step="50"')}
  </section>
  <section class="card mt" aria-labelledby="mdO" aria-live="polite"><h2 id="mdO">תוצאות</h2><div id="mdRes"></div></section>`;
  const calc = () => {
    const rows = s.rows.map((_, i) => [document.getElementById("mdN" + i).value, mNum("mdB" + i), mNum("mdR" + i), mNum("mdM" + i)]);
    const extra = mNum("mdExtra");
    mSave("debt", { extra, rows });
    const debts = rows.filter(r => r[1] > 0).map(r => ({ name: r[0], bal: r[1], rate: r[2], min: r[3] }));
    if (!debts.length) { document.getElementById("mdRes").innerHTML = `<p class="muted">הזינו לפחות חוב אחד.</p>`; return; }
    const idx = debts.map((_, i) => i);
    const aval = idx.slice().sort((a, b) => debts[b].rate - debts[a].rate), snow = idx.slice().sort((a, b) => debts[a].bal - debts[b].bal);
    const res = [["מינימום בלבד", mDebtSim(debts, 0, aval), []], ["מפולת: ריבית גבוהה קודם", mDebtSim(debts, extra, aval), aval], ["כדור שלג: יתרה קטנה קודם", mDebtSim(debts, extra, snow), snow]];
    const totalMin = debts.reduce((a, x) => a + x.min, 0);
    document.getElementById("mdRes").innerHTML = `
      <p class="small muted">סך התשלום החודשי: ${fmt(totalMin + extra)} ₪ (מינימום ${fmt(totalMin)} + תוספת ${fmt(extra)}). כשחוב נסגר, התשלום שלו עובר לחוב הבא.</p>
      <div class="table-wrap"><table><caption class="sr-only">השוואת שיטות</caption><thead><tr><th scope="col">שיטה</th><th scope="col">חודשים עד סגירה</th><th scope="col">סך ריבית</th><th scope="col">סדר</th></tr></thead>
      <tbody>${res.map(r => `<tr><th scope="row">${r[0]}</th><td>${r[1].done ? r[1].month : "לא נסגר"}</td><td>${r[1].done ? fmt(r[1].interest) + " ₪" : "—"}</td><td class="small">${r[2].length ? r[2].map(i => esc(debts[i].name)).join(" ← ") : "—"}</td></tr>`).join("")}</tbody></table></div>
      ${res.some(r => !r[1].done) ? `<p class="bad">אם החוב "לא נסגר" — התשלום החודשי אינו מכסה את הריבית. צריך להגדיל תשלום או לבדוק מחזור חוב מול הבנק.</p>` : ""}
      <p class="small muted">ההבדל בין מפולת לכדור שלג לרוב קטן; חשוב יותר מה שתצליחו לבצע בעקביות. החישוב לא כולל חיובים חדשים, עמלות או שינוי ריבית.</p>`;
  };
  el.querySelectorAll("input").forEach(i => i.addEventListener("input", calc));
  calc();
};

// ---------- מטרות וכרית ----------
MV.goal = function (el) {
  const s = mLoad("goal", { target: 150000, years: 5, ret: 4, exp: 9000, months: 6, save: 1500 });
  el.innerHTML = `<div class="grid grid-2">
    <section class="card" aria-labelledby="mgT"><h2 id="mgT">🎯 מטרה: כמה להפקיד בחודש</h2>
      ${mField("mgTarget", "סכום יעד (₪)", s.target, 'min="0" step="1000"')}
      ${mField("mgYears", "בעוד כמה שנים", s.years, 'min="0.5" max="50" step="0.5"')}
      ${mField("mgRet", "תשואה שנתית משוערת (%)", s.ret, 'min="0" max="20" step="0.5"')}
      <div id="mgRes" aria-live="polite"></div></section>
    <section class="card" aria-labelledby="mgE"><h2 id="mgE">🛟 כרית ביטחון</h2>
      ${mField("mgExp", "הוצאות חודשיות (₪)", s.exp, 'min="0" step="500"')}
      ${mField("mgMonths", "כמה חודשי הוצאות", s.months, 'min="1" max="24" step="1"')}
      ${mField("mgSave", "כמה אפשר להפקיד בחודש (₪)", s.save, 'min="0" step="100"')}
      <div id="mgERes" aria-live="polite"></div></section></div>`;
  const calc = () => {
    const v = { target: mNum("mgTarget"), years: mNum("mgYears"), ret: mNum("mgRet"), exp: mNum("mgExp"), months: mNum("mgMonths"), save: mNum("mgSave") };
    mSave("goal", v);
    const n = Math.max(1, Math.round(v.years * 12)), r = v.ret / 100 / 12;
    const pmt = r ? v.target * r / (Math.pow(1 + r, n) - 1) : v.target / n;
    document.getElementById("mgRes").innerHTML = `<p><b>הפקדה חודשית נדרשת: ${fmt(pmt)} ₪</b></p><p class="small muted">סך הפקדות: ${fmt(pmt * n)} ₪; את ההפרש עד היעד אמורה להשלים התשואה (בהנחה). בלי תשואה: ${fmt(v.target / n)} ₪ בחודש. אופק קצר (עד שנתיים-שלוש) מתאים בדרך כלל לפיקדון ולא למניות.</p>`;
    const goal = v.exp * v.months, mo = v.save > 0 ? Math.ceil(goal / v.save) : null;
    document.getElementById("mgERes").innerHTML = `<p><b>יעד כרית: ${fmt(goal)} ₪</b></p><p>${mo ? `בהפקדה של ${fmt(v.save)} ₪ בחודש תגיעו ליעד בכ-<b>${mo} חודשים</b> (כ-${fmt(mo / 12, 1)} שנים).` : "הזינו הפקדה חודשית."}</p><p class="small muted">הכרית נשמרת בפיקדון או בקרן כספית נזילה, לא במניות.</p>`;
  };
  ["mgTarget", "mgYears", "mgRet", "mgExp", "mgMonths", "mgSave"].forEach(id => document.getElementById(id).addEventListener("input", calc));
  calc();
};

// ---------- משכנתא והלוואה ----------
const mPay = (P, a, y) => { const r = a / 100 / 12, n = Math.round(y * 12); return r ? P * r / (1 - Math.pow(1 + r, -n)) : P / n; };
function mAmort(P, a, pmt, extra) {
  let b = P, m = 0, int = 0, y1i = 0, y1p = 0; const r = a / 100 / 12;
  while (b > 0.005 && m < 1200) { m++; const i = b * r; int += i; let pr = pmt + extra - i; if (pr <= 0) return null; if (pr > b) pr = b; b -= pr; if (m <= 12) { y1i += i; y1p += pr; } }
  return { m, int, y1i, y1p };
}
MV.mortgage = function (el) {
  const s = mLoad("mortgage", { loan: 800000, rate: 4.5, years: 25, extra: 500, income: 18000 });
  el.innerHTML = `<div class="grid grid-2">
    <section class="card" aria-labelledby="mmT"><h2 id="mmT">ההלוואה</h2>
      ${mField("mmLoan", "סכום הלוואה (₪)", s.loan, 'min="0" step="10000"')}
      ${mField("mmRate", "ריבית שנתית קבועה (%)", s.rate, 'min="0" max="20" step="0.1"')}
      ${mField("mmYears", "תקופה (שנים)", s.years, 'min="1" max="40" step="1"')}
      ${mField("mmExtra", "תשלום נוסף חודשי (₪)", s.extra, 'min="0" step="100"')}
      ${mField("mmIncome", "הכנסה נטו חודשית (לחישוב יחס החזר) (₪)", s.income, 'min="0" step="500"')}
      <p class="small muted">חישוב פשוט של החזר קבוע (שפיצר) בריבית קבועה וללא הצמדה. משכנתא אמיתית כוללת לרוב כמה מסלולים — השוו הצעות בכתב.</p>
    </section>
    <section class="card" aria-labelledby="mmO" aria-live="polite"><h2 id="mmO">תוצאה</h2><div id="mmRes"></div></section></div>`;
  const calc = () => {
    const v = { loan: mNum("mmLoan"), rate: mNum("mmRate"), years: Math.min(40, Math.max(1, Math.round(mNum("mmYears")))), extra: mNum("mmExtra"), income: mNum("mmIncome") };
    mSave("mortgage", v);
    if (!v.loan) { document.getElementById("mmRes").innerHTML = '<p class="muted">הזינו סכום הלוואה.</p>'; return; }
    const pmt = mPay(v.loan, v.rate, v.years), base = mAmort(v.loan, v.rate, pmt, 0), ex = v.extra > 0 ? mAmort(v.loan, v.rate, pmt, v.extra) : null;
    const cmp = [[v.years - 5, v.rate], [v.years, v.rate], [v.years + 5, v.rate], [v.years, v.rate + 1]].filter(x => x[0] >= 1 && x[0] <= 40);
    document.getElementById("mmRes").innerHTML = `
      <p><b>החזר חודשי: ${fmt(pmt)} ₪</b>${v.income ? ` (כ-${fmt(pmt / v.income * 100, 1)}% מההכנסה)` : ""}</p>
      <ul><li>סך התשלומים: ${fmt(pmt * v.years * 12)} ₪</li><li>ריבית כוללת: <b>${fmt(base.int)} ₪</b> (${fmt(base.int / v.loan * 100, 0)}% מגובה ההלוואה)</li>
      <li>בשנה הראשונה: ריבית ${fmt(base.y1i)} ₪, החזר קרן ${fmt(base.y1p)} ₪</li></ul>
      ${ex ? `<p><b>עם תשלום נוסף של ${fmt(v.extra)} ₪ בחודש:</b> ההלוואה נסגרת ב-${ex.m} חודשים (חיסכון של ${base.m - ex.m} חודשים) וחוסכים ${fmt(base.int - ex.int)} ₪ בריבית. בדקו עמלת פירעון מוקדם.</p>` : ""}
      <div class="table-wrap"><table><caption class="sr-only">השוואת תנאים</caption><thead><tr><th scope="col">תנאים</th><th scope="col">החזר חודשי</th><th scope="col">ריבית כוללת</th></tr></thead>
      <tbody>${cmp.map(c => { const p = mPay(v.loan, c[1], c[0]); return `<tr><th scope="row">${c[0]} שנים, ${fmt(c[1], 1)}%</th><td>${fmt(p)}</td><td>${fmt(p * c[0] * 12 - v.loan)}</td></tr>`; }).join("")}</tbody></table></div>
      <p class="small muted">כלל אצבע זהיר: החזר של עד כשליש מההכנסה נטו. הכללים של הבנקים ושל בנק ישראל משתנים — בדקו אותם.</p>`;
  };
  ["mmLoan", "mmRate", "mmYears", "mmExtra", "mmIncome"].forEach(id => document.getElementById(id).addEventListener("input", calc));
  calc();
};

// ---------- אינפלציה ----------
MV.inflation = function (el) {
  const s = mLoad("inflation", { amount: 100000, infl: 3, years: 20, ret: 6 });
  el.innerHTML = `<div class="grid grid-2">
    <section class="card" aria-labelledby="miT"><h2 id="miT">הנתונים</h2>
      ${mField("miAmount", "סכום היום (₪)", s.amount, 'min="0" step="1000"')}
      ${mField("miInfl", "אינפלציה שנתית משוערת (%)", s.infl, 'min="0" max="30" step="0.5"')}
      ${mField("miYears", "שנים", s.years, 'min="1" max="60" step="1"')}
      ${mField("miRet", "תשואה נומינלית שנתית על החיסכון (%)", s.ret, 'min="0" max="30" step="0.5"')}
    </section>
    <section class="card" aria-labelledby="miO" aria-live="polite"><h2 id="miO">תוצאה</h2><div id="miRes"></div></section></div>`;
  const calc = () => {
    const v = { amount: mNum("miAmount"), infl: mNum("miInfl"), years: Math.min(60, Math.max(1, Math.round(mNum("miYears")))), ret: mNum("miRet") };
    mSave("inflation", v);
    const f = Math.pow(1 + v.infl / 100, v.years), real = (1 + v.ret / 100) / (1 + v.infl / 100) - 1;
    const grown = v.amount * Math.pow(1 + v.ret / 100, v.years);
    document.getElementById("miRes").innerHTML = `
      <ul><li>כוח הקנייה של ${fmt(v.amount)} ₪ אחרי ${v.years} שנים (בלי תשואה): <b>${fmt(v.amount / f)} ₪</b> במחירי היום.</li>
      <li>כדי לשמר כוח קנייה צריך אז: <b>${fmt(v.amount * f)} ₪</b>.</li>
      <li>תשואה ריאלית: <b>${fmt(real * 100, 2)}%</b> בשנה.</li>
      <li>עם תשואה נומינלית של ${v.ret}%: ${fmt(grown)} ₪ נומינלי, שהם כ-<b>${fmt(grown / f)} ₪</b> במחירי היום.</li></ul>
      <p class="small muted">חישוב פשוט: אינפלציה ותשואה קבועות, בלי מס. בפועל שתיהן משתנות משנה לשנה.</p>`;
  };
  ["miAmount", "miInfl", "miYears", "miRet"].forEach(id => document.getElementById(id).addEventListener("input", calc));
  calc();
};

// ---------- יציאה מהבית ----------
MV.moveout = function (el) {
  const s = mLoad("moveout", { income: 8500, now: 4200, people: 1, rent: 3800, arnona: 450, elec: 250, net: 100, food: 1500, trans: 600, phone: 100, social: 1200, other: 800, setup: 25000, months: 3 });
  el.innerHTML = `<div class="grid grid-2">
    <section class="card" aria-labelledby="moT"><h2 id="moT">המצב היום</h2>
      ${mField("moIncome", "הכנסה נטו חודשית (₪)", s.income, 'min="0" step="100"')}
      ${mField("moNow", "ההוצאות החודשיות שלכם היום (₪)", s.now, 'min="0" step="100"')}
      <h3>התקציב החודשי של החיים בחוץ (לכל המשק)</h3>
      ${mField("moRent", "שכר דירה (₪)", s.rent, 'min="0" step="100"')}
      ${mField("moArnona", "ארנונה ומים (₪)", s.arnona, 'min="0" step="50"')}
      ${mField("moElec", "חשמל וגז (₪)", s.elec, 'min="0" step="50"')}
      ${mField("moNet", "אינטרנט (₪)", s.net, 'min="0" step="10"')}
      ${mField("moPeople", "כמה אנשים חולקים את הדירה (שכר דירה וחשבונות מתחלקים)", s.people, 'min="1" max="6" step="1"')}
      <h3>הוצאות אישיות</h3>
      ${mField("moFood", "מזון וצריכה ביתית (₪)", s.food, 'min="0" step="100"')}
      ${mField("moTrans", "תחבורה (₪)", s.trans, 'min="0" step="50"')}
      ${mField("moPhone", "טלפון (₪)", s.phone, 'min="0" step="10"')}
      ${mField("moSocial", "בילויים וחברה (₪)", s.social, 'min="0" step="100"')}
      ${mField("moOther", "שונות (₪)", s.other, 'min="0" step="100"')}
      <h3>הקמה וכרית</h3>
      ${mField("moSetup", "הקמה: פיקדון, ריהוט ועוד (₪, חד-פעמי)", s.setup, 'min="0" step="1000"')}
      ${mField("moMonths", "כמה חודשי הוצאות לכרית ביטחון", s.months, 'min="1" max="12" step="1"')}
    </section>
    <section class="card" aria-labelledby="moO" aria-live="polite"><h2 id="moO">התוצאה</h2><div id="moRes"></div></section></div>`;
  const calc = () => {
    const v = { income: mNum("moIncome"), now: mNum("moNow"), people: Math.max(1, Math.round(mNum("moPeople"))), rent: mNum("moRent"), arnona: mNum("moArnona"), elec: mNum("moElec"), net: mNum("moNet"), food: mNum("moFood"), trans: mNum("moTrans"), phone: mNum("moPhone"), social: mNum("moSocial"), other: mNum("moOther"), setup: mNum("moSetup"), months: Math.max(1, mNum("moMonths")) };
    mSave("moveout", v);
    if (!v.income) { document.getElementById("moRes").innerHTML = '<p class="muted">הזינו הכנסה.</p>'; return; }
    const shared = (v.rent + v.arnona + v.elec + v.net) / v.people, rentMine = v.rent / v.people;
    const total = shared + v.food + v.trans + v.phone + v.social + v.other;
    const rentPct = rentMine / v.income, totalPct = total / v.income, gap = total - v.now, nowSave = v.income - v.now, outSave = v.income - total;
    const efTarget = total * v.months, fund = efTarget + v.setup, mo = nowSave > 0 ? Math.ceil(fund / nowSave) : null;
    const ok = outSave >= 0;
    document.getElementById("moRes").innerHTML = `
      <ul><li><b>תקציב חודשי בחוץ: ${fmt(total)} ₪</b> (${fmt(totalPct * 100, 1)}% מההכנסה)</li>
      <li>החלק שלכם בשכר הדירה: ${fmt(rentMine)} ₪ (${fmt(rentPct * 100, 1)}% מההכנסה) ${rentPct > 1 / 3 ? '<span class="bad">— מעל כלל האצבע של שליש</span>' : '<span class="good">— בתוך כלל האצבע של שליש</span>'}</li>
      <li>מצב היום: מוציאים ${fmt(v.now)} ₪ וחוסכים ${fmt(nowSave)} ₪ בחודש</li>
      <li>אחרי היציאה: ${ok ? `נשארים ${fmt(outSave)} ₪ לחיסכון` : `<span class="bad">חסרים ${fmt(-outSave)} ₪ בחודש</span>`}</li></ul>
      ${ok ? "" : `<p class="bad">בתנאים האלה אי אפשר לצאת בלי חוב. אפשרויות: שותפים, אזור זול יותר, הכנסה גבוהה יותר, קיצוץ רצוניות — או לחכות ולצבור.</p>`}
      <h3>שכר דירה וירטואלי</h3>
      <p>ההפרש בין תקציב החיים בחוץ להוצאות היום הוא <b>${fmt(gap)} ₪ בחודש</b>. ${gap > 0 ? (nowSave >= gap ? `אתם יכולים להעביר אותו לחיסכון מדי חודש (נשארים ${fmt(nowSave - gap)} ₪) — ובכך להתרגל לתקציב החדש ולצבור קרן.` : `היום אתם חוסכים ${fmt(nowSave)} ₪, כלומר פחות מההפרש — סימן שהחיים בחוץ עדיין לא ממומנים.`) : "הוצאות היציאה נמוכות מהיום."}</p>
      <h3>קרן ליציאה</h3>
      <p>כרית של ${v.months} חודשים: ${fmt(efTarget)} ₪ + הקמה ${fmt(v.setup)} ₪ = <b>${fmt(fund)} ₪</b>. ${mo ? `בחיסכון של ${fmt(nowSave)} ₪ בחודש: כ-<b>${mo} חודשים</b> (כ-${fmt(mo / 12, 1)} שנים).` : "כדי לצבור צריך חיסכון חודשי חיובי."}</p>
      <p class="small muted">חישוב פשוט, בלי מס, אינפלציה או שינויי שכר. כלל האצבע של שליש לשכר דירה הוא הנחיה, לא חוק.</p>`;
  };
  ["moIncome", "moNow", "moPeople", "moRent", "moArnona", "moElec", "moNet", "moFood", "moTrans", "moPhone", "moSocial", "moOther", "moSetup", "moMonths"].forEach(id => document.getElementById(id).addEventListener("input", calc));
  calc();
};

// ---------- עלות ההמתנה ----------
const mFV = (pmt, r, n) => r ? pmt * ((Math.pow(1 + r, n) - 1) / r) : pmt * n;
MV.delay = function (el) {
  const s = mLoad("delay", { pmt: 800, ret: 5, age: 25, stop: 67, wait: 5 });
  el.innerHTML = `<div class="grid grid-2">
    <section class="card" aria-labelledby="mwT"><h2 id="mwT">⏳ כמה עולה לדחות חיסכון?</h2>
      ${mField("mwPmt", "הפקדה חודשית (₪)", s.pmt, 'min="0" step="100"')}
      ${mField("mwRet", "תשואה שנתית משוערת (%)", s.ret, 'min="0" max="20" step="0.5"')}
      ${mField("mwAge", "גיל היום", s.age, 'min="16" max="70" step="1"')}
      ${mField("mwStop", "גיל היעד", s.stop, 'min="30" max="80" step="1"')}
      ${mField("mwWait", "כמה שנים רוצים לדחות את ההתחלה", s.wait, 'min="0" max="30" step="1"')}
      <p class="small muted">הדוגמה אינה תחזית. התשואה קבועה בהנחה, בלי מס, אינפלציה ודמי ניהול.</p></section>
    <section class="card" aria-labelledby="mwO" aria-live="polite"><h2 id="mwO">התוצאה</h2><div id="mwRes"></div></section></div>`;
  const calc = () => {
    const v = { pmt: mNum("mwPmt"), ret: mNum("mwRet"), age: mNum("mwAge"), stop: mNum("mwStop"), wait: mNum("mwWait") };
    mSave("delay", v);
    const out = document.getElementById("mwRes"), r = v.ret / 100 / 12;
    const nNow = Math.round((v.stop - v.age) * 12), nLate = Math.round((v.stop - v.age - v.wait) * 12);
    if (nNow <= 0 || v.wait < 0 || nLate < 0) { out.innerHTML = '<p class="muted">גיל היעד חייב להיות גבוה מהגיל היום, והדחייה קצרה מהתקופה.</p>'; return; }
    const now = mFV(v.pmt, r, nNow), late = mFV(v.pmt, r, nLate), dep = v.pmt * nNow, depLate = v.pmt * nLate;
    const catchUp = nLate > 0 ? now / mFV(1, r, nLate) : null;
    out.innerHTML = `
      <ul><li>מתחילים היום: <b>${fmt(now)} ₪</b> בגיל ${v.stop} (הפקדות של ${fmt(dep)} ₪)</li>
      <li>מתחילים בעוד ${v.wait} שנים: <b>${fmt(late)} ₪</b> (הפקדות של ${fmt(depLate)} ₪)</li>
      <li>ההפרש: <b class="bad">${fmt(now - late)} ₪</b>, כשההפקדות עצמן נמוכות רק ב-${fmt(dep - depLate)} ₪. את רוב ההפרש יוצרת הריבית דריבית של השנים הראשונות.</li></ul>
      ${catchUp && v.wait > 0 ? `<p>כדי להגיע לאותו סכום אחרי דחייה צריך להפקיד כ-<b>${fmt(catchUp)} ₪</b> בחודש, כלומר פי ${fmt(catchUp / v.pmt, 2)} מהיום.</p>` : ""}
      <p class="small muted">המסקנה אינה "להשקיע הכול מיד": קודם כרית ביטחון וסגירת חוב ביוקר (ראו לשונית "חובות"). אבל כשהם מסודרים, כל שנה של דחייה יקרה.</p>`;
  };
  ["mwPmt", "mwRet", "mwAge", "mwStop", "mwWait"].forEach(id => document.getElementById(id).addEventListener("input", calc));
  calc();
};

// ---------- עלות אשראי ----------
// ריבית חודשית אפקטיבית מתוך סדרת תשלומים שווים (חיפוש בינארי)
function mMonthlyRate(P, pmt, n) {
  if (pmt * n <= P) return 0;
  let lo = 0, hi = 1;
  for (let i = 0; i < 100; i++) { const m = (lo + hi) / 2, f = P * m / (1 - Math.pow(1 + m, -n)); if (f > pmt) hi = m; else lo = m; }
  return (lo + hi) / 2;
}
MV.credit = function (el) {
  const s = mLoad("credit", { price: 6000, n: 12, fee: 0, cash: 5700, od: 5000, odRate: 11, odMonths: 6 });
  el.innerHTML = `<div class="grid grid-2">
    <section class="card" aria-labelledby="mcT"><h2 id="mcT">🛍️ תשלומים מול מזומן</h2>
      ${mField("mcPrice", "המחיר בתשלומים (סך הכול, ₪)", s.price, 'min="0" step="100"')}
      ${mField("mcN", "מספר תשלומים", s.n, 'min="2" max="60" step="1"')}
      ${mField("mcFee", "עמלה או תוספת חד-פעמית (₪)", s.fee, 'min="0" step="10"')}
      ${mField("mcCash", "המחיר במזומן או בתשלום אחד (₪)", s.cash, 'min="0" step="100"')}
      <div id="mcRes" aria-live="polite"></div></section>
    <section class="card" aria-labelledby="mcO"><h2 id="mcO">🏦 משיכת יתר</h2>
      ${mField("mcOd", "סכום המינוס הממוצע (₪)", s.od, 'min="0" step="500"')}
      ${mField("mcOdRate", "ריבית שנתית על המינוס (%), מופיעה בדף החשבון", s.odRate, 'min="0" max="40" step="0.5"')}
      ${mField("mcOdMonths", "כמה חודשים בשנה החשבון במינוס", s.odMonths, 'min="0" max="12" step="1"')}
      <div id="mcOdRes" aria-live="polite"></div></section></div>
    <p class="small muted mt">הכלי מראה את העלות. ההחלטה אם התשלומים שווים אותה היא שלכם. תנאי אשראי, עמלות וריביות משתנים בין גופים: בדקו בחוזה או בדף החשבון.</p>`;
  const calc = () => {
    const v = { price: mNum("mcPrice"), n: Math.max(2, Math.round(mNum("mcN"))), fee: mNum("mcFee"), cash: mNum("mcCash"), od: mNum("mcOd"), odRate: mNum("mcOdRate"), odMonths: mNum("mcOdMonths") };
    mSave("credit", v);
    const res = document.getElementById("mcRes"), diff = v.price + v.fee - v.cash;
    if (v.cash > 0 && diff > 0) {
      const pmt = (v.price + v.fee) / v.n, m = mMonthlyRate(v.cash, pmt, v.n), apr = (Math.pow(1 + m, 12) - 1) * 100;
      res.innerHTML = `<p>בתשלומים משלמים <b>${fmt(diff)} ₪</b> יותר (${fmt(diff / v.cash * 100, 1)}%). תשלום חודשי: ${fmt(pmt)} ₪.</p>
        <p>זה שקול לריבית של <b class="${apr > 8 ? "bad" : ""}">כ-${fmt(apr, 1)}% בשנה</b> על הכסף שלא שולם מראש. הקרן קטנה עם כל תשלום, ולכן הריבית האפקטיבית גבוהה ממה שנראה.</p>
        <p class="small muted">תשלומים "ללא ריבית" עדיין יכולים לגלם עלות במחיר: זו ההשוואה שהכלי עושה.</p>`;
    } else if (v.cash > 0) {
      res.innerHTML = `<p class="good">אין הפרש בין התשלומים למזומן. שימו לב רק שאינכם מצטברים להתחייבויות חודשיות.</p>`;
    } else res.innerHTML = `<p class="muted">הזינו מחיר במזומן להשוואה.</p>`;
    const cost = v.od * v.odRate / 100 * Math.min(12, v.odMonths) / 12;
    document.getElementById("mcOdRes").innerHTML = v.od > 0 ? `
      <p>עלות ריבית משוערת בשנה: <b class="${cost > 0 ? "bad" : ""}">${fmt(cost)} ₪</b> (כ-${fmt(cost / 12)} ₪ בחודש בממוצע).</p>
      <p class="small muted">חישוב פשוט, בלי עמלות ובלי שינוי בריבית. אם המינוס קבוע, שווה לבקש מהבנק בכתב הצעה להלוואה שסוגרת אותו ולהשוות את העלות הכוללת.</p>` : `<p class="muted">הזינו סכום מינוס.</p>`;
  };
  ["mcPrice", "mcN", "mcFee", "mcCash", "mcOd", "mcOdRate", "mcOdMonths"].forEach(id => document.getElementById(id).addEventListener("input", calc));
  calc();
};
