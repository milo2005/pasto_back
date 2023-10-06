import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserDao } from './data/dao/user.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { UserScheme, User } from './data/schemas/user.scheme';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserScheme}]),
    JwtModule.register({
      global: true,
      secret: "secreto"
    })
  ],
  providers: [
    UserDao,
    AuthService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [AuthController]
})
export class AuthModule {}
