import { Router } from 'express';
import { login } from '../controllers/loginController';

const router = Router();

// Subroutes til /api/login
router.post('/', login);

export const loginRoutes = router;