// URL de l'API
const titlesUrl = "http://localhost:8000/api/v1/titles/";

// Fonction pour mettre à jour le carrousel "Action"
async function updateActionCarousel() {
    // Supprime le contenu existant du carrousel "Action"
    const actionCarousel = document.querySelector("#actionCarousel");
    actionCarousel.innerHTML = "";

    // Récupère les nouvelles images depuis l'API
    const listByGenre = await fetch(`${titlesUrl}?genre=Action&sort_by=-imdb_score&page_size=7`)
        .then(response => response.json());

    // Ajoute les nouvelles images au carrousel "Action"
    listByGenre.results.forEach(element => {
        let div = document.createElement('div');
        div.classList.add('carousel-item');
        let img = document.createElement('img');
        img.setAttribute('src', element['image_url']);
        div.appendChild(img);
        actionCarousel.appendChild(div);
    });
}

// Appelle la fonction pour mettre à jour le carrousel "Action"
updateActionCarousel();









