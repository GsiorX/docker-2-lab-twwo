import {Controller, Get, Post, Body, Put, Param, Delete, Query} from '@nestjs/common';
import {ButtonsService} from './buttons.service';
import {CreateButtonDto} from './dto/create-button.dto';
import {UpdateButtonDto} from './dto/update-button.dto';
import {Pagination} from "nestjs-typeorm-paginate";
import {Button} from "./entities/button.entity";

@Controller('buttons')
export class ButtonsController {
    constructor(private readonly buttonsService: ButtonsService) {
    }

    @Post()
    create(@Body() createButtonDto: CreateButtonDto) {
        return this.buttonsService.create(createButtonDto);
    }

    @Get()
    async findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ): Promise<Pagination<Button>> {
        limit = limit > 100 ? 100 : limit;

        return this.buttonsService.paginate({
            page,
            limit,
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
