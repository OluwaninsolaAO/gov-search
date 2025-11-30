import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  @ApiProperty({ example: 'Alex' })
  q: string;
}
