import { Router } from "express";
import { body } from "express-validator";

import authController from "../controllers/auth.controller";

const authRouter: Router = Router();

authRouter.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  authController.signup
);
authRouter.post('/login', authController.login);
authRouter.get('/refresh', authController.refresh);
authRouter.get('/activate/:link', authController.activate);
authRouter.get('/logout', authController.logout);

export default authRouter;