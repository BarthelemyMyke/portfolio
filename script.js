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

const projectFilters = document.querySelector(".filters");

if (projectFilters) {
  const filters = [...projectFilters.querySelectorAll("[data-filter]")];
  const projects = [...document.querySelectorAll(".project[data-category]")];
  const emptyMessage = document.querySelector("[data-empty-projects]");
  projectFilters.hidden = false;

  for (const filter of filters) {
    filter.addEventListener("click", () => {
      const category = filter.dataset.filter;
      for (const button of filters) {
        button.setAttribute("aria-pressed", String(button === filter));
      }
      for (const project of projects) {
        project.hidden = category !== "tous" && project.dataset.category !== category;
      }
      emptyMessage.hidden = projects.some((project) => !project.hidden);
    });
  }
}
