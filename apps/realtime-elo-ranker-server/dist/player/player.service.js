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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const player_entity_1 = require("../ENTITIES/player.entity");
const typeorm_1 = require("typeorm");
const ranking_events_1 = require("../ranking/evenements/ranking.events");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_2 = require("@nestjs/typeorm");
let PlayerService = class PlayerService {
    constructor(joueurs, eventEmitter) {
        this.joueurs = joueurs;
        this.eventEmitter = eventEmitter;
    }
    trouverJoueur(id) {
        return this.joueurs.findOne({ where: { id } });
    }
    joueurExistant(id) {
        return this.trouverJoueur(id).then((joueur) => !!joueur);
    }
    getToutLesJoueurs() {
        return this.joueurs.find();
    }
    create(player) {
        return this.getToutLesJoueurs().then((players) => {
            if (players.length === 0) {
                player.rank = 1000;
                this.evenementMAJJoueur(player);
                return this.sauvegarderJoueur(player);
            }
            else {
                const avgRank = players.reduce((acc, player) => acc + player.rank, 0) /
                    players.length;
                player.rank = Math.round(avgRank);
                this.evenementMAJJoueur(player);
                return this.sauvegarderJoueur(player);
            }
        });
    }
    evenementMAJJoueur(joueur) {
        this.eventEmitter.emit('ranking.event', new ranking_events_1.RankingEvenement('RankingUpdate', joueur));
    }
    sauvegarderJoueur(joueur) {
        return this.joueurs.save(joueur);
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        event_emitter_1.EventEmitter2])
], PlayerService);
//# sourceMappingURL=player.service.js.map