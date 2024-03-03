// authRoutes.ts
import { Router } from 'express';
import { register } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/register', register);

export default authRouter;
