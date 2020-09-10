import {Injectable} from '@nestjs/common';
import {CreateButtonDto} from './dto/create-button.dto';
import {UpdateButtonDto} from './dto/update-button.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Button} from "./entities/button.entity";
import {Repository} from "typeorm";
import {paginate, IPaginationOptions, Pagination} from "nestjs-typeorm-paginate";

@Injectable()
export class ButtonsService {
    constructor(
        @InjectRepository(Button)
        private repository: Repository<Button>
    ) {
    }

    async create(createGroupDto: CreateButtonDto): Promise<any> {
        return await this.repository.save(createGroupDto);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Button>> {
        const queryBuilder = this.repository.createQueryBuilder()
            .orderBy('created_at', "DESC");

        return paginate<Button>(queryBuilder, options);
    }

    async findOne(id: number) {
        return await this.repository.findOneOrFail(id);
    }

    async update(id: number, updateButtonDto: UpdateButtonDto) {
        return await this.repository.save({...updateButtonDto, id});
    }

    async remove(id: number) {
        return await this.repository.delete(id);
    }
}
