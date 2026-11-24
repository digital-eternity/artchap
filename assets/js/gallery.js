/* Галерея «Исполнительская практика»: одна строка, горизонтальный скролл.
   Фото подгружаются из assets/img/gallery/ по manifest.json,
   видео-слоты готовы под встраивание VK (см. index.html). */

(function () {
  var strip = document.getElementById("perf-gallery");
  if (!strip) return;

  fetch("assets/img/gallery/manifest.json")
    .then(function (r) { return r.json(); })
    .then(function (items) {
      items.forEach(function (item) {
        var fig = document.createElement("figure");
        fig.className = "gallery-item";

        var img = document.createElement("img");
        img.src = "assets/img/gallery/" + item.file;
        img.alt = item.alt || "Фото с выступления";
        img.loading = "lazy";

        fig.appendChild(img);
        strip.insertBefore(fig, strip.firstChild);
      });
    })
    .catch(function () { /* манифест недоступен — остаются только видео-слоты */ });
})();

/* Фильтры-чипы видео в «Исполнительской практике» (data-cat на .gallery-item) */
(function () {
  var chips = document.querySelectorAll(".filter-chips .chip");
  var items = document.querySelectorAll("#video-gallery .gallery-item");
  if (!chips.length || !items.length) return;

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.dataset.filter;

      chips.forEach(function (c) { c.classList.toggle("is-active", c === chip); });

      items.forEach(function (item) {
        var show = filter === "all" || item.dataset.cat === filter;
        item.style.display = show ? "" : "none";
      });
    });
  });
})();
