import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventAdapter } from './data/adapters/event.adapter';
import { EventDao } from './data/dao/event.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema, Event } from './data/schemas/event.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Event.name, schema: EventSchema}
    ])
  ],
  providers: [
    EventDao,
    EventAdapter,
    EventsService
  ],
  controllers: [EventsController]
})
export class EventsModule {}
