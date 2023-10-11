import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismasModule } from './prismas/prismas.module';
import config from './common/configs/config';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { RestExceptionFilter } from './common/filter/rest.exception.filter';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV}`, load: [config] }),
        PrismasModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: RestExceptionFilter,
        },
    ],
})
export class AppModule {}
