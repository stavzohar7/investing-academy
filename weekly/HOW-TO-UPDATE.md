# How the weekly report is produced

Every week a new report file is added to `weekly/` and listed in `weekly/manifest.js`.
The app (`weekly.js`) renders it at `#weekly`. All text shown to the user is in **Hebrew**.

## Steps

1. **Pick the date.** Use the Friday of the week being covered: `weekly/YYYY-MM-DD.js`.
   If that file already exists, stop — the week is done.
2. **Research (web search, prefer primary sources).**
   - Market overview: index moves for the week, inflation data, Fed/rates, 10-year yield, notable macro news.
   - **5 most interesting stocks of the week**: the biggest moves on real news (earnings, guidance,
     CEO changes, deals, regulation). Prefer a mix of sectors and of "story types" (hyped growth,
     quality compounder, cyclical, fallen brand, etc.). Skip anything whose data you cannot verify
     (e.g. a recent spin-off with distorted metrics).
   - **5 largest companies in the world by market cap** at the end of the week.
   - For each of the 10: price and market cap at the last close, the facts behind the move (from the
     company release / SEC filing / reputable press), and key metrics (stockanalysis.com
     `/stocks/<ticker>/statistics/` is a good single source: P/E, forward P/E, margins, FCF, ROIC, debt, cash, share change).
   - Never invent numbers. If sources conflict, use the company's own release, or say the figure is approximate.
3. **Valuation.** Write an input JSON (in a temp folder, not in the project) and run
   `node weekly/valuate.js <input.json>`. Use three growth scenarios (bear/base/bull), a discount rate that
   reflects current rates and risk (≈9% for mega-caps, 10% for cyclical/higher risk, 12% for speculative),
   terminal growth 2–3%. When capex is abnormal, use a *normalized* FCF and say so in the text.
   For loss-making companies use the exit-year model. Copy the outputs exactly into the report.
3b. **Technical data (separate from the fundamental analysis).** For each of the 10 tickers fetch
   `https://finviz.com/quote.ashx?t=<TICKER>` and read: last price, SMA20/SMA50/SMA200 (% distance of price from each),
   RSI(14), 52-week high and low, ATR(14), and Perf Week/Month/Quarter/Half/Year. Use the last *close* of the report's Friday.
   Sanity-check: if a figure looks inconsistent (e.g. RSI identical to the price, or a 52-week range that contradicts
   other facts) set it to `null`/omit it and say so in the text — never guess. Also gather the week's index context
   (S&P 500 / Nasdaq weekly move, breadth if available) from a reputable source.
4. **Write the report** by copying the structure of the newest existing report file exactly
   (fields: `id, title, asOf, market{temperature,tempLabel,summary,indicators}, insight{title,body,lessons},
   sections[ movers, giants ] with stocks[{ticker,name,he,sector,price,mcap,move,headline,news,business,
   metrics,bull,bear,valuation{method,scenarios,note},verdict{label,tone,text},future,swing,learn}],
   sources, dcf{TICKER:{fcf,g1,years,gT,r,cash,debt,shares,price}}`).
   - `verdict.text` is written "in the head of Buffett": moat, management, circle of competence, margin of
     safety, Mr. Market, temporary problem vs permanent damage — linked to the course concepts.
   - **Framing rules (mandatory):** describe price *relative to our estimated value range* and the conditions
     ("looks cheap relative to our assumptions — *if* the brand is durable"). Never write buy / sell / hold
     instructions, price targets presented as predictions, or advice tailored to a person. Scenarios are not forecasts.
   - `learn` must contain lesson ids that exist in the curriculum (`content*.js`), e.g. `l3-3`, `ls-4`, `la-4`.
   - **Fundamental and technical are separate.** The fundamental fields stay as above. Do NOT mix chart talk into
     `verdict.text`, `business`, `future`; the old `swing` field is no longer shown (omit it in new reports).
   - **Technical block:** at the end of the report file append
     `window.WEEKLY_REPORTS["<id>"].technical = { asOf, market:{stance,stanceLabel,summary}, stocks:{TICKER:{price,d20,d50,d200,rsi,atr,hi,lo,perfW,perfM,perfQ,perfH,perfY,read,watch[],combined,learn[]}}, limits[], sources[] }`
     — copy the structure of the newest report's `technical` block. `d20/d50/d200` are % distances (can be negative),
     `hi`/`lo` are the 52-week high/low prices. Stage, SMA levels, ATR %, stop and position size are computed by the app
     (`weekly-tech.js`) — do not write them by hand; in text use the tokens `{sma20}`, `{sma50}`, `{sma200}`.
     `read` = what the chart says (stage, extension, RSI, distance from high, relative strength, volatility);
     `watch` = 2-3 levels/conditions to observe; `combined` = one paragraph on how the technical picture relates to the
     fundamental verdict (agree / conflict) — educational, never a buy/sell instruction.
     `market.summary` must describe the index technical context honestly and state what you could not verify.
     `learn` ids must exist (use technical lessons `l4-*`, `la-*` and the bridge lesson `l7-9`).
   - Write `method` strings starting with Hebrew (e.g. `מודל DCF — ...`) so right-to-left text renders correctly.
   - Use template literals for text; avoid backticks inside the text; write ארה״ב with the ״ character.
5. **Register it**: add the new date at the **top** of `window.WEEKLY_MANIFEST` in `weekly/manifest.js`.
6. **Measure and learn — update `weekly/scorecard.js`** (do this every week, it is how the app learns):
   - **Mark**: get the latest closing price (same day as the new report's prices) of *every* ticker already in
     `analyses` plus SPY, and append `{ date: "<new report date>", spy: <SPY close>, prices: { TICKER: price, ... } }`
     to `marks`. Verify each price; if one can't be verified, omit that ticker rather than guess.
   - **Register the new analyses**: append the 10 new stocks to `analyses` (`date, ticker, price, base, tone`
     — copied from the new report) and add `benchmarkAt["<new date>"] = <SPY close>`.
   - **Write a letter**: append to `letters` a new `{ date, title, body }` in Hebrew, in the spirit of Buffett's
     shareholder letters. It must honestly cover: how past analyses did vs SPY (remind readers that short periods
     are noise); which earlier assumptions or verdicts now look wrong or right **and why** (new facts, not price
     moves alone); any mistake in method or data and how the process is changed to avoid it; and 2–4 durable
     lessons about investing from this week's events, linked to course concepts. Be candid — admitting errors
     is the point. If a verdict should change because facts changed, say so here (do not edit old reports).
7. **Validate**: `node --check` on every changed file, then load all `content*.js`, the new report and
   `weekly/scorecard.js` in Node with `global.window = global` and confirm: 10 stocks (5 + 5), every
   `learn`/`insight.lessons` id exists, every stock has bear ≤ base ≤ bull, `dcf` presets exist for the
   DCF-modelled tickers, the scorecard has a `benchmarkAt` entry for every analysis date, the new mark exists, and the
   `technical` block has an entry (with all required numeric fields) for each of the 10 tickers.
8. Only these files may change: the new `weekly/YYYY-MM-DD.js`, `weekly/manifest.js`, `weekly/scorecard.js`.
   Do not modify any other project files.
9. **Publish**: the site is live on GitHub Pages (https://stavzohar7.github.io/investing-academy/), served from the
   `main` branch of this git repository. After validation passes, run from the project folder:
   `git add weekly/ && git commit -m "Weekly report <date>" && git push`
   If the push fails (e.g. not signed in), do not retry in a loop — report it in the summary.
