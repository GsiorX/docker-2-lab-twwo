import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from './auth/auth.service';
import {AuthModule} from './auth/auth.module';
import {GroupsModule} from './groups/groups.module';
import {SummonsModule} from './summons/summons.module';
import {ButtonsModule} from './buttons/buttons.module';

@Module({
    imports: [TypeOrmModule.forRoot(), JwtModule.register({secretOrPrivateKey: process.env.JWT_SECRET}), UsersModule, AuthModule, GroupsModule, SummonsModule, ButtonsModule],
    controllers: [AppController],
    providers: [AppService, AuthService],
})
export class AppModule {
}
