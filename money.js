// ===================================================================
//  💰 ניהול כסף: מתכנן תקציב · מחשבון חובות (מפולת מול כדור שלג) · מטרות וכרית ביטחון
//  כלי לימוד בלבד — אינו ייעוץ פיננסי. החישובים פשוטים ואינם כוללים מס, אינפלציה או שינויי ריבית.
// ===================================================================
TITLES.money = "ניהול כסף";

const MONEY_TABS = [["budget", "🧾 תקציב"], ["debt", "💳 חובות"], ["goal", "🎯 מטרות וכרית"]];
const MV = {};   // תצוגות הכלים

Routes.money = function (tab) {
  tab = MV[tab] ? tab : "budget";
  app().innerHTML = `
    <h1>💰 ניהול כסף</h1>
    <p class="muted">שלושה כלים פשוטים שעוזרים להבין לאן הכסף הולך, איך לסגור חובות, ואיך להגיע ליעד. הערכים נשמרים בדפדפן שלכם בלבד. <a href="#path">לשלב "ניהול כסף אישי" בקורס</a></p>
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
