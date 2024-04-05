const row = document.querySelector(".row");

fetch("/public/assets/json/movies.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    getData(data);
  })
  .catch((error) => console.error("Error loading JSON file", error));

const getData = (data) => {
  const movies = data.results;

  movies.forEach((movie) => {
    // col
    const div = document.createElement("div");
    div.classList.add("col-2");

    // img
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/original${movie.poster_path}`
    );
    img.setAttribute("alt", `${movie.title}`);
    img.classList.add("w-100");

    // title
    const title = document.createElement("h2");
    title.classList.add("fs-5", "text-center", "fw-bold");
    title.textContent = `${movie.title}`;

    div.appendChild(img);
    div.appendChild(title);
    row.appendChild(div);
  });
};
