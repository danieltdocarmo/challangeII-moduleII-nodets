import { getCustomRepository, getRepository} from 'typeorm';

 import AppError from '../errors/AppError';
import TransactionRepository from '../repositories/TransactionsRepository';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request{
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;


}
class CreateTransactionService {
  public async execute({title, value, type, category}:Request): Promise<Transaction> {
      
    const transactionRepository = getCustomRepository(TransactionRepository);

    const categoryRepository = getRepository(Category);

    if(type === 'outcome'){
      const {total} = await transactionRepository.getBalance();
      
      if(total - value < 0 ){
        throw new AppError('Sem saldo suficiente!');
      }
    }
    
    let transactionCategory = await categoryRepository.findOne({where: {
      title: category
    }})

    if(!transactionCategory){
      transactionCategory = categoryRepository.create({
        title: category
      });


      await categoryRepository.save(transactionCategory);

  }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: transactionCategory.id
    })
  
    await transactionRepository.save(transaction);
  
    return transaction;
  
  }
}

export default CreateTransactionService;
