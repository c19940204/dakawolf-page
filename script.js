const projects = [
  {
    title: "Project Alpha",
    description:
      "一個以戰鬥節奏與流暢操作為核心的遊戲原型，專注打擊感、操作回饋與關卡節奏。",
    tags: ["Unity", "Action", "Prototype"],
    link: "#",
    linkLabel: "查看作品",
  },
  {
    title: "Narrative Explorer",
    description:
      "結合場景探索與敘事演出的互動作品，著重氛圍塑造、鏡頭節奏與玩家沉浸感。",
    tags: ["Narrative", "Level Design", "Cinematic"],
    link: "#",
    linkLabel: "查看作品",
  },
  {
    title: "System Builder",
    description:
      "聚焦玩法迴圈與數值成長設計的實驗專案，展示我在系統發想與整合上的能力。",
    tags: ["Gameplay", "Systems", "Iteration"],
    link: "#",
    linkLabel: "查看作品",
  },
];

const projectsGrid = document.getElementById("projects-grid");
const currentYear = document.getElementById("current-year");

function renderProjects(items) {
  if (!projectsGrid) return;

  projectsGrid.innerHTML = "";

  items.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const tag = document.createElement("p");
    tag.className = "project-tag";
    tag.textContent = "Featured Project";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const meta = document.createElement("div");
    meta.className = "project-meta";

    project.tags.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "project-chip";
      chip.textContent = item;
      meta.appendChild(chip);
    });

    const link = document.createElement("a");
    link.className = "project-link";
    link.href = project.link;
    link.textContent = project.linkLabel;

    if (project.link.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }

    card.append(tag, title, description, meta, link);
    projectsGrid.appendChild(card);
  });
}

renderProjects(projects);

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
