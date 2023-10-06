import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {

    constructor(private readonly service: EventsService){}

    @Post()
    async add(@Body() event:EventDto) {
        await this.service.add(event);
    }

    @Get()
    getEvents(@Query("page") page?: number, @Query("page_size") pageSize?: number): Promise<EventDto[]> {
        return this.service.get(page ?? 1, pageSize ?? 50);
    }

    @Put(":id")
    async updateEvent(@Param("id") id:string, @Body() event: EventDto){
        await this.service.update(id, event);
    }

    @Delete(":id")
    async removeEvent(@Param("id") id: string) {
        await this.removeEvent(id);
    }
}
