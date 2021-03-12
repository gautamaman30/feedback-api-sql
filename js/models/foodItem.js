"use strict";
/*
    this file creates the food entity which stores food items
    that are consumed by user entity,
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
exports.FoodItem = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
let FoodItem = class FoodItem {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], FoodItem.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        length: 100,
        unique: true
    }),
    __metadata("design:type", String)
], FoodItem.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({
        default: 10
    }),
    __metadata("design:type", Number)
], FoodItem.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal",
        precision: 8,
        scale: 2
    }),
    __metadata("design:type", Object)
], FoodItem.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({
        length: 200,
        nullable: true
    }),
    __metadata("design:type", String)
], FoodItem.prototype, "details", void 0);
FoodItem = __decorate([
    typeorm_1.Entity()
], FoodItem);
exports.FoodItem = FoodItem;
