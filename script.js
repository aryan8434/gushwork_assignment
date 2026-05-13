const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) {
      const prevText = submitBtn.textContent;
      submitBtn.textContent = "Submitted";
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.textContent = prevText;
        submitBtn.disabled = false;
        form.reset();
      }, 1800);
    }
  });
});

const stickyTopbar = document.getElementById("stickyTopbar");
const siteHeader = document.querySelector(".site-header");
const hero = document.querySelector(".hero-wrap");

let lastScrollY = window.scrollY;

const toggleStickyHeader = () => {
  const threshold = hero ? hero.offsetHeight * 0.85 : 500;
  const currentY = window.scrollY;

  if (currentY > threshold && currentY > lastScrollY) {
    stickyTopbar?.classList.add("visible");
    siteHeader?.classList.add("offset");
  } else if (currentY < threshold || currentY < lastScrollY) {
    stickyTopbar?.classList.remove("visible");
    siteHeader?.classList.remove("offset");
  }

  lastScrollY = currentY;
};

window.addEventListener("scroll", toggleStickyHeader, { passive: true });

const track = document.getElementById("industryTrack");
const prevBtn = document.getElementById("industryPrevTop");
const nextBtn = document.getElementById("industryNextTop");
const carousel = document.getElementById("industryCarousel");
let index = 0;

const getVisibleItems = () => {
  if (window.innerWidth <= 800) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
};

const updateCarousel = () => {
  if (!track || !carousel) return;
  const items = track.children;
  if (!items.length) return;
  const itemWidth = items[0].getBoundingClientRect().width + 16;
  const maxIndex = Math.max(0, items.length - getVisibleItems());
  if (maxIndex === 0) {
    index = 0;
  } else {
    index = ((index % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1);
  }
  track.style.transform = `translateX(-${index * itemWidth}px)`;
};

prevBtn?.addEventListener("click", () => {
  index -= 1;
  updateCarousel();
});

nextBtn?.addEventListener("click", () => {
  index += 1;
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);
updateCarousel();
