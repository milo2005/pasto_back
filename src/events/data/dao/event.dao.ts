import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EventDto } from "src/events/dto/event.dto";
import { Event } from "../schemas/event.schema";
import { EventAdapter } from "../adapters/event.adapter";

@Injectable()
export class EventDao{

    constructor(
        @InjectModel(Event.name) private model: Model<Event>,
        private adapter: EventAdapter
    ){}

    async insert(event: EventDto ) {
        const data: Event = {...event, date: new Date(event.date), createdAt: new Date()};
        const newEvent =  new this.model(data);
        await newEvent.save();
    }

    async remove(id: string) {
        await this.model.deleteOne({_id: id});
    }

    async update(id: string, event: EventDto) {
        await this.model.updateOne({_id: id}, { $set: event });
    }

    async getAll(page?: number, pageSize?: number): Promise<EventDto[]> {
        let query = this.model.find()
        .sort({createdAt: -1})

        if(page != null) {
            const size = pageSize ?? 50;
            query = query
                .skip((page - 1) * size)
                .limit(size);
        }

        const result  = await query.exec();
        return result.map((doc)=> this.adapter.toDto(doc.id, doc));
    }

    async getOnlyActive(page?: number, pageSize?: number): Promise<EventDto[]>{
        let query = this.model.find({ date: { $gte: new Date() } })
            .sort({date: -1});

            if(page != null) {
                const size = pageSize ?? 50;
                query = query
                    .skip((page - 1) * size)
                    .limit(size);
            }
    
            const result  = await query.exec();
            return result.map((doc)=> this.adapter.toDto(doc.id, doc));
    }
}