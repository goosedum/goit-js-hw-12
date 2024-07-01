import iziToast from  "izitoast" ;
import "izitoast/dist/css/iziToast.min.css";
import { displayImages, clearImages } from "./render-functions";
import axios from "axios";

const loader = document.querySelector('.loader');
function showLoader() {
    loader.classList.remove('hidden') 
   
}

function hideLoader() {
    loader.classList.add('hidden') 
    
}
const apiKey = '44406774-b6929e0ee65f9835201f12742';


export default async function getImages(userInput, currentPage = 1, showLoadMore, hideLoadMore, showEndMessage) {
    const BASE_URL = 'https://pixabay.com/';
    const END_POINT = 'api/';
    const params = new URLSearchParams({
        key: apiKey,
        q: userInput,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: currentPage,

    });
    const url = `${BASE_URL}${END_POINT}?${params}`;
    
    
    try {
        showLoader();
        const response = await axios.get(url);
        const data = response.data;
            
        if (data.hits.length === 0) {
             if (currentPage === 1) {
                clearImages();
            }
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            hideLoadMore();
        } else {
            displayImages(data.hits, currentPage);
            if (data.totalHits > currentPage * 15) {
                showLoadMore(); 
            } else {
                hideLoadMore(); 
                showEndMessage();
            }
        }
    
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching images. Please try again!',
        });
        hideLoadMore();
    } finally {
        hideLoader();
        
    }
        
}



