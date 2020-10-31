import React, { useEffect, useState } from "react";
import Api from "../Utility/Api";
import SearchResult from "./SearchResult";

function MovieContainer() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchOutput, setSearchOutput] = useState([]);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    fetch(Api.Api + "videos")
      .then((data) => data.json())
      .then((result) => {
        setMovies(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSetValue = (e) => {
    setSearchValue(e.target.value);
  };
  console.log(movies);

  const handleOnsubmit = (e) => {
    e.preventDefault();
    setCheck(false);
    fetch(Api.Api + "search", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchValue,
      }),
    })
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        setSearchOutput(result);
        setCheck(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setSearchValue("");
  };

  const setVoteAverage = (vote) => {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 6) {
      return "orange";
    } else {
      return "red";
    }
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnsubmit}>
          <input
            className="searchField"
            placeholder="Press Enter to submit"
            value={searchValue}
            onChange={handleSetValue}
            type="search"
          />
        </form>
      </header>

      {check ? (
        <SearchResult data={searchOutput} />
      ) : (
        <>
          <div className="info">
            <h1>You can search by Name, Genre, or IMDb rating.</h1>
            <h1>On hover movie details will show up.</h1>
          </div>
          <div className="movieContainer">
            {movies.map((movie) => {
              return (
                <div key={movie.movie_name} className="movieDiv">
                  <img
                    src={
                      movie.imageUrl.includes("nopicture")
                        ? "https://images.unsplash.com/photo-1512070679279-8988d32161be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
                        : movie.imageUrl
                    }
                    alt={movie.imageUrl}
                  />

                  <div className="movieTitle">
                    <h3>{movie.movie_name}</h3>
                    <span
                      className={`amno ${setVoteAverage(movie.imdb_Rating)}`}
                    >
                      {movie.imdb_Rating}
                    </span>
                  </div>
                  <div className="movieDetails">
                    <h2>Overview: </h2>
                    <p>
                      Metascore:<span> </span>
                      {movie.metaScore}
                    </p>
                    <p>
                      Genre:<span> </span>
                      {movie.genre}
                    </p>
                    <p>
                      Duration:<span> </span>
                      {movie.duration}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default MovieContainer;
