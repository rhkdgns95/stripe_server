import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("text", { unique: true })
    email: string;

    /* stripe_id: Card: { id }   */
    @Column("text", { nullable: true })
    stripeId: string;

    /* stripe_type: type   */
    @Column("text", { default: "free-trial" })
    type: string;

    @Column("text")
    password: string;

}
