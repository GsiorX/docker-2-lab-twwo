import {Injectable} from '@nestjs/common';
import {User} from './user.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {
	}

	async findOne(login: string): Promise<User | undefined> {
		return await this.userRepository.findOne({
			where: {
				login: login,
			}
		});
	}

	async create(userData: any): Promise<any> {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(userData.password, salt);

		return await this.userRepository.save({
			login: userData.login,
			password: hashedPassword,
		});
	}
}
