import {Router} from 'express';
import { PostController } from '../controllers/post.controller';
import { AuthValidator } from '../validators/auth.validators';

 const router = Router();

router.post('/create',AuthValidator.isAuthenticated,PostController.createPost);
router.get('/all',AuthValidator.isAuthenticated,PostController.getAllUserPosts);
router.put('/edit/:id',AuthValidator.isAuthenticated,PostController.updatePost);
export {router as postRoutes};