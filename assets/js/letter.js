

(function () {
  var doc = document;
  var root = doc.documentElement;
  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initIntro() {
    var dialog = doc.getElementById("intro");
    if (!dialog || typeof dialog.showModal !== "function") return;

    var title = doc.getElementById("letter-title");
    var closing = false;

    function finishClose() {
      closing = false;
      dialog.classList.remove("is-closing");
      if (dialog.open) dialog.close();
    }

    function requestClose() {
      if (closing || !dialog.open) return;
      if (reduceMotion) {
        dialog.close();
        return;
      }
      closing = true;
      dialog.classList.add("is-closing");
      window.setTimeout(finishClose, 380);
    }

    dialog.querySelectorAll("[data-intro-close]").forEach(function (button) {
      button.addEventListener("click", requestClose);
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) requestClose();
    });

    // closing modal, including the Escape key.
    dialog.addEventListener("close", function () {
      doc.body.classList.remove("intro-open");
      closing = false;
      dialog.classList.remove("is-closing");
      if (window.scrollY < 120 && title) title.focus({ preventScroll: true });
    });

    doc.body.classList.add("intro-open");
    dialog.showModal();
  }

  function initReveal() {
    var items = doc.querySelectorAll(".letter_reveal");
    if (!items.length || reduceMotion || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    root.classList.add("reveal-ready");
    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  initReveal();
  initIntro();
})();
