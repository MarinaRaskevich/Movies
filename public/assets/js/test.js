// Sélecteurs
const row = document.querySelector(".row");
const title = document.querySelector("#title");

// Fetch
fetch("/public/assets/json/movies.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    getData(data);
  })
  .catch((error) => console.error("Error loading JSON file", error));

// Function principale
const getData = (data) => {
  const movies = data.results;
  title.innerText = `Sélection de ${movies.length} films intéressants`;

  movies.forEach((movie) => {
    // Vérifier s'il y a une description pour le film
    const overview =
      movie.overview == "" ? "Pas de déscription" : movie.overview;
    row.innerHTML += `
    <div class="col-4">
        <div class="row films">
            <div class="col-4">
                <img class="w-100" src="https://image.tmdb.org/t/p/original${
                  movie.poster_path
                }" alt="${movie.title}">
            </div>
            <div class="col-8 d-flex flex-column h-100">
                <h2 class="fs-5 fw-bold mb-3">${movie.title}</h2>
                <p class="fw-bold fs-6 mt-auto"><i class="bi bi-star-fill"></i> ${parseFloat(
                  movie.vote_average.toFixed(1)
                )}</p>
                <a
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Savoir plus
                </a>
            </div>
        </div>
    </div>
    `;
  });
};

// <div class="h-50 description">
// <p>${overview}</p>
// </div>
