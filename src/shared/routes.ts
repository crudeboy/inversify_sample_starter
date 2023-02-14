import { Router } from 'express';
import module02Routes from '../modules/module02/routes';

const router = Router();
router.use('/', () => {
  return { message: 'App is live' };
});
router.use('/module02', module02Routes);

export default router;
