const mod = require('./modules/console.js');
const slider = require('./modules/slider.js');
const hamburger = require('./modules/hamburger.js');
hamburger();
if (document.querySelector('.slider')) slider();

var map = new google.maps.Map(document.querySelector('.about-contacts__map'), {
  center: { lat: 48.575, lng: 35.09 },
  zoom: 17,
  scrollwheel: false,
  styles: [
    { elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
    {
      featureType: 'landscape',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#111111' }]
    },
    { elementType: 'labels.text.fill', stylers: [{ color: '#a6a6a6' }] },

    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#eaeaea' }]
    },

    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#c2c2c2' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#61dac9' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#c2c2c2' }]
    }
  ],
  disableDefaultUI: true
});
