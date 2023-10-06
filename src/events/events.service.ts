import { Injectable } from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { EventDao } from './data/dao/event.dao';

@Injectable()
export class EventsService {

   constructor(
    private dao: EventDao
   ){}

    async add(event: EventDto){
        await this.dao.insert(event);
    }

    async update(id: string, event: EventDto) {
        await this.dao.update(id, event);
    }

    async remove(id: string) {
        await this.dao.remove(id);
    }

    get(page?: number, pageSize?:  number): Promise<EventDto[]>{
        return this.dao.getOnlyActive(page, pageSize);
    }
}
