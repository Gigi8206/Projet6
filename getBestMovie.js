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
