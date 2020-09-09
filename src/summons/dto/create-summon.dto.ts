import {IsNotEmpty} from "class-validator";
import {User} from "../../users/entities/user.entity";
import {Button} from "../../buttons/entities/button.entity";

export class CreateSummonDto {
    @IsNotEmpty()
    summoner: User;

    @IsNotEmpty()
    button: Button;
}