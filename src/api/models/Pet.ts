import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Pet {

    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public age: number;

    @Column({
        name: 'user_id',
        nullable: true,
    })
    public userId: string;

    @ManyToOne(type => User, user => user.pets)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    public toString(): string {
        return `${this.name}`;
    }

}
