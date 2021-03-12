/*
    this file creates the food entity which stores food items
    that are consumed by user entity,
    using typeorm library to define schema and reflect-metadata for decorators
*/

import "reflect-metadata"
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"

@Entity()
export class FoodItem {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({
        length: 100,
        unique: true
    })
    name!: string;

    @Column({
        default: 10
    })
    quantity!: number;

    @Column({
        type: "decimal",
        precision: 8,
        scale: 2
    })
    price;

    @Column({
        length: 200,
        nullable: true
    })
    details!: string;
}
