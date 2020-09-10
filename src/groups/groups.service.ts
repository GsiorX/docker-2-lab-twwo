import {Injectable, Logger, OnApplicationBootstrap} from '@nestjs/common';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Group} from "./entities/group.entity";
import {groups} from "./entities/groups";
import {IGroup} from "./interfaces/group.interface";
import {paginate, IPaginationOptions, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class GroupsService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Group)
        private repository: Repository<Group>,
        private readonly logger: Logger,
    ) {
    }

    onApplicationBootstrap(): void {
        groups.map((group: IGroup) => {
            this.repository.findOne({name: group.name})
                .then(dbGroup => {
                    if (!dbGroup) {
                        this.repository.save(group);
                        this.logger.debug(group.name + ' created!');
                    }
                }).catch(error => this.logger.error(error));
        })
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Group>> {
        const queryBuilder = this.repository.createQueryBuilder()
            .orderBy('created_at', "DESC");

        return paginate<Group>(queryBuilder, options);
    }

    async create(createGroupDto: CreateGroupDto): Promise<any> {
        return await this.repository.save(createGroupDto);
    }

    async findOne(id: number) {
        return await this.repository.findOneOrFail(id);
    }

    async update(id: number, updateGroupDto: UpdateGroupDto) {
        return await this.repository.save({...updateGroupDto, id});
    }

    async remove(id: number) {
        return await this.repository.delete(id);
    }
}
