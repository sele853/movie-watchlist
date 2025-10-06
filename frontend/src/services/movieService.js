import axios from "axios";

//Search movie via tmdb api
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_TMDB_BASE_URL}/search/movie`,
      {
        params: {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          query,
          page,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to search movies";
  }
};

//get user's watchlist
export const getWatchlist = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/watchlist`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to fetch watchlist";
  }
};

//Add movie to watchlist
export const addMovie = async (movie) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/watchlist/add`,
      movie
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to add movie";
  }
};

//Remove movie from watchlist
export const removeMovie = async (movieId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/watchlist/remove/${movieId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to remove movie";
  }
};

//mark movie as watched or unwatched
export const markWatched = async (movieId) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/watchlist/watched/${movieId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Failed to update watch status";
  }
};
