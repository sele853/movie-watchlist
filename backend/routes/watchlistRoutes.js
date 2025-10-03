import express from "express";
import { addMovie, getWatchlist, markWatched, removeMovie } from "../controllers/watchlistControllers.js";
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get('/',protect,getWatchlist);
router.post('/add',protect,addMovie);
router.delete('/remove/:movieId',protect,removeMovie);
router.put('/watched/:movieId',protect,markWatched);

export default router;