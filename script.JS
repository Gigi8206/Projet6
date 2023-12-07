
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
  
  async function searchAndFilterMovies() {
    const apiUrl = 'http://localhost:8000/api/v1/titles/';
  
    
    const yearFilter = 'year=2020';
  
    
    const imdbScoreFilter = 'imdb_score_min=7.5';
  
   
    const titleFilter = 'title=Inception';
  
    
    const directorFilter = 'director=Christopher Nolan';
  
   
    const searchUrl = `${apiUrl}?${yearFilter}&${imdbScoreFilter}&${titleFilter}&${directorFilter}`;
  
   
    const moviesData = await fetchData(searchUrl);
    console.log(moviesData);
  }
  
  
  searchAndFilterMovies();
  async function getMovieDetailsById(movieId) {
    const apiUrl = `http://localhost:8000/api/v1/titles/${movieId}`;
    const movieDetails = await fetchData(apiUrl);
    console.log(movieDetails);
  }
  
  // Appeler la fonction pour obtenir des informations détaillées sur un film par ID
  getMovieDetailsById(499549);
    