import {Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query} from '@nestjs/common';
import {GroupsService} from './groups.service';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {Pagination} from "nestjs-typeorm-paginate";
import {Group} from "./entities/group.entity";

@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) {
    }

    @Post()
    create(@Body() createGroupDto: CreateGroupDto) {
        return this.groupsService.create(createGroupDto);
    }

    @Get()
    async findAll(
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ): Promise<Pagination<Group>> {
        limit = limit > 100 ? 100 : limit;

        return this.groupsService.paginate({
            page,
            limit,
        });
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.groupsService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateGroupDto: UpdateGroupDto) {
        return this.groupsService.update(+id, updateGroupDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.groupsService.remove(+id);
    }
}
