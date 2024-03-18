export const SortTypes = {
    ASC: "ASC",
    DESC: "DESC",
} as const;

export type SortTypes = keyof typeof SortTypes;