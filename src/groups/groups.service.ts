import {Injectable, Logger, OnApplicationBootstrap} from '@nestjs/common';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Group} from "./entities/group.entity";
import {groups} from "./entities/groups";
import {IGroup} from "./interfaces/group.interface";

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
                }).catch(error => this.logger.debug(error));
        })
    }

    async create(createGroupDto: CreateGroupDto): Promise<any> {
        return await this.groupRepository.save(createGroupDto);
    }

    async findAll() {
        return await this.groupRepository.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} group`;
    }

    update(id: number, updateGroupDto: UpdateGroupDto) {
        return `This action updates a #${id} group`;
    }

    remove(id: number) {
        return `This action removes a #${id} group`;
    }
}
