import * as core from '../../core';
import { Tables } from '../../database/Tables';


export class User extends core.Bookshelf.Model<User> {

    public static async fetchById(id: number): Promise<User> {
        return await User.where<User>({ id: id }).fetch();
    }

    public get tableName(): string { return Tables.Users; }
    public get hasTimestamps(): boolean { return true; }

    public get Id(): number { return this.get('id'); }
    public set Id(value: number) { this.set({ id: value }); };

    public get FirstName(): string { return this.get('firstName'); }
    public set FirstName(value: string) { this.set({ id: value }); };

    public get LastName(): string { return this.get('lastName'); }
    public set LastName(value: string) { this.set({ id: value }); };

    public get Username(): string { return this.get('username'); }
    public set Username(value: string) { this.set({ id: value }); };

    public get Email(): string { return this.get('email'); }
    public set Email(value: string) { this.set({ id: value }); };

    public get Picture(): string { return this.get('picture'); }
    public set Picture(value: string) { this.set({ id: value }); };

    public get UpdatedAt(): Date { return this.get('updatedAt'); }
    public set UpdatedAt(value: Date) { this.set({ id: value }); };

    public get CreatedAt(): Date { return this.get('createdAt'); }
    public set CreatedAt(value: Date) { this.set({ id: value }); };

    public fullName(): string {
        return this.FirstName + ' ' + this.LastName;
    }

}

