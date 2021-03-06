"use strict";
/*
    this file creates feedback entity with all the properties,
    using typeorm library to define schemas and
    reflect-metadata library for decorators
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
let Feedback = class Feedback {
};
__decorate([
    typeorm_1.PrimaryColumn({
        length: 100
    }),
    __metadata("design:type", String)
], Feedback.prototype, "feedback_id", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], Feedback.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        length: 200
    }),
    __metadata("design:type", String)
], Feedback.prototype, "feedback", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], Feedback.prototype, "posted_by", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Feedback.prototype, "entity", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], Feedback.prototype, "entity_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Feedback.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({
        type: "date"
    }),
    __metadata("design:type", Object)
], Feedback.prototype, "created_on", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Feedback.prototype, "count", void 0);
Feedback = __decorate([
    typeorm_1.Entity()
], Feedback);
exports.Feedback = Feedback;
