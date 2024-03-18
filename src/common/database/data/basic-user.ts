import {UserRoleType, UserStateType} from "../../types";

export const BasicUser =[
    { id: 'admin', role: UserRoleType.ADMIN, state: UserStateType.ACTIVE },
    { id: 'student', role: UserRoleType.STUDENT, state: UserStateType.ACTIVE },
]