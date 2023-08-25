import express from 'express';
import {health} from '../controllers/healthHandler';

const router = express.Router();

router.get('/', health);
export default router;
