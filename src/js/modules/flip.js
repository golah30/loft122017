module.exports = function() {
  const link = document.querySelector('.auth-button');
  const back = document.querySelector('.auth__back-link');

  link.addEventListener('click', e => {
    e.preventDefault();
    let flip = document.querySelector('.flip'),
      welcome = document.querySelector('.welcome'),
      auth = document.querySelector('.auth');

    flip.classList.toggle('flip--active');
    setTimeout(() => {
      welcome.classList.toggle('welcome--active');
      auth.classList.toggle('auth--active');
    }, 250);

    e.target.style.display = 'none';
  });

  back.addEventListener('click', e => {
    e.preventDefault();
    let flip = document.querySelector('.flip'),
      welcome = document.querySelector('.welcome'),
      auth = document.querySelector('.auth');

    flip.classList.toggle('flip--active');
    setTimeout(() => {
      welcome.classList.toggle('welcome--active');
      auth.classList.toggle('auth--active');
    }, 250);

    document.querySelector('.auth-button').style.display = 'block';
  });
};
