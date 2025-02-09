import { MatchService } from './match.service';
import { PlayerService } from '../player/player.service';
import { Response } from 'express';
import { Match } from 'src/ENTITIES/match.entity';
export declare class CreateMatchDto {
    readonly winner: string;
    readonly loser: string;
    readonly draw: boolean;
}
export declare class MatchController {
    private readonly matchService;
    private readonly playerService;
    constructor(matchService: MatchService, playerService: PlayerService);
    createMatch(createMatchDto: CreateMatchDto, res: Response): Promise<Response<Match>>;
}
