/**
 * User Model
 * ------------------------------
 */

import { Bookshelf } from '../../config/Database';
import { Tables } from '../../constants';


export class User extends Bookshelf.Model<User> {

    public static async fetchById(id: number): Promise<User> {
        return User.where<User>({ id }).fetch();
    }

    public static async fetchByUserId(userId: string): Promise<User> {
        return User.where<User>({ auth_0_user_id: userId }).fetch();
    }

    /**
     * Configurations
     */
    public get tableName(): string { return Tables.Users; }
    public get hasTimestamps(): boolean { return true; }

    /**
     * Properties
     */
    public get Id(): number { return this.get('id'); }
    public set Id(value: number) { this.set('id', value); }

    public get FirstName(): string { return this.get('firstName'); }
    public set FirstName(value: string) { this.set('firstName', value); }

    public get LastName(): string { return this.get('lastName'); }
    public set LastName(value: string) { this.set('lastName', value); }

    public get Email(): string { return this.get('email'); }
    public set Email(value: string) { this.set('email', value); }

    public get Picture(): string { return this.get('picture'); }
    public set Picture(value: string) { this.set('picture', value); }

    public get Auth0UserId(): string { return this.get('auth0UserId'); }
    public set Auth0UserId(value: string) { this.set('auth0UserId', value); }

    public get UpdatedAt(): Date { return this.get('updatedAt'); }
    public set UpdatedAt(value: Date) { this.set('updatedAt', value); }

    public get CreatedAt(): Date { return this.get('createdAt'); }
    public set CreatedAt(value: Date) { this.set('createdAt', value); }

    /**
     * Helper methods
     */
    public fullName(): string {
        return this.FirstName + ' ' + this.LastName;
    }

}
