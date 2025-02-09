import { Controller, Get, Res, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingService } from './ranking.service';
import { Player } from 'src/ENTITIES/player.entity';
import { Response } from 'express';
import { fromEvent, map, Observable } from 'rxjs';

@Controller('api/ranking')
export class RankingController {
  constructor(
    private readonly appService: RankingService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get()
  async findAll(@Res() res: Response): Promise<Response<Player[]>> {
    const players = await this.appService.trouverTousLesJoueursParClassement();
    return res.status(200).send(players) as Response<Player[]>;
  }

  @Sse('events')
  subscribeToEvents(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'ranking.event').pipe(
      map((payload) => {
        return {
          data: JSON.stringify(payload),
        } as MessageEvent;
      }),
    );
  }
}