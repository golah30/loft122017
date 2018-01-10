window.addEventListener('load', () => {
  let cont = document.querySelector('.preloader'),
    c1 = document.querySelector('.preloader__circle1'),
    c2 = document.querySelector('.preloader__circle2'),
    c3 = document.querySelector('.preloader__circle3');
  setTimeout(() => {
    c1.classList.add('preloader--hide');
  }, 500);
  setTimeout(() => {
    c2.classList.add('preloader--hide');
  }, 1000);
  setTimeout(() => {
    c3.classList.add('preloader--hide');
  }, 1500);
  setTimeout(() => {
    cont.classList.add('preloader--hide');
  }, 2000);
  setTimeout(() => {
    cont.classList.add('preloader--close');
  }, 2500);
});
