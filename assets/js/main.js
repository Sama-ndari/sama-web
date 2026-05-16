var _lightboxKeyHandler = null;

document.addEventListener("DOMContentLoaded", function () {
  initLangFromUrl();
  initTheme();
  initLangToggle(renderPage);

  if (typeof APPS !== "undefined") {
    renderPage();
  }
});

function renderPage() {
  if (document.getElementById("appDetail")) {
    renderDetailPage();
  } else {
    renderHomePage();
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function heroTitleAccessibleString() {
  return (
    t("hero_title_line1") +
    " " +
    t("hero_title_line2_prefix") +
    t("hero_title_accent") +
    "."
  );
}

var heroDanceIndex = 0;

var HERO_SWING_CHARS = { p: true };

var HERO_FLIP_PAIRS = { b: "d", d: "b", g: "q", q: "g" };

function isHeroSwingChar(ch) {
  return Boolean(HERO_SWING_CHARS[ch.toLowerCase()]);
}

function isHeroFlipChar(ch) {
  return Boolean(HERO_FLIP_PAIRS[ch.toLowerCase()]);
}

function heroFlipPair(ch) {
  var pair = HERO_FLIP_PAIRS[ch.toLowerCase()];
  if (ch !== ch.toLowerCase()) return pair.toUpperCase();
  return pair;
}

function heroCharClassList(ch, accentChars) {
  var classes = ["hero__char"];
  if (accentChars) classes.push("hero__char--accent");
  if (isHeroFlipChar(ch)) classes.push("hero__char--flip");
  else if (isHeroSwingChar(ch)) classes.push("hero__char--swing");
  return classes.join(" ");
}

function wrapHeroFlipCharHtml(ch, accentChars, index) {
  var pair = heroFlipPair(ch);
  return (
    '<span class="' +
    heroCharClassList(ch, accentChars) +
    '" style="--i:' +
    index +
    '"><span class="hero__char-flip">' +
    '<span class="hero__char-flip__face hero__char-flip__face--front">' +
    escapeHtml(ch) +
    "</span>" +
    '<span class="hero__char-flip__face hero__char-flip__face--back">' +
    escapeHtml(pair) +
    "</span></span></span>"
  );
}

function wrapHeroDancingChars(text, accentChars) {
  var html = "";
  for (var k = 0; k < text.length; k++) {
    var ch = text[k];
    if (ch === " ") {
      html += " ";
      continue;
    }
    var index = heroDanceIndex;
    heroDanceIndex += 1;
    if (isHeroFlipChar(ch)) {
      html += wrapHeroFlipCharHtml(ch, accentChars, index);
      continue;
    }
    html +=
      '<span class="' +
      heroCharClassList(ch, accentChars) +
      '" style="--i:' +
      index +
      '">' +
      escapeHtml(ch) +
      "</span>";
  }
  return html;
}

function buildHeroTitleHtml() {
  heroDanceIndex = 0;
  var sr = heroTitleAccessibleString();
  var line1 = t("hero_title_line1");
  var prefix = t("hero_title_line2_prefix");
  var accent = t("hero_title_accent");
  return (
    '<span class="visually-hidden">' +
    escapeHtml(sr) +
    '</span><span class="hero__dance" aria-hidden="true"><span class="hero__line">' +
    wrapHeroDancingChars(line1, false) +
    '</span><br /><span class="hero__line">' +
    wrapHeroDancingChars(prefix, false) +
    wrapHeroDancingChars(accent, true) +
    wrapHeroDancingChars(".", false) +
    "</span></span>"
  );
}

function priceLabel(app) {
  return app.price === "free" ? t("free") : t("paid");
}

function priceBadgeClass(app) {
  return app.price === "free" ? "badge--free" : "badge--paid";
}

function categoryLabel(cat) {
  var map = { Community: "community", Privacy: "privacy" };
  return t(map[cat] || cat.toLowerCase());
}

function fetchLiveVersion(_appId, _callback) {}

function fetchUserStats(callback) {
  if (typeof GIST_SOURCES === "undefined" || !GIST_SOURCES.length) return;

  if (callback) callback({});
}

function renderStatsBanner(_counts) {}

function userBadgeHtml() {
  return "";
}

function statusBadgeHtml(app) {
  if (app.status === "dev") {
    return (
      '<span class="badge badge--dev"><i class="bi bi-lock-fill" aria-hidden="true"></i> ' +
      t("in_development") +
      "</span>"
    );
  }
  if (app.status === "sold" || app.status === "live") {
    return (
      '<span class="badge badge--sold"><i class="bi bi-broadcast-pin" aria-hidden="true"></i> ' +
      t("deployed") +
      "</span>"
    );
  }
  return "";
}

function appIconHtml(app, prefix) {
  var alt = app.name.replace(/"/g, "&quot;");
  var dim = prefix === "app-hero" ? "96" : "72";
  if (app.status === "dev") {
    return (
      '<div class="' +
      prefix +
      '__icon-wrap ' +
      prefix +
      '__icon-wrap--dev"><img class="' +
      prefix +
      '__icon" src="' +
      app.icon +
      '" alt="' +
      alt +
      '" width="' +
      dim +
      '" height="' +
      dim +
      '" decoding="async" /><i class="bi bi-lock-fill ' +
      prefix +
      '__lock" aria-hidden="true"></i></div>'
    );
  }
  return (
    '<img class="' +
    prefix +
    '__icon" src="' +
    app.icon +
    '" alt="' +
    alt +
    '" width="' +
    dim +
    '" height="' +
    dim +
    '" decoding="async" />'
  );
}

function renderHomePage() {
  applyCommonI18n();

  var heroLabel = document.getElementById("heroLabel");
  var heroTitle = document.getElementById("heroTitle");
  var heroSubtitle = document.getElementById("heroSubtitle");
  var catalogHeading = document.getElementById("catalogHeading");
  var searchInput = document.getElementById("searchInput");
  var searchInputMobile = document.getElementById("searchInputMobile");
  var filtersEl = document.getElementById("filters");
  var grid = document.getElementById("appGrid");
  var emptyState = document.getElementById("emptyState");

  if (heroLabel) heroLabel.textContent = t("hero_label");
  if (heroTitle) heroTitle.innerHTML = buildHeroTitleHtml();
  if (heroSubtitle) heroSubtitle.textContent = t("hero_subtitle");
  if (catalogHeading) catalogHeading.textContent = t("catalog_heading");
  if (searchInput) {
    searchInput.placeholder = t("search_placeholder");
    searchInput.setAttribute("aria-label", t("search_placeholder"));
  }
  if (searchInputMobile) {
    searchInputMobile.placeholder = t("search_placeholder");
    searchInputMobile.setAttribute("aria-label", t("search_placeholder"));
  }
  if (emptyState) emptyState.textContent = t("no_projects");

  var categories = ["all", "Community", "Privacy"];
  var catLabels = {
    all: t("all"),
    Community: t("community"),
    Privacy: t("privacy")
  };

  if (filtersEl) {
    filtersEl.innerHTML = categories
      .map(function (c, i) {
        var cls = i === 0 ? "filter-btn active" : "filter-btn";
        return '<button type="button" class="' + cls + '" data-filter="' + c + '">' + catLabels[c] + "</button>";
      })
      .join("");
  }

  var activeFilter = "all";

  function getSearchQuery() {
    if (searchInput && searchInput.value.trim()) return searchInput.value.toLowerCase().trim();
    if (searchInputMobile && searchInputMobile.value.trim()) return searchInputMobile.value.toLowerCase().trim();
    return "";
  }

  function renderCards() {
    var query = getSearchQuery();
    var filtered = APPS.filter(function (app) {
      var matchFilter = activeFilter === "all" || app.category === activeFilter;
      var name = app.name.toLowerCase();
      var tagline = tApp(app, "tagline").toLowerCase();
      var desc = tApp(app, "shortDesc").toLowerCase();
      var matchQuery =
        !query ||
        name.indexOf(query) !== -1 ||
        tagline.indexOf(query) !== -1 ||
        desc.indexOf(query) !== -1;
      return matchFilter && matchQuery;
    });

    if (grid) {
      grid.innerHTML = filtered
        .map(function (app) {
          var statusBadge = statusBadgeHtml(app);
          var iconHtml = appIconHtml(app, "app-card");
          return (
            '<a href="app.html?id=' +
            app.id +
            '" class="app-card">' +
            iconHtml +
            '<div class="app-card__body">' +
            '<h2 class="app-card__name">' +
            app.name +
            "</h2>" +
            '<p class="app-card__tagline">' +
            tApp(app, "tagline") +
            "</p>" +
            '<p class="app-card__desc">' +
            tApp(app, "shortDesc") +
            "</p>" +
            '<div class="app-card__meta">' +
            '<span class="badge badge--category">' +
            categoryLabel(app.category) +
            "</span>" +
            '<span class="badge ' +
            priceBadgeClass(app) +
            '">' +
            priceLabel(app) +
            "</span>" +
            statusBadge +
            "</div>" +
            "</div>" +
            "</a>"
          );
        })
        .join("");
    }

    if (emptyState) emptyState.hidden = filtered.length > 0;
  }

  if (filtersEl) {
    filtersEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filtersEl.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      renderCards();
    });
  }

  var timer;
  function onSearchInput() {
    clearTimeout(timer);
    timer = setTimeout(renderCards, 200);
  }

  if (searchInput) searchInput.addEventListener("input", onSearchInput);
  if (searchInputMobile) searchInputMobile.addEventListener("input", onSearchInput);

  renderCards();
}

function normalizeVideos(app) {
  if (app.videos && app.videos.length > 0) return app.videos;
  if (app.videoUrl) {
    return [{ url: app.videoUrl, title: app.videoTitle || "", title_fr: app.videoTitle_fr || "" }];
  }
  return [];
}

function renderDetailPage() {
  applyCommonI18n();

  var backLink = document.getElementById("backLink");
  if (backLink) {
    var span = backLink.querySelector("span");
    if (span) span.textContent = t("back");
  }

  var params = new URLSearchParams(window.location.search);
  var appId = params.get("id");
  var app = null;

  for (var i = 0; i < APPS.length; i++) {
    if (APPS[i].id === appId) {
      app = APPS[i];
      break;
    }
  }

  var detail = document.getElementById("appDetail");

  if (!app) {
    if (detail) {
      detail.innerHTML =
        '<div class="container" style="text-align:center;padding:80px 0;">' +
        "<h2>" +
        t("app_not_found") +
        "</h2>" +
        '<p style="color:var(--text-muted);margin:12px 0 24px;">' +
        t("app_not_found_desc") +
        "</p>" +
        '<a href="index.html" class="btn btn--primary"><i class="bi bi-arrow-left" aria-hidden="true"></i> ' +
        t("back_to_store") +
        "</a>" +
        "</div>";
    }
    return;
  }

  document.title = app.name + " - " + t("store_name");

  renderHero(app);
  initCopyLink(app);
  renderMedia(app);
  renderContent(app);
  renderDetailSidebar(app);
  initLightbox(app);
}

function renderHero(app) {
  var visitBtn = app.siteUrl
    ? '<a href="' +
      app.siteUrl +
      '" target="_blank" rel="noopener noreferrer" class="btn btn--primary"><i class="bi bi-box-arrow-up-right" aria-hidden="true"></i> ' +
      t("visit_site") +
      "</a>"
    : "";
  var baseUrl = window.location.origin + window.location.pathname.replace("app.html", "");
  var shareUrl = baseUrl + "app.html?id=" + app.id;
  var shareBtn =
    '<button type="button" class="btn btn--share" id="copyLinkBtn" data-url="' +
    shareUrl +
    '"><i class="bi bi-link-45deg" aria-hidden="true"></i> ' +
    t("copy_link") +
    "</button>";
  var statusBadge = statusBadgeHtml(app);
  var heroIconHtml = appIconHtml(app, "app-hero");

  var heroEl = document.getElementById("appHero");
  if (heroEl) {
    heroEl.innerHTML =
      heroIconHtml +
      '<div class="app-hero__info">' +
      '<h1 class="app-hero__name">' +
      app.name +
      "</h1>" +
      '<p class="app-hero__tagline">' +
      tApp(app, "tagline") +
      "</p>" +
      '<div class="app-hero__badges">' +
      '<span class="badge badge--category">' +
      categoryLabel(app.category) +
      "</span>" +
      '<span class="badge ' +
      priceBadgeClass(app) +
      '">' +
      priceLabel(app) +
      "</span>" +
      statusBadge +
      "</div>" +
      '<div class="app-hero__actions">' +
      visitBtn +
      shareBtn +
      "</div>" +
      "</div>";
  }
}

function initCopyLink() {
  var copyBtn = document.getElementById("copyLinkBtn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", function () {
    var url = copyBtn.dataset.url;
    function restore() {
      copyBtn.innerHTML = '<i class="bi bi-link-45deg" aria-hidden="true"></i> ' + t("copy_link");
    }
    function okState() {
      copyBtn.innerHTML = '<i class="bi bi-check-lg" aria-hidden="true"></i> ' + t("copied");
      setTimeout(restore, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(okState).catch(function () {});
    }
  });
}

function renderMedia(app) {
  var trialBanner = document.getElementById("trialBanner");
  if (trialBanner) trialBanner.hidden = true;

  var videosSection = document.getElementById("videosSection");
  var videoList = normalizeVideos(app);
  if (videosSection) {
    if (videoList.length > 0) {
      videosSection.hidden = false;
      videosSection.innerHTML = "";
    } else {
      videosSection.hidden = true;
    }
  }

  if (app.screenshots && app.screenshots.length > 0) {
    var ssSection = document.getElementById("screenshotsSection");
    var ssTitle = document.getElementById("screenshotsTitle");
    var ssTrack = document.getElementById("screenshotsTrack");
    if (ssSection && ssTrack) {
      if (ssTitle) ssTitle.textContent = t("screenshots");
      ssSection.hidden = false;
      var altBase = app.name.replace(/"/g, "&quot;");
      ssTrack.innerHTML = app.screenshots
        .map(function (src, idx) {
          return (
            '<div class="screenshot-item" data-index="' +
            idx +
            '"><img src="' +
            src +
            '" alt="' +
            altBase +
            " preview " +
            (idx + 1) +
            '" loading="lazy" decoding="async" /></div>'
          );
        })
        .join("");
    }
  }
}

function renderContent(app) {
  var aboutTitle = document.getElementById("aboutTitle");
  var appDesc = document.getElementById("appDescription");
  if (aboutTitle) aboutTitle.textContent = t("about");
  if (appDesc) appDesc.textContent = tApp(app, "description");

  var featTitle = document.getElementById("featuresTitle");
  var featList = document.getElementById("featuresList");
  if (featTitle) featTitle.textContent = t("features");
  if (featList) {
    var features = tApp(app, "features");
    featList.innerHTML = features
      .map(function (f) {
        return "<li><span>" + f + "</span></li>";
      })
      .join("");
  }
}

function renderDetailSidebar(app) {
  var sidebarInfo = document.getElementById("sidebarInfo");
  if (!sidebarInfo) return;

  var isSite = app.productType === "website";
  var stackLine = "";
  if (app.stack && app.stack.length) {
    stackLine =
      '<div class="sidebar-row"><span class="sidebar-row__label">' +
      t("stack") +
      '</span><span class="sidebar-row__value">' +
      app.stack.join(", ") +
      "</span></div>";
  }

  var siteLine = "";
  if (app.siteUrl) {
    siteLine =
      '<div class="sidebar-row"><span class="sidebar-row__label">' +
      t("website") +
      '</span><span class="sidebar-row__value"><a href="' +
      app.siteUrl +
      '" target="_blank" rel="noopener noreferrer">' +
      app.siteUrl.replace(/^https:\/\//, "") +
      "</a></span></div>";
  }

  var versionLine = "";
  if (!isSite && app.version) {
    versionLine =
      '<div class="sidebar-row"><span class="sidebar-row__label">' +
      t("version") +
      '</span><span class="sidebar-row__value">' +
      app.version +
      "</span></div>";
  }

  var langLine =
    '<div class="sidebar-row"><span class="sidebar-row__label">' +
    t("languages") +
    '</span><span class="sidebar-row__value">' +
    app.languages.join(", ") +
    "</span></div>";

  sidebarInfo.innerHTML =
    "<h4>" +
    t("information") +
    "</h4>" +
    '<div class="sidebar-row"><span class="sidebar-row__label">' +
    t("developer") +
    '</span><span class="sidebar-row__value">' +
    app.developer +
    "</span></div>" +
    '<div class="sidebar-row"><span class="sidebar-row__label">' +
    t("category") +
    '</span><span class="sidebar-row__value">' +
    categoryLabel(app.category) +
    "</span></div>" +
    stackLine +
    siteLine +
    versionLine +
    '<div class="sidebar-row"><span class="sidebar-row__label">' +
    t("price") +
    '</span><span class="sidebar-row__value">' +
    priceLabel(app) +
    "</span></div>" +
    langLine;

  var tiersEl = document.getElementById("sidebarTiers");
  if (tiersEl) tiersEl.hidden = true;

  var legalEl = document.getElementById("sidebarLegal");
  if (legalEl) {
    var hasOffSiteLegal = Boolean(app.privacyUrl || app.termsUrl);
    legalEl.hidden = !hasOffSiteLegal;
    if (hasOffSiteLegal) {
      var parts = [];
      if (app.privacyUrl) {
        parts.push(
          '<a href="' +
            app.privacyUrl +
            '" class="legal-link" target="_blank" rel="noopener noreferrer">' +
            '<i class="bi bi-shield-lock" aria-hidden="true"></i> ' +
            t("privacy_policy") +
            "</a>"
        );
      }
      if (app.termsUrl) {
        parts.push(
          '<a href="' +
            app.termsUrl +
            '" class="legal-link" target="_blank" rel="noopener noreferrer">' +
            '<i class="bi bi-file-earmark-text" aria-hidden="true"></i> ' +
            t("terms_of_service") +
            "</a>"
        );
      }
      legalEl.innerHTML = parts.join("");
    }
  }
}

function initLightbox(app) {
  if (!app.screenshots || app.screenshots.length === 0) return;

  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightboxImg");
  var currentIdx = 0;

  function openLb(i) {
    currentIdx = i;
    lbImg.src = app.screenshots[currentIdx];
    lbImg.alt = app.name + " " + t("screenshots") + " " + (currentIdx + 1);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLb() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  function navLb(dir) {
    currentIdx = (currentIdx + dir + app.screenshots.length) % app.screenshots.length;
    lbImg.src = app.screenshots[currentIdx];
    lbImg.alt = app.name + " " + t("screenshots") + " " + (currentIdx + 1);
  }

  document.querySelectorAll(".screenshot-item").forEach(function (el) {
    el.addEventListener("click", function () {
      openLb(parseInt(el.dataset.index, 10));
    });
  });

  document.getElementById("lightboxClose").addEventListener("click", closeLb);
  document.getElementById("lightboxPrev").addEventListener("click", function () {
    navLb(-1);
  });
  document.getElementById("lightboxNext").addEventListener("click", function () {
    navLb(1);
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLb();
  });

  if (_lightboxKeyHandler) document.removeEventListener("keydown", _lightboxKeyHandler);
  _lightboxKeyHandler = function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") navLb(-1);
    if (e.key === "ArrowRight") navLb(1);
  };
  document.addEventListener("keydown", _lightboxKeyHandler);
}
