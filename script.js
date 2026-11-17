const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
  document.documentElement.classList.add("has-js");
  const mobileLayout = window.matchMedia("(max-width: 760px)");

  function setMenuOpen(isOpen) {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    navigation.classList.toggle("is-open", isOpen);
  }

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") === "false");
  });
  mobileLayout.addEventListener("change", () => setMenuOpen(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
}

/* Filtres des projets : les cinq catégories sont indépendantes. */
const projectFilters = document.querySelector(".project-categories");
if (projectFilters) {
  const filters = [...projectFilters.querySelectorAll("[data-filter]")];
  const projects = [...document.querySelectorAll(".project[data-category]")];
  const emptyMessage = document.querySelector("[data-empty-projects]");

  function filterProjects(category) {
    filters.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.filter === category));
    });
    projects.forEach((project) => {
      project.hidden = project.dataset.category !== category;
    });
    if (emptyMessage) {
      emptyMessage.hidden = projects.some((project) => !project.hidden);
    }
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => filterProjects(button.dataset.filter));
  });
  filterProjects("developpement");
}

/* Fenêtres modales natives : Échap est géré par le navigateur. */
const projectModal = document.querySelector("#thales-modal");
if (projectModal) {
  const openButton = document.querySelector('[data-project-open="thales"]');
  const closeButton = projectModal.querySelector(".modal-close");

  openButton?.addEventListener("click", () => projectModal.showModal());
  closeButton?.addEventListener("click", () => projectModal.close());

  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) projectModal.close();
  });
}