//Importação de hooks
import { useState, useEffect } from "react";

//Importação de componentes
import { MovieCard } from "./MovieCard";

//Importação de api
import { api } from "../services/api";

//Criaçaõ de interfaces
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface PropGenreId {
  selectGenreId: number;
}

export function Content(props: PropGenreId) {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${props.selectGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${props.selectGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [props.selectGenreId]);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
