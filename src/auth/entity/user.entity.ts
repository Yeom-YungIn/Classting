import {
    Column,
    CreateDateColumn,
    DeleteDateColumn, Entity,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import {RoleTypes, UserStates} from '../types'

@Entity()
export class User {

    @PrimaryColumn({comment: "사용자 ID", type: "varchar"})
    id: string;

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