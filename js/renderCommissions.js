function createCommissionCard(commission) {
  const card = document.createElement("article");
  card.className = "commission-card";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "gallery-trigger";
  button.dataset.lightboxSrc = commission.full || commission.thumb || "";
  button.dataset.lightboxAlt = commission.title || "Commission image";
  button.dataset.lightboxLabel = commission.title || "Commission image";

  const frame = document.createElement("div");
  frame.className = "image-frame";

  const image = document.createElement("img");
  image.src = commission.thumb || commission.full || "";
  image.alt = commission.title || "Commission image";
  image.loading = "lazy";
  image.decoding = "async";

  const overlay = document.createElement("div");
  overlay.className = "image-overlay";

  const title = document.createElement("strong");
  title.textContent = commission.title || "Commission";

  overlay.append(title);
  frame.append(image, overlay);
  button.append(frame);
  card.append(button);

  return card;
}

function renderCommissions(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return false;

  container.innerHTML = "";
  items.forEach((commission) => {
    container.appendChild(createCommissionCard(commission));
  });

  container.dataset.rendered = "true";
  return true;
}

window.renderCommissions = renderCommissions;
