import {Controller, Get, Post, Body, Put, Param, Delete, Query} from '@nestjs/common';
import {ButtonsService} from './buttons.service';
import {CreateButtonDto} from './dto/create-button.dto';
import {UpdateButtonDto} from './dto/update-button.dto';
import {PaginationDto} from "../pagination.dto";
import {PaginatedButtonsResultDto} from "./dto/paginated-buttons-result.dto";

@Controller('buttons')
export class ButtonsController {
    constructor(private readonly buttonsService: ButtonsService) {
    }

    @Post()
    create(@Body() createButtonDto: CreateButtonDto) {
        return this.buttonsService.create(createButtonDto);
    }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedButtonsResultDto> {
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit);

        return this.buttonsService.findAll({
            ...paginationDto,
            limit: paginationDto.limit > 10 || paginationDto.limit <= 0 ? 10 : paginationDto.limit,
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.buttonsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateButtonDto: UpdateButtonDto) {
        return this.buttonsService.update(+id, updateButtonDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.buttonsService.remove(+id);
    }
}
