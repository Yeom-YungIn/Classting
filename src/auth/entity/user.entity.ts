import {Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";
import {UserRoleType, UserStateType} from "../types";


export class User {

    @PrimaryColumn({comment: "사용자명 ID", type: "varchar"})
    id: string;

    @Column({comment: "권한", type: "varchar"})
    role: UserRoleType;

    @Column()
    state: UserStateType;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @DeleteDateColumn()
    deleteDateColumn: Date;

}