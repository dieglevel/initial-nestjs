import { DocumentBuilder } from '@nestjs/swagger';


export const SwaggerBuilder =  new DocumentBuilder()
   .setTitle('Cats example')
   .setDescription('The cats API description')
   .setVersion('1.0')
   .addTag('cats')
   .build();