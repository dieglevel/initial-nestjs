import { DocumentBuilder } from '@nestjs/swagger';


export const SwaggerBuilder = new DocumentBuilder()
   .setTitle('Hội nhà thơ')
   .setDescription('Em đứng bên sông')
   .setVersion('1.0')
   .addBearerAuth(
      {
         type: 'http',
         scheme: 'bearer',
         bearerFormat: 'JWT',
      },
      'token',
   )
   .build();