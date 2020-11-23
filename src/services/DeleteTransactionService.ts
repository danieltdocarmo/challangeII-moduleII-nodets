
import {getCustomRepository, TransactionRepository} from  'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute( id: string ): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const dan = await transactionRepository.delete({id})

    if(dan.affected == 0){
      throw new AppError('ID não existe!')
    }

    return 
  }

}

export default DeleteTransactionService;
