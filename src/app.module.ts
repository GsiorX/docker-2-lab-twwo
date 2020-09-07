import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from './auth/auth.service';
import {AuthModule} from './auth/auth.module';

@Module({
	imports: [TypeOrmModule.forRoot(), JwtModule.register({secretOrPrivateKey: process.env.JWT_SECRET}), UsersModule, AuthModule],
	controllers: [AppController],
	providers: [AppService, AuthService],
})
export class AppModule {
}
