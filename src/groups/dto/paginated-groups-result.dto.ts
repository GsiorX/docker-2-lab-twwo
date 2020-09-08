import {Group} from "../entities/group.entity";

export class PaginatedGroupsResultDto {
    data: Group[];
    page: number;
    limit: number;
    totalCount: number;
}