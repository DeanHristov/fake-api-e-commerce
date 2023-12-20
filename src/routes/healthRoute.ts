import express, { Router } from 'express';
import { health } from '@/controllers/healthHandler';

const router: Router = express.Router();

router.get('/', health);
export default router;
