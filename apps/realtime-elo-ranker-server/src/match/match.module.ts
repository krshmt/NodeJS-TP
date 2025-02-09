import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { Match } from 'src/ENTITIES/match.entity';
import { Player } from 'src/ENTITIES/player.entity';
import { PlayerService } from '../player/player.service';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Player])],
  controllers: [MatchController],
  providers: [MatchService, PlayerService],
  exports: [MatchService, PlayerService],
})
export class MatchModule {}
