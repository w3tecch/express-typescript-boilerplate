import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Pet {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @Column()
    public age: number;

    @Column({
        name: 'user_id',
        nullable: true,
    })
    public userId: number;

    @ManyToOne(type => User, user => user.pets)
    @JoinColumn({ name: 'user_id' })
    public user: Promise<User>;

    public toString(): string {
        return `${this.name}`;
    }

}
