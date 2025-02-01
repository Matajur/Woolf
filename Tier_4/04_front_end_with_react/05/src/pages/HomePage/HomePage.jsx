import axios from "axios";
import { useEffect, useState } from "react";

import { MovieList } from "components";
import { getAccessKey } from "api/api-tmdb";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const accessKey = getAccessKey();

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    const options = {
      headers: {
        Authorization: `Bearer ${accessKey}`,
      },
    };

    axios
      .get(url, options)
      .then((response) => setMovies(response.data.results))
      .catch((err) => console.error(err));
  }, [accessKey]);

  return (
    <div>
      <h1 className={styles.pageHeader}>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
