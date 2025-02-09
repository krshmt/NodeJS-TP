import { Controller, Post, Body, Res, Logger } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from 'src/ENTITIES/player.entity';
import { Response } from 'express';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsInt()
  readonly rank: number;
}

@Controller('api/player')
export class PlayerController {
  constructor(private readonly appService: PlayerService) {}

  @Post()
  async create(
    @Body() createPlayerDto: CreatePlayerDto,
    @Res() res: Response,
  ): Promise<Response<Player>> {
    await this.appService.create(createPlayerDto);
    return res.status(201).send(createPlayerDto) as Response<Player>;
  }
}
