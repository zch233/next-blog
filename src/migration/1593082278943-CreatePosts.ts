import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreatePosts1593082278943 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'posts',
      columns: [
        {name: 'id', isGenerated: true, type: 'int', isPrimary: true, generationStrategy: 'increment'},
        {name: 'title', type: 'varchar'},
        {name: 'content', type: 'text'},
        {name: 'images', type: 'text'},
        {name: 'categoryId', type: 'int'},
        {name: 'views', type: 'int', default: 0},
        {name: 'author_id', type: 'int'},
      ],
    }));
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts');
  }

}
