import { Player } from "src/ENTITIES/player.entity";
export declare class RankingEvenement {
    readonly type: string;
    readonly joueur: Player;
    constructor(type: string, joueur: Player);
}
