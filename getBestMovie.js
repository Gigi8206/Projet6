// Fonction asynchrone pour récupérer les détails du meilleur film
async function getBestMovieDetails(movieUrl) {
    const response = await fetch(movieUrl);
    const bestMovieDetails = await response.json();

    document.getElementsByClassName('best-movie')[0].setAttribute('id', `title-${bestMovieDetails.id}-best`);
    // Met à jour l'image, le titre  du meilleur film dans le HTML
    let bestMovieImage = document.getElementById('bestMovieImage')
    bestMovieImage.setAttribute('src', bestMovieDetails['image_url']);
    bestMovieImage.addEventListener('click', function() {
        // Call the asynchronous function when the image is clicked
        handleImageClick(bestMovieImage);
    });
    document.getElementById('bestMovieTitle').innerText = bestMovieDetails['title'];
    document.getElementById('fullDescription').innerText = bestMovieDetails['description'];    
}

// Fonction asynchrone pour récupérer la liste des films les mieux notés
async function getListBestScores() {
    const response = await fetch(`${titlesUrl}?sort_by=-imdb_score&page_size=7`);
    const listBestScores = await response.json();

    // Récupère l'URL du meilleur film
    const bestMovieUrl = listBestScores.results[0]['url'];

    // Appelle la fonction pour obtenir les détails du meilleur film, y compris la description
    await getBestMovieDetails(bestMovieUrl);
}

// Appelle la fonction pour récupérer la liste des films les mieux notés
getListBestScores();
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
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

// Fonction pour fermer la fenêtre modale
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}
