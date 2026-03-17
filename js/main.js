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

renderAboutContent();

window.initTabs();

window.renderProjects("commercial-project-grid", window.projectData.commercial);
window.renderProjects("private-project-grid", window.projectData.private);
window.renderCommissionsByYear("commission-year-sections", window.commissionByYear);
window.renderMyArtByYear("my-art-year-sections", window.myArtByYear);

const currentYear = document.getElementById("current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();