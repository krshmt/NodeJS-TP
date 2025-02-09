import { Player } from "src/ENTITIES/player.entity";

export class RankingEvenement {
  constructor(
    public readonly type: string,
    public readonly joueur: Player,
  ) {}
}
