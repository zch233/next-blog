import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddTimes1593082773827 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({name: 'createAt', type: 'time', isNullable: false, default: 'now()'}),
      new TableColumn({name: 'updateAt', type: 'time', isNullable: false, default: 'now()'})
    ])
    await queryRunner.addColumns('posts', [
      new TableColumn({name: 'createAt', type: 'time', isNullable: false, default: 'now()'}),
      new TableColumn({name: 'updateAt', type: 'time', isNullable: false, default: 'now()'})
    ])
    await queryRunner.addColumns('comments', [
      new TableColumn({name: 'createAt', type: 'time', isNullable: false, default: 'now()'}),
      new TableColumn({name: 'updateAt', type: 'time', isNullable: false, default: 'now()'})
    ])
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'createAt')
    await queryRunner.dropColumn('users', 'updateAt')
    await queryRunner.dropColumn('posts', 'createAt')
    await queryRunner.dropColumn('posts', 'updateAt')
    await queryRunner.dropColumn('comments', 'createAt')
    await queryRunner.dropColumn('comments', 'updateAt')
  }

}
