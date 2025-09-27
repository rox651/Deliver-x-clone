import "./styles.scss";
import { gsap } from "gsap";

function setupHeaderMenu() {
  const toggleButton =
    document.querySelector<HTMLButtonElement>(".header__toggle");
  const drawer = document.querySelector<HTMLDivElement>(".header__drawer");

  if (!toggleButton || !drawer) return;

  const open = () => {
    drawer.hidden = false;
    drawer.setAttribute("aria-hidden", "false");
    toggleButton.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    drawer.hidden = true;
    drawer.setAttribute("aria-hidden", "true");
    toggleButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggleButton.addEventListener("click", () => {
    const isOpen = toggleButton.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      close();
    } else {
      open();
    }
  });

  drawer.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (
      target.closest(".header__drawer__nav__list--link") ||
      target.closest(".header__drawer__submenu__list--link") ||
      target.closest(".header__drawer__cta--button")
    ) {
      close();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setupHeaderMenu();
  const drawer = document.querySelector<HTMLDivElement>(".header__drawer");
  const toggleButton =
    document.querySelector<HTMLButtonElement>(".header__toggle");
  if (drawer && toggleButton) {
    drawer.hidden = true;
    drawer.setAttribute("aria-hidden", "true");
    toggleButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
});
