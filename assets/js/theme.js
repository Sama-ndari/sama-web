function initTheme() {
  var themeBtn = document.getElementById("themeToggle");
  if (!themeBtn) return;

  var saved = getTheme();
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);

  themeBtn.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  var btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.innerHTML =
    theme === "dark"
      ? '<i class="bi bi-sun-fill" aria-hidden="true"></i>'
      : '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
}

function initLangToggle(onLangChange) {
  var btn = document.getElementById("langToggle");
  if (!btn) return;
  btn.textContent = getLang().toUpperCase();

  btn.addEventListener("click", function () {
    var next = getLang() === "en" ? "fr" : "en";
    setLang(next);
    btn.textContent = next.toUpperCase();
    document.documentElement.lang = next;
    if (typeof onLangChange === "function") onLangChange();
  });
}

function applyCommonI18n() {
  var storeEl = document.getElementById("storeName");
  if (storeEl) storeEl.textContent = t("store_name");

  var footerRights = document.getElementById("footerRights");
  var footerBuilt = document.getElementById("footerBuilt");
  if (footerRights)
    footerRights.textContent =
      "\u00a9 " + new Date().getFullYear() + " " + t("store_name") + ". " + t("footer_rights");
  if (footerBuilt) footerBuilt.textContent = t("footer_built");
}

function initLangFromUrl() {
  var q = new URLSearchParams(window.location.search).get("lang");
  if (q === "en" || q === "fr") {
    setLang(q);
    document.documentElement.lang = q;
    var btn = document.getElementById("langToggle");
    if (btn) btn.textContent = q.toUpperCase();
  }
}
