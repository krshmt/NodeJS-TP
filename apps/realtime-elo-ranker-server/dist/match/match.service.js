"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const match_entity_1 = require("../ENTITIES/match.entity");
const player_entity_1 = require("../ENTITIES/player.entity");
const typeorm_2 = require("typeorm");
const ranking_events_1 = require("../ranking/evenements/ranking.events");
let MatchService = class MatchService {
    constructor(matches, joueurs, eventEmitter) {
        this.matches = matches;
        this.joueurs = joueurs;
        this.eventEmitter = eventEmitter;
    }
    async trouverToutLesMatchs() {
        return await this.matches.find();
    }
    async creerMatch(match) {
        return await this.sauvegarderMatch(match);
    }
    calculerProbabilité(classement1, classement2) {
        const facteur = Math.pow(10, (classement2 - classement1) / 400);
        const probVictoire = 1 / (1 + facteur);
        return { probVictoire, probDéfaite: 1 - probVictoire };
    }
    calculerRank(joueurGagnant, joueurPerdant, egalite) {
        const { probVictoire, probDéfaite } = this.calculerProbabilité(joueurGagnant.rank, joueurPerdant.rank);
        const ajustement = egalite ? 0.5 : 1;
        const nouveauRankGagnant = joueurGagnant.rank + 32 * (ajustement - probVictoire);
        const nouveauRankPerdant = joueurPerdant.rank + 32 * ((egalite ? 0.5 : 0) - probDéfaite);
        return {
            perdant: { id: joueurPerdant.id, rank: Math.round(nouveauRankPerdant) },
            gagnant: { id: joueurGagnant.id, rank: Math.round(nouveauRankGagnant) },
        };
    }
    async majRank(winner, loser, draw) {
        const winnerDB = await this.joueurs.findOne({ where: { id: winner } });
        const loserDB = await this.joueurs.findOne({ where: { id: loser } });
        if (!winnerDB || !loserDB)
            return;
        const { perdant, gagnant } = this.calculerRank(winnerDB, loserDB, draw);
        await this.joueurs.save(gagnant).then(() => {
            this.majJoueurEvenement(gagnant);
        });
        await this.joueurs.save(perdant).then(() => {
            this.majJoueurEvenement(perdant);
        });
        return { winner: gagnant, loser: perdant };
    }
    majJoueurEvenement(player) {
        this.eventEmitter.emit('ranking.event', new ranking_events_1.RankingEvenement('RankingUpdate', player));
    }
    async sauvegarderMatch(match) {
        return await this.matches.save(match);
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __param(1, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], MatchService);
//# sourceMappingURL=match.service.js.map