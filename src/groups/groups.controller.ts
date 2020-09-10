import {Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query} from '@nestjs/common';
import {GroupsService} from './groups.service';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {PaginationDto} from "../pagination.dto";
import {PaginatedGroupsResultDto} from "./dto/paginated-groups-result.dto";

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
    async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedGroupsResultDto> {
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit);

        return this.groupsService.findAll({
            ...paginationDto,
            limit: paginationDto.limit > 10 || paginationDto.limit <= 0 ? 10 : paginationDto.limit,
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
