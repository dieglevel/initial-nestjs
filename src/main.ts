import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";
import { SwaggerBuilder } from "./common/config";
import { informationServerLog } from "./utils/information-server/information-server.log";
import { ValidationPipe } from "@nestjs/common";
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 9999;
  const hostname = configService.get<string>("HOST") || "0.0.0.0";
  const env = configService.get<string>("NODE_ENV") || "development";

  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix("api");
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const documentFactory = () =>
    SwaggerModule.createDocument(app, SwaggerBuilder);

  SwaggerModule.setup("api", app, documentFactory, {
    jsonDocumentUrl: "swagger/json",
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(port, hostname, () => {
    informationServerLog(port, hostname, env);
  });
}

void bootstrap();
