import { Router } from 'express';
import { 
  baseUrl,
  validationUrl
} from '../controllers';
import validateInput from '../validator/index';

const router = new Router();

router
  .route('/')
  .get(baseUrl)

router
  .route('/validate-rule')
  .post(validateInput, validationUrl)

export default router;