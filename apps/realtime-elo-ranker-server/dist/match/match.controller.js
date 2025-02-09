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
exports.MatchController = exports.CreateMatchDto = void 0;
const common_1 = require("@nestjs/common");
const match_service_1 = require("./match.service");
const player_service_1 = require("../player/player.service");
class CreateMatchDto {
}
exports.CreateMatchDto = CreateMatchDto;
let MatchController = class MatchController {
    constructor(matchService, playerService) {
        this.matchService = matchService;
        this.playerService = playerService;
    }
    async createMatch(createMatchDto, res) {
        const { winner, loser, draw } = createMatchDto;
        const [winnerExists, loserExists] = await Promise.all([
            this.playerService.joueurExistant(winner),
            this.playerService.joueurExistant(loser),
        ]);
        await this.matchService.creerMatch(createMatchDto);
        await this.matchService.majRank(winner, loser, draw);
        return res.status(201).json(createMatchDto);
    }
};
exports.MatchController = MatchController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateMatchDto, Object]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "createMatch", null);
exports.MatchController = MatchController = __decorate([
    (0, common_1.Controller)('api/match'),
    __metadata("design:paramtypes", [match_service_1.MatchService,
        player_service_1.PlayerService])
], MatchController);
//# sourceMappingURL=match.controller.js.map