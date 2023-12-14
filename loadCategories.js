// Définition de l'URL de l'API
const titlesUrl = "http://localhost:8000/api/v1/titles/";

// Fonction asynchrone pour récupérer la liste des films les mieux notés
async function getListBestScores() {
    const response = await fetch(`${titlesUrl}?sort_by=-imdb_score&page_size=7`);
    const listBestScores = await response.json();
    const topRatedCarousel = document.querySelector("#topRatedCarousel");

    listBestScores.results.forEach(element => {
        let div = document.createElement('div');
        div.classList.add('carousel-item');
        let img = document.createElement('img');
        img.setAttribute('src', element['image_url']);
        div.appendChild(img);
        topRatedCarousel.appendChild(div);
    });
}

// Appelle la fonction pour récupérer la liste des films les mieux notés
getListBestScores();

// Fonction asynchrone pour récupérer la liste des films les mieux notés par genre
async function getListBestScoresByGenre(genreName, carouselId) {
    const apiUrl = `${titlesUrl}?sort_by=-imdb_score&page_size=7&genre_contains=${genreName}`;
    const response = await fetch(apiUrl);
    const listBestScores = await response.json();
    const genreCarousel = document.querySelector(`#${carouselId}`);
    genreCarousel.innerHTML = '';

    if (listBestScores.results && listBestScores.results.length > 0) {
        listBestScores.results.forEach(element => {
            let div = document.createElement('div');
            div.classList.add('carousel-item');
            let img = document.createElement('img');
            img.setAttribute('src', element['image_url']);
            div.appendChild(img);
            genreCarousel.appendChild(div);
        });
    }
}

// Appelle la fonction pour récupérer et afficher la liste de films "Action"
getListBestScoresByGenre('Action', 'actionCarousel');

// Appelle la fonction pour récupérer et afficher la liste de films "Biography"
getListBestScoresByGenre('Biography', 'biographyCarousel');

// Appelle la fonction pour récupérer et afficher la liste de films "Animation"
getListBestScoresByGenre('Animation', 'animationCarousel');

