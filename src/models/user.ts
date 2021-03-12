/*
    this file creates user entity with all the properties,
    using typeorm library to define schemas and
    reflect-metadata library for decorators
*/

import "reflect-metadata"
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"

type roles_structure = 'admin' | 'employee';

@Entity()
export class Users {

    @Column({
        length: 100,
        unique: true
    })
    user_id!: string;

    @Column({
        length: 100
    })
    name!: string;

    @PrimaryColumn({
        length: 100,
        unique: true
    })
    email!: string;

    @Column({
        length: 200
    })
    password!: string;

    @Column()
    roles!: roles_structure;

    @Column({
        length: 100,
        nullable: true
    })
    title!: string;

    @Column({
        type: "date",
        nullable: true
    })
    date_of_birth;
}
