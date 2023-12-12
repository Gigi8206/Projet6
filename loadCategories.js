// Définition de l'URL de l'API
titlesUrl = "http://localhost:8000/api/v1/titles/";

// Fonction asynchrone pour récupérer la liste des films les mieux notés
async function getListBestScores() {
    // Utilisation de la fonction fetch pour effectuer une requête à l'API
    // Récupère les films triés par score IMDB décroissant avec une taille de page de 7
    fetch(`${titlesUrl}?sort_by=-imdb_score&page_size=7`)
        // Convertit la réponse en format JSON
        .then(response => response.json())
        // Manipule les données obtenues (liste des films)
        .then(listBestScores => {
            // Sélectionne l'élément HTML avec l'ID "topRatedCarousel"
            const topRatedCarousel = document.querySelector("#topRatedCarousel");
            
            // Parcours la liste des films pour créer des éléments HTML
            listBestScores.results.forEach(element => {
                // Crée un élément div pour chaque film
                let div = document.createElement('div');
                // Ajoute la classe 'carousel-item' à l'élément div
                div.classList.add('carousel-item');
                // Crée un élément img pour afficher l'affiche du film
                let img = document.createElement('img');
                // Configure l'attribut 'src' de l'élément img avec l'URL de l'image du film
                img.setAttribute('src', element['image_url']);
                // Ajoute l'élément img à l'élément div
                div.appendChild(img);
                // Ajoute l'élément div au carrousel "topRatedCarousel"
                topRatedCarousel.appendChild(div);
            });
        });
}

// Appelle la fonction pour récupérer la liste des films les mieux notés
getListBestScores();
