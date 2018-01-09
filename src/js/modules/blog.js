class Blog {
  constructor(link, data) {
    this.data = {
      posts: [],
      menuItems: [],
      active: 0,
      max: 0
    };

    this.buildElementsStruct(data);
    this.drawBlog(link);
    this.initialActiveState();
    this.initScrollListener();
    this.initButtonListener(link);
  }
  buildElementsStruct(data) {
    for (let i = 0; i < data.length; ++i) {
      this.data.posts.push(this.createPost(data[i]));
      this.data.menuItems.push(this.createMenuItem(data[i].title, i));
    }
    this.data.max = this.data.menuItems.length;
  }
  createPost(post) {
    let blogPost = document.createElement('div'),
      blogPostTitle = document.createElement('div'),
      blogPostDate = document.createElement('div'),
      blogPostContent = document.createElement('div'),
      blogPostTitleH1 = document.createElement('h1');

    blogPost.classList.add('blog-post');
    blogPostTitle.classList.add('blog-post__title');
    blogPostDate.classList.add('blog-post__date');
    blogPostContent.classList.add('blog-post__content');
    blogPostTitleH1.classList.add('block-title');

    blogPostTitleH1.innerText = post.title;
    blogPostDate.innerText = post.date;

    blogPostTitle.appendChild(blogPostTitleH1);
    for (let paragraph of post.text) {
      let p = document.createElement('p');
      p.innerText = paragraph;
      blogPostContent.appendChild(p);
    }

    blogPost.appendChild(blogPostTitle);
    blogPost.appendChild(blogPostDate);
    blogPost.appendChild(blogPostContent);

    return blogPost;
  }
  createMenuItem(title, num) {
    let item = document.createElement('li'),
      link = document.createElement('a');

    item.classList.add('blog-menu__item');
    link.setAttribute('href', num);
    link.classList.add('blog-menu__link');
    link.innerText = title;

    item.appendChild(link);

    return item;
  }
  createMenu(list) {
    let blogMenu = document.createElement('ul'),
      button = document.createElement('div');
    button.classList.add('blog-menu-tablet-button');
    blogMenu.classList.add('blog-menu');
    for (let menuItem of list) {
      blogMenu.appendChild(menuItem);
    }
    blogMenu.appendChild(button);

    return blogMenu;
  }
  drawBlog(link) {
    let menuContainer = document.createElement('div'),
      postsContainer = document.createElement('div');

    menuContainer.classList.add('blog-nav');
    postsContainer.classList.add('posts');

    menuContainer.appendChild(this.createMenu(this.data.menuItems));
    for (let post of this.data.posts) {
      postsContainer.appendChild(post);
    }

    let box = document.querySelector(link);
    box.appendChild(menuContainer);
    box.appendChild(postsContainer);
  }
  initialActiveState() {
    this.data.menuItems[this.data.active].classList.add(
      'blog-menu__item--active'
    );
  }
  movableMenu(container, menu) {
    if (container.getBoundingClientRect().top < 0) {
      if (!menu.classList.contains('blog-menu--scroll-active')) {
        menu.classList.add('blog-menu--scroll-active');
        menu
          .querySelector('.blog-menu-tablet-button')
          .classList.add('blog-menu-tablet-button--active');
      }
    } else {
      if (menu.classList.contains('blog-menu--scroll-active')) {
        menu.classList.remove('blog-menu--scroll-active');
        menu
          .querySelector('.blog-menu-tablet-button')
          .classList.remove('blog-menu-tablet-button--active');
      }
    }
  }
  processScroll() {
    let container = document.querySelector('.blog-nav');
    let elem = document.querySelector('.blog-menu');

    //Если блок пропал - не обрабатывать
    if (getComputedStyle(container).display != 'none') {
      //Двигаем меню
      this.movableMenu(container, elem);
    }

    if (
      this.data.posts[this.data.active].getBoundingClientRect().top + 200 > 0 &&
      this.data.active - 1 >= 0
    ) {
      this.data.menuItems[this.data.active].classList.remove(
        'blog-menu__item--active'
      );
      this.data.active--;
      this.data.menuItems[this.data.active].classList.add(
        'blog-menu__item--active'
      );
    }

    if (
      this.data.active + 1 <= this.data.max &&
      this.data.posts[this.data.active + 1].getBoundingClientRect().top - 400 <=
        0
    ) {
      this.data.menuItems[this.data.active].classList.remove(
        'blog-menu__item--active'
      );
      this.data.active++;
      this.data.menuItems[this.data.active].classList.add(
        'blog-menu__item--active'
      );
    }
  }
  initScrollListener() {
    window.addEventListener('scroll', e => this.processScroll());
  }
  linkListener(e) {
    this.data.posts[parseInt(e.target.getAttribute('href'))].scrollIntoView();
  }
  initButtonListener(link) {
    document
      .querySelector('.blog-menu-tablet-button')
      .addEventListener('click', e => {
        let menu = document.querySelector('.blog-menu');
        menu.classList.toggle('blog-menu--open');
        e.stopPropagation();
      });

    document.querySelector(link).addEventListener('click', () => {
      let menu = document.querySelector('.blog-menu');
      if (menu.classList.contains('blog-menu--open'))
        menu.classList.remove('blog-menu--open');
    });

    for (let link of this.data.menuItems) {
      let a = link.querySelector('.blog-menu__link');
      a.addEventListener('click', e => {
        e.preventDefault();
        this.linkListener(e);
      });
    }
  }
}

module.exports = function() {
  let data = [
    {
      title: 'Самое важное в SASS',
      date: '22 ноября 2016',
      text: [
        'Таким образом начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке направлений прогрессивного развития. Разнообразный и богатый опыт новая модель организационной деятельности играет важную роль в формировании новых предложений. Товарищи! Новая модель организационной деятельности играет важную роль в формировании систем массового участия.',
        'Не следует, однако забывать, что укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия. Идейные соображения высшего порядка, а также рамки и место обучения кадров обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленых задач. Тавариши! Постоянный количественный рост и сфера нашей активности способствует подготовке и реализации модели развития. С другой стороны рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы обучения кадров, соответсвует насущным потребностям.'
      ]
    },
    {
      title: 'Приёмы в верстке, без которых не обходится ни один сайт',
      date: '13 ноября 2016',
      text: [
        'Таким образом начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке направлений прогрессивного развития. Разнообразный и богатый опыт новая модель организационной деятельности играет важную роль в формировании новых предложений. Товарищи! Новая модель организационной деятельности играет важную роль в формировании систем массового участия.',
        'Не следует, однако забывать, что укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия. Идейные соображения высшего порядка, а также рамки и место обучения кадров обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленых задач. Тавариши! Постоянный количественный рост и сфера нашей активности способствует подготовке и реализации модели развития. С другой стороны рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы обучения кадров, соответсвует насущным потребностям.'
      ]
    },
    {
      title: 'Приёмы в верстке, без которых не обходится ни один сайт',
      date: '13 ноября 2016',
      text: [
        'Таким образом начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке направлений прогрессивного развития. Разнообразный и богатый опыт новая модель организационной деятельности играет важную роль в формировании новых предложений. Товарищи! Новая модель организационной деятельности играет важную роль в формировании систем массового участия.',
        'Не следует, однако забывать, что укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия. Идейные соображения высшего порядка, а также рамки и место обучения кадров обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленых задач. Тавариши! Постоянный количественный рост и сфера нашей активности способствует подготовке и реализации модели развития. С другой стороны рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы обучения кадров, соответсвует насущным потребностям.'
      ]
    },
    {
      title: 'Приёмы в верстке, без которых не обходится ни один сайт',
      date: '13 ноября 2016',
      text: [
        'Таким образом начало повседневной работы по формированию позиции позволяет выполнять важные задания по разработке направлений прогрессивного развития. Разнообразный и богатый опыт новая модель организационной деятельности играет важную роль в формировании новых предложений. Товарищи! Новая модель организационной деятельности играет важную роль в формировании систем массового участия.',
        'Не следует, однако забывать, что укрепление и развитие структуры обеспечивает широкому кругу (специалистов) участие в формировании систем массового участия. Идейные соображения высшего порядка, а также рамки и место обучения кадров обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленых задач. Тавариши! Постоянный количественный рост и сфера нашей активности способствует подготовке и реализации модели развития. С другой стороны рамки и место обучения кадров влечет за собой процесс внедрения и модернизации системы обучения кадров, соответсвует насущным потребностям.'
      ]
    }
  ];

  new Blog('.container-blog', data);
};
