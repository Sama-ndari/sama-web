const I18N = {
  en: {
    store_name: "Sama Web",
    hero_label: "Showcase",
    hero_title_line1: "Websites and platforms",
    hero_title_line2_prefix: "with ",
    hero_title_accent: "clarity & craft",
    hero_subtitle:
      "A curated gallery of public web experiences - fast, accessible, built with modern stacks.",
    search_placeholder: "Search projects…",
    all: "All",
    community: "Community",
    privacy: "Privacy",
    no_projects: "No projects match your filters.",
    catalog_heading: "Project catalog",
    screenshots: "Screenshots",
    about: "About",
    features: "Highlights",
    information: "Details",
    developer: "Creator",
    stack: "Stack",
    website: "Live site",
    category: "Category",
    price: "Access",
    free: "Open web",
    paid: "Paid",
    visit_site: "Visit site",
    back: "Back",
    footer_rights: "Projects remain property of their respective owners.",
    footer_built: "Built by",
    app_not_found: "Project not found",
    app_not_found_desc: "This project is not in the showcase.",
    back_to_store: "Back to showcase",
    in_development: "In development",
    deployed: "Live",
    coming_soon: "Soon",
    copy_link: "Copy link",
    copied: "Copied",
    trusted_by: "Trusted by {count} people across our apps",
    users: "users",
    used_by: "Used by {count} people",
    active_users: "Active users",
    privacy_policy: "Privacy Policy",
    terms_of_service: "Terms of Use",
    version: "Version",
    languages: "Languages",
    download_apk: "Download",
    video_demo: "Video",
    video_fullscreen: "Fullscreen",
    free_trial: "Trial",
    not_found_title: "Page not found",
    not_found_desc: "This path does not exist.",
    not_found_home: "Back home"
  },
  fr: {
    store_name: "Sama Web",
    hero_label: "Vitrine",
    hero_title_line1: "Sites web et plateformes",
    hero_title_line2_prefix: "avec ",
    hero_title_accent: "clarté & exigence",
    hero_subtitle:
      "Une vitrine web soignée - rapide, accessible, basée sur des stacks modernes.",
    search_placeholder: "Rechercher…",
    all: "Tout",
    community: "Communauté",
    privacy: "Confidentialité",
    no_projects: "Aucun projet ne correspond.",
    catalog_heading: "Catalogue projets",
    screenshots: "Aperçus",
    about: "À propos",
    features: "Points forts",
    information: "Détails",
    developer: "Créateur",
    stack: "Stack",
    website: "Site en ligne",
    category: "Catégorie",
    price: "Accès",
    free: "Web ouvert",
    paid: "Payant",
    visit_site: "Visiter le site",
    back: "Retour",
    footer_rights: "Les projets restent la propriété de leurs auteurs respectifs.",
    footer_built: "Réalisé par",
    app_not_found: "Projet introuvable",
    app_not_found_desc: "Ce projet n’est pas dans la vitrine.",
    back_to_store: "Retour à la vitrine",
    in_development: "En développement",
    deployed: "En ligne",
    coming_soon: "Bientôt",
    copy_link: "Copier le lien",
    copied: "Copié",
    trusted_by: "Adopté par {count} personnes sur nos apps",
    users: "personnes",
    used_by: "{count} personnes actives",
    active_users: "Utilisateurs actifs",
    privacy_policy: "Confidentialité",
    terms_of_service: "Conditions d’utilisation",
    version: "Version",
    languages: "Langues",
    download_apk: "Télécharger",
    video_demo: "Vidéo",
    video_fullscreen: "Plein écran",
    free_trial: "Essai",
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
  } catch (e) {
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
  const lang = getLang();
  const localized = app[field + "_" + lang];
  if (localized) return localized;
  return app[field];
}
