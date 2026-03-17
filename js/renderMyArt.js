function createArtCard(art) {
  const figure = document.createElement("figure");
  figure.className = "art-card";

  const image = document.createElement("img");
  image.src = art.image;
  image.alt = art.caption;

  const caption = document.createElement("figcaption");
  caption.textContent = art.caption;

  figure.append(image, caption);
  return figure;
}

function renderMyArtByYear(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  Object.entries(data).forEach(([year, arts]) => {
    const section = document.createElement("section");
    section.className = "year-section";

    const yearLabel = document.createElement("h2");
    yearLabel.className = "year-label";
    yearLabel.textContent = year;

    const masonry = document.createElement("div");
    masonry.className = "art-masonry";

    arts.forEach((art) => {
      masonry.appendChild(createArtCard(art));
    });

    section.append(yearLabel, masonry);
    container.appendChild(section);
  });
}

window.renderMyArtByYear = renderMyArtByYear;