export const UserRoleType = {
    ADMIN: "ADMIN",
    STUDENT: "STUDENT",
} as const;

export type UserRoleType = keyof typeof UserRoleType;
