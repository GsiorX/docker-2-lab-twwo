import {Injectable, Logger, OnApplicationBootstrap} from '@nestjs/common';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {PaginationDto} from "../pagination.dto";
import {PaginatedUsersResultDto} from "./dto/paginated-users-result.dto";
import {Group} from "../groups/entities/group.entity";

@Injectable()
export class UsersService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Group)
        private groupRepository: Repository<Group>,
        private readonly logger: Logger,
    ) {
    }

    async onApplicationBootstrap(): Promise<void> {
        const adminUser = await this.userRepository.findOne({login: process.env.ADMINISTRATOR_LOGIN})
        if (!adminUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(process.env.ADMINISTRATOR_PASSWORD, salt);

            const adminGroup = await this.groupRepository.findOne({name: 'Administrator'})
            const status = await this.userRepository.save({
                login: process.env.ADMINISTRATOR_LOGIN,
                password: hashedPassword,
                group: adminGroup
            });

            if (status) {
                this.logger.debug('Administrator account created!');
            } else {
                this.logger.error('Error creating administrator account');
            }
        }
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

        const defaultGroup = await this.groupRepository.findOne({name: 'Pracownik produkcyjny'});

        return await this.userRepository.save({
            login: createUserDto.login,
            password: hashedPassword,
            group: defaultGroup,
        });
    }

    async findAll(paginationDto: PaginationDto): Promise<PaginatedUsersResultDto> {
        const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

        const totalCount = await this.userRepository.count();
        const users = await this.userRepository.createQueryBuilder()
            .orderBy('created_at', "DESC")
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
        return await this.userRepository.findOneOrFail(id, {relations: ["group"]});
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.userRepository.save({...updateUserDto, id});
    }

    async remove(id: number) {
        return await this.userRepository.delete(id);
    }
}
