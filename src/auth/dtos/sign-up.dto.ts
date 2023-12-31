import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(31)
  publicId: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;
}
