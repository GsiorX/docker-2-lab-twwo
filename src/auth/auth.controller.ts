import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly  authService: AuthService) {
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
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
