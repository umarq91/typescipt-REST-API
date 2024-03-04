// routes.ts
import express from 'express';
import authRoutes from './authRoutes';
import { getUsers } from '../db/users';
import { getAllUsers } from '../controllers/users';
import { isAuthenticated } from '../middlewares/index';

const router = express.Router();

router.use('/auth', authRoutes);
router.get("/users",isAuthenticated ,getAllUsers);

export default router;
