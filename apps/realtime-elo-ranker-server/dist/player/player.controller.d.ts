import { PlayerService } from './player.service';
import { Player } from 'src/ENTITIES/player.entity';
import { Response } from 'express';
export declare class CreatePlayerDto {
    readonly id: string;
    readonly rank: number;
}
export declare class PlayerController {
    private readonly appService;
    constructor(appService: PlayerService);
    create(createPlayerDto: CreatePlayerDto, res: Response): Promise<Response<Player>>;
}
