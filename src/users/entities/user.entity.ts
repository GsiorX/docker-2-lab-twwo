import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn, DeleteDateColumn
} from 'typeorm';
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
    @IsNotEmpty()
    group: Group;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date
}
