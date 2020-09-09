import {IsNotEmpty, IsString} from "class-validator";

export class CreateButtonDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}