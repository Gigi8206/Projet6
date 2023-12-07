titlesUrl = "http://localhost:8000/api/v1/titles/"


async function getListBestScores() {
    fetch(`${titlesUrl}?sort_by=-imdb_score&page_size=7`)
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

getListBestScores()