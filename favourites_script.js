const movieCard = document.querySelector(".movie-card");

//--------------- fetch movies list from local storage for favourites

window.addEventListener("load", async () => {
  const favourites_list = JSON.parse(localStorage.getItem("favourites")) || [];

  displayMovies(favourites_list);
});

//--------------------- remove from favourites and local storage

const removeFavourites = (id) => {
  const favourites_list = JSON.parse(localStorage.getItem("favourites")) || [];

  const newFavourites = favourites_list.filter((item) => item.imdbID !== id);

  localStorage.setItem("favourites", JSON.stringify(newFavourites));
  displayMovies(newFavourites);
};

//--------------- display movie card dynamically on UI

const displayMovies = (movie_list) => {
  document.getElementById("movie-card").innerHTML = "";
  for (let data of movie_list) {
    const redirect_link = document.createElement("a");
    redirect_link.setAttribute("href", `movies.html?imdbId=${data.imdbID}`);
    redirect_link.setAttribute("id", "card-link");

    const delete_div = document.createElement("div");
    delete_div.classList.add("remove-icon");

    const delete_icon = document.createElement("i");
    delete_icon.classList.add("fas", "fa-times");

    delete_div.appendChild(delete_icon);

    delete_div.addEventListener(
      "click",
      function (e) {
        e.stopPropagation();
        e.preventDefault();
        removeFavourites(data.imdbID);
      },
      false
    );

    redirect_link.appendChild(delete_div);

    const card_div = document.createElement("div");
    card_div.classList.add("card");

    const poster_div = document.createElement("div");
    poster_div.classList.add("poster");

    const poster_img = document.createElement("img");
    poster_img.setAttribute("src", data.Poster);
    poster_img.setAttribute("alt", data.Title);

    poster_div.appendChild(poster_img);
    card_div.appendChild(poster_div);

    const details_div = document.createElement("div");
    details_div.classList.add("movie-details");

    const title_h2 = document.createElement("h2");
    title_h2.innerHTML = data.Title;

    const director_h4 = document.createElement("h4");
    director_h4.innerHTML = `Directed By: ${data.Director}`;

    details_div.appendChild(title_h2);
    details_div.appendChild(director_h4);

    const rating_div = document.createElement("div");
    rating_div.classList.add("rating");

    const star_icon = document.createElement("i");
    star_icon.classList.add("fas", "fa-star");

    rating_div.appendChild(star_icon);
    rating_div.innerHTML = `<i class="fas fa-star"></i> ${data.imdbRating}`;

    details_div.appendChild(rating_div);

    const genre_div = document.createElement("div");
    genre_div.classList.add("genre");

    for (let item of data.Genre.split(",")) {
      const genre = document.createElement("span");
      genre.innerHTML = item.trim();

      genre_div.appendChild(genre);
    }

    details_div.appendChild(genre_div);

    const info_div = document.createElement("div");
    info_div.classList.add("info");

    const desc_para = document.createElement("p");
    desc_para.innerHTML = `${data.Plot.substring(0, 200)}...`;

    info_div.appendChild(desc_para);
    details_div.appendChild(info_div);
    card_div.appendChild(details_div);

    redirect_link.appendChild(card_div);
    movieCard.appendChild(redirect_link);
  }
};
