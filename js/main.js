// Portfolio v2 — home. Dos cosas, nada más:
// 1. La entrada (SECCIONES §5): el saludo dura lo que tarda la carga real, con techo de 4 s, y se salta con clic, tecla o scroll.
// 2. Los vídeos de la lista (SECCIONES §4): se reproducen al entrar en pantalla; con movimiento reducido muestran su primer cuadro.

(function () {
  var html = document.documentElement;

  // ---- 1. Entrada ----
  if (html.dataset.entrance === 'pending') {
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      html.dataset.entrance = 'done';
      try { sessionStorage.setItem('greeted', '1'); } catch (e) {}
      window.removeEventListener('click', finish);
      window.removeEventListener('keydown', finish);
      window.removeEventListener('scroll', finish);
    }
    window.addEventListener('load', finish);
    setTimeout(finish, 4000);
    window.addEventListener('click', finish);
    window.addEventListener('keydown', finish);
    window.addEventListener('scroll', finish, { passive: true });
  }

  // ---- 2. Vídeos de la lista ----
  var videos = document.querySelectorAll('.project-media video');
  if (!videos.length) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;   // se queda el primer cuadro
  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.play().catch(function () {});
      else entry.target.pause();
    });
  }, { threshold: 0.2 });
  videos.forEach(function (v) { seen.observe(v); });
})();
