import { MigrationInterface, QueryRunner } from 'typeorm';
//Refactoring
export class CourseRefactoring1639435028277 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" RENAME COLUMN "name" TO "course"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" RENAME COLUMN "course" TO "name"`,
    );
  }

  //implements
  /* public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'courses',
        columns: [{
          name: 'id', 
          type: 'uuid', 
          isPrimary: true,
        },
        {
          name:'name',
          type: 'varchar',

        },
        {
        name: 'description',
        type:'varchar'
        },
        {
          name: created_at,
          type: 'timestamp',
          default:'CURRENT_TIMESTAMP',
        }
        }]
      })
    )*/
}
