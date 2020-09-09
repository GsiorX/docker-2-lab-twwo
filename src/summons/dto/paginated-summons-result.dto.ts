import {Summon} from "../entities/summon.entity";

export class PaginatedSummonsResultDto {
    data: Summon[];
    page: number;
    limit: number;
    totalCount: number;
}