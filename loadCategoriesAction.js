// Remplacez "http://localhost:8000/api/v1/titles/" par l'URL correcte de votre API.
const titlesUrl = "http://localhost:8000/api/v1/titles/";

async function getListBestScores(category) {
    // Ajoutez le filtre pour la catégorie spécifiée
    const apiUrl = `${titlesUrl}?sort_by=-imdb_score&page_size=7&genre=${category}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(listBestScores => {
            listBestScores.results.forEach(element => {
                const topRatedCarousel = document.querySelector("#topRatedCarousel");

                let div = document.createElement('div')
                div.classList.add('carousel-item');
                let img = document.createElement('img');
                img.setAttribute('src', element['image_url'])
                div.appendChild(img);
                topRatedCarousel.appendChild(div);
            });
        });
}

// Appeler la fonction pour afficher les films les mieux notés de la catégorie "Action"
getListBestScores('Action');











