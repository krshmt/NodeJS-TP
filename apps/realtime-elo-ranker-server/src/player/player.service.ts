import { Injectable } from '@nestjs/common';
import { Player } from 'src/ENTITIES/player.entity';
import { Repository } from 'typeorm';
import { RankingEvenement } from 'src/ranking/evenements/ranking.events';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly joueurs: Repository<Player>,
    private eventEmitter: EventEmitter2,
  ) {}

  trouverJoueur(id: string): Promise<Player | null> {
    return this.joueurs.findOne({ where: { id } });
  }

  joueurExistant(id: string): Promise<boolean> {
    return this.trouverJoueur(id).then((joueur) => !!joueur);
  }

  getToutLesJoueurs(): Promise<Player[]> {
    return this.joueurs.find();
  }

  create(player: Player): Promise<Player> {
    return this.getToutLesJoueurs().then((players) => {
      if (players.length === 0) {
        player.rank = 1000;
        this.evenementMAJJoueur(player);
        return this.sauvegarderJoueur(player);
      } else {
        const avgRank =
          players.reduce((acc, player) => acc + player.rank, 0) /
          players.length;
        player.rank = Math.round(avgRank);

        this.evenementMAJJoueur(player);

        return this.sauvegarderJoueur(player);
      }
    });
  }

  evenementMAJJoueur(joueur: Player): void {
    this.eventEmitter.emit(
      'ranking.event',
      new RankingEvenement('RankingUpdate', joueur),
    );
  }

  sauvegarderJoueur(joueur: Player): Promise<Player> {
    return this.joueurs.save(joueur);
  }
}
