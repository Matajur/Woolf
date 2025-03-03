import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { nanoid } from "nanoid";

const moviesPath = resolve("db", "movies.json");

async function updateMovies(movies) {
  await writeFile(moviesPath, JSON.stringify(movies, null, 2));
}

export async function getMovies() {
  const data = await readFile(moviesPath, "utf-8");
  return JSON.parse(data);
}

export async function getMovieById(movieId) {
  const movies = await getMovies();
  const result = movies.find((item) => item.id === movieId);
  return result || null;
}

export async function removeMovie(movieId) {
  const movies = await getMovies();
  const index = movies.findIndex((item) => item.id === movieId);
  if (index === -1) return null;
  const [result] = movies.splice(index, 1);
  await updateMovies(movies);
  return result;
}

export async function addMovie({ title, director }) {
  if (title == null) return null;
  const movies = await getMovies();
  const newMovie = {
    id: nanoid(),
    title: title,
    director: director || null,
  };
  movies.push(newMovie);
  await updateMovies(movies);
  return newMovie;
}

export async function updateMovieById(movieId, data) {
  const movies = await getMovies();
  const index = movies.findIndex((item) => item.id === movieId);
  if (index === -1) return null;
  movies[index] = { ...movies[index], ...data };
  await updateMovies(movies);
  return movies[index];
}
