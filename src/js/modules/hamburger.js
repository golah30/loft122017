function activate(e) {
  const container = document.querySelector('.hamburger-menu'),
    bgl = container.querySelector('.hamburger__bg-left'),
    bgr = container.querySelector('.hamburger__bg-right'),
    list = container.querySelector('.hamburger-menu__list');

  container.classList.add('hamburger-menu--active');

  setTimeout(function() {
    bgl.classList.add('hamburger__bg-left--active');
    bgr.classList.add('hamburger__bg-right--active');
    list.classList.add('hamburger-menu__list--active');
  }, 100);
}

function close(e) {
  const container = document.querySelector('.hamburger-menu'),
    bgl = container.querySelector('.hamburger__bg-left'),
    bgr = container.querySelector('.hamburger__bg-right'),
    list = container.querySelector('.hamburger-menu__list');

  bgl.classList.remove('hamburger__bg-left--active');
  bgr.classList.remove('hamburger__bg-right--active');
  list.classList.remove('hamburger-menu__list--active');
  setTimeout(function() {
    container.classList.remove('hamburger-menu--active');
  }, 300);
}

module.exports = function() {
  const cl = document.querySelector('.hamburger-menu__close'),
    open = document.querySelector('.hamburger');

  open.addEventListener('click', activate);
  cl.addEventListener('click', close);
};
