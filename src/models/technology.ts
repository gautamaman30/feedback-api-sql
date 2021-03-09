/*
    this file creates technology entity with all the properties,
    using typeorm library to define schemas and
    reflect-metadata library for decorators
*/

import "reflect-metadata"
import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class Technology {

    @PrimaryColumn({
        length: 100
    })
    technology_id!: string;

    @Column({
        length: 100,
        unique: true
    })
    name!: string;

    @Column({
        length: 200
    })
    details!: string;
}
