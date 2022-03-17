import {MigrationInterface, QueryRunner} from "typeorm";

export class Migration1647519698585 implements MigrationInterface {
    name = 'Migration1647519698585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`store\` (\`id\` int NOT NULL AUTO_INCREMENT, \`location\` varchar(50) NOT NULL, \`revenue\` decimal(10,2) NOT NULL, \`fixed_cost\` decimal(10,2) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` timestamp NULL, \`total_price\` decimal(10,2) NULL, \`customerId\` int NOT NULL, \`storeId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`supplier\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(25) NOT NULL, \`total_price\` decimal(10,2) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`supplier_detail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`order_date\` timestamp NULL, \`unit_price\` decimal(10,2) NULL, \`supplier_quantity\` decimal(10,0) NULL, \`supplierId\` int NOT NULL, \`productId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(25) NOT NULL, \`price\` decimal(10,2) NULL, \`cost\` decimal(10,2) NULL, \`category\` varchar(15) NOT NULL, \`inventory\` decimal(10,0) NULL, \`supplierId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_detail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`unit_price\` decimal(10,2) NULL, \`quantity\` decimal(10,0) NULL, \`customerId\` int NOT NULL, \`orderId\` int NOT NULL, \`productId\` int NOT NULL, \`storeId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(20) NOT NULL, \`last_name\` varchar(20) NOT NULL, \`balance\` decimal(10,2) NOT NULL, \`address\` varchar(50) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_124456e637cca7a415897dce659\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_1a79b2f719ecd9f307d62b81093\` FOREIGN KEY (\`storeId\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`supplier_detail\` ADD CONSTRAINT \`FK_f53dded96e905d2a097e8f40271\` FOREIGN KEY (\`supplierId\`) REFERENCES \`supplier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`supplier_detail\` ADD CONSTRAINT \`FK_0dba87e1c7d0c582f8fd7860037\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_4346e4adb741e80f3711ee09ba4\` FOREIGN KEY (\`supplierId\`) REFERENCES \`supplier\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_88850b85b38a8a2ded17a1f5369\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_aba2a4699ce18837cf67a03a4ae\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_a3647bd11aed3cf968c9ce9b835\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_detail\` ADD CONSTRAINT \`FK_5c811d0f16a3a8eeb2571371922\` FOREIGN KEY (\`storeId\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_5c811d0f16a3a8eeb2571371922\``);
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_a3647bd11aed3cf968c9ce9b835\``);
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_aba2a4699ce18837cf67a03a4ae\``);
        await queryRunner.query(`ALTER TABLE \`order_detail\` DROP FOREIGN KEY \`FK_88850b85b38a8a2ded17a1f5369\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_4346e4adb741e80f3711ee09ba4\``);
        await queryRunner.query(`ALTER TABLE \`supplier_detail\` DROP FOREIGN KEY \`FK_0dba87e1c7d0c582f8fd7860037\``);
        await queryRunner.query(`ALTER TABLE \`supplier_detail\` DROP FOREIGN KEY \`FK_f53dded96e905d2a097e8f40271\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_1a79b2f719ecd9f307d62b81093\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_124456e637cca7a415897dce659\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP TABLE \`order_detail\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`supplier_detail\``);
        await queryRunner.query(`DROP TABLE \`supplier\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`store\``);
    }

}
