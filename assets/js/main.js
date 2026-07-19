document.addEventListener("DOMContentLoaded", function () {
  initLangFromUrl();
  document.documentElement.lang = getLang();
  initTheme();
  initLangToggle(renderPage);
  initScrollReveals();
  initCardSpotlight();
  renderPage();
});

var revealObserver = null;
var workRevealed = false;

function initScrollReveals() {
  if (!("IntersectionObserver" in window)) return;
  revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      if (entry.target.classList.contains("project-card")) workRevealed = true;
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: "4000px 0px -40px 0px" });

  [".section-heading", ".contact__inner"].forEach(function (selector) {
    var element = document.querySelector(selector);
    if (!element) return;
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}

function decorateCards() {
  var cards = document.querySelectorAll("#projectGrid .project-card");
  Array.prototype.forEach.call(cards, function (card, index) {
    card.classList.add("reveal");
    card.style.setProperty("--reveal-delay", index * 110 + "ms");
    if (workRevealed || !revealObserver) card.classList.add("is-visible");
    else revealObserver.observe(card);
  });
}

function initCardSpotlight() {
  var grid = document.getElementById("projectGrid");
  if (!grid || !window.matchMedia("(hover: hover)").matches) return;
  grid.addEventListener("mousemove", function (event) {
    var card = event.target.closest(".project-card");
    if (!card) return;
    var rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", event.clientX - rect.left + "px");
    card.style.setProperty("--my", event.clientY - rect.top + "px");
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function setText(id, value) {
  var element = document.getElementById(id);
  if (element) element.textContent = value;
}

function setControlLabels() {
  var nav = document.getElementById("settingsNav");
  var lang = document.getElementById("langToggle");
  var theme = document.getElementById("themeToggle");

  if (nav) nav.setAttribute("aria-label", t("settings_nav"));
  if (lang) lang.setAttribute("aria-label", t("language_toggle"));
  if (theme) updateThemeIcon(document.documentElement.getAttribute("data-theme"));
}

function animatedLetters(text, accent) {
  var letterIndex = 0;
  return text.split(/(\s+)/)
    .map(function (part) {
      if (!part.trim()) return part;
      var letters = Array.from(part).map(function (character) {
        var accentClass = accent ? " hero-letter--accent" : "";
        var html = '<span class="hero-letter hero-letter--float' + accentClass + '" style="--letter-index:' +
          letterIndex + '">' + escapeHtml(character) + "</span>";
        letterIndex += 1;
        return html;
      }).join("");
      return '<span class="hero-word">' + letters + "</span>";
    })
    .join("");
}

function renderHeroTitle() {
  var title = document.getElementById("heroTitle");
  if (!title) return;
  var accessibleTitle = t("hero_title_line1") + " " + t("hero_title_line2") + t("hero_title_accent");
  title.innerHTML =
    '<span class="visually-hidden">' + escapeHtml(accessibleTitle) + '</span>' +
    '<span aria-hidden="true" class="hero__title-line">' + animatedLetters(t("hero_title_line1"), false) + '</span>' +
    '<span aria-hidden="true" class="hero__title-line">' +
    animatedLetters(t("hero_title_line2"), false) +
    animatedLetters(t("hero_title_accent"), true) +
    "</span>";
}

function renderProjectCard(app, index) {
  var stack = app.stack
    .map(function (item) {
      return "<li>" + escapeHtml(item) + "</li>";
    })
    .join("");

  return (
    '<a class="project-card project-card--' + escapeHtml(app.id) + '" href="' + escapeHtml(app.siteUrl) +
    '" target="_blank" rel="noopener noreferrer">' +
    '<div class="project-card__visual"><div class="project-card__top"><span class="project-card__number">' +
    String(index + 1).padStart(2, "0") +
    '</span><span class="project-card__category">' + escapeHtml(tApp(app, "category")) + "</span></div>" +
    '<div class="project-card__logo"><img src="' + escapeHtml(app.icon) +
    '" alt="" width="96" height="96" loading="lazy" decoding="async" /></div>' +
    '<span class="project-card__orb project-card__orb--one" aria-hidden="true"></span>' +
    '<span class="project-card__orb project-card__orb--two" aria-hidden="true"></span></div>' +
    '<div class="project-card__body"><h3>' + escapeHtml(app.name) + "</h3><p>" +
    escapeHtml(tApp(app, "tagline")) + "</p></div>" +
    '<div class="project-card__footer"><ul aria-label="' + escapeHtml(t("technologies")) + '">' + stack +
    '</ul><span class="project-card__action">' + escapeHtml(t("visit_site")) +
    ' <i class="bi bi-arrow-up-right" aria-hidden="true"></i></span>' +
    '<span class="visually-hidden">, ' + escapeHtml(t("opens_new_tab")) + "</span></div></a>"
  );
}

function renderProjects() {
  var grid = document.getElementById("projectGrid");
  if (!grid) return;
  grid.innerHTML = APPS.map(renderProjectCard).join("");
  decorateCards();
}

function renderPage() {
  applyCommonI18n();
  document.title = t("meta_title");
  var metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", t("meta_description"));
  setText("skipLink", t("skip_link"));
  setText("workLink", t("work_link"));
  setText("heroLabel", t("hero_label"));
  setText("heroSubtitle", t("hero_subtitle"));
  setText("exploreLabel", t("explore"));
  setText("workLabel", t("work_label"));
  setText("workTitle", t("work_title"));
  setText("workIntro", t("work_intro"));
  setText("contactLabel", t("contact_label"));
  setText("contactTitle", t("contact_title"));
  setText("contactLinkLabel", t("contact_link"));
  setControlLabels();
  renderHeroTitle();
  renderProjects();
}
