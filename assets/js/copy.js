/* Кнопка «Скопировать текст»: clipboard API + fallback.
   Подпись меняется на «Скопировано» на 2 секунды. */
(function () {
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.getAttribute("data-copy"));
      if (!el) return;
      var text = el.textContent.trim();
      var done = function () {
        var original = btn.textContent;
        btn.textContent = "Скопировано";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove("copied");
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(); });
      } else {
        fallback();
      }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });
})();
