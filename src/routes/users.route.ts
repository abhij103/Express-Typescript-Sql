import {Router} from 'express';
import { UserController } from '../controllers/user.controller';
import { AuthValidator } from '../validators/auth.validators';
 const router = Router();
router.post('/signup',UserController.createUser);
router.delete('/delete',AuthValidator.isAuthenticated,UserController.deleteUser);
export {router as userRoutes};