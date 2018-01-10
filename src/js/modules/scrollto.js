module.exports = function(animate, duration) {
  const link = document.querySelector('.hero__arrow');

  link.addEventListener('click', e => {
    e.preventDefault();
    if (!e.currentTarget.classList.contains('hero__arrow')) {
      return false;
    }
    const target = document.getElementById(
        e.currentTarget.getAttribute('href').slice(1)
      ),
      offset = target.getBoundingClientRect().top,
      baseOffset = window.pageYOffset,
      x = offset / duration;

    function scroll(step) {
      document.documentElement.scrollTop = baseOffset + step * x;
      document.body.scrollTop = baseOffset + step * x;
    }

    animate(scroll, duration);
  });
};
