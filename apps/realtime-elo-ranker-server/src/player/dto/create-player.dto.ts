import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsInt()
  readonly rank: number;
}
