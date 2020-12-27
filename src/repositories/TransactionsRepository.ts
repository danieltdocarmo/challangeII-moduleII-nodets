import { EntityRepository, Repository, ValueTransformer } from 'typeorm';

var types = require('pg').types

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request{
  id: string;
  title: string;
  value: string;
  category_id: null;
  created_at: Date;
  updated_at: Date;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    console.log()

    const { income, outcome, total } = transactions.reduce((accumulator, transacition) => {

      switch (transacition.type) {
        case 'income':
          const value = transacition.value;
          
          accumulator.income += transacition.value;

          break;
        case 'outcome':
          accumulator.outcome += transacition.value;
          break;
        default:
          break;
      }
      

      accumulator.total = accumulator.income - accumulator.outcome;
      
      return accumulator;
    
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });

    return {income, outcome, total}
  }
}

export default TransactionsRepository;
