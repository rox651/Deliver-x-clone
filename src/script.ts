import "./styles.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

function applyElementsAnimationWhenScroll(): void {
  const singles = document.querySelectorAll<HTMLElement>(".scale-up-animation");
  const singlesNoScroll = document.querySelectorAll<HTMLElement>(
    ".scale-up-animation-no-scroll",
  );

  const animationConfig = {
    autoAlpha: 0,
    y: 20,
    scale: 0.98,
    duration: 0.6,
    ease: "power2.out",
    clearProps: "transform,opacity,visibility",
    delay: 0.12,
  };

  singlesNoScroll.forEach((el) => {
    gsap.from(el, {
      animationConfig,
    });
  });

  singles.forEach((el) => {
    gsap.from(el, {
      ...animationConfig,
      stagger: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        once: true,
      },
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setupHeaderMenu();
  applyElementsAnimationWhenScroll();
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
