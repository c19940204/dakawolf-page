function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  const image = document.createElement("img");
  image.src = project.image;
  image.alt = project.title;

  const title = document.createElement("h3");
  title.textContent = project.title;

  const role = document.createElement("p");
  role.className = "card-meta";
  role.textContent = project.role;

  const description = document.createElement("p");
  description.textContent = project.description;

  card.append(image, title, role, description);
  return card;
}

function renderProjects(targetId, items) {
  const container = document.getElementById(targetId);
  if (!container) return;

  container.innerHTML = "";
  items.forEach((item) => container.appendChild(createProjectCard(item)));
}

window.renderProjects = renderProjects;

