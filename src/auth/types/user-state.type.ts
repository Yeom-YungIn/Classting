export const UserStateType = {
    ADMIN: "ADMIN",
    STUDENT: "STUDENT",
} as const;

export type UserStateType = keyof typeof UserStateType;
