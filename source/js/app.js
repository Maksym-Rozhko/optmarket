document.addEventListener('DOMContentLoaded', () => {
  try {
    customVideoCreator();
    scrollToTop();
    burgerMenu();
    accordionMenu();
  } catch (error) {
  }

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
});