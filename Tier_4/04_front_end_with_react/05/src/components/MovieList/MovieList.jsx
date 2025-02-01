import { Link, useLocation } from "react-router-dom";

export const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{url: location, content: movies}}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
