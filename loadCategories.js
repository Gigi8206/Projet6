var modal = document.getElementById("myModal");

async function handleImageClick(element) {
    try {
        let titleId = element.parentNode.id.split('-')[1];
        // Utiliser fetch dans une fonction asynchrone
        const response = await fetch(`${titlesUrl}${titleId}`);
        const data = await response.json();

        // Traitement des données récupérées
        console.log('Données récupérées :', data);

        // Mise à jour des détails dans la fenêtre modale
        updateModalDetails(data);

        // Affichage de la fenêtre modale
        openModal();
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
}

// Définition de l'URL de l'API
const titlesUrl = "http://localhost:8000/api/v1/titles/";

// Fonction pour mettre à jour les détails dans la fenêtre modale
function updateModalDetails(movieData) {
    // Sélection de la modal et des éléments à mettre à jour
    const modalTitle = document.getElementById('modalTitle');
    const modalGenre = document.getElementById('modalGenre');
    const modalReleaseDate = document.getElementById('modalReleaseDate');
    const modalRated = document.getElementById('modalRated');
    const modalImdbScore = document.getElementById('modalImdbScore');
    const modalDirector = document.getElementById('modalDirector');
    const modalActors = document.getElementById('modalActors');
    const modalDuration = document.getElementById('modalDuration');
    const modalCountry = document.getElementById('modalCountry');
    const modalBoxOffice = document.getElementById('modalBoxOffice');
    const modalSummary = document.getElementById('modalSummary');

    // Mise à jour des éléments avec les données du film
    modalTitle.textContent = movieData.title;
    modalGenre.textContent = movieData.genres.join(', ');
    modalReleaseDate.textContent = movieData.date_published;
    modalRated.textContent = movieData.rated;
    modalImdbScore.textContent = movieData.imdb_score;
    modalDirector.textContent = movieData.directors.join(', ');
    modalActors.textContent = movieData.actors.join(', ');
    modalDuration.textContent = movieData.duration + ' minutes';
    modalCountry.textContent = movieData.countries.join(', ');
    modalBoxOffice.textContent = movieData.worldwide_gross_income + ' ' + movieData.budget_currency;
    modalSummary.textContent = movieData.description;
}

// Fonction pour ouvrir la fenêtre modale
function openModal() {
    modal.style.display = 'block';
}

// Fonction asynchrone pour récupérer la liste des films bien notés
async function getListBestScores() {
    try {
        const response = await fetch(`${titlesUrl}?sort_by=-imdb_score&page_size=8`); // Augmenter la taille pour récupérer une image supplémentaire
        const listBestScores = await response.json();
        const topRatedCarousel = document.querySelector("#topRatedCarousel");

        listBestScores.results.forEach((element, index) => {
            let div = document.createElement('div');
            div.classList.add('carousel-item');
            div.setAttribute('id', `titre-${element.id}-top`);
            let img = document.createElement('img');
            img.setAttribute('src', element['image_url']);
            img.addEventListener('error', (event) => handleImageError(event, undefined)); // Ajout du gestionnaire d'erreur
            // Ajouter un gestionnaire d'événement de clic à l'élément img créé dynamiquement
            img.addEventListener('click', function() {
                handleImageClick(img);
            });
            div.appendChild(img);
            topRatedCarousel.appendChild(div);
        });
    } catch (error) {
        console.error('Erreur lors du chargement des films les mieux notés :', error);
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
                div.setAttribute('id', `titre-${element.id}-${genreName}`);
                let img = document.createElement('img');
                img.setAttribute('src', element['image_url']);
                img.addEventListener('error', (event) => handleImageError(event, genreName)); // Ajout du gestionnaire d'erreur
                // Ajouter un gestionnaire d'événement de clic à l'élément img créé dynamiquement
                img.addEventListener('click', function() {
                    handleImageClick(img);
                });
                div.appendChild(img);
                genreCarousel.appendChild(div);
            });
        }
    } catch (error) {
        console.error(`Erreur lors du chargement des films ${genreName} :`, error);
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
