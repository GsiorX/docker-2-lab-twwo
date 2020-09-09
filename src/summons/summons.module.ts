import {Module} from '@nestjs/common';
import {SummonsService} from './summons.service';
import {SummonsController} from './summons.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Summon} from "./entities/summon.entity";

@Module({
    controllers: [SummonsController],
    imports: [TypeOrmModule.forFeature([Summon])],
    providers: [SummonsService]
})
export class SummonsModule {
}
