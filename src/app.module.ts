import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './features/user/module/user.module';
import { DatabaseModule } from './database/DatabaseModule';
import { AuthModule } from './auth/module/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guard';
import { FeedModule } from './features/feed/module/feed.module';

@Module({
  imports: [
    UserModule,
    FeedModule,
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
