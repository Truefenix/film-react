import { useEffect, useState } from "react";
import Search from "./components/search";
import Spinner from './components/Spinner';
import MovieCard from "./components/MovieCard";


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endPoint, API_OTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.Response === 'false') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || [])
    } catch (error) {
      console.log(`Error fetching movie: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later!');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(searchTerm);

  }, [searchTerm]); // array de dependências


  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Encontre <span className="text-gradient">filmes</span> que você gosta</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <h1 className="text-white">{searchTerm}</h1>

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>

          {isLoading ? ( //esta carregando?
            <Spinner />

          ) : errorMessage ? ( // se não? mostre o erro
            <p className="text-red-500">{errorMessage}</p>

          ) : ( // carrgue os elementos
            <ul>
              {movieList.map((movie) => {
                return (
                  <MovieCard key={movie.id} movie={movie} />
                )
              })}
            </ul>
          )}
        </section>

      </div>
    </main>
  )
}

export default App;