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
