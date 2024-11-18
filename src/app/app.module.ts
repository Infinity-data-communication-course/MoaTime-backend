import { configModule } from './modules/config.module';
import { CommonModule } from './../common/common.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { EventModule } from 'src/event/event.module';

@Module({
  imports: [configModule, CommonModule, UserModule, AuthModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
