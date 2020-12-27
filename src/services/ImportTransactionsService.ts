import csvParse from 'csv-parse';
import fs from 'fs';
import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';



interface CSVTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {


  async execute(filePath: string): Promise<void> {

    console.log('chamando ate aqui');

    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];

    const contactReadStream = fs.createReadStream(filePath);

    const parsers = csvParse({
      from_line: 2,
    });

    const parseCSV = contactReadStream.pipe(parsers);

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) => cell.trim())


      if (!title || !type || !value) return;

      categories.push(category);

      transactions.push({ title, type, value, category });


    })

     await new Promise(resolve => parseCSV.on('end', resolve));

    // const createTransactionService = new CreateTransactionService();

    // console.log('executando ate aqui');
    
    // const createdTransactions = Promise.all(

    //   transactions.map(async transaction => (
    //     await createTransactionService.execute({ title: transaction.title, value: transaction.value, type: transaction.type, category: transaction.category })
    //   ))
    
    // )

    // return createdTransactions;




  }
}

export default ImportTransactionsService;
