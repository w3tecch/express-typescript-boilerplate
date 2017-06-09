/**
 * {{name}} Model
 * ------------------------------
 *
 */

import { Bookshelf } from '../../config/Database';


export class {{name}} extends Bookshelf.Model<{{name}}> {

    public static async fetchById(id: number): Promise<{{name}}> {
        return await {{name}}.where<{{name}}>({ id: id }).fetch();
    }

    public get tableName(): string { return '{{tableName}}'; }
    public get hasTimestamps(): boolean { return {{hasTimestamps}}; }
    {{#each properties}}

    public get {{getter}}(): {{type}} { return this.get('{{name}}'); }
    public set {{getter}}(value: {{type}}) { this.set('{{name}}', value); }
    {{/each}}

}
