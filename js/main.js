window.initTabs();

window.renderProjects("commercial-project-grid", window.projectData.commercial);
window.renderProjects("private-project-grid", window.projectData.private);
window.renderCommissionsByYear("commission-year-sections", window.commissionByYear);
window.renderMyArtByYear("my-art-year-sections", window.myArtByYear);

const currentYear = document.getElementById("current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();