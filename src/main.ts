import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { CorsConfig, NestConfig, SwaggerConfig } from './common/configs/config.interface';
import { MydbService } from './prismas/mydb/mydb.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const nestConfig = configService.get<NestConfig>('nest');
    const corsConfig = configService.get<CorsConfig>('cors');
    const swaggerConfig = configService.get<SwaggerConfig>('swagger');

    // Validation
    app.useGlobalPipes(new ValidationPipe());

    // Swagger Api
    if (swaggerConfig.enabled) {
        const options = new DocumentBuilder()
            .setTitle(swaggerConfig.title || 'Nestjs')
            .setDescription(swaggerConfig.description || 'The nestjs API description')
            .setVersion(swaggerConfig.version || '1.0.0')
            .build();
        const document = SwaggerModule.createDocument(app, options);

        SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
    }

    // Cors
    if (corsConfig.enabled) {
        app.enableCors();
    }

    // enable shutdown hooks
    const mydbService = app.get(MydbService);
    mydbService.enableShutdownHooks(app);

    const mydb2Service = app.get(MydbService);
    mydb2Service.enableShutdownHooks(app);

    await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();
