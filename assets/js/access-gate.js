/**
 * Site availability gate — fetches sama_killswitch.json (≤1s).
 * Checks sites.<key>.enabled only (optional top-level enabled still honored).
 * Fail-open on timeout/error/missing data.
 */
(function () {
  "use strict";

  const SITE_KEY = "web";
  const GIST_URL =
    "https://gist.githubusercontent.com/Sama-ndari/f8862a3c7b0415485dd35b6d8efd31e2/raw/sama_killswitch.json";
  const TIMEOUT_MS = 1000;
  const LANG_KEY = "webshow-lang";
  const THEME_KEY = "webshow-theme";
  const SCRIPT_EL = document.currentScript;

  const COPY = {
    en: {
      title: "Back shortly",
      body: "Sama Web is taking a short break. The selected sites will return soon.",
      brand: "Sama Web",
      label: "Availability"
    },
    fr: {
      title: "De retour bientôt",
      body: "Sama Web fait une courte pause. Les sites sélectionnés reviendront bientôt.",
      brand: "Sama Web",
      label: "Disponibilité"
    }
  };

  const GATE_CSS =
    "#sama-access-gate{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;" +
    "padding:24px;font-family:Manrope,system-ui,sans-serif;background:#f6f3ed;color:#181714}" +
    "#sama-access-gate[data-theme=dark]{background:#12100e;color:#f4efe6}" +
    "#sama-access-gate .gate-card{position:relative;max-width:460px;width:100%;padding:36px 30px;" +
    "border-radius:22px;border:1px solid rgba(24,23,20,.12);background:rgba(255,255,255,.68);" +
    "backdrop-filter:blur(12px);text-align:left;box-shadow:0 24px 60px rgba(51,42,31,.1);" +
    "overflow:hidden}" +
    "#sama-access-gate[data-theme=dark] .gate-card{border-color:rgba(244,239,230,.1);" +
    "background:rgba(28,25,22,.78);box-shadow:0 28px 70px rgba(0,0,0,.42)}" +
    "#sama-access-gate .gate-mark{position:absolute;right:-0.05em;top:42%;z-index:0;" +
    "font-family:Syne,system-ui,sans-serif;font-size:9rem;font-weight:800;line-height:.7;" +
    "color:transparent;-webkit-text-stroke:1px rgba(24,23,20,.08);pointer-events:none}" +
    "#sama-access-gate[data-theme=dark] .gate-mark{-webkit-text-stroke:1px rgba(244,239,230,.08)}" +
    "#sama-access-gate .gate-inner{position:relative;z-index:1}" +
    "#sama-access-gate .gate-logo{display:inline-flex;align-items:center;gap:10px;margin-bottom:18px}" +
    "#sama-access-gate img{width:34px;height:34px;border-radius:50%;object-fit:cover;" +
    "background:transparent;flex-shrink:0}" +
    "#sama-access-gate .gate-brand{font-family:Syne,system-ui,sans-serif;font-size:1.05rem;" +
    "font-weight:700;margin:0}" +
    "#sama-access-gate .gate-label{display:block;margin-bottom:10px;color:#d86718;font-size:.72rem;" +
    "font-weight:800;letter-spacing:.16em;text-transform:uppercase}" +
    "#sama-access-gate[data-theme=dark] .gate-label{color:#e4a15f}" +
    "#sama-access-gate h1{font-family:Syne,system-ui,sans-serif;font-size:clamp(1.6rem,4vw,2rem);" +
    "font-weight:800;margin:0 0 12px;line-height:1.15}" +
    "#sama-access-gate p{margin:0;font-size:1rem;line-height:1.6;color:#5f5b53}" +
    "#sama-access-gate[data-theme=dark] p{color:#bdb3a6}";

  const html = document.documentElement;
  html.classList.add("sama-gate-checking");

  function resolveAsset(relFromJsDir) {
    try {
      if (SCRIPT_EL && SCRIPT_EL.src) {
        return new URL(relFromJsDir, SCRIPT_EL.src).href;
      }
    } catch (error) {
      /* keep relative fallback */
    }
    return relFromJsDir;
  }

  function ensureFavicon() {
    const href = resolveAsset("../img/favicon.ico");
    const head = document.head || document.documentElement;
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "icon");
      link.setAttribute("sizes", "any");
      head.appendChild(link);
    }
    link.setAttribute("href", href);
    const apple = document.querySelector('link[rel="apple-touch-icon"]');
    if (apple) apple.setAttribute("href", resolveAsset("../img/logo.webp"));
  }

  ensureFavicon();

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function resolveLang() {
    return readStorage(LANG_KEY) === "fr" ? "fr" : "en";
  }

  function isSiteAllowed(data) {
    if (!data || typeof data !== "object") return true;
    if (data.enabled === false) return false;
    const site = data.sites && data.sites[SITE_KEY];
    if (site && site.enabled === false) return false;
    return true;
  }

  function allowAccess() {
    html.classList.remove("sama-gate-checking", "sama-gate-blocked");
  }

  function buildOfflineMarkup(copy) {
    const logoSrc = resolveAsset("../img/logo.webp");
    return (
      "<style>" +
      GATE_CSS +
      "</style>" +
      '<div class="gate-card">' +
      '<span class="gate-mark" aria-hidden="true">SW</span>' +
      '<div class="gate-inner">' +
      '<div class="gate-logo">' +
      '<img class="gate-logo-img" src="' +
      logoSrc +
      '" width="34" height="34" alt="">' +
      '<p class="gate-brand">' +
      copy.brand +
      "</p></div>" +
      '<span class="gate-label">' +
      copy.label +
      "</span>" +
      '<h1 id="sama-gate-title">' +
      copy.title +
      "</h1>" +
      "<p>" +
      copy.body +
      "</p></div></div>"
    );
  }

  function attachGate(root) {
    if (document.getElementById("sama-access-gate")) return;
    document.body.appendChild(root);
    document.body.style.overflow = "hidden";
    const img = root.querySelector(".gate-logo-img");
    if (img) {
      img.addEventListener("error", function onLogoError() {
        img.removeEventListener("error", onLogoError);
        img.src = resolveAsset("../img/favicon.ico");
      });
    }
  }

  function mountOfflineUi() {
    html.classList.remove("sama-gate-checking");
    html.classList.add("sama-gate-blocked");
    const copy = COPY[resolveLang()] || COPY.en;
    const theme = readStorage(THEME_KEY) === "dark" ? "dark" : "light";
    const root = document.createElement("div");
    root.id = "sama-access-gate";
    root.setAttribute("role", "alertdialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-labelledby", "sama-gate-title");
    root.setAttribute("data-theme", theme);
    root.innerHTML = buildOfflineMarkup(copy);
    if (document.body) attachGate(root);
    else document.addEventListener("DOMContentLoaded", function () {
      attachGate(root);
    });
  }

  function fetchAccessConfig() {
    const controller = new AbortController();
    const timer = setTimeout(function () {
      controller.abort();
    }, TIMEOUT_MS);
    return fetch(GIST_URL + "?t=" + Date.now(), {
      signal: controller.signal,
      cache: "no-store"
    })
      .then(function (response) {
        clearTimeout(timer);
        if (!response.ok) throw new Error("access-gate http " + response.status);
        return response.json();
      })
      .catch(function () {
        clearTimeout(timer);
        return null;
      });
  }

  fetchAccessConfig().then(function (data) {
    if (isSiteAllowed(data)) allowAccess();
    else mountOfflineUi();
  });
})();
