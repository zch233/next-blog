import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategories1621687250956 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'categories',
            columns: [
                {name: 'id', isGenerated: true, type: 'int', isPrimary: true, generationStrategy: 'increment'},
                {name: 'name', type: 'varchar'},
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories');
    }

}
