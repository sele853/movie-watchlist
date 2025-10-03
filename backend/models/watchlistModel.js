import mongoose from "mongoose";


const watchlistSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    movieId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required:true
    },
    posterPath: {
        type: String
    },
    watched: {
        type: Boolean,
        default: false
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Watchlist',watchlistSchema);