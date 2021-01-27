import { Router } from 'express';
import { baseUrl} from '../controllers';

const router = new Router();

router
  .route('/')
  .get(baseUrl)

export default router;