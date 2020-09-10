import {Injectable, Logger, OnApplicationBootstrap} from '@nestjs/common';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Group} from "../groups/entities/group.entity";
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
        @InjectRepository(Group)
        private groupRepository: Repository<Group>,
        private readonly logger: Logger,
    ) {
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
        const queryBuilder = this.repository.createQueryBuilder()
            .orderBy('created_at', "DESC");

        return paginate<User>(queryBuilder, options);
    }

    async onApplicationBootstrap(): Promise<void> {
        const adminUser = await this.repository.findOne({login: process.env.ADMINISTRATOR_LOGIN})
        if (!adminUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(process.env.ADMINISTRATOR_PASSWORD, salt);

            const adminGroup = await this.groupRepository.findOne({name: 'Administrator'})
            const status = await this.repository.save({
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
        return await this.repository.findOne({
            where: {
                login: login,
            }
        });
    }

    async create(createUserDto: CreateUserDto): Promise<any> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

        const defaultGroup = await this.groupRepository.findOne({name: 'Pracownik produkcyjny'});

        return await this.repository.save({
            login: createUserDto.login,
            password: hashedPassword,
            group: defaultGroup,
        });
    }

    async findOneById(id: number): Promise<User> {
        return await this.repository.findOneOrFail(id);
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.repository.save({...updateUserDto, id});
    }

    async remove(id: number) {
        return await this.repository.delete(id);
    }
}
