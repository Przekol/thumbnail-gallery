import thumbnailGalleryList from './dataThumbnailGallery.js';

let filteredThumbnailGallery = thumbnailGalleryList;
const cardsGallery = document.querySelector('.thumbnail-gallery__cards');

let active;

const createTemplateClone = (template, element) => {
	element.appendChild(template.content.cloneNode(true));
};

const displayThumbnailCard = index => {
	let linkCardGallery = document.querySelectorAll('.thumbnail-gallery__card-link');
	let imgCardGallery = document.querySelectorAll('.thumbnail-gallery__card-img');
	let titleCardGallery = document.querySelectorAll('.thumbnail-gallery__card-title');
	let categoryCardGallery = document.querySelectorAll('.thumbnail-gallery__card-category');

	imgCardGallery[index].src = filteredThumbnailGallery[index].img;
	linkCardGallery[index].href = filteredThumbnailGallery[index].link;
	titleCardGallery[index].textContent = filteredThumbnailGallery[index].title;
	categoryCardGallery[index].textContent = filteredThumbnailGallery[index].category;
};

const displayThumbnailGallery = () => {
	const templateCardGallery = document.querySelector('#thumbnail-gallery-card');
	
	for (let index = 0; index < filteredThumbnailGallery.length; index++) {
		createTemplateClone(templateCardGallery, cardsGallery);
		displayThumbnailCard(index);
	}
};


const displayButtonsCategories = () => {
	const buttonsListName = ['all', ...new Set(thumbnailGalleryList.map(thumbnail => thumbnail.category))];

	const buttonsFilter = document.querySelector('.thumbnail-gallery__categories');

	buttonsFilter.innerHTML = buttonsListName
		.map((category, index) => {
			if (category === 'all') {
				return `<button data-category="${category}" data-number="${index}" class="thumbnail-gallery__btn btn btn-const active">${category}</button>`;
			} else {
				return `<button data-category="${category}" data-number="${index}" class="thumbnail-gallery__btn btn btn-const">${category}</button>`;
			}
		})
		.join('');
	runButtonsCategories();
};

const runButtonsCategories = () => {
	const buttonsCategories = [...document.querySelectorAll('.thumbnail-gallery__btn')];

	buttonsCategories.forEach((element, index) => {
		element.addEventListener('click', () => {
			active = index;
			const activeButton = buttonsCategories.findIndex(btn => btn.classList.contains('active'));
			buttonsCategories[activeButton].classList.remove('active');
			buttonsCategories[active].classList.add('active');

			if (element.dataset.category === 'all') {
				filteredThumbnailGallery = thumbnailGalleryList;
			} else {
				filteredThumbnailGallery = thumbnailGalleryList.filter(thumbnail => {
					return thumbnail.category === element.dataset.category;
				});
			}

			cardsGallery.textContent = '';
			displayThumbnailGallery();
		});
	});
};

export { displayButtonsCategories, displayThumbnailGallery };
