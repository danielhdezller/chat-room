import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRoomUsersUser1682357809879
  implements MigrationInterface
{
  name = 'CreateTableRoomUsersUser1682357809879';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "room_users_user" ("roomId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_e811974018202e969e902e794de" PRIMARY KEY ("roomId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_764292bbbb93544a050f844c49" ON "room_users_user" ("roomId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6c675caa22685ba1e0ebeb0f65" ON "room_users_user" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "room_users_user" ADD CONSTRAINT "FK_764292bbbb93544a050f844c499" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_users_user" ADD CONSTRAINT "FK_6c675caa22685ba1e0ebeb0f654" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "room_users_user" DROP CONSTRAINT "FK_6c675caa22685ba1e0ebeb0f654"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_users_user" DROP CONSTRAINT "FK_764292bbbb93544a050f844c499"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6c675caa22685ba1e0ebeb0f65"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_764292bbbb93544a050f844c49"`,
    );
    await queryRunner.query(`DROP TABLE "room_users_user"`);
  }
}
