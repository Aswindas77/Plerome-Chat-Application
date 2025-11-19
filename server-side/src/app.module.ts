import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ChatGateWay } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './infrastructure/database/mongoose.config';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ChatModule,
    AuthModule,
    UserModule,
  DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
