import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Event {

    @Prop()
    name: string;
    @Prop()
    description: string;
    @Prop({type: Date})
    createdAt: Date;
    @Prop({type: Date})
    date: Date;
    @Prop()
    image: string;
    @Prop()
    owner: string;
    @Prop()
    address?: string;
    @Prop()
    cost?: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);