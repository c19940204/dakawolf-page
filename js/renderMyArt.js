function createArtCard(art) {
  const figure = document.createElement("figure");
  figure.className = "art-card";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "gallery-trigger";
  button.dataset.lightboxSrc = art.image;
  button.dataset.lightboxAlt = art.caption;
  button.dataset.lightboxLabel = art.caption;

  const frame = document.createElement("div");
  frame.className = "image-frame";

  const image = document.createElement("img");
  image.src = art.image;
  image.alt = art.caption;

  const overlay = document.createElement("div");
  overlay.className = "image-overlay";

  const title = document.createElement("strong");
  title.textContent = art.caption;

  const subtitle = document.createElement("span");
  subtitle.textContent = "Click to enlarge";

  overlay.append(title, subtitle);
  frame.append(image, overlay);
  button.append(frame);
  figure.append(button);
  return figure;
}

function renderMyArtByYear(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  Object.entries(data).forEach(([year, arts]) => {
    const section = document.createElement("section");
    section.className = "year-section reveal";

    const yearLabel = document.createElement("h2");
    yearLabel.className = "year-label";
    yearLabel.textContent = year;

    const grid = document.createElement("div");
    grid.className = "art-gallery-grid";

    arts.forEach((art) => {
      grid.appendChild(createArtCard(art));
    });

    section.append(yearLabel, grid);
    container.appendChild(section);
  });
}

window.renderMyArtByYear = renderMyArtByYear;
