function createCommissionCard(commission) {
  const card = document.createElement("article");
  card.className = "commission-card";

  const image = document.createElement("img");
  image.src = commission.image;
  image.alt = `Commission by ${commission.artistName}`;

  const text = document.createElement("p");
  const artist = document.createElement("span");
  artist.textContent = `Artist: ${commission.artistName} `;

  const link = document.createElement("a");
  link.href = commission.artistUrl;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "Profile Link";

  text.append(artist, link);
  card.append(image, text);
  return card;
}

function renderCommissionsByYear(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  Object.entries(data).forEach(([year, commissions]) => {
    const section = document.createElement("section");
    section.className = "year-section";

    const yearLabel = document.createElement("h2");
    yearLabel.className = "year-label";
    yearLabel.textContent = year;

    const grid = document.createElement("div");
    grid.className = "commission-grid";

    commissions.forEach((commission) => {
      grid.appendChild(createCommissionCard(commission));
    });

    section.append(yearLabel, grid);
    container.appendChild(section);
  });
}

window.renderCommissionsByYear = renderCommissionsByYear;