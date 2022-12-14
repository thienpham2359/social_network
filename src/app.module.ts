import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './features/user/module/user.module';
import { User } from './entity/user.entity';
import { DatabaseModule } from './database/DatabaseModule';
import { AuthModule } from './auth/module/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guard/at.guard';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
