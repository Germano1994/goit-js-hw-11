
import axios from 'axios';
import Notiflix from 'notiflix'; 


function createPhotoCard(imageData) {
  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');

  const imgElement = document.createElement('img');
  imgElement.src = imageData.webformatURL;
  imgElement.alt = imageData.tags;
  imgElement.loading = 'lazy';

  const infoElement = document.createElement('div');
  infoElement.classList.add('info');

  const likesElement = document.createElement('p');
  likesElement.classList.add('info-item');
  likesElement.innerHTML = `<b>Likes:</b> ${imageData.likes}`;

  const viewsElement = document.createElement('p');
  viewsElement.classList.add('info-item');
  viewsElement.innerHTML = `<b>Views:</b> ${imageData.views}`;

  const commentsElement = document.createElement('p');
  commentsElement.classList.add('info-item');
  commentsElement.innerHTML = `<b>Comments:</b> ${imageData.comments}`;

  const downloadsElement = document.createElement('p');
  downloadsElement.classList.add('info-item');
  downloadsElement.innerHTML = `<b>Downloads:</b> ${imageData.downloads}`;

  infoElement.appendChild(likesElement);
  infoElement.appendChild(viewsElement);
  infoElement.appendChild(commentsElement);
  infoElement.appendChild(downloadsElement);

  photoCard.appendChild(imgElement);
  photoCard.appendChild(infoElement);

  return photoCard;
}

const searchForm = document.getElementById('search-form');
const imageGallery = document.getElementById('image-gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
const perPage = 40;
let totalHits = 0;
const API_KEY = '35924143-9020fc77f3274be39114409f4';

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchQuery = event.target.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`);
    const images = response.data.hits;
    totalHits = response.data.totalHits;

    if (images.length === 0) {
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
      imageGallery.innerHTML = '';
    } else {
      if (currentPage === 1) {
        imageGallery.innerHTML = '';
      }

      images.forEach((image) => {
        const photoCard = createPhotoCard(image); 
        imageGallery.appendChild(photoCard);
      });

      
      if (images.length < totalHits) {
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'none';
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;

  const searchQuery = searchForm.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`);
    const images = response.data.hits;

    images.forEach((image) => {
      const photoCard = createPhotoCard(image); 
      imageGallery.appendChild(photoCard);
    });

    
    if (images.length < totalHits) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});
