document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initNav();
});

function initTheme() {
  var toggle = document.querySelector(".theme-toggle");
  var root = document.documentElement;
  var stored = null;

  try {
    stored = localStorage.getItem("diagnostic-theme");
  } catch (e) {
    // localStorage unavailable (private browsing, etc). Fall back to system preference only.
  }

  var initial = stored;
  if (!initial) {
    initial = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  applyTheme(initial);

  if (!toggle) return;

  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem("diagnostic-theme", next);
    } catch (e) {
      // ignore, theme just won't persist across visits
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
      var label = toggle.querySelector("#theme-label, .theme-toggle__label");
      if (label) label.textContent = theme === "light" ? "Light" : "Dark";
    }
  }
}

function initNav() {
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  var scrim = document.querySelector(".nav__scrim");

  if (!toggle || !links) return;

  function setOpen(isOpen) {
    links.classList.toggle("is-open", isOpen);
    if (scrim) scrim.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    toggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
  }

  toggle.addEventListener("click", function () {
    setOpen(!links.classList.contains("is-open"));
  });

  if (scrim) {
    scrim.addEventListener("click", function () {
      setOpen(false);
    });
  }

  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 880) setOpen(false);
  });
}
