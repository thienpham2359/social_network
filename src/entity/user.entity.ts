import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    firstName: string

    @Column({nullable: true})
    lastName: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({default: true})
    isActive: boolean
}
