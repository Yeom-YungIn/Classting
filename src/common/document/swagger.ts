import { INestApplication } from '@nestjs/common';
import {
    SwaggerModule,
    DocumentBuilder,
    SwaggerCustomOptions,
} from '@nestjs/swagger';

const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
        persistAuthorization: false,
    },
};

export function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setTitle('Classting')
        .setDescription('클래스팅 개발 과제')
        .setVersion('1.0.0')
        //JWT 토큰 설정
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                name: 'JWT',
                in: 'header',
            },
            'access-token',
        )
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document, swaggerCustomOptions);
}