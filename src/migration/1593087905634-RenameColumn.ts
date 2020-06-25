import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameColumn1593087905634 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('posts', 'author_id', 'authorId')
    await queryRunner.renameColumn('comments', 'user_id', 'userId')
    await queryRunner.renameColumn('comments', 'post_id', 'postId')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.renameColumn('posts', 'authorId', 'author_id')
      await queryRunner.renameColumn('comments', 'userId', 'user_id')
      await queryRunner.renameColumn('comments', 'postId', 'post_id')
    } catch (e) {

    }
  }

}
