// IMDB API KEY
const API_KEY = `121631c1`;

const input_box = document.querySelector("#movie_input");
const input_submit = document.querySelector("#imdb_form");
const movieCard = document.querySelector(".movie-card");
const loader = document.querySelector(".loader");
const movie_suggestion = document.querySelector("#movie-list");

//---------------------- search movies on input submit

input_submit.addEventListener("submit", (e) => {
  e.preventDefault();

  const search_text = input_box.value;

  fetchMoviesList(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search_text}&type=movie`
  );
});

//---------------------- search movies on key press

const autoCompleteSearchMovies = async () => {
  const search_text = input_box.value;

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search_text}&plot=short&type=movie`
  );

  const fetched_data = await response.json();

  if (fetched_data.Response === "True") {
    movie_suggestion.classList.add("movie-lists");
    movie_suggestion.innerHTML = "";
    for (let list_item of fetched_data.Search) {
      const movie_anchor = document.createElement("a");
      movie_anchor.setAttribute(
        "href",
        `movies.html?imdbId=${list_item.imdbID}`
      );

      const movie_li = document.createElement("li");
      movie_li.innerHTML = list_item.Title;

      movie_anchor.appendChild(movie_li);

      movie_suggestion.appendChild(movie_anchor);
    }
  }

  if (input_box.value === "") {
    movie_suggestion.innerHTML = "";
    movie_suggestion.classList.remove("movie-lists");
  }
};

// -------------------------Search movies individally with full details by imdb id

const fetchMoviesList = async (url) => {
  loader.classList.remove("loader-hidden");
  document.getElementById("movie-card").innerHTML = "";
  movie_suggestion.innerHTML = "";
  movie_suggestion.classList.remove("movie-lists");

  const response = await fetch(url);
  const fetched_data = await response.json();

  const newMovieResponse = [];

  if (fetched_data.Response === "True") {
    for (let data of fetched_data.Search) {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${data.imdbID}&plot=short`
      );
      const res = await response.json();

      const movie_data = {
        poster: data.Poster,
        title: data.Title,
        plot: res.Plot,
        genre: res.Genre.split(","),
        rating: res.imdbRating,
        director: res.Director,
        imdbID: data.imdbID,
      };

      newMovieResponse.push(movie_data);
    }
  }

  loader.classList.add("loader-hidden");

  displayMovies(newMovieResponse);
};

//--------------------- add to favourites to local storage

const addFavourites = async (id) => {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=short`
  );
  const res = await response.json();

  const favourites_list = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites_list.push(res);

  localStorage.setItem("favourites", JSON.stringify(favourites_list));
  alert("Added to Favourites!");
};

//--------------- display movie card dynamically on UI

const displayMovies = (movie_list) => {
  movie_suggestion.innerHTML = "";
  movie_suggestion.classList.remove("movie-lists");
  document.getElementById("movie-card").innerHTML = "";
  for (let data of movie_list) {
    const redirect_link = document.createElement("a");
    redirect_link.setAttribute("href", `movies.html?imdbId=${data.imdbID}`);
    redirect_link.setAttribute("id", "card-link");

    const fav_div = document.createElement("div");
    fav_div.classList.add("favourite-icon");

    const fav_icon = document.createElement("i");
    fav_icon.classList.add("fas", "fa-heart");

    fav_div.appendChild(fav_icon);

    fav_div.addEventListener(
      "click",
      function (e) {
        e.stopPropagation();
        e.preventDefault();
        addFavourites(data.imdbID);
      },
      false
    );

    redirect_link.appendChild(fav_div);

    const card_div = document.createElement("div");
    card_div.classList.add("card");

    const poster_div = document.createElement("div");
    poster_div.classList.add("poster");

    const poster_img = document.createElement("img");
    poster_img.setAttribute("src", data.poster);
    poster_img.setAttribute("alt", data.title);

    poster_div.appendChild(poster_img);
    card_div.appendChild(poster_div);

    const details_div = document.createElement("div");
    details_div.classList.add("movie-details");

    const title_h2 = document.createElement("h2");
    title_h2.innerHTML = data.title;

    const director_h4 = document.createElement("h4");
    director_h4.innerHTML = `Directed By: ${data.director}`;

    details_div.appendChild(title_h2);
    details_div.appendChild(director_h4);

    const rating_div = document.createElement("div");
    rating_div.classList.add("rating");

    const star_icon = document.createElement("i");
    star_icon.classList.add("fas", "fa-star");

    rating_div.appendChild(star_icon);
    rating_div.innerHTML = `<i class="fas fa-star"></i> ${data.rating}`;

    details_div.appendChild(rating_div);

    const genre_div = document.createElement("div");
    genre_div.classList.add("genre");

    for (let item of data.genre) {
      const genre = document.createElement("span");
      genre.innerHTML = item.trim();

      genre_div.appendChild(genre);
    }

    details_div.appendChild(genre_div);

    const info_div = document.createElement("div");
    info_div.classList.add("info");

    const desc_para = document.createElement("p");
    desc_para.innerHTML = data.plot;

    info_div.appendChild(desc_para);
    details_div.appendChild(info_div);
    card_div.appendChild(details_div);

    redirect_link.appendChild(card_div);
    movieCard.appendChild(redirect_link);
  }
};
