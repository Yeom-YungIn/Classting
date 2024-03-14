import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Page} from "./page.entity";

export class News {
    @PrimaryGeneratedColumn()
    newsId: number;

    @Column()
    pageId: number;

    @Column()
    content: string;

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

    @ManyToOne(() => Page,(page) => page.news, {eager: false})
    @JoinColumn({name: 'pageId'})
    page: Page;

}