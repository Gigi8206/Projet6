// Remplacez "http://localhost:8000/api/v1/titles/" par l'URL correcte de votre API.
const titlesUrl = "http://localhost:8000/api/v1/titles/";

async function getListBestScores(category) {
    // Utilisez l'ID du genre "Action" (14) dans la requête
    const apiUrl = `${titlesUrl}?sort_by=-imdb_score&page_size=7&genre=14`;

    try {
        const response = await fetch(apiUrl);
        const listBestScores = await response.json();

        // Supprimer tous les éléments actuels du carrousel
        const topRatedCarousel = document.querySelector("#topRatedCarousel");
        topRatedCarousel.innerHTML = '';

        listBestScores.results.forEach(element => {
            let div = document.createElement('div')
            div.classList.add('carousel-item');
            let img = document.createElement('img');
            img.setAttribute('src', element['image_url'])
            div.appendChild(img);
            topRatedCarousel.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Appeler la fonction pour afficher les films les mieux notés de la catégorie "Action"
getListBestScores();

