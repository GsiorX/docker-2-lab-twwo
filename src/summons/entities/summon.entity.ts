import {
    CreateDateColumn, DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Button} from "../../buttons/entities/button.entity";
import {User} from "../../users/entities/user.entity";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Summon {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User)
    @JoinColumn()
    @IsNotEmpty()
    summoner: User;

    @ManyToOne(type => Button, button => button.summons)
    @IsNotEmpty()
    button: Button;

    @OneToOne(type => User)
    @JoinColumn()
    accepted_by: User;

    @OneToOne(type => User)
    @JoinColumn()
    deleted_by: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date
}
