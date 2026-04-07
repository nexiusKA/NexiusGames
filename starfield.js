/* Animated star field for the Nexius Games hub */
(function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');

  let W, H, stars = [];
  const STAR_COUNT = 180;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomStar() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random() * 0.7 + 0.15,
      speed: Math.random() * 0.25 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: Math.random() < 0.5 ? 1 : -1,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: STAR_COUNT }, randomStar);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (const s of stars) {
      // gentle twinkle
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha >= 0.85 || s.alpha <= 0.1) s.twinkleDir *= -1;

      // slow drift downward
      s.y += s.speed;
      if (s.y > H) { s.y = 0; s.x = Math.random() * W; }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 255, ${s.alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();
