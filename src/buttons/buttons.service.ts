import {Injectable} from '@nestjs/common';
import {CreateButtonDto} from './dto/create-button.dto';
import {UpdateButtonDto} from './dto/update-button.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Button} from "./entities/button.entity";
import {Repository} from "typeorm";
import {PaginationDto} from "../pagination.dto";
import {PaginatedButtonsResultDto} from "./dto/paginated-buttons-result.dto";
import {UpdateGroupDto} from "../groups/dto/update-group.dto";

@Injectable()
export class ButtonsService {
    constructor(
        @InjectRepository(Button)
        private buttonRepository: Repository<Button>
    ) {
    }

    async create(createGroupDto: CreateButtonDto): Promise<any> {
        return await this.buttonRepository.save(createGroupDto);
    }

    async findAll(paginationDto: PaginationDto): Promise<PaginatedButtonsResultDto> {
        const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

        const totalCount = await this.buttonRepository.count();
        const buttons = await this.buttonRepository.createQueryBuilder()
            .orderBy('created_at', "DESC")
            .offset(isNaN(skippedItems) ? 0 : skippedItems)
            .limit(paginationDto.limit)
            .getMany();

        return {
            totalCount,
            page: paginationDto.page,
            limit: paginationDto.limit,
            data: buttons,
        };
    }

    async findOne(id: number) {
        return await this.buttonRepository.findOneOrFail(id);
    }

    async update(id: number, updateGroupDto: UpdateGroupDto) {
        return await this.buttonRepository.save({...updateGroupDto, id});
    }

    async remove(id: number) {
        return await this.buttonRepository.delete(id);
    }
}
