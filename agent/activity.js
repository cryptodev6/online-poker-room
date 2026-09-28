/* Fuente y vista desacopladas: el futuro backend solo sustituye la fuente. */
const CRYPTO_ICON = Object.freeze({
  BTC: "/assets/crypto-icons.svg#BTC",
  ETH: "/assets/crypto-icons.svg#ETH",
  SOL: "/assets/crypto-icons.svg#SOL",
  USDT: "/assets/crypto-icons.svg#USDT",
  LTC: "/assets/crypto-icons.svg#LTC"
});
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

class JsonDemoBetSource {
  constructor(url) { this.url = url; this.records = []; this.cursor = 0; }
  async load() {
    const response = await fetch(this.url, { cache: "no-store" });
    if (!response.ok) throw new Error("Demo data unavailable");
    const records = await response.json();
    if (!Array.isArray(records) || !records.length || records.some((bet) =>
      !bet.id || !bet.player || !CRYPTO_ICON[bet.asset] ||
      !Number.isFinite(bet.wager_usd) || !Number.isFinite(bet.payout_usd) ||
      !Number.isFinite(bet.multiplier))) throw new Error("Invalid demo data");
    this.records = records;
    return records;
  }
  next() {
    const record = this.records[this.cursor % this.records.length];
    this.cursor += 1;
    return record;
  }
}

function coin(asset) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("crypto-icon", `crypto-icon--${asset}`);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", asset);
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", CRYPTO_ICON[asset]);
  svg.append(use);
  return svg;
}

function cell(row, className) {
  const td = document.createElement("td");
  if (className) td.className = className;
  row.append(td);
  return td;
}

function amount(target, bet, value, extraClass = "") {
  const span = document.createElement("span");
  span.className = `amount ${extraClass}`;
  span.append(coin(bet.asset), document.createTextNode(usd.format(value)));
  target.append(span);
}

function renderBet(bet) {
  const row = document.createElement("tr");
  const player = cell(row, "player-cell");
  const avatar = document.createElement("span");
  avatar.className = "player-avatar";
  avatar.setAttribute("aria-hidden", "true");
  avatar.textContent = bet.player.slice(0, 1).toUpperCase();
  player.append(avatar, document.createTextNode(bet.player));

  const payout = cell(row);
  if (bet.payout_usd > 0) amount(payout, bet, bet.payout_usd, "amount--payout");
  else {
    const dash = document.createElement("span");
    dash.className = "amount--loss";
    dash.textContent = "—";
    payout.append(dash);
  }
  cell(row, "multiplier").textContent = bet.multiplier ? `${bet.multiplier.toFixed(2)}×` : "—";
  amount(cell(row), bet, bet.wager_usd);
  cell(row, "bet-id").textContent = bet.id;
  return row;
}

class ActivityFeed {
  constructor(root, source) {
    this.rows = root.querySelector("#activity-rows");
    this.source = source;
    this.timer = null;
    this.maxRows = 8;
    this.handleVisibility = () => document.hidden ? this.pause() : this.schedule();
  }
  async start() {
    try {
      await this.source.load();
      this.rows.replaceChildren();
      for (let i = 0; i < this.maxRows; i += 1) this.rows.append(renderBet(this.source.next()));
      document.addEventListener("visibilitychange", this.handleVisibility);
      window.addEventListener("pagehide", () => this.stop(), { once: true });
      this.schedule();
    } catch {
      this.rows.replaceChildren();
      const row = document.createElement("tr");
      const message = document.createElement("td");
      message.colSpan = 5;
      message.className = "activity-loading";
      message.textContent = "No se pudo cargar la actividad de muestra.";
      row.append(message);
      this.rows.append(row);
    }
  }
  schedule() {
    if (this.timer || document.hidden) return;
    const delay = 3000 + (this.source.cursor % 5) * 650;
    this.timer = window.setTimeout(() => {
      this.timer = null;
      const row = renderBet(this.source.next());
      row.classList.add("is-new");
      this.rows.prepend(row);
      while (this.rows.children.length > this.maxRows) this.rows.lastElementChild.remove();
      this.schedule();
    }, delay);
  }
  pause() { window.clearTimeout(this.timer); this.timer = null; }
  stop() { this.pause(); document.removeEventListener("visibilitychange", this.handleVisibility); }
}

const root = document.querySelector("[data-activity-feed]");
if (root) new ActivityFeed(root, new JsonDemoBetSource(root.dataset.source)).start();
