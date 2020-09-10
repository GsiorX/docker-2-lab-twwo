import {Injectable} from '@nestjs/common';
import {CreateSummonDto} from './dto/create-summon.dto';
import {UpdateSummonDto} from './dto/update-summon.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Summon} from "./entities/summon.entity";
import {Repository} from "typeorm";
import {User} from "../users/entities/user.entity";
import {paginate, IPaginationOptions, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class SummonsService {
    constructor(
        @InjectRepository(Summon)
        private repository: Repository<Summon>) {
    }

    async create(createSummonDto: CreateSummonDto, user: User) {
        createSummonDto.summoner = user;

        return await this.repository.save(createSummonDto);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Summon>> {
        const queryBuilder = this.repository.createQueryBuilder()
            .orderBy('created_at', "DESC");

        return paginate<Summon>(queryBuilder, options);
    }

    async findOne(id: number) {
        return await this.repository.findOneOrFail(id);
    }

    async update(id: number, updateSummonDto: UpdateSummonDto, user: User) {
        updateSummonDto.accepted_by = user;

        return await this.repository.save({...updateSummonDto, id});
    }

    async remove(id: number, user: User) {
        const summon = await this.repository.findOneOrFail(id);
        summon.deleted_by = user;
        await this.repository.save({...summon, id});

        return await this.repository.softDelete(id);
    }
}
