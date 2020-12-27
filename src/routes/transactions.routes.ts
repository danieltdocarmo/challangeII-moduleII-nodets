import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionRepository.find();

  const balance = await transactionRepository.getBalance();



  return response.status(200).json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {

  const createTransactionService = new CreateTransactionService();

  const { title, value, type, category } = request.body;

  const transaction = await createTransactionService.execute({ title, value, type, category });

  return response.status(200).json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransactionService = new DeleteTransactionService();

  const result = await deleteTransactionService.execute(id);

  return response.status(204).json({ ok: 'ok' });

});

transactionsRouter.post('/import', upload.single('file'), async (request, response) => {
  const importTransaction = new ImportTransactionsService();

  const transaction = await importTransaction.execute(request.file.path);

  return response.json(transaction);
});

export default transactionsRouter;
