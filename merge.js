// ===================================================================
//  איחוד שיעורים קרובים בנושאם: פחות שיעורים, יותר רצף.
//  השיעור הנבלע נשאר בקבצי התוכן, ומחוּבר בזמן הטעינה אל שיעור היעד.
//  קישורים ישנים (#lesson/<מזהה ישן>) מנותבים אוטומטית אל השיעור המאוחד.
// ===================================================================
window.LESSON_ALIAS = {};
window.resolveLessonId = id => window.LESSON_ALIAS[id] || id;

(function () {
  // [שיעור יעד, שיעור נבלע, כותרת חדשה]
  const MERGES = [
    ["l1-3", "l1-12", "איך עובדת הבורסה: מדדים, ברוקרים, פקודות — ומה קורה כשלוחצים \"קנה\""],
    ["l1-7", "l1-8", "לפני שקונים מניה ראשונה: סדר עדיפויות פיננסי, ואיפה משקיעים בפועל בישראל"],
    ["l1-11", "l1-9", "המלכודות של משקיע מתחיל: 10 טעויות נפוצות והונאות השקעה"],
    ["l2-6", "l2-7", "דגלים אדומים חשבונאיים ובדיקות בריאות כמותיות"],
    ["l2-3", "l2-8", "דוח תזרים מזומנים, Free Cash Flow ותגמול הוני (SBC)"],
    ["l3-5", "l3-9", "שווי פנימי ו-DCF — וגם DCF הפוך"],
    ["l3-3", "l3-7", "חפיר כלכלי ואסטרטגיה תחרותית (פורטר והלמר)"],
    ["l4-2", "l4-8", "תמיכה, התנגדות ונפח מסחר — כולל נפח מתקדם"],
    ["l5-4", "l5-5", "פיזור, מינוף והגנה מהרס — כולל פיזור גלובלי"],
    ["lp-1", "lp-6", "תוכנית השקעה כתובה (IPS) והפקדות: סכום חד-פעמי או חודשי"],
    ["l6-4", "l6-6", "דיאטת מידע: חדשות, רעש ומשפיענים — ואיך קוראים יום בחדשות"],
    ["lm-1", "lm-5", "ריבית, בנקים מרכזיים ואינפלציה — ואיך משקיעים כשהן עולות"],
    ["lm-3", "lm-4", "בועות וקריסות, והמטוטלת של הווארד מרקס"],
    ["lg-1", "lg-2", "גרינבלט, קלרמן ופבראי: ערך, מצבים מיוחדים ו\"אל תפסיד\""],
    ["lc-2", "lc-3", "נטפליקס מול בלוקבסטר, קודאק ונוקיה: מיצוב נגדי וחפיר שמתאדה"],
    ["l7-3", "l7-9", "תהליך ניתוח מניה מלא — כולל שילוב פונדמנטלי וטכני"]
  ];
  const C = window.CURRICULUM;
  const locate = id => { for (const lv of C) { const i = lv.lessons.findIndex(x => x.id === id); if (i >= 0) return { lv, i }; } return null; };
  MERGES.forEach(([tid, aid, title]) => {
    const t = locate(tid), a = locate(aid);
    if (!t || !a) return;
    const T = t.lv.lessons[t.i], A = a.lv.lessons[a.i];
    T.title = title;
    T.minutes = (T.minutes || 0) + (A.minutes || 0);
    T.body = T.body + `\n<hr>\n<h3>חלק ב׳ — ${A.title}</h3>\n` + A.body;
    T.takeaways = T.takeaways.slice(0, 4).concat(A.takeaways.slice(0, 4));
    T.quiz = T.quiz.slice(0, 3).concat(A.quiz.slice(0, 2));
    a.lv.lessons.splice(a.lv.lessons.findIndex(x => x.id === aid), 1);
    window.LESSON_ALIAS[aid] = tid;
  });

  // העברת התקדמות מקומית: מפתחות של שיעורים שנבלעו נמחקים; שיעור יעד שהושלם נשאר מושלם.
  window.migrateMerged = function () {
    const d = window.State && State.data; if (!d) return;
    let ch = false;
    Object.keys(window.LESSON_ALIAS).forEach(old => { if (old in d.done) { delete d.done[old]; ch = true; } });
    if (ch) State.save();
  };
})();
