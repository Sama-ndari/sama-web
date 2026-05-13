function appAsset(id, file) {
  return "assets/apps/" + id + "/" + file;
}

var GIST_SOURCES = [];

var REMOTE_CONFIGS = [];

var APPS = [
  {
    id: "yimburundi",
    name: "YIM Burundi",
    tagline: "Youth Impact Mission - inspire, train & mobilize youth",
    tagline_fr:
      "Youth Impact Mission - inspirer, former et mobiliser la jeunesse",
    productType: "website",
    developer: "Samandari",
    category: "Community",
    price: "free",
    status: "live",
    version: "-",
    stack: ["React", "NestJS", "MySQL", "Prisma"],
    languages: ["Français", "English"],
    siteUrl: "https://yimburundi.com",
    privacyUrl: "https://yimburundi.com/privacy",
    termsUrl: "https://yimburundi.com/terms",
    icon: appAsset("yimburundi", "icon.png"),
    screenshots: [
      appAsset("yimburundi", "screenshots/preview-1.svg"),
      appAsset("yimburundi", "screenshots/preview-2.svg")
    ],
    videos: [],
    shortDesc:
      "YIM (Youth Impact Mission) is a Burundi nonprofit that inspires young people through leadership, reforestation, and social action - brought online as a full public web platform and admin stack.",
    shortDesc_fr:
      "YIM (Youth Impact Mission Burundi) est une ONG à but non lucratif qui inspire, forme et mobilise la jeunesse autour du leadership, du reboisement et de l’action sociale - déclinée ici en plateforme web et outils de gestion.",
    description:
      "YIM Burundi stands for Youth Impact Mission: a nonprofit focused on transforming youth to transform society. The website presents the mission clearly for local and international audiences, showcases programs and impact, and supports real operations - memberships for “Agents de Transformation”, events and ticketing with QR check-in, donation pledges with follow-up, and a bilingual blog (French / English). Behind the scenes, a React (Vite) frontend talks to a NestJS API with Prisma and MySQL for structured content, authentication, and admin workflows; the experience is tuned for mobile-first visitors and weaker networks.",
    description_fr:
      "YIM signifie Youth Impact Mission Burundi : une organisation à but non lucratif dont la vision est de transformer la jeunesse pour transformer la société. Le site expose cette mission, présente les axes d’action et l’impact, et soutient le quotidien de l’association : adhésions des « Agents de Transformation », événements et billetterie avec QR, promesses de dons avec suivi, et blog bilingue (français / anglais). Côté technique, une interface React (Vite) s’appuie sur une API NestJS, Prisma et MySQL pour sécuriser le contenu, les rôles et la gestion - avec une expérience pensée mobile d’abord et des connexions variables.",
    features: [
      "Bilingual public experience (FR/EN): impact storytelling, blog, and clear program sections",
      "Member lifecycle for “Agents de Transformation” via structured sign-up and admin workflows",
      "Events & ticketing with QR-based check-in suitable for field gatherings",
      "Donation pledges with tracking so supporters can engage transparently",
      "Full admin + content ops on NestJS, Prisma, and MySQL - API-driven, role-aware, production-ready",
      "PWA-friendly delivery so repeat visitors can install and return quickly on mobile"
    ],
    features_fr: [
      "Parcours public bilingue (FR/EN) : récit d’impact, blog, programmes et pages lisibles",
      "Parcours membres « Agents de Transformation » avec inscription structurée et back-office",
      "Événements et billetterie avec contrôle par QR adaptés aux rassemblements",
      "Dons et promesses de dons avec suivi pour un engagement transparent",
      "Back-office et API NestJS + Prisma + MySQL - contenu structuré, rôles, prêt production",
      "Orientation PWA pour une installation mobile et des visites régulières plus fluides"
    ]
  },
  {
    id: "ibanga",
    name: "IBANGA",
    tagline: "Privacy-first web experience",
    tagline_fr: "Expérience web axée confidentialité",
    productType: "website",
    developer: "Samandari",
    category: "Privacy",
    price: "free",
    status: "live",
    version: "-",
    stack: ["TypeScript", "Modern web standards"],
    languages: ["English", "Français"],
    siteUrl: "https://www.ibanga.samandari.dev",
    privacyUrl: "https://www.ibanga.samandari.dev/privacy",
    termsUrl: "https://www.ibanga.samandari.dev/terms",
    icon: appAsset("ibanga", "icon.png"),
    screenshots: [appAsset("ibanga", "screenshots/preview-1.svg")],
    videos: [],
    shortDesc:
      "A minimal, privacy-forward site showcasing careful defaults: no trackers, clear messaging, and crisp visuals.",
    shortDesc_fr:
      "Un site minimal et respectueux de la vie privée : pas de traceurs invasifs, messages clairs, visuels nets.",
    description:
      "IBANGA is built around restraint: readable layout, strong contrast, and interactions that avoid unnecessary data collection. It demonstrates how a small footprint on the web can still feel premium - ideal for security- and privacy-sensitive positioning.",
    description_fr:
      "IBANGA mise sur la sobriété : lisibilité, contraste soigné et interactions sans collecte superflue. Une empreinte web réduite peut rester très soignée - utile pour un positionnement axé sécurité et confidentialité.",
    features: [
      "No third-party advertising or fingerprinting by default",
      "Semantic HTML landmarks for assistive technologies",
      "Visual system built for fast paint and low distraction",
      "Shareable URLs and Open Graph metadata for previews"
    ],
    features_fr: [
      "Pas de publicité tierce ni de fingerprinting par défaut",
      "HTML sémantique pour l’accessibilité",
      "Système visuel pensé pour un rendu rapide et sobre",
      "URLs partageables et métadonnées Open Graph pour les aperçus"
    ]
  }
];
