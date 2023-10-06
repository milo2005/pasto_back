import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop({type: Date})
    createdAt: Date;

}

export const UserScheme = SchemaFactory.createForClass(User);