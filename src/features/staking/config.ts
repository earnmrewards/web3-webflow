export const STAKING_FEATURE_ID = "staking";

export const LOG_IN_CONTAINER_ID = "web3-log-in-container";
export const STAKING_CONTAINER_ID = "web3-staking-container";

export const ADDRESS_BUTTON_COMPONENT_ID = "web3-address-button";

export const BANNER_CONTAINER_ID = "web3-banner-container";

export const SN_AMOUNT_LABEL_ID = "web3-sn-amount";
export const TOTAL_STAKED_AMOUNT_LABEL_ID = "web3-total-staked-amount";
export const USER_TOTAL_STAKED_AMOUNT_LABEL_ID =
  "web3-user-total-staked-amount";
export const CLAIMABLE_REWARDS_LABEL_ID = "web3-claimable-rewards";

export const REWARD_POOL_CONTAINER_ID = "web3-reward-container";

export const STAKING_SELECTOR_ID = "web3-staking-selector";
export const SELECTOR_AMOUNT_INPUT_ID = "web3-amount-input";
export const SELECTOR_AMOUNT_LABEL_ID = "web3-amount-label";
export const SELECTOR_MAX_BUTTON_ID = "web3-max-button";
export const SELECTOR_RANGE_INPUT_ID = "web3-range-input";

export const STAKING_TRIGGER_BUTTON_ID = "web3-stake-trigger";
export const CLAIMING_TRIGGER_BUTTON_ID = "web3-claim-trigger";
export const BUY_MORE_TRIGGER_BUTTON_ID = "web3-buy-more-button";

export const STAKING_SUCCESS_MODAL_ID = "web3-success-container";
export const STAKING_SUCCESS_MODAL_TITLE_ID = "web3-success-modal-title";
export const STAKING_SUCCESS_MODAL_DESC_ID = "web3-success-modal-description";

export const STAKING_COMPONENT_ID = "web3-staking-component";
export const STAKING_CONTENT_ID = "web3-staking-content";
export const STAKING_VIEW_SELECTOR_ID = "web3-staking-component-view-selector";
export const STAKING_TABLE_COMPONENT_ID = "web3-staking-component-table";
export const STAKING_PAGINATION_COMPONENT_ID =
  "web3-staking-component-pagination";
export const STAKING_COMPONENT_ACTIONS_ID = "web3-staking-component-actions";

export const MAX_ITEMS_PER_PAGE = 24;
export const MAX_VISIBLE_PAGES = 3;
export const MAX_INTERACTIVE_ITEMS = 100;
export const MAX_REWARDS_CARDS = 5;

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const explorerUrl =
  import.meta.env.VITE_ENVIRONMENT === "production"
    ? "https://arbiscan.io/tx"
    : "https://sepolia.arbiscan.io/tx";
