document.addEventListener("DOMContentLoaded", function () {
  initTheme();
});

function initTheme() {
  var toggle = document.querySelector(".theme-toggle");
  var root = document.documentElement;
  var stored = null;

  try {
    stored = localStorage.getItem("diagnostic-theme");
  } catch (e) {
    // Fail gracefully
    console.error(e);
  }

  var initial = stored;
  if (!initial) {
    initial = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark"; // Start with system theme preference
  }

  applyTheme(initial);

  if (!toggle) return;

  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem("diagnostic-theme", next);
    } catch (e) {
      // Fail Gacefully with error consoled.
      console.error(e);
    }
  });

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    if (toggle) {
      toggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
      toggle.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
      var label = toggle.querySelector("#theme-label, .theme-toggle_label");
      if (label) label.textContent = theme === "light" ? "Light" : "Dark";
    }
  }
}
