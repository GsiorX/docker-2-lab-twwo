import {Button} from "../entities/button.entity";

export class PaginatedButtonsResultDto {
    data: Button[];
    page: number;
    limit: number;
    totalCount: number;
}