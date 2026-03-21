function renderAboutContent() {
  const aboutContainer = document.getElementById("about-content");
  const aboutData = window.aboutContentData;

  if (!aboutContainer || !aboutData) return;

  aboutContainer.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = aboutData.title || "";
  aboutContainer.appendChild(heading);

  (aboutData.paragraphs || []).forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    aboutContainer.appendChild(paragraph);
  });
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

  updateReveal(true);
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", () => updateReveal(true));
}

function initCommissionLazyRender() {
  const section = document.getElementById("commissions");
  const container = document.getElementById("commission-grid");
  if (!section || !container || typeof window.renderCommissions !== "function") return;

  let hasRendered = container.dataset.rendered === "true";

  function renderNow() {
    if (hasRendered) return;
    hasRendered = window.renderCommissions("commission-grid", window.commissionSamples) === true;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight * 1.25) {
          renderNow();
          observer.disconnect();
        }
      });
    },
    {
      rootMargin: "0px 0px 25% 0px",
      threshold: 0.01,
    }
  );

  observer.observe(section);
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

renderAboutContent();
window.renderProjects("commercial-project-grid", window.projectData.commercial);
window.renderProjects("private-project-grid", window.projectData.private);
initCommissionLazyRender();
initScrollReveal();
initLightbox();

const currentYear = document.getElementById("current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();
