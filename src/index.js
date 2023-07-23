
import axios from 'axios';

const searchForm = document.getElementById('search-form');
const imageGallery = document.getElementById('image-gallery');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchQuery = event.target.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  const apiKey = 'YOUR_PIXABAY_API_KEY'; // Замініть на свій унікальний ключ доступу

  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`);
    const images = response.data.hits;

    if (images.length === 0) {
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
    } else {
      imageGallery.innerHTML = '';

      images.forEach((image) => {
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        imgElement.alt = image.tags;
        imageGallery.appendChild(imgElement);
      });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});

