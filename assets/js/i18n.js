const I18N = {
  en: {
    store_name: "Sama Web",
    meta_title: "Sama Web • Selected websites by Samandari",
    meta_description: "Selected websites designed and built by Samandari.",
    skip_link: "Skip to content",
    settings_nav: "Site settings",
    work_link: "Work",
    portfolio: "Portfolio",
    language_toggle: "Switch to French",
    theme_light: "Use light theme",
    theme_dark: "Use dark theme",
    hero_label: "Selected work · 2026",
    hero_title_line1: "Websites built",
    hero_title_line2: "to be ",
    hero_title_accent: "experienced.",
    hero_subtitle: "A selection of useful, thoughtful websites I designed and built. Open a project to experience the real product.",
    explore: "Explore the work",
    work_label: "Selected websites",
    work_title: "Live on the web.",
    work_intro: "No mockups. No long case studies. Just products you can visit and use.",
    visit_site: "Visit website",
    opens_new_tab: "opens in a new tab",
    technologies: "Technologies",
    contact_label: "More from Samandari",
    contact_title: "Looking for the full story?",
    contact_link: "Visit my portfolio",
    footer_rights: "Selected web work.",
    footer_built: "Designed and built by",
    not_found_title: "Page not found",
    not_found_desc: "This path does not exist.",
    not_found_home: "Back home"
  },
  fr: {
    store_name: "Sama Web",
    meta_title: "Sama Web • Sites sélectionnés par Samandari",
    meta_description: "Une sélection de sites web conçus et développés par Samandari.",
    skip_link: "Aller au contenu",
    settings_nav: "Réglages du site",
    work_link: "Projets",
    portfolio: "Portfolio",
    language_toggle: "Passer en anglais",
    theme_light: "Utiliser le thème clair",
    theme_dark: "Utiliser le thème sombre",
    hero_label: "Projets sélectionnés · 2026",
    hero_title_line1: "Des sites conçus",
    hero_title_line2: "pour être ",
    hero_title_accent: "vécus.",
    hero_subtitle: "Une sélection de sites utiles et soignés que j’ai conçus et développés. Ouvrez un projet pour découvrir le vrai produit.",
    explore: "Voir les projets",
    work_label: "Sites sélectionnés",
    work_title: "Déjà en ligne.",
    work_intro: "Pas de maquettes. Pas de longues études de cas. Seulement des produits à visiter et utiliser.",
    visit_site: "Visiter le site",
    opens_new_tab: "s’ouvre dans un nouvel onglet",
    technologies: "Technologies",
    contact_label: "Plus de Samandari",
    contact_title: "Envie de découvrir le parcours complet ?",
    contact_link: "Voir mon portfolio",
    footer_rights: "Sélection de projets web.",
    footer_built: "Conçu et développé par",
    not_found_title: "Page introuvable",
    not_found_desc: "Ce chemin n’existe pas.",
    not_found_home: "Accueil"
  }
};

let _lang = "en";
let _theme = "light";

function safeStorage(key, value) {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch (error) {
    return null;
  }
}

function getLang() {
  return safeStorage("webshow-lang") || _lang;
}

function setLang(lang) {
  _lang = lang;
  safeStorage("webshow-lang", lang);
}

function getTheme() {
  return safeStorage("webshow-theme") || _theme;
}

function setTheme(theme) {
  _theme = theme;
  safeStorage("webshow-theme", theme);
}

function t(key) {
  const lang = getLang();
  return I18N[lang]?.[key] || I18N.en[key] || key;
}

function tApp(app, field) {
  const localized = app[field + "_" + getLang()];
  return localized || app[field];
}
