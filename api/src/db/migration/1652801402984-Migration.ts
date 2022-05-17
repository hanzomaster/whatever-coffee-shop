import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1652801402984 implements MigrationInterface {
    name = 'Migration1652801402984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "pre_price"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "product_line"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "dob" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(20) NOT NULL DEFAULT '0123456789'`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "img_path"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "img_path" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "price" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "img_path"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "img_path" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "supplierId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "supplierId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "img_path"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "img_path" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "price" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "img_path"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "img_path" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "product_line" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "pre_price" numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "last_name" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "first_name" character varying(20) NOT NULL`);
    }

}
