export const selectionOptions = ["available", "staked", "history"] as const;
export type StakeOption = (typeof selectionOptions)[number];

export type ViewType = "grid" | "list";
