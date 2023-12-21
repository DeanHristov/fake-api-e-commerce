import express, { Router } from 'express';
import { signIn, signOut } from '@/controllers/authHandler';
import assignTokenToResponse from '@/middlewares/assignTokenToResponse';

const router: Router = express.Router();

router.post('/sign-in', signIn, assignTokenToResponse);
router.get('/sign-out', signOut);

export default router;
