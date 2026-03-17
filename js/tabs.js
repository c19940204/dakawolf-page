function initTabs() {
  const tabButtons = document.querySelectorAll("[data-tab-target]");
  const tabPanels = document.querySelectorAll("[data-tab-panel]");

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-tab-target");
      if (!target) return;

      tabButtons.forEach((tabButton) => tabButton.classList.remove("is-active"));
      tabPanels.forEach((panel) => panel.classList.remove("is-active"));

      button.classList.add("is-active");

      const panel = document.querySelector(`[data-tab-panel="${target}"]`);
      if (panel) panel.classList.add("is-active");
    });
  });
}

window.initTabs = initTabs;