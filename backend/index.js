import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);

app.get('/', (req, res) => {
  console.log('Received request at /');
  res.send('API Running');
});

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    console.error('Server failed to start:', err);
    return;
  }
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});