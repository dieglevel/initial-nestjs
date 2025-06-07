import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerBuilder = new DocumentBuilder()
  .setTitle("Hội nhà thơ")
  .setDescription("API documentation for the Hội nhà thơ application")
  .setExternalDoc("Swagger JSON", "/swagger/json")
  .setVersion("1.0")
  .addBearerAuth(
    {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
    "token",
  )
  .build();
