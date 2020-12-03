import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from "@nestjs/common";
import {AuthService} from "../auth.service";
import defaults from 'defaults';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: defaults.JWT_SECRET,
		});
	}

	async validate(payload: any): Promise<any> {
		return {userId: payload.sub, username: payload.username};
	}
}
