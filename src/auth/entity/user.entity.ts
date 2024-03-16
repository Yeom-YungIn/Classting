import {Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";


export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({comment: "사용자명", type: "varchar"})
    name: string;

    @Column({comment: "비밀번호", type: "varchar"})
    password: string;

    @Column({comment: "권한", type: "varchar"})
    role: RoleTypes;

    @Column()
    state: UserStates;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @DeleteDateColumn()
    deleteDateColumn: Date;

}