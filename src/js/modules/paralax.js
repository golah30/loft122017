module.exports = function() {
  let container = document.querySelector('.welcome-wrap');
  if (getComputedStyle(container).zIndex == '201') {
    return false;
  }

  let parallaxContainer = document.querySelector('.paralax-container'),
    layers = parallaxContainer.children;
  parallaxContainer.setAttribute('data-loaded', '0');

  const path = './img/paralax-min/',
    imageLinks = [
      path + 'Layer-7-min.png',
      path + 'Layer-6-min.png',
      path + 'Layer-5-min.png',
      path + 'cloud3-min.png',
      path + 'Layer-4-min.png',
      path + 'Layer-3-min.png',
      path + 'cloud2-min.png',
      path + 'Layer-2-min.png',
      path + 'Layer-1-min.png',
      path + 'cloud1-min.png'
    ];

  for (let i = 0; i < layers.length; ++i) {
    let image = layers[i].firstElementChild;
    image.setAttribute('src', imageLinks[i]);
    image.onload = function() {
      let container = document.querySelector('.paralax-container'),
        loaded = parseInt(container.getAttribute('data-loaded'));
      loaded++;
      console.log(loaded);

      container.setAttribute('data-loaded', loaded);

      if (loaded == 10) {
        setTimeout(() => {
          document
            .querySelector('.welcome-wrap')
            .classList.remove('background-tablets');
        }, 300);
      }
    };
  }

  let moveLayers = function(e) {
    let initialX = window.innerWidth / 2 - e.pageX;
    let initialY = window.innerHeight / 2 - e.pageY;

    [].slice.call(layers).forEach(function(layer, index) {
      let divider = index / 50,
        positionX = initialX * divider,
        positionY = initialY * divider,
        bottomPosition = window.innerHeight / 2 * divider,
        transformString =
          'translate3d(' + positionX + 'px,' + positionY + 'px, 0)',
        image = layer.firstElementChild;

      layer.style.transform = transformString;
      image.style.bottom = '-' + bottomPosition + 'px';
    });
  };

  window.addEventListener('mousemove', moveLayers);
};
