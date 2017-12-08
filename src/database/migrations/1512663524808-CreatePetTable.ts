import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePetTable1512663524808 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE \`pet\` (
                \`id\` varchar(255) NOT NULL PRIMARY KEY,
                \`name\` varchar(255) NOT NULL,
                \`age\` int(11) NOT NULL,
                \`userId\` varchar(255)) ENGINE=InnoDB;`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE \`pet\`;`);
    }

}
