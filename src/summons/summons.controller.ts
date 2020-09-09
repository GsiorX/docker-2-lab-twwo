import {Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query, Request} from '@nestjs/common';
import {SummonsService} from './summons.service';
import {CreateSummonDto} from './dto/create-summon.dto';
import {UpdateSummonDto} from './dto/update-summon.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {PaginationDto} from "../pagination.dto";
import {Summon} from "./entities/summon.entity";
import {PaginatedSummonsResultDto} from "./dto/paginated-summons-result.dto";

@Controller('summons')
@UseGuards(JwtAuthGuard)
export class SummonsController {
    constructor(private readonly summonsService: SummonsService) {
    }

    @Post()
    create(@Body() createSummonDto: CreateSummonDto, @Request() req) {
        return this.summonsService.create(createSummonDto, req.user);
    }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedSummonsResultDto> {
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit);

        return this.summonsService.findAll({
            ...paginationDto,
            limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
        });
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Summon> {
        return this.summonsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateSummonDto: UpdateSummonDto, @Request() req) {
        return this.summonsService.update(+id, updateSummonDto, req.user);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        return this.summonsService.remove(+id, req.user);
    }
}
