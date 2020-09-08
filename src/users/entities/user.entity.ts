import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import {Group} from "../../groups/entities/group.entity";
import {IsNotEmpty} from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    login: string;

    @Column()
    password: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ManyToOne(type => Group)
    @JoinColumn()
    // TODO enable this when default groups are implemented
    // @IsNotEmpty()
    group: Group;
}
