// Fonction asynchrone pour récupérer les détails du meilleur film
async function getBestMovieDetails(movieUrl) {
    try {
        const response = await fetch(movieUrl);
        if (!response.ok) {
            throw new Error(`Erreur de requête: ${response.status} ${response.statusText}`);
        }

        const bestMovieDetails = await response.json();
        
        // Met à jour l'image, le titre et la description du meilleur film dans le HTML
        document.getElementById('bestMovieImage').setAttribute('src', bestMovieDetails['image_url']);
        document.getElementById('bestMovieTitle').innerText = bestMovieDetails['title'];
        document.getElementById('bestMovieDescription').innerText = bestMovieDetails['description'];

    } catch (error) {
        console.error("Erreur lors de la récupération des détails du meilleur film:", error);
    }
}

// Fonction asynchrone pour récupérer la liste des films les mieux notés
async function getListBestScores() {
    try {
        // Utilisation de la fonction fetch pour effectuer une requête à l'API
        // Récupère les films triés par score IMDB décroissant avec une taille de page de 7
        const response = await fetch(`${titlesUrl}?sort_by=-imdb_score&page_size=7`);
        if (!response.ok) {
            throw new Error(`Erreur de requête: ${response.status} ${response.statusText}`);
        }

        const listBestScores = await response.json();

        // Récupère l'URL du meilleur film
        const bestMovieUrl = listBestScores.results[0]['url'];

        // Appelle la fonction pour obtenir les détails du meilleur film, y compris la description
        await getBestMovieDetails(bestMovieUrl);

    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
    }
}

// Appelle la fonction pour récupérer la liste des films les mieux notés
getListBestScores();
