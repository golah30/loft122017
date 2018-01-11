function activate(e) {
  const container = document.querySelector('.hamburger-menu'),
    bgl = container.querySelector('.hamburger__bg-left'),
    bgr = container.querySelector('.hamburger__bg-right'),
    list = container.querySelector('.hamburger-menu__list'),
    items = container.querySelectorAll('.hamburger-menu__item');

  container.classList.add('hamburger-menu--active');

  setTimeout(function() {
    bgl.classList.add('hamburger__bg-left--active');
    bgr.classList.add('hamburger__bg-right--active');
    list.classList.add('hamburger-menu__list--active');

    let delay = 1000 / items.length;
    for (let i = 0; i < items.length; ++i) {
      setTimeout(function() {
        items[i].classList.add('hamburger-menu__item--active');
      }, delay * i + 2);
    }
  }, 100);
}

function close(e) {
  const container = document.querySelector('.hamburger-menu'),
    bgl = container.querySelector('.hamburger__bg-left'),
    bgr = container.querySelector('.hamburger__bg-right'),
    list = container.querySelector('.hamburger-menu__list'),
    items = container.querySelectorAll('.hamburger-menu__item');

  let delay = 500 / items.length;
  for (let i = 0; i < items.length; ++i) {
    setTimeout(function() {
      let index = items.length - i - 1;
      items[index].classList.remove('hamburger-menu__item--active');

      if (i == items.length - 1) {
        bgl.classList.remove('hamburger__bg-left--active');
        bgr.classList.remove('hamburger__bg-right--active');
        list.classList.remove('hamburger-menu__list--active');
        setTimeout(function() {
          container.classList.remove('hamburger-menu--active');
        }, 300);
      }
    }, delay * i + 2);
  }
}

module.exports = function() {
  const cl = document.querySelector('.hamburger-menu__close'),
    open = document.querySelector('.hamburger');

  open.addEventListener('click', activate);
  cl.addEventListener('click', close);
};
