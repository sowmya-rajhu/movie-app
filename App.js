import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('/api/movies');
        const payload = await response.json();

        setMovies(payload.data || payload);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    }

    getData();
  }, []);

  // Search Filter
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">

      <h1>Movie List</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Selected Movie Details */}
      {selectedMovie && (
        <div className="selected-movie">

          <h2>{selectedMovie.title}</h2>

          <p>
            <b>Original Title:</b> {selectedMovie.original_title}
          </p>

          <p>
            <b>Release Date:</b> {selectedMovie.release_date}
          </p>

          <p>
            <b>Runtime:</b> {selectedMovie.runtime} minutes
          </p>

          <p>
            <b>Status:</b> {selectedMovie.status}
          </p>

          <p>
            <b>Rating:</b> {selectedMovie.vote_average}
          </p>

          <p>
            <b>Tagline:</b> {selectedMovie.tagline}
          </p>

          <p>{selectedMovie.overview}</p>

        </div>
      )}

      {/* Movies Grid */}
      <div className="movies-grid">

        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className={`movie-card ${
                selectedMovie?.id === movie.id ? 'active' : ''
              }`}
              onClick={() => setSelectedMovie(movie)}
            >

              <h2>{movie.title}</h2>

              <p>
                <b>Release Date:</b> {movie.release_date}
              </p>

              <p>
                <b>Rating:</b> {movie.vote_average}
              </p>

              <p>{movie.overview}</p>

            </div>
          ))
        ) : (
          <p>Loading movies...</p>
        )}

      </div>

    </div>
  );
}

export default App;