class Slider {
  constructor(link, data) {
    this.container = document.querySelector(link);
    this.inProgress = false;
    this.currentElementId = 0;
    this.defineProps();
    this.initData(data);
    this.insertData();
    this.initActiveEl();
    this.initActiveDesc();
    this.addHandlers();
  }
  defineProps() {
    this.desc = {
      title: this.container.querySelector('.slider-desc-title'),
      tech: this.container.querySelector('.slider-desc-technologies'),
      link: this.container.querySelector('.slider-desc-link')
    };
    this.mainSlideContainer = this.container.querySelector('.slider-demo-list');
    this.controls = {
      up: {
        slideContainer: this.container.querySelector(
          '.slider-controls-up .slider-controls-list'
        ),
        button: this.container.querySelector('.slider-controls-up__button')
      },
      down: {
        slideContainer: this.container.querySelector(
          '.slider-controls-down .slider-controls-list'
        ),
        button: this.container.querySelector('.slider-controls-down__button')
      }
    };
  }
  createElement(liClass, imClass, imLink) {
    let li = document.createElement('li'),
      img = document.createElement('img');
    li.classList.add(liClass);
    img.setAttribute('src', imLink);
    img.classList.add(imClass);
    li.appendChild(img);
    return li;
  }
  initData(data) {
    this.data = {
      mainList: [],
      upList: [],
      downList: []
    };
    //КОСТЫЛЬ
    this.json = data;
    //
    this.data.maxID = data.length - 1;
    for (let obj of data) {
      this.data.mainList.push(
        this.createElement(
          'slider-demo-list__item',
          'slider-demo-list__img',
          obj.img
        )
      );
      this.data.upList.push(
        this.createElement(
          'slider-controls__item',
          'slider-controls-list__img',
          obj.img
        )
      );
      this.data.downList.push(
        this.createElement(
          'slider-controls__item',
          'slider-controls-list__img',
          obj.img
        )
      );
    }
  }
  insertData() {
    for (let i = 0; i < this.data.mainList.length; ++i) {
      this.mainSlideContainer.appendChild(this.data.mainList[i]);
      this.controls.up.slideContainer.appendChild(this.data.upList[i]);
      this.controls.down.slideContainer.appendChild(this.data.downList[i]);
    }
  }
  getSubIds() {
    return [
      this.currentElementId == 0 ? this.data.maxID : this.currentElementId - 1,
      this.currentElementId == this.data.maxID ? 0 : this.currentElementId + 1
    ];
  }
  initActiveEl() {
    let [upID, downID] = this.getSubIds();

    this.data.mainList[this.currentElementId].classList.add(
      'slider-demo-list__item--active'
    );
    this.data.upList[upID].classList.add('slider-controls__item--active');
    this.data.downList[downID].classList.add('slider-controls__item--active');
  }
  removeActiveEl() {
    let [upID, downID] = this.getSubIds();

    this.data.mainList[this.currentElementId].classList.remove(
      'slider-demo-list__item--active'
    );
    this.data.upList[upID].classList.remove('slider-controls__item--active');
    this.data.downList[downID].classList.remove(
      'slider-controls__item--active'
    );
  }
  unlockSlider() {
    this.inProgress = false;
  }
  createLetterElement(data, cl) {
    let words = data.split(' '),
      span = document.createElement('span'),
      wspan,
      lspan;

    for (let word of words) {
      wspan = document.createElement('span');
      wspan.classList.add('span-white-space');
      for (let letter of word) {
        lspan = document.createElement('span');
        lspan.classList.add(cl);
        lspan.innerText = letter;
        wspan.appendChild(lspan);
      }
      span.appendChild(wspan);
      wspan = document.createElement('span');
      wspan.innerText = ' ';
      span.appendChild(wspan);
    }

    return span;
  }
  initActiveDesc() {
    function animate(array) {
      let delay = 500 / array.length;
      for (let i = 0; i < array.length; ++i) {
        setTimeout(function() {
          array[i].classList.add('slider-desc-title__letter--active');
        }, delay * i);
      }
    }

    let item = this.json[this.currentElementId];
    this.desc.link.setAttribute('href', item.link);

    this.desc.title.innerHTML = '';
    this.desc.tech.innerHTML = '';

    this.desc.title.appendChild(
      this.createLetterElement(item.title, 'slider-desc-title__letter')
    );

    this.desc.tech.appendChild(
      this.createLetterElement(item.tech, 'slider-desc-title__letter')
    );

    let title = this.desc.title.querySelectorAll('.slider-desc-title__letter'),
      tech = this.desc.tech.querySelectorAll('.slider-desc-title__letter');

    animate(title);
    animate(tech);
  }
  processUp() {
    if (this.inProgress) return false;
    this.inProgress = true;
    this.removeActiveEl();
    this.currentElementId == 0
      ? (this.currentElementId = this.data.maxID)
      : this.currentElementId--;
    this.initActiveEl();
    this.initActiveDesc();
    setTimeout(() => {
      this.unlockSlider();
    }, 600);
  }
  processDown() {
    if (this.inProgress) return false;
    this.inProgress = true;
    this.removeActiveEl();
    this.currentElementId == this.data.maxID
      ? (this.currentElementId = 0)
      : this.currentElementId++;
    this.initActiveEl();
    this.initActiveDesc();
    setTimeout(() => {
      this.unlockSlider();
    }, 500);
  }

  addHandlers() {
    this.controls.up.button.addEventListener('click', () => this.processUp());
    this.controls.down.button.addEventListener('click', () =>
      this.processDown()
    );
  }
}

module.exports = function() {
  const data = [
    {
      title: 'Сайт школы онлайн образования',
      tech: 'hmtl,css,javascript,1',
      link: '#first',
      img: './img/works/work-1.png'
    },
    {
      title: 'Агенство интернет-решений',
      tech: 'hmtl,css,javascript,2',
      link: '#second',
      img: './img/works/work-2.png'
    },
    {
      title: 'Портал видеоуроков и ИТ сообщество',
      tech: 'hmtl,css,javascript,3',
      link: '#third',
      img: './img/works/work-3.png'
    },
    {
      title: 'Йога студия',
      tech: 'hmtl,css,javascript,4',
      link: '#fourth',
      img: './img/works/work-4.png'
    }
  ];

  new Slider('.slider', data);
};
