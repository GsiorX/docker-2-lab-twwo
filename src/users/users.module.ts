import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import { UsersController } from './users.controller';
import {GroupsService} from "../groups/groups.service";
import {Group} from "../groups/entities/group.entity";

@Module({
	providers: [UsersService],
	imports: [TypeOrmModule.forFeature([User, Group])],
	exports: [UsersService],
	controllers: [UsersController],
})
export class UsersModule {
}
