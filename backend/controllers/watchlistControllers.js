import Watchlist from '../models/watchlistModel.js';
import Joi from 'joi';

// Validation schema for adding a movie
const addMovieSchema = Joi.object({
  movieId: Joi.number().required(),
  title: Joi.string().required(),
  posterPath: Joi.string().allow('').optional()
});

// Get user's watchlist
export const getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.user._id });
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add movie to watchlist
export const addMovie = async (req, res) => {
  try {
    const { error } = addMovieSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { movieId, title, posterPath } = req.body;

    const movieExists = await Watchlist.findOne({ user: req.user._id, movieId });
    if (movieExists) return res.status(400).json({ message: 'Movie already in watchlist' });

    const movie = await Watchlist.create({
      user: req.user._id,
      movieId,
      title,
      posterPath
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove movie from watchlist
export const removeMovie = async (req, res) => {
  try {
    const movieIdNum = Number(req.params.movieId);
    const movie = await Watchlist.findOneAndDelete({
      user: req.user._id,
      movieId: req.params.movieId
    });
    if (!movie) return res.status(404).json({ message: 'Movie not found in watchlist' });

    res.json({ message: 'Movie removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark movie as watched/unwatched
export const markWatched = async (req, res) => {
  try {
    const movie = await Watchlist.findOne({
      user: req.user._id,
      movieId: req.params.movieId
    });
    if (!movie) return res.status(404).json({ message: 'Movie not found in watchlist' });

    movie.watched = !movie.watched;
    await movie.save();

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};