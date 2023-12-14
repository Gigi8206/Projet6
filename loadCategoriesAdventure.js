// Définition de l'URL de base de l'API
const titlesUrl = "http://localhost:8000/api/v1/titles/";

// Fonction asynchrone pour récupérer la liste de films par genre "Adventure"
async function getListByGenreAdventure() {
    // Appel de l'API avec le genre "Adventure", tri par note IMDB décroissante, et pagination (7 éléments par page)
    const listByGenre = await fetch(`${titlesUrl}?genre=Adventure&sort_by=-imdb_score&page_size=7`);
    
    // Conversion de la réponse en format JSON
    const adventureList = await listByGenre.json();

    // Sélection de l'élément HTML représentant le carrousel "Adventure"
    const adventureCarousel = document.querySelector("#adventureCarousel");
    
    // Effacement du contenu existant du carrousel
    adventureCarousel.innerHTML = "";

    // Itération sur la liste de films "Adventure" pour créer des éléments HTML et les ajouter au carrousel
    adventureList.results.forEach(element => {
        // Création d'un élément <div> pour chaque film
        let div = document.createElement('div');
        div.classList.add('carousel-item'); // Ajout de la classe CSS 'carousel-item' à l'élément <div>

        // Création d'un élément <img> pour afficher l'image du film
        let img = document.createElement('img');
        img.setAttribute('src', element['image_url']); // Attribution de l'URL de l'image
        div.appendChild(img); // Ajout de l'élément <img> à l'élément <div>
        
        // Ajout de l'élément <div> au carrousel "Adventure"
        adventureCarousel.appendChild(div);
    });
}

// Appel de la fonction pour récupérer et afficher la liste de films "Adventure" lors du chargement de la page
getListByGenreAdventure();