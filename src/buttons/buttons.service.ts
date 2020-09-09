import {Injectable} from '@nestjs/common';
import {CreateButtonDto} from './dto/create-button.dto';
import {UpdateButtonDto} from './dto/update-button.dto';

@Injectable()
export class ButtonsService {
    create(createButtonDto: CreateButtonDto) {
        return 'This action adds a new button';
    }

    findAll() {
        return `This action returns all buttons`;
    }

    findOne(id: number) {
        return `This action returns a #${id} button`;
    }

    update(id: number, updateButtonDto: UpdateButtonDto) {
        return `This action updates a #${id} button`;
    }

    remove(id: number) {
        return `This action removes a #${id} button`;
    }
}
