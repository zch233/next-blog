import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1593081275560 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {name: 'id', isGenerated: true, type: 'int', isPrimary: true, generationStrategy: "increment"},
        {name: 'username', type: 'varchar'},
        {name: 'password', type: 'varchar'}
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }

}
