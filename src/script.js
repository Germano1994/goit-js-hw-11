
import axios from 'axios';

const searchForm = document.getElementById('search-form');
const imageGallery = document.getElementById('image-gallery');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const searchQuery = event.target.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  try {
    const response = await axios.get(`https://api.example.com/images?query=${searchQuery}`);
    const images = response.data;

    imageGallery.innerHTML = '';

    images.forEach((image) => {
      const imgElement = document.createElement('img');
      imgElement.src = image.url;
      imgElement.alt = image.description;
      imageGallery.appendChild(imgElement);
    });
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});
