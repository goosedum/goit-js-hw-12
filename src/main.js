import getImages from './js/pixabay-api.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";




let currentPage = 1;
let userInput = '';

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const searchButton = document.querySelector('button[type=submit]');
const loadMoreBtn = document.querySelector('button[type=button]');


const style = document.createElement('style');
style.innerHTML = `
.hidden {
    display: none;
}
`;
document.head.appendChild(style);

searchForm.style.display = 'flex';
searchForm.style.justifyContent = 'center';
searchForm.style.gap = '8px';
searchForm.style.height = '40px';
searchForm.style.width = '371px';
searchForm.style.margin = '0 auto';
searchForm.style.fontFamily = 'Montserrat';
searchForm.style.fontSize = '16px';


searchInput.style.width = '272px';
searchInput.style.paddingLeft = '16px';
searchInput.style.border = '1px solid #808080';
searchInput.style.borderRadius = '4px';
searchInput.style.color = '#808080';


searchButton.style.width = '91px';
searchButton.style.padding = '0px';
searchButton.style.backgroundColor = '#4E75FF';
searchButton.style.border = 'none';
searchButton.style.borderRadius = '8px';
searchButton.style.color = '#FFFFFF';

loadMoreBtn.style.width = '125px';
loadMoreBtn.style.height = '40px';
loadMoreBtn.style.padding = '8px 16px 8px 16px';
loadMoreBtn.style.backgroundColor = '#4E75FF';
loadMoreBtn.style.border = 'none';
loadMoreBtn.style.borderRadius = '8px';
loadMoreBtn.style.color = '#FFFFFF';

loadMoreBtn.style.justifyContent = 'center';
loadMoreBtn.style.margin = '0 auto';
loadMoreBtn.style.marginTop = '10px';
loadMoreBtn.style.cursor = 'pointer';
loadMoreBtn.classList.add('hidden');




function showLoadMore() {
    loadMoreBtn.classList.remove('hidden');
}

function hideLoadMore() {
    loadMoreBtn.classList.add('hidden');
    console.log('Кнопка схована:', loadMoreBtn.classList.contains('hidden'));
}

function showEndMessage() {
    iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
    });
}

function scrollToNewImages() {
    const imgElement = document.querySelector('.image-card');
    if (imgElement) {
        const cardHeight = imgElement.getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth'
        });
    }
}


    hideLoadMore();

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        userInput = searchInput.value.trim();
        if (userInput === '') {
            hideLoadMore();
            iziToast.error({
                title: 'Error',
                message: 'Поле пошуку не може бути порожнім',
            });
        
        } else {
            currentPage = 1;
            hideLoadMore();
            try {
                await getImages(userInput, currentPage, showLoadMore, hideLoadMore, showEndMessage);
                searchInput.value = '';
            } catch (error) {
                    iziToast.error({
                        title: 'Error',
                        message: 'An error occurred while fetching images. Please try again!',
                    });
                    console.error('Error fetching images:', error);
            }
        }
    });
    
     loadMoreBtn.addEventListener('click', async () => {
        currentPage++;
        try {
            await getImages(userInput, currentPage, showLoadMore, hideLoadMore, showEndMessage);
            scrollToNewImages();
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while fetching more images. Please try again!',
            });
            console.error('Error fetching more images:', error);
           
        }
    });
