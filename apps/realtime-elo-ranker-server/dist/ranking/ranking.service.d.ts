import { Repository } from 'typeorm';
import { Player } from 'src/ENTITIES/player.entity';
export declare class RankingService {
    private readonly joueurs;
    constructor(joueurs: Repository<Player>);
    trouverTousLesJoueursParClassement(): Promise<Player[]>;
}
