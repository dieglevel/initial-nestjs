import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";
import { swaggerBuilder, validatePipeConfig } from "./common/config";
import { TransformInterceptor } from "./common/interceptors";
import { informationServerLog } from "./utils/information-server";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT") || 9999;
  const hostname = configService.get<string>("HOST") || "0.0.0.0";
  const env = configService.get<string>("NODE_ENV") || "development";

  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix(process.env.API_PREFIX || "api");
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(validatePipeConfig);

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerBuilder);

  SwaggerModule.setup("api", app, documentFactory, {
    jsonDocumentUrl: "swagger/json",
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(port, hostname, () => {
    informationServerLog(port, hostname, env);
  });
}

void bootstrap();
