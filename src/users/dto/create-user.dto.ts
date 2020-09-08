import {IsNotEmpty, IsString, MinLength} from "class-validator";
import {Group} from "../../groups/entities/group.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    login: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    group: Group
}