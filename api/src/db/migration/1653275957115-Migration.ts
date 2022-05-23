import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1653275957115 implements MigrationInterface {
    name = 'Migration1653275957115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_5c811d0f16a3a8eeb2571371922"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP COLUMN "storeId"`);
        await queryRunner.query(`ALTER TABLE "supplier_detail" DROP COLUMN "order_date"`);
        await queryRunner.query(`ALTER TABLE "supplier_detail" ADD "order_date" date`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "img_path"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "img_path" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "supplierId" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "balance" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4"`);
        await queryRunner.query(`ALTER TABLE "customer" ALTER COLUMN "balance" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "supplierId" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "img_path"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "img_path" text`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supplier_detail" DROP COLUMN "order_date"`);
        await queryRunner.query(`ALTER TABLE "supplier_detail" ADD "order_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD "storeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_5c811d0f16a3a8eeb2571371922" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
