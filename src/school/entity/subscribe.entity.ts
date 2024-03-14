import {Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export class Subscribe {
    @PrimaryGeneratedColumn()
    userId: string;

    @PrimaryGeneratedColumn()
    channelId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column()
    isDeleted: boolean;

    @DeleteDateColumn()
    deletedAt: Date;

}