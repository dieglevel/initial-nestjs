import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { SwaggerBuilder } from './common/config';
import { informationServerLog } from './utils/information-server/information-server.log';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 9999;
  const hostname = configService.get<string>('HOST') || '0.0.0.0';
  const env = configService.get<string>('NODE_ENV') || 'development';

  app.use(helmet());
  app.enableCors();

  const documentFactory = () => SwaggerModule.createDocument(app, SwaggerBuilder);

  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });



  await app.listen(port, hostname, () => {
    informationServerLog(port, hostname, env)
  });


}
bootstrap();
