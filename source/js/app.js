document.addEventListener('DOMContentLoaded', () => {
  try {
    customVideoCreator();
    scrollToTop();
    burgerMenu();
    accordionMenu();
    initSliders();
    productPreviewImages();
    tabsHandler();
  } catch (error) {
  }
  calcBAsketQuantity();

  const disableScroll = () => {
    const widthScroll = window.innerWidth - document.body.offsetWidth;
    document.body.dbScrollY = window.scrollY;
    document.body.style.cssText = `
        position: fixed;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        top: ${-window.scrollY}px;
        padding-right: ${widthScroll}px;
    `;
    document.body.classList.add('disabled-scroll');
  };
  
  const enableScroll = () => {
    document.body.classList.remove('disabled-scroll');
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dbScrollY
    });
  };

  function burgerMenu() {
    const burgerMenuElem = document.querySelector('.burger-menu');
    const headerNavMenuBg = document.querySelector('.header');

    window.addEventListener('click', (e) => {
      const target = e.target;
      if(document.querySelector('body').classList.contains('disabled-scroll')) {
        if (!target.closest('.burger-menu') && !target.closest('.header')) {
          burgerMenuElem.classList.remove('burger-menu__active');
          headerNavMenuBg.classList.remove('header__active');
          enableScroll();
        };
      }
    });

    burgerMenuElem.addEventListener('click', () => {
      burgerMenuElem.classList.toggle('burger-menu__active');
      headerNavMenuBg.classList.toggle('header__active');
      document.querySelector('body').classList.contains('disabled-scroll') ? enableScroll() : disableScroll();
    });
  }

  // video Initialization
  function customVideoCreator() {
    // video Initialization
    const findVideos = () => {
      let videos = document.querySelectorAll('.video');

      videos.forEach((item) => {
        setupVideo(item);
      });
    };

    const setupVideo = (video) => {
      let link = video.querySelector('.video__link');
      let media = video.querySelector('.video__media');
      let button = video.querySelector('.video__button');
      let id = parseMediaUrl(media);

      video.addEventListener('click', () => {
        let iframe = createIframe(id);

        link.remove();
        button.remove();
        video.append(iframe);
      });

      link.removeAttribute('href');
      video.classList.add('video--enabled');
    };

    const parseMediaUrl = (media) => {
      let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\//;
      let url = media.src;
      let match = url.match(regexp);

      return match[1];
    };

    const createIframe = (id) => {
      let iframe = document.createElement('iframe');
      iframe.setAttribute('allowfullscreen', 'allowfullscreen');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('title', 'YouTube video player');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('src', generateURL(id));
      iframe.classList.add('video');

      return iframe;
    };

    const generateURL = (id) => {
      let query = '?rel=0&showinfo=0&autoplay=1';

      return 'https://www.youtube.com/embed/' + id + query;
    };

    findVideos();
  }

  function scrollToTop() {
    const btnScrollUp = document.querySelector('.scroll-top');
    const btnScrollToCategoryCatalog = document.querySelector('.popular__show-all.scroll-to');
    
    btnScrollUp.addEventListener('click', () => {
      jQuery("html, body").animate({
        scrollTop: 0
      }, "slow");
      return false;
    });

    btnScrollToCategoryCatalog.addEventListener('click', () => {
      jQuery("html, body").animate({
        scrollTop: 550
      }, "slow");
      return false;
    });
  };

  function accordionMenu() {
    const productsCatalogParentLinks = document.querySelectorAll('.menu-products>.parent');
    const productsCatalogChildLinks = document.querySelectorAll('.menu-products>.parent>.nav-child>.parent');
    const productsCatalogLastChildLinks = document.querySelectorAll('.menu-products>.parent>.nav-child>.parent>.nav-child>.parent');

    const productsCatalogRemoveAllLinks = () => {
      productsCatalogParentLinks.forEach(item => item.classList.remove('parent__active'));
      productsCatalogChildLinks.forEach(item => item.classList.remove('child__active'));
      productsCatalogLastChildLinks.forEach(item => item.classList.remove('parent__active'));
    }

    productsCatalogParentLinks.forEach(elem => {
      elem.addEventListener('click', () => {
        if (elem.classList.contains('parent__active')) {
          productsCatalogRemoveAllLinks();
        } else {
          productsCatalogRemoveAllLinks();
          elem.classList.add('parent__active');
        }
      });
    });

    productsCatalogChildLinks.forEach(elem => {
      elem.addEventListener('click', (e) => {
        e.stopPropagation();
        elem.classList.toggle('child__active');
      });
    });

    productsCatalogLastChildLinks.forEach(elem => {
      elem.addEventListener('click', (e) => {
        e.stopPropagation();
        elem.classList.toggle('parent__active');
      });
    });
  };

  function productPreviewImages() {
    const previevDescript = document.querySelector('.slider-preview-img');
    const slidesDescript = document.querySelectorAll('.product-descript__item');

    function removeActiveSlides() { slidesDescript.forEach(slide => slide.classList.remove('active-slide')) };
  
    slidesDescript.forEach(slide => {
      slide.addEventListener('click', () => {
        removeActiveSlides();
        previevDescript.src = slide.children[0].getAttribute('src');
        previevDescript.alt = slide.children[0].getAttribute('alt');
        slide.classList.add('active-slide');
      });
    });
  };

  function initSliders() {
    const productDescriptSlider = new Swiper('.product-descript-slider.swiper-container', {
      slidesPerView: 5,
      slidePerGround: 1,
      spaceBetween: 20,

      breakpoints: {
        320: {
          slidesPerView: 5,
          slidePerGround: 1,
          spaceBetween: 10,
        },
        575: {
          slidesPerView: 5,
          slidePerGround: 1,
          spaceBetween: 20,
        },
      }
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
  };

  function calcBAsketQuantity() {
    let cardsAmount = document.querySelectorAll('.quantity-box');
    for (let counter of cardsAmount) {
      counter.addEventListener('click', e => {
        let target = e.target;
        let container = e.currentTarget;
        let counter = container.querySelectorAll('.inputbox')[0];
        let count = parseInt(counter.getAttribute("data-count"));
        
        if (target.classList.contains('decrease')) {
            count = count === 1 ? count : (count - 1);
        } else if (target.classList.contains('increase')){
            count += 1;
        }
        counter.setAttribute('data-count', count);
        counter.value = count;
      });
    };
  };

  function tabsHandler() {
    const tabsElems = document.querySelectorAll('.tabs__title');
    const tabsContainerElems = document.querySelectorAll('.content__container');
    const openReviewBtn = document.querySelector('.open-review-modal');

    function tabContainerActive(tabData) {
      tabsContainerElems.forEach(elem => {
        let idContainer = elem.id;
        tabData === idContainer ? elem.classList.add('container-active') : elem.classList.remove('container-active');
      });
    };
    
    tabsElems.forEach(tab => {
      tab.addEventListener('click', () => {

        let tabData = tab.dataset.title;

        tabsElems.forEach(tab => tab.classList.remove('tab-active'));

        tab.classList.add('tab-active');
        tabContainerActive(tabData);
      });
    });

    function activeTabForBtnReview(dataId) {
      tabsElems.forEach(tab => {
        let tabData = tab.dataset.title;
        let id = dataId

        tabData === id ? tab.classList.add('tab-active') : false;
      });
    }

    openReviewBtn.addEventListener('click', () => {

      tabsContainerElems.forEach(elem => {
        const idContainer = elem.id;
        const dataBtn = openReviewBtn.dataset.review;

        tabsElems.forEach(tab => tab.classList.remove('tab-active'));

        activeTabForBtnReview(dataBtn);
        tabContainerActive(dataBtn);

        idContainer === dataBtn ? elem.classList.add('container-active') : false;
      });
    });
  };
});