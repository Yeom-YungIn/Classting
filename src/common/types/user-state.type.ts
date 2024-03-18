export const UserStateType = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
} as const;

export type UserStateType = keyof typeof UserStateType;
