// Définition de l'URL de l'API
const titlesUrl = "http://localhost:8000/api/v1/titles/";

// Fonction asynchrone pour récupérer la liste des films bien notés
async function getListBestScores() {
    try {
        const response = await fetch(`${titlesUrl}?sort_by=-imdb_score&page_size=8`); // Augmenter la taille pour récupérer une image supplémentaire
        const listBestScores = await response.json();
        const topRatedCarousel = document.querySelector("#topRatedCarousel");

        listBestScores.results.forEach((element, index) => {
            let div = document.createElement('div');
            div.classList.add('carousel-item');
            div.setAttribute('id', `titre-${element.id}`);
            let img = document.createElement('img');
            img.setAttribute('src', element['image_url']);
            img.addEventListener('error', (event) => handleImageError(event, undefined)); // Ajout du gestionnaire d'erreur
            div.appendChild(img);
            topRatedCarousel.appendChild(div);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des films les mieux notés:', error);
    }
}


// Fonction asynchrone pour récupérer la liste des films bien notés par genre
async function getListBestScoresByGenre(genreName, carouselId) {
    try {
        const apiUrl = `${titlesUrl}?sort_by=-imdb_score&page_size=8&genre_contains=${genreName}`;
        const response = await fetch(apiUrl);
        const listBestScores = await response.json();
        const genreCarousel = document.querySelector(`#${carouselId}`);
        genreCarousel.innerHTML = '';

        if (listBestScores.results && listBestScores.results.length > 0) {
            listBestScores.results.forEach((element, index) => {
                let div = document.createElement('div');
                div.classList.add('carousel-item');
                div.setAttribute('id', `titre-${element.id}`);
                let img = document.createElement('img');
                img.setAttribute('src', element['image_url']);
                img.addEventListener('error', (event) => handleImageError(event, genreName)); // Ajout du gestionnaire d'erreur
                div.appendChild(img);
                genreCarousel.appendChild(div);
            });
        }
    } catch (error) {
        console.error(`Erreur lors du chargement des films ${genreName}:`, error);
    }
}

// Gestionnaire d'erreur pour les images
function handleImageError(event, genreName) {
    const fallbackImageUrl = 'https://image.tmdb.org/t/p/w500/6bGVpojv1f3cth9Quc5H5HOWDTF.jpg'; // Remplacez par l'URL de l'image de remplacement externe

    // Vérifier si la catégorie est "Animation,Action"
    if (genreName === 'Animation','Action') {
        event.target.setAttribute('src', fallbackImageUrl);
    }
}





getListBestScores();


getListBestScoresByGenre('Action', 'actionCarousel');


getListBestScoresByGenre('Biography', 'biographyCarousel');


getListBestScoresByGenre('Animation', 'animationCarousel');




