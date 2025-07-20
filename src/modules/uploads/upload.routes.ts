import { Router } from 'express';
import { uploadSingleImage } from './upload.controller';


const router = Router();

router.post('/image', uploadSingleImage);

export default router;
