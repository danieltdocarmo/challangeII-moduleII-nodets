import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, ValueTransformer } from 'typeorm';

import Category from '../models/Category';
import ColumnNumericTransformer from '../transfomer/ColumnNumericTransformer';

@Entity('transactions')

class Transaction {
 @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  

  @Column('decimal', {
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  value: number;
  

  @ManyToOne(()=>Category)
  @JoinColumn({ name : 'category_id'})
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
