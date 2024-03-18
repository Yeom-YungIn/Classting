import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import {Page} from "./page.entity";

@Entity()
export class Subscribe {
    @PrimaryColumn({type: "varchar"})
    userId: string;

    @PrimaryColumn({type: "int"})
    pageId: number;

    @CreateDateColumn({type: "timestamp", nullable: false})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", nullable: false})
    updatedAt: Date;

    @Column({type: "boolean", nullable: false})
    isDeleted: boolean  = false;

    @Column({type: "timestamp", nullable: true})
    deletedAt: Date;

    @ManyToOne(() => Page, (Page) => Page.subscribe, {eager: true})
    @JoinColumn({name: 'pageId'})
    page: Page;
}