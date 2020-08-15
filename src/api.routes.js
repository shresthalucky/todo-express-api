import express from 'express';
import UserRouter from './routes/user.route';

const router = express.Router();

router.use('/users', UserRouter);

export default router;
