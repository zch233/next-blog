import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateComments1593082527124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'comments',
            columns: [
                {name: 'id', isGenerated: true, type: 'int', isPrimary: true, generationStrategy: "increment"},
                {name: 'user_id', type: 'int'},
                {name: 'post_id', type: 'int'},
                {name: 'content', type:'text'}
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('comments')
    }

}
