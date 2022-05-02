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
        slidesPerView: 1,
        slidesPerGroup: 1,
        pagination: {
          el: '.main-slider__pagin',
          clickable: true,
        },
      });
});