const UserStates = {
    ACTIVE : "ACTIVE",
    INACTIVE : "INACTIVE",
}as const

export type UserStates = keyof typeof UserStates;