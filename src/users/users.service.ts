import {Injectable} from '@nestjs/common';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {PaginationDto} from "../pagination.dto";
import {PaginatedUsersResultDto} from "./dto/paginated-users-result.dto";

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

    async create(createUserDto: CreateUserDto): Promise<any> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        return await this.userRepository.save({
            login: createUserDto.login,
            password: hashedPassword,
        });
    }

    async findAll(paginationDto: PaginationDto): Promise<PaginatedUsersResultDto> {
        const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

        const totalCount = await this.userRepository.count();
        const users = await this.userRepository.createQueryBuilder()
            .orderBy('createdAt', "DESC")
            .offset(skippedItems)
            .limit(paginationDto.limit)
            .getMany();

        return {
            totalCount,
            page: paginationDto.page,
            limit: paginationDto.limit,
            data: users,
        };
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOneOrFail(id);
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepository.save({...updateUserDto, id});
    }

    async remove(id: number) {
        return await this.userRepository.delete(id);
    }
}
