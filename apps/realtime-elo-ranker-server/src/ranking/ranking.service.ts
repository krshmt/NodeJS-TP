import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from 'src/ENTITIES/player.entity';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Player)
    private readonly joueurs: Repository<Player>,
  ) {}

  trouverTousLesJoueursParClassement(): Promise<Player[]> {
    return this.joueurs.find({
      order: {
        rank: 'DESC',
      },
    });
  }
}