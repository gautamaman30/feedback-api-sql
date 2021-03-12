"use strict";
/*
    this file creates the user consumption entit (how much food user has consumed),
    using typeorm library to define schema and reflect-metadata for decorators
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
exports.Consumption = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const foodItem_1 = require("./foodItem");
let Consumption = class Consumption {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], Consumption.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_1.Users),
    typeorm_1.JoinColumn({
        name: "email",
        referencedColumnName: "email"
    }),
    __metadata("design:type", user_1.Users)
], Consumption.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(type => foodItem_1.FoodItem),
    typeorm_1.JoinColumn({
        name: "food_name",
        referencedColumnName: "name"
    }),
    __metadata("design:type", foodItem_1.FoodItem)
], Consumption.prototype, "foodItem", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", Object)
], Consumption.prototype, "food_name", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", Object)
], Consumption.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        default: 0
    }),
    __metadata("design:type", Number)
], Consumption.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal",
        precision: 8,
        scale: 2,
        default: 0.00
    }),
    __metadata("design:type", Object)
], Consumption.prototype, "amount_due", void 0);
__decorate([
    typeorm_1.Column({
        type: "date",
        default: () => "CURRENT_DATE"
    }),
    __metadata("design:type", Object)
], Consumption.prototype, "consumed_on", void 0);
Consumption = __decorate([
    typeorm_1.Entity()
], Consumption);
exports.Consumption = Consumption;
