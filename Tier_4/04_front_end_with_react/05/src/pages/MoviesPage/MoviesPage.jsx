import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import { MovieList } from "components";

import { getAccessKey } from "api/api-tmdb";

const MoviesPage = () => {
  const [moviesFound, setMoviesFound] = useState([]);
  const [params, setParams] = useSearchParams();
  const location = useLocation();

  const accessKey = getAccessKey();

  useEffect(() => {
    if (location.state && location.state.content) {
      setMoviesFound(location.state.content);
    }
  }, [location.state]);

  const query = params.get("title") ?? "";

  const handleSearch = (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const options = {
      headers: {
        Authorization: `Bearer ${accessKey}`,
      },
    };

    axios
      .get(url, options)
      .then((response) => setMoviesFound(response.data.results))
      .catch((err) => console.error(err));
  };

  const handleQuery = (newQuery) => {
    if (!newQuery) {
      return setParams({});
    }
    params.set("title", newQuery);
    setParams(params);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={({ target: { value } }) => handleQuery(value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      {moviesFound.length != 0 && <MovieList movies={moviesFound} />}
    </div>
  );
};

export default MoviesPage;
