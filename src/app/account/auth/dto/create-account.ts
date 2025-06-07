import { IAccountEntity } from "@/entities/interface/auth/account.entity.interface";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAccountDto implements Partial<IAccountEntity> {
  @ApiProperty({ default: "john_doe" })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  username: string;

  @ApiProperty({ default: "john_doe@gmail.com" })
  @IsString()
  @IsEmail()
  @Transform(({ value }: { value: string }) => value?.toLowerCase())
  email: string;

  @ApiProperty({ default: "password" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
