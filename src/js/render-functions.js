import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');
gallery.style.display = 'grid';
gallery.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
gallery.style.gap = '16px';
gallery.style.padding = '16px';

export function displayImages(images,currentPage) {

    if (!Array.isArray(images)) {
        iziToast.error({
            title: 'Error',
            message: 'displayImages expects an array but received:' + typeof images,
        
        });

        return;
    }
    const imageResults = document.getElementById('imageResults');
    if (currentPage === 1) {
        imageResults.innerHTML = '';
    }
   

    images.forEach(image => {
        const imgElement = document.createElement('a');
        imgElement.classList.add('image-card');
        imgElement.href = image.largeImageURL;
        imgElement.innerHTML = `
            
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
            
            <div class="info">
                <p><b>Likes:</b> ${image.likes}</p>
                <p><b>Views:</b> ${image.views}</p>
                <p><b>Comments:</b> ${image.comments}</p>
                <p><b>Downloads:</b> ${image.downloads}</p>
            </div>`;
        imageResults.appendChild(imgElement);

           
        const cardStyle = imgElement;
        cardStyle.style.position = 'relative';
        cardStyle.style.overflow = 'hidden';
        cardStyle.style.borderRadius = '8px';
        cardStyle.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';

        const cardInfo = imgElement.querySelector('.info');
        cardInfo.style.position = 'absolute';
        cardInfo.style.bottom = '0';
        cardInfo.style.left = '0';
        cardInfo.style.right = '0';
        cardInfo.style.padding = '8px';
        cardInfo.style.background = 'rgba(0, 0, 0, 0.6)';
        cardInfo.style.color = '#fff';
        cardInfo.style.fontSize = '14px';
    });
    
    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });
    lightbox.refresh();
   
}

export function clearImages() {
    const imageResults = document.getElementById('imageResults');
    imageResults.innerHTML = '';
}








