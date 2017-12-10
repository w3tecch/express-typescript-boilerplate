import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { User } from './User';


@Entity()
export class Pet {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public age: number;

    @Column({
        nullable: true,
    })
    public userId: number;

    @ManyToOne(type => User, user => user.pets)
    @JoinColumn({ name: 'userId' })
    public user: User;

    public toString(): string {
        return `${this.name}`;
    }

}
