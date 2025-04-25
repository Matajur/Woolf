import Movie from "../db/models/Movie.js";

export const getMovies = (query, limit, offset) =>
  Movie.findAll({
    where: query,
    limit: Number(limit),
    offset: Number(offset),
  });

// export const getMovieById = (id) => Movie.findByPk(id);

export const getMovie = (query) =>
  Movie.findOne({
    where: query,
  });

export const removeMovie = async (query) => {
  const movie = await getMovie(query);
  if (!movie) return null;
  await movie.destroy();

  return movie;
};

export const addMovie = (data) => Movie.create(data);

export const updateMovie = async (query, data) => {
  const movie = await getMovie(query);
  if (!movie) return null;

  return movie.update(data, { returning: true });
};
