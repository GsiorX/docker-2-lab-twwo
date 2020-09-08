import {Controller, Get, Post, Body, Put, Param, Delete, UseGuards} from '@nestjs/common';
import {GroupsService} from './groups.service';
import {CreateGroupDto} from './dto/create-group.dto';
import {UpdateGroupDto} from './dto/update-group.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

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
    findAll() {
        return this.groupsService.findAll();
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
