import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {

    constructor(private readonly service: EventsService){}

    @Post()
    add(@Body() event:EventDto) {
        this.service.add(event);
    }

    @Get()
    getEvents(@Query("page") page?: number, @Query("page_size") pageSize?: number): EventDto[] {
        return this.service.get(page ?? 1, pageSize ?? 50);
    }

    @Get(":id")
    getEventById(@Param("id") id: string): EventDto{
        const result =  this.service.getById(id);
        if(result == undefined) {
            throw new NotFoundException();
        }
        return result;
    }

    @Put(":id")
    updateEvent(@Param("id") id:string, @Body() event: EventDto){
        this.service.update(id, event);
    }

    @Delete(":id")
    removeEvent(@Param("id") id: string){
        this.removeEvent(id);
    }
}
