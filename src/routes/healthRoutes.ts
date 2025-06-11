import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

interface HealthResponse {
  success: boolean;
  message: string;
  timestamp: string;
  uptime: number;
  memory: {
    used: string;
    total: string;
  };
}

router.get('/', (req: Request, res: Response<HealthResponse>) => {
  const memoryUsage = process.memoryUsage();
  
  res.status(200).json({
    success: true,
    message: 'Server is healthy and running',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    memory: {
      used: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
      total: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
    },
  });
});

export { router as healthRouter };