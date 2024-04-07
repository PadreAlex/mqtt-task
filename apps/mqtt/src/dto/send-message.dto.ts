import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendMessageDTO {
  @ApiProperty()
  @IsString()
  readonly message: string;
}
