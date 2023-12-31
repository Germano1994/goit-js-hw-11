import axios from 'axios';
import Notiflix from 'notiflix';

function createPhotoCard(imageData) {
  const imgElement = document.createElement('img');
  imgElement.src = imageData.webformatURL;
  imgElement.alt = imageData.tags;
  imgElement.loading = 'lazy';

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info');

  const likesP = document.createElement('p');
  likesP.classList.add('info-item');
  likesP.innerHTML = `<b>Likes:</b> ${imageData.likes}`;

  const viewsP = document.createElement('p');
  viewsP.classList.add('info-item');
  viewsP.innerHTML = `<b>Views:</b> ${imageData.views}`;

  const commentsP = document.createElement('p');
  commentsP.classList.add('info-item');
  commentsP.innerHTML = `<b>Comments:</b> ${imageData.comments}`;

  const downloadsP = document.createElement('p');
  downloadsP.classList.add('info-item');
  downloadsP.innerHTML = `<b>Downloads:</b> ${imageData.downloads}`;

  infoDiv.appendChild(likesP);
  infoDiv.appendChild(viewsP);
  infoDiv.appendChild(commentsP);
  infoDiv.appendChild(downloadsP);

  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');
  photoCard.appendChild(imgElement);
  photoCard.appendChild(infoDiv);

  return photoCard;
}

const searchForm = document.getElementById('search-form');
const imageGallery = document.getElementById('image-gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
const perPage = 40;
let totalHits = 0;
const API_KEY = '35924143-9020fc77f3274be39114409f4';

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

function showEndOfResultsMessage() {
  hideLoadMoreButton();
  Notiflix.Notify.info("You've reached the end of the search results.");
}

hideLoadMoreButton();

async function fetchImages(searchQuery, page) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
    const images = response.data.hits;
    totalHits = response.data.totalHits;

   

    if (images.length === 0 && page === 1) {
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
      imageGallery.innerHTML = '';
    } else {
      if (page === 1) {
        imageGallery.innerHTML = '';
      }

      images.forEach((image) => {
        const photoCard = createPhotoCard(image);
        imageGallery.appendChild(photoCard);
      });

    
    }

    if  (response.data.hits.length < 40) {
      hideLoadMoreButton();
      showEndOfResultsMessage();
    } else {
      loadMoreBtn.style.display = 'block';
      
    }

  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchQuery = event.target.searchQuery.value.trim();

  if (searchQuery === '') {
    Notiflix.Notify.failure('Please enter a search query.');
    return;
  }

  currentPage = 1;
  await fetchImages(searchQuery, currentPage);
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;

  const searchQuery = searchForm.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  await fetchImages(searchQuery, currentPage);
});
