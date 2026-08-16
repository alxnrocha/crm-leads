import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { config } from './config/env.js';
import { testDatabaseConnection } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import stageRoutes from './routes/stage.routes.js';
import leadRoutes from './routes/lead.routes.js';
import activityRoutes from './routes/activity.routes.js';
import metricsRoutes from './routes/metrics.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let swaggerPath = path.join(__dirname, 'docs', 'swagger.yaml');
if (!fs.existsSync(swaggerPath)) {
  swaggerPath = path.join(__dirname, '..', 'src', 'docs', 'swagger.yaml');
}
const swaggerDocument = fs.existsSync(swaggerPath) ? YAML.load(swaggerPath) : {};

const app = express();

// Security and standard middlewares
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/stages', stageRoutes);
app.use('/api/v1/leads', leadRoutes);
app.use('/api/v1/activities', activityRoutes);
app.use('/api/v1/metrics', metricsRoutes);

// Swagger Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api/docs.json', (_req: Request, res: Response) => {
  res.status(200).json(swaggerDocument);
});

// API Root info
app.get('/api/v1', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'CRM Leads API v1',
    docs: '/api/docs',
    version: '1.0.0',
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found on this server.',
  });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: config.nodeEnv === 'development' ? err.message : 'An unexpected error occurred.',
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, async () => {
    console.log(`🚀 CRM Leads Server running at http://localhost:${config.port}`);
    await testDatabaseConnection();
  });
}

export default app;
