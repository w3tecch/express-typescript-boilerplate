import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRelationToPetTable1512663990063 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            ALTER TABLE \`pet\`
                ADD CONSTRAINT \`fk_user_pet\`
                FOREIGN KEY (\`userId\`)
                REFERENCES \`user\`(\`id\`);`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
        ALTER TABLE \`pet\`
            DROP FOREIGN KEY \`fk_user_pet\`;`
        );
    }

}

