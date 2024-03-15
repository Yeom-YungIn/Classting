import {
    Column,
    CreateDateColumn,
    DeleteDateColumn, Entity, ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {News} from "./news.entity";
import {Subscribe} from "./subscribe.entity";

@Entity()
export class Page {
    @PrimaryGeneratedColumn({type: "int"})
    pageId: number;

    @Column({type: "varchar", nullable: false})
    schoolName: string;

    @Column({type: "varchar", nullable: false})
    location: string;

    @Column({type: "varchar", nullable: false})
    publisherId: string;

    @CreateDateColumn({type: "timestamp", nullable: false})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", nullable: false})
    updatedAt: Date;

    @Column({type: "boolean", nullable: false})
    isDeleted: boolean = false;

    @DeleteDateColumn({type: "timestamp", nullable: true})
    deletedAt: Date;

    @OneToMany(() => News, (news) => news.page, { eager: false })
    news: News[];

    @ManyToMany(() => Subscribe, (Subscribe) => Subscribe.page, {eager: false})
    subscribe: Subscribe[];

}