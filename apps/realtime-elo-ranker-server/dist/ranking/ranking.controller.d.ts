import { EventEmitter2 } from '@nestjs/event-emitter';
import { RankingService } from './ranking.service';
import { Player } from 'src/ENTITIES/player.entity';
import { Response } from 'express';
import { Observable } from 'rxjs';
export declare class RankingController {
    private readonly appService;
    private eventEmitter;
    constructor(appService: RankingService, eventEmitter: EventEmitter2);
    findAll(res: Response): Promise<Response<Player[]>>;
    subscribeToEvents(): Observable<MessageEvent>;
}
