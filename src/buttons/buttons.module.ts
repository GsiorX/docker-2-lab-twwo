import {Module} from '@nestjs/common';
import {ButtonsService} from './buttons.service';
import {ButtonsController} from './buttons.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Button} from "./entities/button.entity";

@Module({
    controllers: [ButtonsController],
    imports: [TypeOrmModule.forFeature([Button])],
    providers: [ButtonsService]
})
export class ButtonsModule {
}
