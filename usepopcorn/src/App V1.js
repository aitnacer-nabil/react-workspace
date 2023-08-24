import { useEffect, useState } from "react";
import React from "react";
import StarRating from "./StarRating";

const API_KEY = "562fd176";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function ResultText({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function SearchBar({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
export default function App() {
  const [watched, setWatched] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
  function handleSelecteMovie(id) {
    setSelectedId((current) => (current === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(URL);
          if (!res.ok) throw new Error("something went work");
          const data = await res.json();
          console.log(data);
          if (!data.Response) throw Error(`${data.Error}`);
          setMovies(data.Search);

          console.log(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
      if (query.length < 3) {
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );
  return (
    <>
      <Navbar>
        {" "}
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <ResultText movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!loading && !error && (
            <MoviesList movies={movies}>
              <MovieItemList setId={handleSelecteMovie} />
            </MoviesList>
          )}
        </Box>

        <Box>
          {selectedId ? (
            <SelectedMovie
              onCloseMovie={handleCloseMovie}
              selectedId={selectedId}
              setError={setError}
            />
          ) : (
            <>
              <SummaryBox
                length={watched.length}
                avgImdbRating={avgImdbRating}
                avgRuntime={avgRuntime}
                avgUserRating={avgUserRating}
              />

              <MoviesList movies={watched}>
                <MovieItemWatch />
              </MoviesList>
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function Loader() {
  console.log("Loading");
  return <p className="loader">Loading.....</p>;
}
function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}
function WatchListBox({ watched, children }) {
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className="box">
      <ButtonToggle isOpen={isOpen2} setIsOpen={setIsOpen2} />
      {isOpen2 && children}
    </div>
  );
}
function MovieItemWatch({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
function SummaryBox({ length, avgImdbRating, avgUserRating, avgRuntime }) {
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ButtonToggle isOpen={isOpen} setIsOpen={setIsOpen} />

      {isOpen && children}
    </div>
  );
}
function MoviesList({ movies, children }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) =>
        React.Children.map(children, (child) =>
          React.cloneElement(child, { movie })
        )
      )}
    </ul>
  );
}
function MovieItemList({ movie, setId }) {
  return (
    <li key={movie.imdbID} onClick={() => setId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function ButtonToggle({ isOpen, setIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}
function SelectedMovie({ selectedId, onCloseMovie, setError }) {
  const [movie, setMovie] = useState({});
  const [isloading, setIsloading] = useState(false);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const URL = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`;
  useEffect(
    function () {
      async function getMovieDetail() {
        setIsloading(true);
        try {
          const res = await fetch(URL);
          if (!res.ok) throw new Error("something went wrong");
          const data = await res.json();

          if (!data.Response) throw new Error(`${data.Error}`);

          setMovie(data);
          isloading(false);
        } catch (error) {
          setError(error.message);
        }
      }
      getMovieDetail();
    },
    [selectedId]
  );

  return (
    <div className="details">
      {isloading ? <Loader /> :
      (
        <>
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${movie} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} />
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
      </>
      )}
    </div>
  );
}
