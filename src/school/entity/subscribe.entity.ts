import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
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
    isDeleted: boolean;

    @DeleteDateColumn({type: "timestamp", nullable: true})
    deletedAt: Date;

    @ManyToMany(() => Page, (Page) => Page.subscribe, {eager: false})
    page: Page[];
}