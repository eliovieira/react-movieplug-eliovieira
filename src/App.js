import "./App.css";
import axios from "axios";

//components
import ListMovies from "./components/ListMovies";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import "./components/Navbar.css";

// API KEY - 75984d6b73b9208c6f9dc21b163d917e

function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState(null);
  const [cast, setCast] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  // get search results
  async function handleClick(e) {
    e.preventDefault();
    if (query && query.length > 2) {
      await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=75984d6b73b9208c6f9dc21b163d917e&language=en-US&page=1&include_adult=false&query=${query}`
        )
        .then((response) => {
          setData(response.data.results);
          setTotalPages(response.data.total_pages);
          setTotalResults(response.data.total_results);
        })
        .catch((error) => console.log(error));
    }
  }

  //get popular movies and get the genres
  useEffect(() => {
    async function getData() {
      if (!data) {
        await axios
          .get(
            `https://api.themoviedb.org/3/movie/popular?api_key=75984d6b73b9208c6f9dc21b163d917e&language=en-US&page=${page}`
          )
          .then((response) => {
            setData(response.data.results);
            setTotalPages(response.data.total_pages);
            setTotalResults(response.data.total_results);
          })
          .catch((error) => console.log(error));
      }
      if (!genre) {
        await axios
          .get(
            "https://api.themoviedb.org/3/genre/movie/list?api_key=75984d6b73b9208c6f9dc21b163d917e&language=en-US"
          )
          .then((response) => {
            setGenre(response.data.genres);
          })
          .catch((error) => console.log(error));
      }
    }
    getData();
  }, []);

  //get actors and director
  useEffect(() => {
    async function getData() {
      if (data) {
        for (const movie of data) {
          await axios
            .get(
              `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=75984d6b73b9208c6f9dc21b163d917e&language=en-US`
            )
            .then((response) => {
              const movieCast = {
                id: movie.id,
                name: movie.original_title,
                cast: response.data.cast,
                crew: response.data.crew,
              };

              setCast((prevArray) => [...prevArray, movieCast]);
            })
            .catch((error) => console.log(error));
        }
      }
    }
    getData();
  }, [data]);

  return (
    <div className="container">
      <div className="navbar">
        <div className="navbar-container">
          <a href="./" style={{ textDecoration: "none" }}>
            <span className="title">
              movieplug
              <span className="plug-icon">
                <span class="material-symbols-outlined">
                  electrical_services
                </span>
              </span>
            </span>
          </a>
          <div className="search">
            <form onSubmit={handleClick}>
              <input
                className="input-search"
                type="text"
                placeholder="search here..."
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="button-search">
                <span className="material-symbols-outlined">search</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <ListMovies
        data={data}
        url={`https://api.themoviedb.org/3/movie/popular?api_key=75984d6b73b9208c6f9dc21b163d917e&language=en-US&page=${page}`}
        genre={genre}
        cast={cast}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        totalResults={totalResults}
      />
      <Footer />
    </div>
  );
}

export default App;
