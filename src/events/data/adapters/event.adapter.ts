import { Injectable } from "@nestjs/common";
import { EventDto } from "src/events/dto/event.dto";
import { Event } from "../schemas/event.schema";

@Injectable()
export class EventAdapter {
    toDto(id: string, event: Event): EventDto {
        return {
            id,
            name: event.name,
            address: event.address,
            date: event.date.toISOString(),
            description: event.description,
            image: event.image,
            owner: event.owner,
            cost: event.cost
        }
    }
}