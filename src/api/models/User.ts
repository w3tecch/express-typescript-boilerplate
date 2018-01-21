import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pet } from './Pet';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ name: 'first_name' })
    public firstName: string;

    @Column({ name: 'last_name' })
    public lastName: string;

    @Column()
    public email: string;

    @OneToMany(type => Pet, pet => pet.user)
    public pets: Promise<Pet[]>;

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`;
    }

}
