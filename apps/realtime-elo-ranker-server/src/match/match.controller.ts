import { Body, Controller, Post, Res } from '@nestjs/common';
import { MatchService } from './match.service';
import { PlayerService } from '../player/player.service';
import { Response } from 'express';
import { Match } from 'src/ENTITIES/match.entity';

export class CreateMatchDto {
  readonly winner: string;
  readonly loser: string;
  readonly draw: boolean;
}

@Controller('api/match')
export class MatchController {
  constructor(
    private readonly matchService: MatchService,
    private readonly playerService: PlayerService,
  ) {}

  @Post()
  async createMatch(
    @Body() createMatchDto: CreateMatchDto,
    @Res() res: Response,
  ): Promise<Response<Match>> {
    const { winner, loser, draw } = createMatchDto;

    const [winnerExists, loserExists] = await Promise.all([
      this.playerService.joueurExistant(winner),
      this.playerService.joueurExistant(loser),
    ]);

    await this.matchService.creerMatch(createMatchDto);
    await this.matchService.majRank(winner, loser, draw);
    return res.status(201).json(createMatchDto) as Response<Match>;
  }
}