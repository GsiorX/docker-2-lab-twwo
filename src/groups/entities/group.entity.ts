import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {User} from "../../users/entities/user.entity";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    name: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany(type => User, user => user.group)
    users: User[];
}
