"strict mode";

const nav = document.querySelector(".nav");
const slider = document.querySelector(".slider");
const hamburgerMenu = document.querySelector("#menu");
const sections = document.querySelectorAll("section");

// Creating sticky navigation
const navHeight = nav.getBoundingClientRect().height;
const navCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("nav__sticky");
  else nav.classList.remove("nav__sticky");
};
const navObserver = new IntersectionObserver(navCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
navObserver.observe(slider);

// Active navbar
const navLinks = document.querySelectorAll(".nav-bar__list ul li a");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (eve) => {
    // remove active class
    navLinks.forEach((nav) => nav.classList.remove("active__nav"));
    const link = eve.target.closest("a");
    link.classList.add("active__nav");

    hamburgerMenu.nextElementSibling.classList.remove("hamburger");
  });
});

const navLinkCallback = function (entries, observer) {
  const [entry] = entries;
  navLinks.forEach((nav) => {
    nav.classList.remove("active__nav");

    if (nav.getAttribute("href").replace("#", "") === entry.target.id) {
      nav.classList.add("active__nav");
    }
  });
};
const navLinkObserver = new IntersectionObserver(navLinkCallback, {
  root: null,
  threshold: [0.5, 1],
});
sections.forEach((navLink) => navLinkObserver.observe(navLink));

// toggle navigation
hamburgerMenu.addEventListener("click", (eve) => {
  const ele = eve.target.nextElementSibling;

  if (ele.classList.contains("hamburger")) ele.classList.remove("hamburger");
  else ele.classList.add("hamburger");
});

// reveal element on scroll
const hiddenSection = document.querySelectorAll(".section__hidden");

const hiddenSectionCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section__hidden");
  observer.unobserve(entry.target);
};
const hiddenSectionObserve = new IntersectionObserver(hiddenSectionCallback, {
  root: null,
  threshold: 0.1,
});

hiddenSection.forEach((sec) => hiddenSectionObserve.observe(sec));

// card slider
const cardSlider = document.querySelectorAll(".client-review__card");
const sliderDots = document.querySelector(".dots");

cardSlider.forEach((slider, i) => {
  slider.style.left = `20px`;
  slider.style.transform = `translateX(${i * 100}%)`;
});

// creating slider dots
cardSlider.forEach((_, i) => {
  sliderDots.insertAdjacentHTML(
    "beforeend",
    `<div class="slider__dot " data-slide="${i}"></div>`
  );
});

const gotoSlide = function (slide) {
  cardSlider.forEach((slider, i) => {
    slider.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};

// slider active
let currSlide = 0;
let timer;

const timerSlider = function () {
  return setInterval(() => {
    if (currSlide >= cardSlider.length - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    gotoSlide(currSlide);
    sliderActive(currSlide);
  }, 10000);
};

const sliderActive = function (slide) {
  document
    .querySelectorAll(".slider__dot")
    .forEach((dot) => dot.classList.remove("slider__dot-active"));

  document
    .querySelector(`.slider__dot[data-slide="${slide}"]`)
    .classList.add("slider__dot-active");
};
sliderActive(0);

sliderDots.addEventListener("click", (eve) => {
  if (eve.target.dataset.slide) {
    const dataSlide = eve.target.dataset.slide;

    if (timer) clearInterval(timer);
    timer = timerSlider();
    currSlide = dataSlide;

    gotoSlide(dataSlide);
    sliderActive(dataSlide);
  }
});

timer = timerSlider();

// customer card effect
const customers = document.querySelectorAll(".best-service__card");

const customerCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("best-service__card--effect");

  observer.unobserve(entry.target);
};
const customerObserver = new IntersectionObserver(customerCallback, {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
});

customers.forEach((customer) => customerObserver.observe(customer));
