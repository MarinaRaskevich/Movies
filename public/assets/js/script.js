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
  });

// Function principale
const getData = (data) => {
  const movies = data.results;
  title.innerText = `Sélection de ${movies.length} films populaires`;

  movies.forEach((movie) => {
    // Vérifier s'il y a une description pour le film
    const overview =
      movie.overview == "" ? "Pas de déscription" : movie.overview;

    // Couleur de rate
    const rateColor =
      movie.vote_average >= 7 ? "text-success" : "text-secondary";

    // Date française
    let date = Date.parse(movie.release_date);
    date = new Date(date);
    date = date.toLocaleString("fr", { dateStyle: "long" });

    row.innerHTML += `
    <div class="col-12 col-md-6 col-lg-4 col-xl-3">
      <div class="card border-0 bg-transparent">
        <img src="https://image.tmdb.org/t/p/original${
          movie.poster_path
        }" alt="${movie.title}" class="w-100 poster">
        <div class="card-body">
          <h2 class="card-title text-white fs-5">${movie.title}</h2>
          <div class="d-flex justify-content-between">
            <p class="card-text ${rateColor}"><i class="bi bi-star-fill ${rateColor}"></i> ${parseFloat(
      movie.vote_average.toFixed(1)
    )}</p>
            <a type="button" data-bs-toggle="modal" data-bs-target="#modal${
              movie.id
            }" class="text-secondary text-decoration-none">
              Plus d'info
            </a>
          </div>
          
          <div class="modal fade" id="modal${
            movie.id
          }" tabindex="-1" aria-labelledby="#modalLabel${
      movie.id
    }" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content bg-black">
                <div class="modal-header border-0">
                  <div>
                    <h3 class="modal-title fs-5 fw-bold text-white" id="modalLabel${
                      movie.id
                    }">${movie.title}</h3>
                    <p class="m-0 text-secondary">${movie.original_title}</p>
                  </div>
                </div>
                <div class="modal-body row py-4 text-white">
                  <div class="col-4">
                    <img src="https://image.tmdb.org/t/p/original${
                      movie.poster_path
                    }" alt="${movie.title}" class="w-100 poster">
                  </div>
                  <div class="col-8 d-flex flex-column justify-content-between">
                    <h4>Déscription</h4>
                    <p class="pe-4">${overview}</p>
                    <p class="text-secondary m-0">Date de sortie: ${date}</p>
                  </div>
                </div>
                <div class="modal-footer border-0">
                  <button type="button" class="btn btn-light" data-bs-dismiss="modal">Fermer</button>
                </div>
              </div>
            </div>
          </div>        
        </div>
      </div>
    </div> `;
  });
};
