import {MigrationInterface, QueryRunner} from "typeorm";

export class removeTotal1653457011004 implements MigrationInterface {
    name = 'removeTotal1653457011004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "total_price"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total_price"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "total_price" numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "total_price" numeric(10,2)`);
    }

}
