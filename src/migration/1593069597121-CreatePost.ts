import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePost1593069597121 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    // 升级数据库
    return await queryRunner.createTable(new Table({
      name: 'posts',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      }, {
        name: 'title',
        type: 'varchar',
      }, {
        name: 'content',
        type: 'text',
      }]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('posts')
  }

}
