const RoleTypes = {
    ADMIN : "ADMIN",
    STUDENT : "STUDENT",
} as const


export type RoleTypes = keyof typeof RoleTypes;