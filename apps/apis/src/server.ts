import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());

// Routes
app.use('/api', productRoutes);

// 404 Middleware for unmatched routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: `Route not found:` });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});