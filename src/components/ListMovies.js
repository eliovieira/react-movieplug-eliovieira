import React from "react";
import Popup from "reactjs-popup";

import "./ListMovies.css";
import "./Modal.css";
import nocover from "../images/nocover.jpg";

const ListMovies = ({
  data,
  genre,
  cast,
  page,
  setPage,
  totalPages,
  totalResults,
}) => {
  function checkDirector(movieId) {
    if (cast) {
      for (const movie of cast) {
        if (movie.id === movieId) {
          for (let i = 0; i < movie.cast.length; i++) {
            if (movie.crew[i] && movie.crew[i].job === "Director") {
              return movie.crew[i].name;
            }
          }
        }
      }
    }
  }

  function checkGenre(genreIds) {
    let x = [];

    for (const genreId of genreIds) {
      for (const genreName of genre) {
        if (genreId === genreName.id) {
          x.push(genreName.name);
        }
      }
    }
    return x.join(", ");
  }

  function checkCast(movieId) {
    const actors = [];
    if (cast) {
      for (const movie of cast) {
        if (movie.id === movieId) {
          for (let i = 0; i < movie.cast.length; i++) {
            if (movie.cast[i].known_for_department === "Acting") {
              actors.push(movie.cast[i].name);
            }
          }
        }
      }
      if (actors.length > 10) {
        return actors.slice(0, 10).join(", ");
      } else {
        return actors.join(", ");
      }
    }
  }

  return (
    <div className="listMovies-container">
      <div className="pagination-bar">
        <span className="results-text">
          {data && totalResults} Results found
        </span>
        <div className="pages-group">
          <span className="pages-text">
            Page {page} of {totalPages}
          </span>
          <div className="pages-button">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              <span
                class="material-symbols-outlined"
                style={{ paddingTop: "3px" }}
              >
                arrow_left
              </span>
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={Number(page) === Number({ totalPages })}
            >
              <span
                class="material-symbols-outlined"
                style={{ paddingTop: "3px" }}
              >
                arrow_right
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="listMovies">
        {data &&
          data.map((movie) => (
            <Popup
              key={movie.id}
              trigger={
                <div className="movie" key={movie.id}>
                  <img
                    src={
                      movie.poster_path
                        ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path
                        : nocover
                    }
                    alt={movie.original_title}
                  />
                  <span className="movie-title">
                    {movie.original_language === "ja"
                      ? movie.original_title.slice(0, 19)
                      : movie.original_title.slice(0, 34)}
                  </span>
                  <span className="movie-year">
                    {movie.release_date.slice(0, 4)}
                  </span>
                </div>
              }
              modal
            >
              {(close) => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>
                  <div className="modal-info">
                    <img
                      width="250px"
                      height="370px"
                      src={
                        movie.poster_path
                          ? "https://image.tmdb.org/t/p/w500/" +
                            movie.poster_path
                          : nocover
                      }
                      alt={movie.original_title}
                    />
                    <div className="modal-text">
                      <div className="header">
                        {movie.title}
                        <span className="details-year">
                          ({movie.release_date.slice(0, 4)})
                        </span>
                      </div>
                      <div className="director">
                        <span className="purple-text">Director:</span>{" "}
                        {cast && checkDirector(movie.id)}
                      </div>
                      <div className="cast">
                        <span className="purple-text">Cast:</span>{" "}
                        {data && checkCast(movie.id)}
                      </div>
                      <div className="genre">
                        <span className="purple-text">Genre: </span>{" "}
                        {genre && checkGenre(movie.genre_ids)}
                      </div>
                      <div className="content">{movie.overview}</div>
                      <div className="actions"></div>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          ))}
      </div>
    </div>
  );
};

export default ListMovies;
