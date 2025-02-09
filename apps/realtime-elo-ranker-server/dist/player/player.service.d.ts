import { Player } from 'src/ENTITIES/player.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class PlayerService {
    private readonly joueurs;
    private eventEmitter;
    constructor(joueurs: Repository<Player>, eventEmitter: EventEmitter2);
    trouverJoueur(id: string): Promise<Player | null>;
    joueurExistant(id: string): Promise<boolean>;
    getToutLesJoueurs(): Promise<Player[]>;
    create(joueur: Player): Promise<Player>;
    evenementMAJJoueur(joueur: Player): void;
    sauvegarderJoueur(joueur: Player): Promise<Player>;
}
