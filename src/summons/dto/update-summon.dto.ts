import {PartialType} from '@nestjs/mapped-types';
import {CreateSummonDto} from './create-summon.dto';
import {IsNotEmpty} from "class-validator";
import {User} from "../../users/entities/user.entity";

export class UpdateSummonDto extends PartialType(CreateSummonDto) {
    @IsNotEmpty()
    accepted_by: User;

    deleted_by: User;
}