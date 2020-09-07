import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {
	constructor(private readonly  authService: AuthService) {
	}

	@Post('register')
	async register(@Request() req) {
		return this.authService.register(req.body);
	}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	//TODO remove sample
	@UseGuards(JwtAuthGuard)
	@Get('profile')
	bla(@Request() req) {
		return req.user;
	}
}
