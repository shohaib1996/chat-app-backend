import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes';

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running!' });
});

// 404 handler - Use app.all instead of app.use
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
