import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Match } from 'src/ENTITIES/match.entity';
import { Player } from 'src/ENTITIES/player.entity';
import { Repository } from 'typeorm';
import { RankingEvenement } from 'src/ranking/evenements/ranking.events';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matches: Repository<Match>,

    @InjectRepository(Player)
    private readonly joueurs: Repository<Player>,

    private eventEmitter: EventEmitter2,
  ) {}

  async trouverToutLesMatchs(): Promise<Match[]> {
    return await this.matches.find();
  }

  async creerMatch(match: Match): Promise<Match> {
    return await this.sauvegarderMatch(match);
  }

  calculerProbabilité(classement1: number, classement2: number) {
    const facteur = Math.pow(10, (classement2 - classement1) / 400);
    const probVictoire = 1 / (1 + facteur);
    return { probVictoire, probDéfaite: 1 - probVictoire };
  }

  calculerRank(joueurGagnant: Player, joueurPerdant: Player, egalite: boolean) {
    const { probVictoire, probDéfaite } = this.calculerProbabilité(
      joueurGagnant.rank,
      joueurPerdant.rank,
    );

    const ajustement = egalite ? 0.5 : 1;
    const nouveauRankGagnant = joueurGagnant.rank + 32 * (ajustement - probVictoire);
    const nouveauRankPerdant = joueurPerdant.rank + 32 * ((egalite ? 0.5 : 0) - probDéfaite);

    return {
      gagnant: { id: joueurGagnant.id, rank: Math.round(nouveauRankGagnant) },
      perdant: { id: joueurPerdant.id, rank: Math.round(nouveauRankPerdant) },
    };
  }

  async updateRank(
    winner: string,
    loser: string,
    draw: boolean,
  ): Promise<{ winner: Player; loser: Player } | void> {
    const winnerDB = await this.joueurs.findOne({ where: { id: winner } });
    const loserDB = await this.joueurs.findOne({ where: { id: loser } });

    if (!winnerDB || !loserDB) return;

    const { gagnant, perdant } = this.calculerRank(
      winnerDB,
      loserDB,
      draw,
    );

    await this.joueurs.save(gagnant).then(() => {
      this.majJoueurEvenement(gagnant);
    });
    await this.joueurs.save(perdant).then(() => {
      this.majJoueurEvenement(perdant);
    });

    return { winner: gagnant, loser: perdant };
  }

  majJoueurEvenement(player: Player): void {
    this.eventEmitter.emit(
      'ranking.event',
      new RankingEvenement('RankingUpdate', player),
    );
  }

  async sauvegarderMatch(match: Match): Promise<Match> {
    return await this.matches.save(match);
  }
}
