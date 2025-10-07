import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';
import { getWatchlist, removeMovie, markWatched } from '../services/movieService';

/**
 * Watchlist page for managing movies
 * @returns {JSX.Element}
 */
function Watchlist() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getWatchlist();
        setWatchlist(data);
        setLoading(false);
      } catch (error) {
        toast.error(error);
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, [location]); // Refetch when location changes

  const handleRemoveMovie = async (movieId) => {
    try {
      await removeMovie(movieId);
      setWatchlist(watchlist.filter((movie) => movie.movieId !== movieId));
      toast.success('Movie removed from watchlist!');
    } catch (error) {
      toast.error(error);
    }
  };

  const handleMarkWatched = async (movieId) => {
    try {
      const updatedMovie = await markWatched(movieId);
      setWatchlist(
        watchlist.map((movie) =>
          movie.movieId === movieId ? { ...movie, watched: updatedMovie.watched } : movie
        )
      );
      toast.success(`Marked as ${updatedMovie.watched ? 'watched' : 'unwatched'}!`);
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Your Watchlist
        </h2>
        {watchlist.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Your watchlist is empty. Add some movies from the home page!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.map((movie) => (
              <div
                key={movie.movieId}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster')}
                />
                <div className="p-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Status: {movie.watched ? 'Watched' : 'Unwatched'}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleMarkWatched(movie.movieId)}
                      className="flex-grow bg-blue-500 text-white px-3 py-2 rounded text-sm sm:text-base hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      {movie.watched ? 'Mark Unwatched' : 'Mark Watched'}
                    </button>
                    <button
                      onClick={() => handleRemoveMovie(movie.movieId)}
                      className="flex-grow bg-red-500 text-white px-3 py-2 rounded text-sm sm:text-base hover:bg-red-600 dark:hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;