import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import dangIcon from './img/dang.svg';
import errorIcon from './img/err.svg';
import xIcon from './img/x.svg';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

const lightbox = new SimpleLightbox('.gallery a', {captionDelay: 250, captionsData: 'alt'});

const form = document.querySelector('.form');
const imageList = document.querySelector('.gallery');
const loadBtn = document.querySelector('.loader-and-btn');

form.addEventListener('submit', onSearch);

let memoryInput;
let pageNumber;
let perPage;

function onSearch (event) {
  event.preventDefault();
  removeLoadMoreButton();
  const keyWord = event.target.keyword.value.trim();
  if (keyWord) {
    pageNumber = 1;
    perPage = 15;
    memoryInput = keyWord;
    imageList.innerHTML = '';
    loadImages();
    form.reset();
  }
}

function removeLoadMoreButton () {
  const btnLoadMore = document.querySelector('.btn-load-more');
  if(btnLoadMore !== null) {
    btnLoadMore.removeEventListener('click', loadImages);
    btnLoadMore.remove();
  }
}

async function loadImages () {
  loadBtn.insertAdjacentHTML('afterbegin', '<span class="loader"></span>');
  try {
    const response = await axiosRequest();
    pageNumber += 1;
    renderImage(response.data);
  }
  catch (error) {
    showIziToast({
      message: error.message,
      backgroundColor: '#EF4040',
      iconUrl: errorIcon
    });
  }
}

async function axiosRequest() {
  axios.defaults.baseURL = 'https://pixabay.com';
  return axios.get('api/', {
    params: {
      key: '25786434-348adb767e319176b4ad356ea',
      q: memoryInput,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageNumber,
      per_page: perPage
    }
  });
}

function renderImage({totalHits, hits}) {
  onLoaderRemove();
  if (parseInt(totalHits) > 0) {
    const totalPages = Math.ceil(totalHits / perPage);

    if (imageList.innerHTML === '' && totalHits > perPage) {
      loadBtn.insertAdjacentHTML('beforeend', '<button class="btn-load-more">Load more</button>');
      const btnLoadMore = document.querySelector('.btn-load-more');
      btnLoadMore.addEventListener('click', loadImages);
    }

    if (pageNumber > totalPages) {
      removeLoadMoreButton();
      showIziToast({
        message: `We're sorry, but you've reached the end of search results.`,
        backgroundColor: '#FFA000',
        iconUrl: dangIcon
      });
    }

    const markup = hits.map(createElementGallery).join('');
    imageList.insertAdjacentHTML('beforeend', markup);

    if (pageNumber > 2) {
      scrollToNewImages();
    }
    
    lightbox.refresh();
  }else{
    showIziToast({
      message: error.message,
      backgroundColor: '#EF4040',
      iconUrl: errorIcon
    });
  }    
}

function scrollToNewImages () {
  const elemCard = document.querySelector('.card');
  const getItemCoords = elemCard.getBoundingClientRect();
  window.scrollBy({
    top: getItemCoords.height * 2,
    left: getItemCoords.left, 
    behavior: 'smooth',
  });
}

function onLoaderRemove () {
  const loader = document.querySelector('.loader');
  if(loader !== null) {
    loader.remove();
  }
}

function createElementGallery({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
  return `
<ul class="card">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}">
  </a>
  <ul class="item-img">
    <li class="elem-img">
      <p class="elem-name">Likes</p>
      <p>${likes}</p>
    </li>
    <li class="elem-img">
      <p class="elem-name">Views</p>
      <p>${views}</p>
    </li>
    <li class="elem-img">
      <p class="elem-name">Comments</p>
      <p>${comments}</p>
    </li>
    <li class="elem-img">
      <p class="elem-name">Downloads</p>
      <p>${downloads}</p>
    </li>
  </ul>
</ul>
`}

function showIziToast({message, backgroundColor, iconUrl}) {
  onLoaderRemove();
  iziToast.show({
    titleColor: '#FFFFFF',
    message: `${message}`,
    messageColor: '#FFFFFF',
    messageSize: '16px',
    backgroundColor: `${backgroundColor}`,
    iconUrl: `${iconUrl}`,
    position: 'topRight',
    close: false,
    buttons: [
      [
        `<button type="button" style="
          background-color: ${backgroundColor}; 
          width: 20px; 
          height: 20px; 
          padding: 5px">
            <img style="
              width: 10px; 
              height: 10px" 
                src=${xIcon}>
        </button>`,
        function (instance, toast) {
          instance.hide({ transitionOut: 'fadeOut' }, toast);
        },
      ],
    ]
  });
};
