import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class AddForeingKeyToTransaction1606014034215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createForeignKey('transactions', new TableForeignKey({
            name: 'transactionsCategory',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
            onDelete : 'SET NULL',
            onUpdate : 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('transactions', 'transactionsCategory');
    }

}
