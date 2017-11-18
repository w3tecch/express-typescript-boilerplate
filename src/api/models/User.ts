import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IsNotEmpty } from 'class-validator';


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column({ name: 'first_name' })
    public firstName: string;

    @IsNotEmpty()
    @Column({ name: 'last_name' })
    public lastName: string;

}
