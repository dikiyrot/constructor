/*
new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
})
*/

const getElement = (tagName, classNames, attributes) => {
   const element = document.createElement(tagName);

   if (classNames) {
      element.classList.add(...classNames);
   }

   if (attributes) {
      for (const attribute in attributes) {
         element[attribute] = attributes[attribute];
      }
   }

   return element;
};

const createHeader = ({ title, header: {logo, menu, social} }) => {
   const header = getElement('header');
   const container = getElement('div', ['container']);
   const wrapper = getElement('div', ['header']);

   if (logo) {
      const logotype = getElement('img', ['logo'], {
         src: logo,
         alt: 'Логотип ' + title,
      });
      wrapper.append(logotype);
   }

   if (menu) {
      const menuWrapper = getElement('nav', ['menu-list']);
      const allMenuLink = menu.map((item) => {
         const menuLink = getElement('a', ['menu-link']);
         menuLink.textContent = item.title;
         menuLink.href = item.link;

         return menuLink;
      });

      menuWrapper.append(...allMenuLink);
      wrapper.append(menuWrapper);

		const menuBtn = getElement('button', ['menu-button']);
		menuBtn.addEventListener('click', () => {
			menuBtn.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		})
		container.append(menuBtn);
   }

   if (social) {
      const socialWrapper = getElement('div', ['social']);
      const allSocial = social.map((item) => {
         const socialLink = getElement('a', ['social-link']);
         socialLink.append(
            getElement('img', [], {
               src: item.img,
               alt: item.title,
            }),
         );

         socialLink.href = item.link;

         return socialLink;
      });
      socialWrapper.append(...allSocial);
      wrapper.append(socialWrapper);
   }

   header.append(container);
   container.append(wrapper)
	
   return header;
};

const createMain = ({ title, main: { genre, rating, description, trailer, slider } }) => {
   const main = getElement('main');
   const container = getElement('div', ['container']);
   main.append(container);
   const wrapper = getElement('div', ['main-content']);
   container.append(wrapper);
   const content = getElement('div', ['content']);
   wrapper.append(content);

   if (genre) {
      const ganreSpan = getElement('span', ['genre', 'animated', 'fadeInRight'], {
         textContent: genre,
      });
      content.append(ganreSpan);
   }

   if (rating) {
      const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
      const ratingStars = getElement('div', ['rating-stars']);
      const ratingNumber = getElement('div', ['rating-number'], { textContent: `${rating} / 10` });

      for (let i = 0; i < 10; i++) {
         const star = getElement('img', ['star'], {
            alt: i ? '' : `Рейтинг ${rating} из 10`,
            src: i < rating ? 'img/star.svg' : 'img/star-o.svg',
         });
         ratingStars.append(star);
      }

      ratingBlock.append(ratingStars, ratingNumber);
      content.append(ratingBlock);
   }

   content.append(
      getElement('h1', ['main-title', 'animated', 'fadeInRight'], { textContent: title }),
   );
   content.append(
      getElement('p', ['main-description', 'animated', 'fadeInRight'], {
         textContent: description,
      }),
   );

   if (trailer) {
      const youtubeLink = getElement('a', ['button', 'animated', 'fadeInRight', 'youtube-modal'], {
         textContent: 'Смотреть трейлер',
         href: trailer,
      });
      const youtubeImgLink = getElement('a', ['play', 'youtube-modal'], {href: trailer, ariaLabel: 'Смотреть трейлер'});
		const iconPlay = getElement('img', ['play-img'], {
			src: 'img/play.svg',
			alt: '',
			ariaHidden: true,}
		);

      content.append(youtubeLink);
		youtubeImgLink.append(iconPlay);
		wrapper.append(youtubeImgLink);
   }

	if (slider) {
		const sliderBlock = getElement('div', ['series']);
		const swiperBlock = getElement('div', ['swiper-container']);
		const swiperWrapper = getElement('div', ['swiper-wrapper']);
		const arrow = getElement('button', ['arrow']);

		const sliders = slider.map((item) => {
			const swiperSlide = getElement('div', ['swiper-slide']);
			const card = getElement('figure', ['card']);
			const cardImage = getElement('img', ['card-img'], {
				src: item.img,
				alt: ((item.title ? item.title + ' ' : '') + (item.subtitle ? item.subtitle + ' ' : '')).trim(),
				// alt: ((item.title || '') + " " + (item.subtitle || '')).trim()

			});

			card.append(cardImage);

			if(item.title || item.subtitle) {
				const cardDescription = getElement('figcaption', ['card-description']);
				cardDescription.innerHTML = `
					${item.subtitle ? `<p class="card-subtitle">"${item.subtitle}"</p>` : ''};
					${item.title ? `<p class="card-title">${item.title}</p>` : ''};
				`;

				card.append(cardDescription);
			}

			swiperSlide.append(card);
			return swiperSlide;
		});

		swiperWrapper.append(...sliders);
		swiperBlock.append(swiperWrapper);
		sliderBlock.append(swiperBlock, arrow);

		container.append(sliderBlock);

		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});
	}

   return main;
};

const createFooter = ({ footer: {copyright, footerMenu} }) => {
   const footer = getElement('footer', ['footer']);
   const container = getElement('div', ['container']);
   const footerWrapper = getElement('div', ['footer-content']);
   const leftContent = getElement('div', ['left']);
   const rightContent = getElement('div', ['right']);

   if (footerMenu) {
      const menuFooter = getElement('nav', ['footer-menu']);
      const footerMenuLinks = footerMenu.map((item) => {
         const menuLink = getElement('a', ['footer-link']);
         menuLink.textContent = item.title;
         menuLink.href = item.href;

         return menuLink;
      });

      menuFooter.append(...footerMenuLinks);
      rightContent.append(menuFooter);
   }
	leftContent.append(getElement('span', ['copyright'], {textContent: copyright}));
	footerWrapper.append(leftContent, rightContent);
   container.append(footerWrapper);
   footer.append(container);
	
   return footer;
};

const movieConstructor = (selector, options) => {
   const app = document.querySelector(selector);
   app.classList.add('body-app');

	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor || '';

	if(options.subColor) {
		document.documentElement.style.setProperty('--sub-color', options.subColor);
	}

	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index + 1);
		const favicon = getElement('link', null, {
			rel: 'icon',
			href: options.favicon, 
			type: 'image/' + (type === 'svg' ? 'svg-xml' : type)
		});

		document.head.append(favicon);
	}

   app.style.backgroundImage = options.background ? `url('${options.background}')` : '';

   document.title = options.title;

   if (options.header) {
      app.append(createHeader(options));
   }

   if (options.main) {
      app.append(createMain(options));
   }

	if (options.footer) {
      app.append(createFooter(options));
   }

};

movieConstructor('.app', {
   title: 'Ведьмак',
   background: 'witcher/background.jpg',
	favicon: 'witcher/logo.png',
	fontColor: '#fff',
	backgroundColor: '#141218',
	subColor: '#9D2929',
   header: {
      logo: 'witcher/logo.png',
      social: [
         {
            title: 'Twitter',
            link: 'https://twitter.com',
            img: 'witcher/social/twitter.svg',
         },
         {
            title: 'Instagram',
            link: 'https://instagram.com',
            img: 'witcher/social/instagram.svg',
         },
         {
            title: 'facebook',
            link: 'https://facebook.com',
            img: 'witcher/social/facebook.svg',
         },
      ],
      menu: [
         {
            title: 'Описание',
            link: '#',
         },
         {
            title: 'Трейлер',
            link: '#',
         },
         {
            title: 'Отзывы',
            link: '#',
         },
      ],
   },
   main: {
      genre: '2019,фэнтези',
      rating: '8',
      description: `Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой
		мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже
		заколдованных принцесс.`,
      trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
		slider: [
			{
				img: 'witcher/series/series-1.jpg',
				title: 'Начало конца',
				subtitle: 'Серия №1',
			},
			{
				img: 'witcher/series/series-2.jpg',
				title: 'Четыре марки',
				subtitle: 'Серия №2',
			},
			{
				img: 'witcher/series/series-3.jpg',
				title: 'Предательская луна',
				subtitle: 'Серия №3',
			},
			{
				img: 'witcher/series/series-4.jpg',
				title: 'Банкеты, ублюдки и похороны',
				subtitle: 'Серия №4',
			},
		]
   },
	footer: {
		copyright: '© 2020 The Witcher. All right reserved.',
		footerMenu: [
			{
				title: 'Privacy Policy',
				href: '#',
			},
			{
				title: 'Terms of Service',
				href: '#',
			},
			{
				title: 'Legal',
				href: '#',
			},
		]

	}
});




// Функция декларирования
// const arr = [
// 	{
// 		name: 'Петр',
// 		gender: 'men',
// 	},
// 	{
// 		name: 'Алла',
// 		gender: 'women',
// 	},
// 	{
// 		name: 'Жора',
// 		gender: 'men',
// 	},
// ]

// const decoration = (obj) => {
// 	if(obj.gender === 'men') {
// 		return Object.assign({}, obj, {work: 'factory'});
// 	}
// 	return obj;
// }

// const newArr = arr.map(decoration);

// console.log(newArr);




// const wrapper = (fn) => {
// 	const cache = [];
// 	return (...args) => {

// 		const result = fn(...args);
// 		cache.push({
// 			[fn.name + JSON.stringify(args)]: result,
// 		});

// 		console.log(cache);

// 		return result;
// 	}
// }

// const multy = (a, b) => a ** b;

// const multyWrapper = wrapper(multy);

// console.log(multyWrapper(2, 5));
// console.log(multyWrapper(5, 7));
// console.log(multyWrapper(11, 4));
// console.log(multyWrapper(9, 12));
