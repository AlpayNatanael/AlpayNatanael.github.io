/* One index and one timer per slideshow; the fixed CSS frame prevents jumps. */
(() => {
  document.querySelectorAll("[data-slideshow]").forEach(carousel => {
    const slides = [...carousel.querySelectorAll(".slide")];
    const controls = carousel.querySelector(".slideshow-controls");
    if (slides.length < 2 || !controls) return;
    const previous = carousel.querySelector("[data-previous]");
    const next = carousel.querySelector("[data-next]");
    const toggle = carousel.querySelector("[data-toggle]");
    const counter = carousel.querySelector(".photo-counter");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let index = 0;
    let playing = !motion.matches;
    let timer;
    function show(value, announce = false) {
      index = (value + slides.length) % slides.length;
      slides.forEach((slide, i) => { slide.hidden = i !== index; });
      // Fetch the following photo ahead of time while keeping its frame hidden.
      slides[(index + 1) % slides.length].loading = "eager";
      counter.setAttribute("aria-live", announce ? "polite" : "off");
      counter.textContent = `${index + 1} / ${slides.length}`;
    }
    function updateTimer() {
      clearInterval(timer);
      toggle.textContent = playing ? "Pause slideshow" : "Play slideshow";
      if (playing && !document.hidden && !carousel.matches(":hover") && !carousel.contains(document.activeElement)) {
        timer = setInterval(() => show(index + 1), 15000);
      }
    }
    previous.addEventListener("click", () => { show(index - 1, true); updateTimer(); });
    next.addEventListener("click", () => { show(index + 1, true); updateTimer(); });
    toggle.addEventListener("click", () => { playing = !playing; updateTimer(); });
    carousel.addEventListener("mouseenter", updateTimer);
    carousel.addEventListener("mouseleave", updateTimer);
    carousel.addEventListener("focusin", updateTimer);
    carousel.addEventListener("focusout", () => setTimeout(updateTimer, 0));
    document.addEventListener("visibilitychange", updateTimer);
    motion.addEventListener("change", () => { if (motion.matches) playing = false; updateTimer(); });
    controls.hidden = false;
    show(0);
    updateTimer();
  });
})();
