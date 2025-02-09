import { EventEmitter2 } from '@nestjs/event-emitter';
import { Match } from 'src/ENTITIES/match.entity';
import { Player } from 'src/ENTITIES/player.entity';
import { Repository } from 'typeorm';
export declare class MatchService {
    private readonly matches;
    private readonly joueurs;
    private eventEmitter;
    constructor(matches: Repository<Match>, joueurs: Repository<Player>, eventEmitter: EventEmitter2);
    trouverToutLesMatchs(): Promise<Match[]>;
    creerMatch(match: Match): Promise<Match>;
    calculerProbabilité(classement1: number, classement2: number): {
        probVictoire: number;
        probDéfaite: number;
    };
    calculerRank(joueurGagnant: Player, joueurPerdant: Player, egalite: boolean): {
        perdant: {
            id: string;
            rank: number;
        };
        gagnant: {
            id: string;
            rank: number;
        };
    };
    majRank(winner: string, loser: string, draw: boolean): Promise<{
        winner: Player;
        loser: Player;
    } | void>;
    majJoueurEvenement(player: Player): void;
    sauvegarderMatch(match: Match): Promise<Match>;
}
