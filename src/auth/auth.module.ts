import {Module} from '@nestjs/common';
import {UsersModule} from "../users/users.module";
import {AuthService} from "./auth.service";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";
import defaults from 'defaults';

@Module({
	imports: [UsersModule, PassportModule, JwtModule.register({
		secret: defaults.JWT_SECRET,
		signOptions: { expiresIn: '1d' }
	})],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule {
}
