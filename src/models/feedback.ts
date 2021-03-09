/*
    this file creates feedback entity with all the properties,
    using typeorm library to define schemas and
    reflect-metadata library for decorators
*/

import "reflect-metadata"
import { Entity, Column, PrimaryColumn } from "typeorm"

type entity_structure = 'user' | 'technology';
type status_structure = 'waiting' | 'approved' | 'rejected';

@Entity()
export class Feedback {

    @PrimaryColumn({
        length: 100
    })
    feedback_id!: string;

    @Column({
        length: 100
    })
    name!: string;

    @Column({
        length: 200
    })
    feedback!: string;

    @Column({
        length: 100
    })
    posted_by!: string;

    @Column()
    entity!: entity_structure;

    @Column({
        length: 100
    })
    entity_id!: string;

    @Column()
    status!: status_structure;

    @Column({
        type: "date"
    })
    created_on;

    @Column()
    count!: number;
}
