document.addEventListener("DOMContentLoaded", function () {
  const offcanvas = document.getElementById("offcanvas");
  const offcanvasOverlay = document.getElementById("offcanvas-overlay");
  const offcanvasToggle = document.getElementById("offcanvas-toggle");

  offcanvasToggle.addEventListener("click", () => {
    offcanvas.classList.toggle("hidden");
  });

  offcanvasOverlay.addEventListener("click", () => {
    if (!offcanvas.classList.contains("hidden")) {
      offcanvas.classList.add("hidden");
    }
  });
});
