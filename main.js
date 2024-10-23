import "./index.scss";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger, Draggable } from "gsap/all.js";
// GSAP
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
}
window.scrollTo(0, 0);
window.addEventListener("load", function () {
  window.scrollTo(0, 0);
});
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
document.documentElement.scrollTop = 0; // Para navegadores modernos
document.body.scrollTop = 0; // Para navegadores más antiguos
// //lenis
const lenis = new Lenis({
  duration: 0.5,
  lerp: 0.1,
  wheelMultiplier: 0.5,
  wrapper: document.body,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
lenis.stop();
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable);
const navBtn = document.getElementById("menu-toggle-btn");

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const tll = gsap.timeline({
  paused: "true",
});
tll.to("#percent, #bar", {
  duration: 0.5,
  opacity: 0,
  // zIndex: -1,
});
tll.to(".overlay-1", {
  duration: 1.5,
  y: "-100vh",
  ease: "power2.in",
});

// La segunda animación empieza 0.2 segundos después de que comience la primera
tll.to(
  ".overlay-2",
  {
    duration: 1.5,
    y: "-100vh",
    delay: 0.3,
    ease: "power2.in",
  },
  0.4
); // Esto añade un retraso de 0.2 segundos
tll.to("#preloader", {
  duration: 0.01,
  zIndex: -1,
});
tll.from(
  ".main h1",
  {
    opacity: 0,
    duration: 1,
  },
  2.5
);
tll.from(
  ".navbar",
  {
    opacity: 0,
    duration: 1,
    onComplete: () => lenis.start(),
  },
  "<"
);

//quote gsap
gsap.from(".quote p", {
  y: "+100%",
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".quote p",
    start: "-100% 100%",
    end: "bottom 30%",
    scrub: true,
  },
});
gsap.from(".menu h3", {
  x: "+50%",
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".menu h3",
    start: "-100% 50%",
    end: "bottom 30%",
    scrub: true,
    // markers: true,
  },
});
gsap.from(".menu-section", {
  y: "+100%",
  opacity: 0,
  duration: 2,
  scrollTrigger: {
    trigger: ".menu",
    stagger: 0.25,
    start: "-75% top",
    end: "bottom bottom",
    scrub: true,
  },
});
gsap.from(".gallery__title h3", {
  x: "+100%",
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".gallery",
    start: "-100%",
    end: "bottom bottom",
    scrub: true,
  },
});
gsap.from(".team__title h3", {
  x: "+100%",
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".team h3",
    start: "-100% 50%",
    end: "bottom 30%",
    scrub: true,
  },
});
gsap.from(".team__container__box", {
  y: "+100%",
  opacity: 0,
  duration: 2,
  scrollTrigger: {
    trigger: ".team",
    stagger: 0.25,
    start: "-75% top",
    end: "bottom bottom",
    scrub: true,
  },
});
const tl2 = gsap.timeline({ paused: true });
const animateOpenNav = () => {
  tl2.to(
    "#nav-container",
    {
      duration: 0.2,
      autoAlpha: 1,
      delay: 0.1,
    },
    ">"
  );
  tl2.to(".site-logo", { opacity: 0, duration: 0.2, delay: 0.1 }, ">");
  tl2.to(".nav-link > a", {
    top: 0,
    duration: 0.8,
    ease: "power2.inOut",
    stagger: {
      amount: 0.1,
    },
  });
  tl2
    .from(
      ".nav-footer",
      {
        duration: 0.3,
        opacity: 0,
      },
      "-=0.5"
    )
    .reverse();
};
const links = document.querySelectorAll(".col-links .nav-link");
links.forEach((e) => {
  e.addEventListener("click", () => {
    lenis.start();
    if (window.scrollY > 50) {
      gsap.to(".navbar", {
        duration: 0.4,
        backgroundColor: "#023e8a",
      });
    }
    tl2.reversed(!tl2.reversed());
    navBtn.classList.toggle("active");
  });
});

var width = 1;
var bar = document.getElementById("barconfrm");
var id;
function move() {
  id = setInterval(frame, 20);
}
function frame() {
  if (width >= 100) {
    clearInterval(id);
    tll.play();
  } else {
    width++;
    bar.style.width = width + "%";
    document.getElementById("percent").innerHTML = width + "%";
  }
}
move();
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function (e) {
  if (window.scrollY > 50) {
    gsap.to(navbar, {
      backgroundColor: "#023e8a", // Cambia el fondo a azul
      duration: 1, // Duración de la animación
      ease: "power2.out", // Animación suave
    });
  } else {
    gsap.to(navbar, {
      backgroundColor: "transparent", // Cambia el fondo a azul
      duration: 1, // Duración de la animación
      ease: "power2.out", // Animación suave
    });
  }
});

// //galeria
class Slider {
  constructor({ el, row_id, wrap }) {
    // this.container = el;
    this.slider = el;
    this.row = row_id;

    this.wrap = wrap;

    this.proxy = this.row.querySelector(".proxy-slider");
    // this.inner = this.row.querySelector('#slider-inner');
    this.slides = [...this.slider.querySelectorAll(".g-7")];
    this.slidesNumb = this.slides.length - 1;
    this.sliderWidth = 0;

    this.draggable = null;

    this.current = 0;
    this.last = 0;

    this.offset = 0;

    this.init();
  }

  // Set slider and proxy width/transform
  setBounds() {
    this.sliderWidth = this.slides[0].offsetWidth * this.slidesNumb;

    gsap.set([this.slider, this.proxy], {
      width: this.sliderWidth,
      x: 0,
    });
  }

  createDraggable() {
    let slider = this.slider,
      inner = this.inner,
      getter = gsap.getProperty(slider),
      updateX = () =>
        gsap.to(slider, {
          x: this.draggable.x - this.offset,
          ease: "power2",
          overwrite: "auto",
        });

    this.draggable = Draggable.create(this.proxy, {
      type: "x",
      edgeResistance: 1,
      bounds: { minX: this.row.offsetWidth - this.proxy.offsetWidth, maxX: 0 },
      inertia: true,
      throwProps: true,
      callbackScope: this,
      onPress: function (e) {
        gsap.killTweensOf(slider);
        this.offset = this.draggable.x - getter("x");
      },
      onRelease: function () {
        gsap.to(slider.children, {
          duration: 1,
          ease: "power1.inOut",
          scale: 1,
          overwrite: true,
        });
        this.offset = 0;
      },
      onDrag: updateX,
      onThrowUpdate: updateX,
    })[0];
  }

  init() {
    this.setBounds();
    this.createDraggable();
  }
}

const slider = new Slider({
  el: document.querySelector(".slider"),
  row_id: document.querySelector("#one"),
  wrap: document.querySelector("#slider-inner"),
});
const openNav = () => {
  console.log("window.scrollY", window.scrollY);

  animateOpenNav();

  navBtn.onclick = function (e) {
    console.log("entroo");
    const isActive = navBtn.classList.contains("active");
    if (!isActive) {
      lenis.stop();
      if (window.scrollY > 50) {
        gsap.to(".navbar", {
          duration: 0.4,
          backgroundColor: "transparent",
        });
      }
    } else {
      lenis.start();
      if (window.scrollY > 50) {
        gsap.to(".navbar", {
          duration: 0.4,
          backgroundColor: "#023e8a",
        });
      }
    }
    tl2.reversed(!tl2.reversed());
    navBtn.classList.toggle("active");
  };
};
openNav();
