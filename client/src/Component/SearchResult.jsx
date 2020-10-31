import React from "react";

function SearchResult(props) {
  console.log(props);
  return (
    <>
      <div className="info">
        <h1>Here are your search result</h1>
      </div>
      <div className="movieContainer">
        {props.data.map((movie) => {
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
                <span className="amno">{movie.imdb_Rating}</span>
              </div>
              <div className="movieDetails">
                <h2>Overview:</h2>
                <p>Metascore:{movie.metaScore}</p>
                <p>Genre:{movie.genre}</p>
                <p>Duration:{movie.duration}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SearchResult;
