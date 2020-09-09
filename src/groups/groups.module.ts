import {Logger, Module} from '@nestjs/common';
import {GroupsService} from './groups.service';
import {GroupsController} from './groups.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Group} from "./entities/group.entity";

@Module({
    controllers: [GroupsController],
    imports: [TypeOrmModule.forFeature([Group])],
    providers: [GroupsService, Logger],
})
export class GroupsModule {
}
