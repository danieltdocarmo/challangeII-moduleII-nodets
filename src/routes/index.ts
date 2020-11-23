import { Router } from 'express';
import globalExceptionHandler from '../midllewares/globalExceptionHandler';

import transactionsRouter from './transactions.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use(globalExceptionHandler);

export default routes;
