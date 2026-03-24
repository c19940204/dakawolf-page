const LANGUAGE_STORAGE_KEY = "dakawolf-language";

function getCurrentLocale() {
  const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return saved === "zh" ? "zh" : "en";
}

function getTranslations(locale = getCurrentLocale()) {
  return window.siteTranslations?.[locale] || window.siteTranslations.en;
}

function getTextByKey(key, locale = getCurrentLocale()) {
  return key.split(".").reduce((value, part) => value?.[part], getTranslations(locale));
}

function applyStaticTranslations(locale) {
  document.documentElement.lang = locale;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = getTextByKey(element.dataset.i18n, locale);
    if (typeof value === "string") {
      if (value.includes("<br")) {
        element.innerHTML = value;
      } else {
        element.textContent = value;
      }
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(";").forEach((rule) => {
      const [attr, key] = rule.split(":");
      if (!attr || !key) return;
      const value = getTextByKey(key.trim(), locale);
      if (typeof value === "string") {
        element.setAttribute(attr.trim(), value);
      }
    });
  });
}

function getLocalizedAbout(locale) {
  return getTranslations(locale).about;
}

function renderAboutContent(locale = getCurrentLocale()) {
  const aboutContainer = document.getElementById("about-content");
  const aboutData = getLocalizedAbout(locale);
  if (!aboutContainer || !aboutData) return;

  aboutContainer.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = aboutData.title;
  aboutContainer.appendChild(heading);

  aboutData.paragraphs.forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    aboutContainer.appendChild(paragraph);
  });
}

function getLocalizedProjects(locale = getCurrentLocale()) {
  const projectTexts = getTranslations(locale).projects.items;
  return {
    commercial: (window.projectMedia?.commercial || []).map((item) => ({
      image: item.image,
      ...projectTexts[item.id],
    })),
    private: (window.projectMedia?.private || []).map((item) => ({
      image: item.image,
      ...projectTexts[item.id],
    })),
  };
}

function getLocalizedCommissions(locale = getCurrentLocale()) {
  const prefix = getTranslations(locale).commissions.title_prefix;
  return (window.commissionMedia || []).map((item) => ({
    thumb: item.thumb,
    full: item.full,
    title: `${prefix}${item.code}`,
  }));
}

function rerenderDynamicContent(locale = getCurrentLocale()) {
  renderAboutContent(locale);

  const localizedProjects = getLocalizedProjects(locale);
  window.renderProjects("commercial-project-grid", localizedProjects.commercial);
  window.renderProjects("private-project-grid", localizedProjects.private);

  const commissionGrid = document.getElementById("commission-grid");
  if (commissionGrid && commissionGrid.dataset.rendered === "true") {
    window.renderCommissions("commission-grid", getLocalizedCommissions(locale));
  }
}

function initScrollReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!revealItems.length) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateReveal(force = false) {
    const viewportHeight = window.innerHeight;
    const currentScrollY = window.scrollY;
    const direction = force
      ? "down"
      : currentScrollY > lastScrollY
        ? "down"
        : currentScrollY < lastScrollY
          ? "up"
          : "none";

    revealItems.forEach((item) => {
      if (item.getClientRects().length === 0) return;

      const rect = item.getBoundingClientRect();
      const isVisible = item.classList.contains("is-visible");
      const shouldFadeIn = rect.top <= viewportHeight && rect.bottom >= 0;
      const shouldFadeOut = rect.top >= viewportHeight * 0.96;

      if ((direction === "down" || direction === "none") && shouldFadeIn && !isVisible) {
        item.classList.add("is-visible");
      }

      if (direction === "up" && shouldFadeOut && isVisible) {
        item.classList.remove("is-visible");
      }
    });

    lastScrollY = currentScrollY;
    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => updateReveal());
  }

  window.refreshScrollReveal = () => updateReveal(true);

  updateReveal(true);
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", () => updateReveal(true));
}

function ensureCommissionsRendered(locale = getCurrentLocale()) {
  if (typeof window.renderCommissions !== "function") return;
  window.renderCommissions("commission-grid", getLocalizedCommissions(locale));
}

function initTabs() {
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  const tabPanels = document.querySelectorAll("[data-tab-panel]");
  if (!tabButtons.length || !tabPanels.length) return;

  function activateTab(target) {
    tabButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.tabTarget === target);
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.tabPanel === target);
    });

    if (target === "commissions") {
      ensureCommissionsRendered();
    }

    window.scrollTo({ top: 0, behavior: "instant" });
    window.requestAnimationFrame(() => {
      window.refreshScrollReveal?.();
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tabTarget;
      if (!target) return;
      activateTab(target);
    });
  });

  window.activateTab = activateTab;
  activateTab("home");
}

function initLanguageToggle() {
  const button = document.getElementById("language-toggle");
  if (!button) return;

  button.addEventListener("click", () => {
    const nextLocale = getCurrentLocale() === "en" ? "zh" : "en";
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLocale);
    applyLanguage(nextLocale);
  });
}

function applyLanguage(locale) {
  applyStaticTranslations(locale);
  rerenderDynamicContent(locale);

  const activePanel = document.querySelector(".tab-panel.is-active")?.dataset.tabPanel;
  if (activePanel === "commissions") {
    ensureCommissionsRendered(locale);
  }

  window.requestAnimationFrame(() => {
    window.refreshScrollReveal?.();
  });
}

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const closeButton = document.getElementById("lightbox-close");
  const backdrop = document.getElementById("lightbox-backdrop");

  if (!lightbox || !lightboxImage || !lightboxTitle || !closeButton || !backdrop) return;

  let closeTimer = null;

  function finishClose() {
    lightbox.hidden = true;
    lightbox.classList.remove("is-open", "is-closing");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxTitle.textContent = "";
    document.body.style.overflow = "";
  }

  function closeLightbox() {
    if (lightbox.hidden || lightbox.classList.contains("is-closing")) return;

    lightbox.classList.remove("is-open");
    lightbox.classList.add("is-closing");
    clearTimeout(closeTimer);
    closeTimer = window.setTimeout(finishClose, 260);
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".gallery-trigger");
    if (!trigger) return;

    clearTimeout(closeTimer);
    lightbox.hidden = false;
    lightbox.classList.remove("is-closing");
    lightboxImage.src = trigger.dataset.lightboxSrc || "";
    lightboxImage.alt = trigger.dataset.lightboxAlt || "";
    lightboxTitle.textContent = trigger.dataset.lightboxLabel || "";
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      lightbox.classList.add("is-open");
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  backdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
}

const initialLocale = getCurrentLocale();
applyLanguage(initialLocale);
initScrollReveal();
initTabs();
initLanguageToggle();
initLightbox();

const currentYear = document.getElementById("current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();
