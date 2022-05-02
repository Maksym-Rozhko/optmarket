document.addEventListener('DOMContentLoaded', () => {
  const switchLange = document.querySelector('.switch_lange');
  const langDropdownList = document.querySelector('.lang_dropdown');
  const burgerMenuElem = document.querySelector('.burger-menu');
  const headerNavMenuBg = document.querySelector('.header-top');
    
  window.addEventListener('click', (e) => {
		const target = e.target;
		if (!target.closest('.switch_lange')) {
			switchLange.classList.remove('switch_lange--active');
			langDropdownList.classList.remove('lang_dropdown__open');
		}
	});

  switchLange.addEventListener('click', () => {
		switchLange.classList.toggle('switch_lange--active');
		langDropdownList.classList.toggle('lang_dropdown__open');
	});

  window.addEventListener('click', (e) => {
      const target = e.target;
      if (!target.closest('.burger-menu') && !target.closest('.header-top')) {
          burgerMenuElem.classList.remove('burger-menu__active');
          headerNavMenuBg.classList.remove('header-top__active');
      };
  });

  burgerMenuElem.addEventListener('click', () => {
      burgerMenuElem.classList.toggle('burger-menu__active');
      headerNavMenuBg.classList.toggle('header-top__active');
  });

  const mainScreenSlider = new Swiper('.swiper-container.main-slider', {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
      pagination: {
        el: '.main-slider__pagin',
        clickable: true,
      },
  });

  const popularSlider = new Swiper('.popular-slider.swiper-container', {
    slidesPerView: 4,
    spaceBetween: 10,

    breakpoints: {
      300: {
        slidesPerView: 1,
        spaceBetween: 150,
      },
      675: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1000: {
        slidesPerView: 3,
      },
      1400: {
        slidesPerView: 4,
      },
    }
  });

  // video Initialization
  function findVideos() {
    let videos = document.querySelectorAll('.video');

    for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    };
  };

  function setupVideo(video) {
    let link = video.querySelector('.video__link');
    let media = video.querySelector('.video__media');
    let button = video.querySelector('.video__button');
    let id = parseMediaUrl(media);

    video.addEventListener('click', () => {
      let iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
    });

    link.removeAttribute('href');
    video.classList.add('video--enabled');
  };

  function parseMediaUrl(media) {
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\//;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
  };

  function createIframe(id) {
    let iframe = document.createElement('iframe');
    iframe.setAttribute('allowfullscreen', 'allowfullscreen');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('title', 'YouTube video player');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video');

    return iframe;
  };

  function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
  }

  findVideos();
});