/*
    this file creates the user consumption entit (how much food user has consumed),
    using typeorm library to define schema and reflect-metadata for decorators
*/

import "reflect-metadata"
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Users } from "./user"
import { FoodItem } from "./foodItem"

@Entity()
export class Consumption {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @ManyToOne(type => Users)
    @JoinColumn({
        name: "email",
        referencedColumnName: "email"
    })
    user!: Users;

    @ManyToOne(type => FoodItem)
    @JoinColumn({
        name: "food_name",
        referencedColumnName: "name"
    })
    foodItem!: FoodItem;

    @Column({
        length: 100
    })
    food_name;

    @Column({
        length: 100
    })
    email;

    @Column({
        default: 0
    })
    quantity!: number;

    @Column({
        type: "decimal",
        precision: 8,
        scale: 2,
        default: 0.00
    })
    amount_due;

    @Column({
        type: "date",
        default: () => "CURRENT_DATE"
    })
    consumed_on;
}
