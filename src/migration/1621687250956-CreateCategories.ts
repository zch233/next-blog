import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategories1621687250956 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'categories',
            columns: [
                {name: 'id', isGenerated: true, type: 'int', isPrimary: true, generationStrategy: 'increment'},
                {name: 'name', type: 'varchar', isUnique: true},
                {name: 'createdAt', type: 'timestamp', isNullable: false, default: 'now()'},
                {name: 'updatedAt', type: 'timestamp', isNullable: false, default: 'now()'},
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories');
    }

}
