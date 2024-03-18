import {
    Column,
    CreateDateColumn,
    DeleteDateColumn, Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Page} from "./page.entity";

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    newsId: number;

    @Column({type: "int", nullable: false})
    pageId: number;

    @Column({type: "varchar", nullable: false})
    content: string;

    @Column({type: "varchar", nullable: false})
    publisherId: string;

    @CreateDateColumn({type: "timestamp", nullable: false})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", nullable: false})
    updatedAt: Date;

    @Column({type: "boolean", nullable: false})
    isDeleted: boolean  = false;

    @DeleteDateColumn({type: "timestamp", nullable: true})
    deletedAt: Date;

    @ManyToOne(() => Page,(Page) => Page.news, { eager: false })
    @JoinColumn({ name: "pageId" })
    page: Page;
}