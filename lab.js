// ===================================================================
//  🧪 מעבדת תרגול · 🏝️ מחשבון עצמאות כלכלית · 🎓 תעודות · מושג היום
// ===================================================================
TITLES.lab = "מעבדת תרגול";
TITLES.certificate = "תעודת סיום שלב";

// ===================== נתוני חברת התרגול =====================
const LAB_CO = {
  name: "קפה הגליל בע\"מ (חברה דמיונית)",
  rev: 2000, cogs: 900, opex: 600, ebit: 500, interest: 50, tax: 90, ni: 360,
  equity: 1750, debt: 500, cash: 250, cfo: 480, capex: 130, shares: 100, price: 72
};
const labTable = () => `
  <div class="table-wrap"><table class="data lab-table">
    <caption class="small muted" style="text-align:right;padding-bottom:6px">${LAB_CO.name} — במיליוני ₪, חוץ ממחיר המניה</caption>
    <tr><th scope="row">הכנסות</th><td>2,000</td><th scope="row">הון עצמי</th><td>1,750</td></tr>
    <tr><th scope="row">עלות המכר</th><td>900</td><th scope="row">חוב פיננסי</th><td>500</td></tr>
    <tr><th scope="row">הוצאות תפעול</th><td>600</td><th scope="row">מזומן</th><td>250</td></tr>
    <tr><th scope="row">רווח תפעולי (EBIT)</th><td>500</td><th scope="row">תזרים מפעילות שוטפת</th><td>480</td></tr>
    <tr><th scope="row">הוצאות ריבית</th><td>50</td><th scope="row">CAPEX</th><td>130</td></tr>
    <tr><th scope="row">מס (20%)</th><td>90</td><th scope="row">מספר מניות (מיליון)</th><td>100</td></tr>
    <tr><th scope="row">רווח נקי</th><td>360</td><th scope="row">מחיר מניה</th><td>72 ₪</td></tr>
  </table></div>`;

const labDcf = () => dcfValue({ fcf: 350, years: 5, gT: 3, r: 10, cash: 250, debt: 500, shares: 100 }, 0.08).perShare;

const LAB = [
  { id: "gm", title: "שולי רווח גולמי", lesson: "l2-1", useTable: true, unit: "%", q: "מהם שולי הרווח הגולמי של החברה?", answer: 55, tolAbs: 0.5,
    hint: "רווח גולמי = הכנסות − עלות המכר. אחר כך חלק בהכנסות.", sol: "(2,000 − 900) ÷ 2,000 = 55%. מעל 40% — רמז לכוח תמחור." },
  { id: "fcf", title: "תזרים מזומנים חופשי", lesson: "l2-3", useTable: true, unit: "מיליון ₪", q: "מהו ה-FCF של החברה?", answer: 350, tolRel: 0.01,
    hint: "FCF = תזרים מפעילות שוטפת − CAPEX.", sol: "480 − 130 = 350. ה-FCF קרוב לרווח הנקי (360) — המרה של כ-97%, איכות רווחים טובה." },
  { id: "roic", title: "תשואה על ההון המושקע", lesson: "l2-4", useTable: true, unit: "%", q: "מהו ה-ROIC? (השתמש בשיעור מס של 20%)", answer: 20, tolAbs: 0.5,
    hint: "NOPAT = EBIT × (1 − מס). הון מושקע = הון עצמי + חוב − מזומן.", sol: "NOPAT = 500 × 0.8 = 400. הון מושקע = 1,750 + 500 − 250 = 2,000. ROIC = 20% — עסק איכותי." },
  { id: "pe", title: "מכפיל רווח", lesson: "l2-5", useTable: true, unit: "", q: "מהו מכפיל הרווח (P/E)?", answer: 20, tolRel: 0.02,
    hint: "קודם חשב רווח למניה (EPS) = רווח נקי ÷ מספר מניות.", sol: "EPS = 360 ÷ 100 = 3.6 ₪. P/E = 72 ÷ 3.6 = 20." },
  { id: "fcfy", title: "תשואת FCF", lesson: "l2-5", useTable: true, unit: "%", q: "מהי תשואת ה-FCF (FCF ÷ שווי שוק)?", answer: 350 / 7200 * 100, tolAbs: 0.15,
    hint: "שווי שוק = מחיר × מספר מניות.", sol: "שווי שוק = 72 × 100 = 7,200. תשואת FCF = 350 ÷ 7,200 ≈ 4.9%. עם צמיחה של כ-8%, התשואה הצפויה בקירוב ≈ 12.9% בשנה אם המכפיל יציב." },
  { id: "dcf", title: "שווי פנימי ב-DCF", lesson: "l3-5", useTable: true, unit: "₪ למניה", q: "הנח: FCF של 350, צמיחה של 8% בשנה ל-5 שנים, אחר כך 3% לנצח, ושיעור היוון 10%. מהו השווי הפנימי למניה? (זכור להוסיף מזומן ולהפחית חוב)", answer: labDcf(), tolRel: 0.03,
    hint: "אפשר לפתוח את מחשבון ה-DCF ולהזין: FCF 350, צמיחה 8%, 5 שנים, צמיחה לנצח 3%, היוון 10%, מזומן 250, חוב 500, מניות 100.", sol: () => `השווי יוצא כ-${labDcf().toFixed(1)} ₪ למניה — <b>נמוך</b> ממחיר המניה (72 ₪). כלומר, לפי ההנחות האלה, המחיר מגלם צמיחה גבוהה מ-8%. עסק טוב, אבל אין מרווח ביטחון.` },
  { id: "mos", title: "מרווח ביטחון", lesson: "l3-2", useTable: false, type: "mc", q: "שווי פנימי משוער של 61 ₪ ומחיר של 72 ₪. מה המסקנה הנכונה בגישת באפט?",
    options: ["לקנות — העסק מצוין", "אין מרווח ביטחון; לרשימת המעקב ולחכות למחיר נמוך יותר", "למכור בשורט", "להתעלם מהשווי"], answer: 1,
    sol: "עסק עם ROIC של 20% הוא עסק טוב — אבל המחיר גבוה מהשווי שהערכנו. לפי השיעור על מרווח ביטחון, למחיר הזה היינו רוצים שווי של לפחות 90-100 ₪." },
  { id: "dso", title: "זיהוי דגל אדום", lesson: "l2-6", useTable: false, unit: "ימים",
    q: "חברה אחרת: בשנה 1 — הכנסות 2,000 ולקוחות 300. בשנה 2 — הכנסות 2,300 ולקוחות 540. מהם ימי הגבייה (DSO) בשנה 2?", answer: 540 / 2300 * 365, tolRel: 0.02,
    hint: "DSO = לקוחות ÷ הכנסות × 365.", sol: "540 ÷ 2,300 × 365 ≈ 85.7 יום (לעומת כ-54.8 בשנה 1). ההכנסות עלו 15% אבל הלקוחות עלו 80% — דגל אדום שדורש הסבר." },
  { id: "pos", title: "גודל פוזיציה", lesson: "l5-1", useTable: false, unit: "מניות", q: "תיק של 60,000 ₪, סיכון של 1% לעסקה, כניסה ב-48 ₪ וסטופ ב-45 ₪. כמה מניות לקנות?", answer: 200, tolRel: 0.001,
    hint: "סכום הסיכון ÷ הסיכון למניה.", sol: "1% מ-60,000 = 600 ₪. סיכון למניה = 3 ₪. 600 ÷ 3 = 200 מניות." },
  { id: "rr", title: "יחס סיכוי-סיכון", lesson: "l5-2", useTable: false, unit: ": 1", q: "כניסה ב-48, סטופ ב-45, יעד ב-57. מה יחס הסיכוי-סיכון?", answer: 3, tolRel: 0.01,
    hint: "(יעד − כניסה) ÷ (כניסה − סטופ).", sol: "(57 − 48) ÷ (48 − 45) = 9 ÷ 3 = 3:1. מספיק לצדוק ב-25% מהעסקאות כדי לא להפסיד." },
  { id: "decomp", title: "פירוק תשואה", lesson: "lm-6", useTable: false, unit: "%", q: "מניה ב-P/E של 30, שהרווח שלה צומח 10% בשנה. בעוד 10 שנים המכפיל יורד ל-20. מה התשואה השנתית בקירוב (בלי דיבידנד)?", answer: (1.1 * Math.pow(20 / 30, 0.1) - 1) * 100, tolAbs: 0.3,
    hint: "(1 + צמיחה) × (מכפיל סוף ÷ מכפיל התחלה)^(1/שנים) − 1. או במחשבון פירוק התשואה.", sol: "1.1 × (2/3)^0.1 − 1 ≈ 5.6% בשנה. העסק צמח 10% בשנה, אבל התכווצות המכפיל אכלה כמעט חצי מזה." }
];

Routes.lab = function () {
  State.data.lab = State.data.lab || {};
  const doneN = LAB.filter(x => State.data.lab[x.id]).length;
  app().innerHTML = `
    <h1>🧪 מעבדת תרגול</h1>
    <p class="muted">באפט אומר שהוא קורא דוחות כמו שאחרים קוראים עיתון. כאן מתרגלים את זה בפועל: חישובים אמיתיים על דוחות של חברה דמיונית, צעד אחר צעד — מהשולי הגולמי ועד שווי פנימי ומרווח ביטחון.</p>
    <div class="row mb"><div class="progress" style="flex:1" role="progressbar" aria-label="התקדמות במעבדה" aria-valuemin="0" aria-valuemax="${LAB.length}" aria-valuenow="${doneN}"><div style="width:${doneN / LAB.length * 100}%"></div></div><b>${doneN}/${LAB.length}</b></div>
    <section class="card mb" aria-labelledby="labCo"><h2 id="labCo">📄 הדוחות של ${LAB_CO.name}</h2>${labTable()}<p class="small muted">התרגילים 1-7 מתבססים על הטבלה הזו. אפשר להשתמש ב<a href="#tools/dcf">מחשבונים</a>.</p></section>
    ${LAB.map((x, i) => `
      <article class="card mb lab-ex ${State.data.lab[x.id] ? "solved" : ""}" id="lab-${x.id}" aria-labelledby="lt-${x.id}">
        <div class="row"><span class="pill">${i + 1}</span><h3 id="lt-${x.id}" style="margin:0">${x.title}</h3><span class="spacer"></span>${State.data.lab[x.id] ? `<span class="pill green">✅ נפתר</span>` : ""}</div>
        <p class="mt"><b>${x.q}</b></p>
        ${x.type === "mc" ? x.options.map((o, k) => `<button type="button" class="opt" data-mc="${k}">${esc(o)}</button>`).join("") : `
        <div class="row">
          <div class="field" style="max-width:220px"><label for="in-${x.id}">התשובה שלך ${x.unit ? `(${x.unit})` : ""}</label><input id="in-${x.id}" inputmode="decimal" autocomplete="off" /></div>
          <button type="button" class="btn" data-check style="margin-top:22px">בדוק</button>
          <button type="button" class="btn ghost small" data-hint style="margin-top:22px">💡 רמז</button>
        </div>`}
        <div class="explain" aria-live="polite"></div>
        <p class="small mt">שיעור קשור: <a href="#lesson/${x.lesson}">${esc(lessonTitle(x.lesson))}</a></p>
      </article>`).join("")}`;

  LAB.forEach(x => {
    const card = $("#lab-" + x.id), out = $(".explain", card);
    const sol = typeof x.sol === "function" ? x.sol() : x.sol;
    const solve = ok => {
      if (ok && !State.data.lab[x.id]) { State.data.lab[x.id] = todayStr(); State.data.xp += 5; State.save(); updateRankChip(); card.classList.add("solved"); }
      out.innerHTML = (ok ? "✅ נכון! " : "❌ לא בדיוק. ") + sol;
    };
    if (x.type === "mc") {
      $$("[data-mc]", card).forEach(b => b.onclick = () => {
        const ok = +b.dataset.mc === x.answer;
        $$("[data-mc]", card).forEach(o => { o.disabled = true; if (+o.dataset.mc === x.answer) o.classList.add("correct"); else if (o === b) o.classList.add("wrong"); });
        solve(ok);
      });
      return;
    }
    const check = () => {
      const v = parseFloat(String($("input", card).value).replace(/[,%₪\s]/g, ""));
      if (!isFinite(v)) { out.textContent = "הכנס מספר."; return; }
      const ok = x.tolAbs != null ? Math.abs(v - x.answer) <= x.tolAbs : Math.abs(v / x.answer - 1) <= x.tolRel;
      if (ok) solve(true);
      else out.innerHTML = `❌ עוד לא. ${v > x.answer ? "התשובה שלך גבוהה מדי." : "התשובה שלך נמוכה מדי."} נסה שוב, או לחץ על רמז. <button type="button" class="btn ghost small" data-sol>הצג פתרון</button>`;
      const sb = $("[data-sol]", card); if (sb) sb.onclick = () => { out.innerHTML = "📘 " + sol; };
    };
    $("[data-check]", card).onclick = check;
    $("input", card).addEventListener("keydown", e => { if (e.key === "Enter") check(); });
    $("[data-hint]", card).onclick = () => { out.textContent = "💡 " + x.hint; };
  });
};

// ===================== מחשבון עצמאות כלכלית =====================
TOOL_TABS.push(["fi", "🏝️ עצמאות כלכלית"]);
ToolViews.fi = function (el) {
  el.innerHTML = `
    <h2>🏝️ מחשבון עצמאות כלכלית</h2>
    <p class="muted small">כמה צריך כדי שהתיק יממן את ההוצאות, ותוך כמה זמן אפשר להגיע לשם — לפי <a href="#lesson/lp-5">כלל ה-4%</a>. כל הסכומים בכוח קנייה של היום (התשואה היא <b>ריאלית</b>, אחרי אינפלציה).</p>
    <div class="form">
      ${field("fi_exp", "הוצאות חודשיות שהתיק צריך לממן (₪)", 12000, "אחרי קצבת פנסיה והכנסות אחרות")}
      ${field("fi_now", "חיסכון מושקע היום (₪)", 100000)}
      ${field("fi_save", "השקעה חודשית (₪)", 3000)}
      ${field("fi_r", "תשואה ריאלית שנתית (%)", 5, "היסטורית למניות ~6%-7% ריאלי; שמרני: 4%-5%")}
      ${field("fi_w", "שיעור משיכה (%)", 4, "3%-3.5% לפרישה ארוכה מאוד")}
    </div>
    <div id="fi_out"></div>`;
  bindInputs(el, () => {
    const exp = num("fi_exp") * 12, now = num("fi_now") || 0, save = num("fi_save") || 0, r = num("fi_r") / 100, w = num("fi_w") / 100;
    const target = exp / w;
    let v = now, m = 0;
    const mr = Math.pow(1 + r, 1 / 12) - 1;
    while (v < target && m < 12 * 80) { v = v * (1 + mr) + save; m++; }
    const years = m / 12;
    const reached = v >= target;
    const alt = (dSave) => { let x = now, k = 0; while (x < target && k < 12 * 80) { x = x * (1 + mr) + save + dSave; k++; } return k / 12; };
    const faster = alt(1000);
    $("#fi_out").innerHTML = `
      <div class="result">
        <div class="kv">
          <div><div class="k">המספר שלך (יעד התיק)</div><div class="v big">${fmt(target)} ₪</div></div>
          <div><div class="k">זמן משוער להגיע אליו</div><div class="v ${reached ? "good" : "bad"}">${reached ? `${years.toFixed(1)} שנים` : "יותר מ-80 שנה"}</div></div>
          <div><div class="k">התקדמות היום</div><div class="v">${pct(Math.min(1, now / target), 0)}</div></div>
          <div><div class="k">משיכה שנתית מותרת</div><div class="v">${fmt(exp)} ₪</div></div>
        </div>
        <div class="progress mt" aria-hidden="true"><div style="width:${Math.min(100, now / target * 100)}%"></div></div>
        <ul class="mt">
          ${reached ? `<li>💪 עוד 1,000 ₪ השקעה בחודש יקצרו את הדרך ל-<b>${faster.toFixed(1)} שנים</b> (חיסכון של ${(years - faster).toFixed(1)} שנים).</li>` : ""}
          <li>✂️ כל 1,000 ₪ פחות בהוצאה החודשית מקטינים את היעד ב-<b>${fmt(12000 / w)} ₪</b>.</li>
          <li>⚠️ בשנים שלפני היעד שקול להגדיל את החלק הסולידי — בגלל <b>סיכון הרצף</b>.</li>
        </ul>
        <p class="small muted">הערכה לימודית בלבד, לפני מסים ודמי ניהול, בהנחת תשואה קבועה — המציאות תנודתית יותר. לתכנון פרישה אישי פנה למתכנן פיננסי או ליועץ פנסיוני.</p>
      </div>`;
  });
};

// ===================== תעודות סיום שלב =====================
function levelComplete(lv) { return lv.lessons.every(x => x.id in State.data.done); }

Routes.certificate = function (lid) {
  const idx = window.CURRICULUM.findIndex(l => l.id === lid);
  const lv = window.CURRICULUM[idx];
  if (!lv) return go("path");
  if (!levelComplete(lv)) {
    const d = lv.lessons.filter(x => x.id in State.data.done).length;
    app().innerHTML = `<h1>🎓 תעודת סיום</h1><div class="card"><p>כדי לקבל את התעודה של <b>שלב ${idx + 1}: ${esc(lv.title)}</b> צריך להשלים את כל השיעורים בשלב.</p>
      <div class="progress"><div style="width:${d / lv.lessons.length * 100}%"></div></div><p class="mt">${d} מתוך ${lv.lessons.length} הושלמו.</p>
      <a class="btn" href="#lesson/${(lv.lessons.find(x => !(x.id in State.data.done)) || lv.lessons[0]).id}">להמשיך ללמוד ←</a></div>`;
    return;
  }
  const avg = Math.round(lv.lessons.reduce((s, x) => s + State.data.done[x.id], 0) / lv.lessons.length);
  const date = new Date().toLocaleDateString("he-IL");
  app().innerHTML = `
    <div class="row no-print"><h1 style="margin:0">🎓 תעודת סיום</h1><span class="spacer"></span>
      <div class="field"><label for="certName">השם שיופיע בתעודה</label><input id="certName" value="${esc(State.data.certName || "")}" placeholder="השם שלך" /></div>
      <button type="button" class="btn" onclick="window.print()" style="margin-top:22px">🖨️ הדפסה / שמירה כ-PDF</button></div>
    <section class="certificate mt" aria-label="תעודה">
      <div class="cert-inner">
        <div class="cert-logo" aria-hidden="true">📈</div>
        <div class="cert-org">אקדמיית המשקיע · מאפס ועד באפט</div>
        <h2 class="cert-title">תעודת סיום</h2>
        <p>מוענקת בזאת ל</p>
        <div class="cert-name" id="certShown">${esc(State.data.certName || "________________")}</div>
        <p>על השלמת</p>
        <div class="cert-level">${lv.icon} שלב ${idx + 1}: ${esc(lv.title)}</div>
        <p class="small">${lv.lessons.length} שיעורים · ציון ממוצע בבחנים: ${avg}%</p>
        <blockquote class="cert-quote">"ההשקעה הטובה ביותר שאתה יכול לעשות היא בעצמך." — וורן באפט</blockquote>
        <div class="cert-date">${date}</div>
      </div>
    </section>`;
  $("#certName").addEventListener("input", e => { State.data.certName = e.target.value; State.save(); $("#certShown").textContent = e.target.value || "________________"; });
};

// ===================== מושג היום ותרגיל (לדף הבית) =====================
function homeDaily() {
  const G = window.GLOSSARY;
  const day = Math.floor(Date.now() / 86400000);
  const g = G[day % G.length];
  const nextLab = LAB.find(x => !(State.data.lab || {})[x.id]);
  return `<div class="grid grid-2 mb">
    <section class="card daily" aria-labelledby="dTerm">
      <div class="small muted">📖 מושג היום</div>
      <h2 id="dTerm" style="font-size:1.3rem;margin:6px 0 2px;color:var(--gold)">${esc(g[0])} <span class="small muted" lang="en" dir="ltr">${esc(g[1])}</span></h2>
      <p>${esc(g[2])}</p>
      <a class="small" href="#glossary/cards">חזרה על כל המונחים בכרטיסיות ←</a>
    </section>
    <a class="card daily" href="#lab${nextLab ? "" : ""}">
      <div class="small muted">🧪 מעבדת תרגול</div>
      <h2 style="font-size:1.3rem;margin:6px 0 2px">${nextLab ? `התרגיל הבא: ${nextLab.title}` : "פתרת את כל התרגילים! 🏆"}</h2>
      <p class="muted">חישובים אמיתיים על דוחות של חברה — מהשוליים ועד שווי פנימי.</p>
      <span class="btn small">לתרגול ←</span>
    </a>
  </div>`;
}
