import {Injectable} from '@nestjs/common';
import {CreateSummonDto} from './dto/create-summon.dto';
import {UpdateSummonDto} from './dto/update-summon.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Summon} from "./entities/summon.entity";
import {Repository} from "typeorm";
import {PaginationDto} from "../pagination.dto";
import {PaginatedSummonsResultDto} from "./dto/paginated-summons-result.dto";
import {User} from "../users/entities/user.entity";

@Injectable()
export class SummonsService {
    constructor(
        @InjectRepository(Summon)
        private summonRepository: Repository<Summon>) {
    }

    async create(createSummonDto: CreateSummonDto, user: User) {
        createSummonDto.summoner = user;

        return await this.summonRepository.save(createSummonDto);
    }

    async findAll(paginationDto: PaginationDto): Promise<PaginatedSummonsResultDto> {
        const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

        const totalCount = await this.summonRepository.count();
        const summons = await this.summonRepository.createQueryBuilder()
            .orderBy('created_at', "DESC")
            .offset(skippedItems)
            .limit(paginationDto.limit)
            .getMany();

        return {
            totalCount,
            page: paginationDto.page,
            limit: paginationDto.limit,
            data: summons,
        };
    }

    async findOne(id: number) {
        return await this.summonRepository.findOneOrFail(id);
    }

    async update(id: number, updateSummonDto: UpdateSummonDto, user: User) {
        updateSummonDto.accepted_by = user;

        return await this.summonRepository.save({...updateSummonDto, id});
    }

    async remove(id: number, user: User) {
        const summon = await this.summonRepository.findOneOrFail(id);
        summon.deleted_by = user;
        await this.summonRepository.save({...summon, id});

        return await this.summonRepository.softDelete(id);
    }
}
