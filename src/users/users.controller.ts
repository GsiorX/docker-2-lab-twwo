import {Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {User} from "./entities/user.entity";
import {PaginationDto} from "../pagination.dto";
import {PaginatedUsersResultDto} from "./dto/paginated-users-result.dto";

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedUsersResultDto> {
        paginationDto.page = Number(paginationDto.page);
        paginationDto.limit = Number(paginationDto.limit);

        return this.usersService.findAll({
            ...paginationDto,
            limit: paginationDto.limit > 10 || paginationDto.limit <= 0 ? 10 : paginationDto.limit,
        });
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOneById(+id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.usersService.remove(+id);
    }
}
