import { DocumentBuilder } from "@nestjs/swagger";

export const SwaggerBuilder = new DocumentBuilder()
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
