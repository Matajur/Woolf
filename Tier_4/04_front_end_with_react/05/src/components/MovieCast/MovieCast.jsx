import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { getAccessKey } from "api/api-tmdb";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  const accessKey = getAccessKey();

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
    const options = {
      headers: {
        Authorization: `Bearer ${accessKey}`,
      },
    };

    axios
      .get(url, options)
      .then((response) => setCast(response.data.cast))
      .catch((err) => console.error(err));
  }, [movieId, accessKey]);

  console.log("Cast", cast);

  return (
    <div>
      <ul>
        {cast.map((character) => (
          <li key={character.cast_id}>
            <img src={`https://image.tmdb.org/t/p/w500${character.profile_path}`} alt={`${character.original_name} photo`} width="100" />
            <p>{character.name}</p>
            <p>Character: {character.character}</p></li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
