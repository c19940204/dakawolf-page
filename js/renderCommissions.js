function createCommissionCard(commission) {
  const card = document.createElement("article");
  card.className = "commission-card";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "gallery-trigger";
  button.dataset.lightboxSrc = commission.full || commission.image || commission.thumb || "";
  button.dataset.lightboxAlt = commission.title || "Commission image";
  button.dataset.lightboxLabel = commission.title || "Commission image";

  const frame = document.createElement("div");
  frame.className = "image-frame";

  const image = document.createElement("img");
  image.src = commission.thumb || commission.image || commission.full || "";
  image.alt = commission.title || "Commission image";
  image.loading = "lazy";
  image.decoding = "async";

  const overlay = document.createElement("div");
  overlay.className = "image-overlay";

  const title = document.createElement("strong");
  title.textContent = commission.title || "Sample Commission";

  overlay.append(title);
  frame.append(image, overlay);
  button.append(frame);
  card.append(button);

  return card;
}

function getCommissionItems(data) {
  if (Array.isArray(data) && data.length) return data;
  if (data && typeof data === "object") {
    return Object.values(data).flat().filter(Boolean);
  }
  return [];
}

function renderCommissions(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return false;

  if (container.dataset.rendered === "true") return true;

  const items = getCommissionItems(data);
  const fallbackItems = window.commissionSamples || [];
  const finalItems = items.length ? items : fallbackItems;

  container.innerHTML = "";
  finalItems.forEach((commission) => {
    container.appendChild(createCommissionCard(commission));
  });

  container.dataset.rendered = "true";
  return true;
}

window.renderCommissions = renderCommissions;
