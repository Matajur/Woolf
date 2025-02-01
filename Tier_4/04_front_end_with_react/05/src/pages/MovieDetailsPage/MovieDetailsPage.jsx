import { Suspense, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { getAccessKey } from "api/api-tmdb";

import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const locationObj = useRef(location?.state?.url || "/movies");

  const accessKey = getAccessKey();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    const options = {
      headers: {
        Authorization: `Bearer ${accessKey}`,
      },
    };

    axios
      .get(url, options)
      .then((response) => setMovie(response.data))
      .catch((err) => console.error(err));
  }, [movieId, accessKey]);

  const goBack = () => {
    navigate(locationObj.current, {
      state: { content: location?.state?.content },
    });
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={goBack}>Go Back</button>
      <div className={styles.movieWrapper}>
        <img
          width="250"
          className={styles.posterImg}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
        />
        <ul className={styles.movieDescription}>
          <li>
            <h2>
              {movie.title} ({movie.release_date.slice(0, 4)})
            </h2>
          </li>
          <li>User score: {Math.round(movie.vote_average * 10)}%</li>
          <li>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </li>
          <li>
            <h3>Genres</h3>
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
          </li>
        </ul>
      </div>
      <hr />
      <div>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" state={location.state}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={location.state}>
              Reviews
            </Link>
          </li>
        </ul>
        <hr />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
