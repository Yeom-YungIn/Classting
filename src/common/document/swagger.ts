import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class BaseAPIDocument {
    public builder = new DocumentBuilder();

    public initializeOptions() {
        return this.builder
            .setTitle('Classting School App Swagger')
            .setDescription('Classting School App Swagger')
            .setVersion('1.0.0')
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
    }
}