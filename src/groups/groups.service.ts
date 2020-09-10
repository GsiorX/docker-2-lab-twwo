import {Injectable, Logger, OnApplicationBootstrap} from '@nestjs/common';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Group} from "./entities/group.entity";
import {groups} from "./entities/groups";
import {IGroup} from "./interfaces/group.interface";
import {PaginationDto} from "../pagination.dto";
import {PaginatedGroupsResultDto} from "./dto/paginated-groups-result.dto";

@Injectable()
export class GroupsService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(Group)
        private groupRepository: Repository<Group>,
        private readonly logger: Logger,
    ) {
    }

    onApplicationBootstrap(): void {
        groups.map((group: IGroup) => {
            this.groupRepository.findOne({name: group.name})
                .then(dbGroup => {
                    if (!dbGroup) {
                        this.groupRepository.save(group);
                        this.logger.debug(group.name + ' created!');
                    }
                }).catch(error => this.logger.error(error));
        })
    }

    async create(createGroupDto: CreateGroupDto): Promise<any> {
        return await this.groupRepository.save(createGroupDto);
    }

    async findAll(paginationDto: PaginationDto): Promise<PaginatedGroupsResultDto> {
        const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

        const totalCount = await this.groupRepository.count();
        const groups = await this.groupRepository.createQueryBuilder()
            .orderBy('created_at', "DESC")
            .offset(isNaN(skippedItems) ? 0 : skippedItems)
            .limit(paginationDto.limit)
            .getMany();

        return {
            totalCount,
            page: paginationDto.page,
            limit: paginationDto.limit,
            data: groups,
        };
    }

    async findOne(id: number) {
        return await this.groupRepository.findOneOrFail(id);
    }

    async update(id: number, updateGroupDto: UpdateGroupDto) {
        return await this.groupRepository.save({...updateGroupDto, id});
    }

    async remove(id: number) {
        return await this.groupRepository.delete(id);
    }
}
