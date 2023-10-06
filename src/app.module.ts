import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { PlansModule } from './plans/plans.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EventsModule, PlansModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
