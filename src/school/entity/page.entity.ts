import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {News} from "./news.entity";

export class Page {
    @PrimaryGeneratedColumn()
    pageId: number;

    @Column()
    schoolName: string;

    @Column()
    location: string;

    @Column()
    publisherId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column()
    isDeleted: boolean;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => News, (news) => news.page, { eager: false })
    news: News[];

}