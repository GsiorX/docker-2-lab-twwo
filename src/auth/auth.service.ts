import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        const passwordMatches = await bcrypt.compare(pass, user.password);

        if (user && passwordMatches) {
            const {password, ...result} = user;

            return result;
        }

        return null;
    }

    async login(user: any): Promise<any> {
        const payload = {username: user.login, sub: user.id};

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto: CreateUserDto): Promise<any> {
        return await this.usersService.create(createUserDto);
    }
}
