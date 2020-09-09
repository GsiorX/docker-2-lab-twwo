import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Summon} from "../../summons/entities/summon.entity";
import {IsString} from "class-validator";

@Entity()
export class Button {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
    })
    @IsString()
    name: string;

    @OneToMany(type => Summon, summon => summon.button)
    summons: Summon[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date
}
