//IMDB API KEY
const API_KEY = `121631c1`;

// -------------------------- get the imdbId from URL params

const urlParams = new URLSearchParams(window.location.search);
let imdbID = urlParams.get("imdbId");

let tempMovie;

//---------------- fetch detailed movie details using imdbID

window.addEventListener("load", async () => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
  );
  const fetched_data = await response.json();
  tempMovie = fetched_data;
  displayMovies(fetched_data);
});

const movie_info = document.querySelector("#movie-info");

//--------------- display detailed movie dynamically on UI

const displayMovies = (fetched_data) => {
  const left_sec_div = document.createElement("div");
  left_sec_div.classList.add("left-sec");

  const poster_img = document.createElement("img");
  poster_img.setAttribute("src", fetched_data.Poster);
  poster_img.setAttribute("alt", fetched_data.Title);

  left_sec_div.appendChild(poster_img);
  movie_info.appendChild(left_sec_div);

  const right_sec_div = document.createElement("div");
  right_sec_div.classList.add("right-sec");

  const title_h1 = document.createElement("h1");
  title_h1.innerHTML = fetched_data.Title;

  right_sec_div.appendChild(title_h1);

  const details_div = document.createElement("div");
  details_div.classList.add("details");

  const sub_details1_div = document.createElement("div");
  sub_details1_div.classList.add("sub-detail");

  const para1 = document.createElement("p");
  para1.innerHTML = "Release Date";

  const h4_1 = document.createElement("h4");
  h4_1.innerHTML = fetched_data.Released;

  sub_details1_div.appendChild(para1);
  sub_details1_div.appendChild(h4_1);
  details_div.appendChild(sub_details1_div);

  const sub_details2_div = document.createElement("div");
  sub_details2_div.classList.add("sub-detail");

  const para2 = document.createElement("p");
  para2.innerHTML = "Running Time";

  const h4_2 = document.createElement("h4");
  h4_2.innerHTML = fetched_data.Runtime;

  sub_details2_div.appendChild(para2);
  sub_details2_div.appendChild(h4_2);
  details_div.appendChild(sub_details2_div);

  const sub_details3_div = document.createElement("div");
  sub_details3_div.classList.add("sub-detail");

  const para3 = document.createElement("p");
  para3.innerHTML = "Genre";

  const h4_3 = document.createElement("h4");
  h4_3.innerHTML = fetched_data.Genre;

  sub_details3_div.appendChild(para3);
  sub_details3_div.appendChild(h4_3);
  details_div.appendChild(sub_details3_div);

  const sub_details4_div = document.createElement("div");
  sub_details4_div.classList.add("sub-detail");

  const para4 = document.createElement("p");
  para4.innerHTML = "Rating";

  const h4_4 = document.createElement("h4");
  h4_4.innerHTML = `${fetched_data.imdbRating}/10`;

  sub_details4_div.appendChild(para4);
  sub_details4_div.appendChild(h4_4);
  details_div.appendChild(sub_details4_div);

  right_sec_div.appendChild(details_div);

  const favourite_button = document.createElement("button");
  favourite_button.innerHTML =
    "Add to Favourites&nbsp; <i class='fas fa-heart'></i>";

  favourite_button.addEventListener("click", addToFavourites);

  right_sec_div.appendChild(favourite_button);

  const writer_para = document.createElement("p");
  writer_para.innerHTML = `<strong>Writers: </strong> ${fetched_data.Writer}`;

  right_sec_div.appendChild(writer_para);

  const director_para = document.createElement("p");
  director_para.innerHTML = `<strong>Directors: </strong> ${fetched_data.Director}`;

  right_sec_div.appendChild(director_para);

  const actor_para = document.createElement("p");
  actor_para.innerHTML = `<strong>Actors: </strong> ${fetched_data.Actors}`;

  right_sec_div.appendChild(actor_para);

  const plot_para = document.createElement("p");
  plot_para.classList.add("movie-desc");
  plot_para.innerHTML = fetched_data.Plot;

  right_sec_div.appendChild(plot_para);

  const language_mark = document.createElement("mark");
  const language_strong = document.createElement("strong");
  language_strong.innerHTML = `Languages: ${fetched_data.Language}`;

  language_mark.appendChild(language_strong);

  right_sec_div.appendChild(language_mark);

  const awards_para = document.createElement("p");

  const awards_mark = document.createElement("mark");
  const awards_strong = document.createElement("strong");
  const awards_i = document.createElement("i");
  awards_i.innerHTML = `Awards: ${fetched_data.Awards}`;

  awards_strong.appendChild(awards_i);
  awards_mark.appendChild(awards_strong);
  awards_para.appendChild(awards_mark);
  right_sec_div.appendChild(awards_para);

  movie_info.appendChild(right_sec_div);
};

// ----------------------- add to favourites to local storage

const addToFavourites = () => {
  const favourites_list = JSON.parse(localStorage.getItem("favourites")) || [];

  tempMovie && favourites_list.push(tempMovie);

  localStorage.setItem("favourites", JSON.stringify(favourites_list));

  alert("Added to Favourites!");
};
