import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';
import { searchMovies, addMovie } from '../services/movieService';

/**
 * Home page with TMDB movie search and add to watchlist
 * @returns {JSX.Element}
 */
function Home() {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return toast.error('Please enter a search term');
    try {
      const data = await searchMovies(query, page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      toast.error(error);
    }
  };

  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    try {
      const data = await searchMovies(query, newPage);
      setMovies(data.results);
      setPage(newPage);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleAddMovie = async (movie) => {
    if (!user) {
      toast.error('Please log in to add movies to your watchlist');
      return;
    }
    try {
      await addMovie({
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path
      });
      toast.success(`${movie.title} added to watchlist!`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Search Movies
        </h2>
        <form onSubmit={handleSearch} className="mb-8 max-w-lg mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie..."
              className="flex-grow p-3 text-sm sm:text-base border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-3 rounded text-sm sm:text-base hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster')}
              />
              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {movie.overview.slice(0, 100)}...
                </p>
                <button
                  onClick={() => handleAddMovie(movie)}
                  className="mt-4 bg-green-500 text-white px-3 py-2 rounded text-sm sm:text-base hover:bg-green-600 dark:hover:bg-green-700 transition-colors w-full"
                >
                  Add to Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
        {movies.length > 0 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm sm:text-base disabled:bg-gray-400 hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Previous
            </button>
            <span className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm sm:text-base disabled:bg-gray-400 hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;