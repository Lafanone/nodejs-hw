import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema, // ДОДАНО
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/authController.js';

const router = Router();

router.post('/register', celebrate({ body: registerUserSchema }), registerUser);
router.post('/login', celebrate({ body: loginUserSchema }), loginUser);
router.post('/refresh', refreshUserSession);
router.post('/logout', logoutUser);

router.post(
  '/request-reset-email',
  celebrate({ body: requestResetEmailSchema }),
  requestResetEmailController,
);

router.post(
  '/reset-password',
  celebrate({ body: resetPasswordSchema }),
  resetPasswordController,
);

export default router;
