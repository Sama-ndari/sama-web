function initTheme() {
  var themeBtn = document.getElementById("themeToggle");
  if (!themeBtn) return;

  var saved = getTheme();
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeIcon(saved);

  themeBtn.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    applyTheme(next, themeBtn);
  });
}

function applyTheme(next, sourceBtn) {
  var apply = function () {
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    updateThemeIcon(next);
  };

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduceMotion || !sourceBtn) {
    apply();
    return;
  }

  var rect = sourceBtn.getBoundingClientRect();
  var x = rect.left + rect.width / 2;
  var y = rect.top + rect.height / 2;
  var radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  var transition = document.startViewTransition(apply);
  transition.ready.then(function () {
    document.documentElement.animate(
      {
        clipPath: [
          "circle(0px at " + x + "px " + y + "px)",
          "circle(" + radius + "px at " + x + "px " + y + "px)"
        ]
      },
      {
        duration: 550,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)"
      }
    );
  }).catch(function () {});
}

function updateThemeIcon(theme) {
  var btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.innerHTML =
    theme === "dark"
      ? '<i class="bi bi-sun-fill" aria-hidden="true"></i>'
      : '<i class="bi bi-moon-fill" aria-hidden="true"></i>';
  btn.setAttribute("aria-label", theme === "dark" ? t("theme_light") : t("theme_dark"));
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
