// Constants
export const BASE_VALUES = [1, 3, 6];
export const BONUS_PLAN_VALUES: Record<number, number[]> = {
  1: BASE_VALUES,
  2: [1, 4, 8],
};
export const YELLOW_COLOR = "#f9fd30";
export const STORAGE_KEY = "smart-nodes";

// Features Keys
export const SMART_NODES_SALES_FEATURE_ID = "smart-nodes-sales";
export const SMART_NODES_PARTNER_DASHBOARD_ID = "smart-nodes-partner-dashboard";
export const SMART_NODES_PARTNER_SALES_ID = "smart-nodes-partner-sales";

// Generic Components
export const ERROR_COMPONENT_ID = "web3-error-text";
export const LOADING_COMPONENT_ID = "web3-loading-container";

// Email Container
export const EMAIL_CONTAINER_ID = "web3-smart-nodes-email-container";

// Log In Container
export const LOG_IN_CONTAINER_ID = "web3-smart-nodes-log-in-container";

// Order Container
export const ORDER_CONTAINER_ID = "web3-smart-nodes-order";

// Order Container - Buttons
export const BACK_BUTTON_ID = "web3-smart-nodes-navigate-back";
export const ORDER_REVIEW_BUTTON_ID = "web3-smart-nodes-order-review-button";
export const CHECKBOX_BUTTON_ID = "smartnode-checkbox";

// Order Container - Labels
export const AMOUNT_FINAL_LABEL_ID = "web3-smart-nodes-final-amount";
export const BONUS_FINAL_LABEL_ID = "web3-smart-nodes-final-bonus";
export const PHONE_FINAL_LABEL_ID = "web3-smart-nodes-final-phone";
export const UNIT_NODE_LABEL_ID = "web3-unit-smart-node-value";
export const TOTAL_NODES_LABEL_ID = "web3-total-smart-node-value";
export const SMART_NODES_TIERS_VALUE: Record<string, number> = {
  S: 150,
  M: 175,
  A: 200,
  R: 250,
  T: 275,
  N: 325,
  O: 425,
  D: 500,
  E: 750,
};

// Success Container
export const SUCCESS_CONTAINER_ID = "web3-smart-nodes-success-container";

// Success Container - Labels
export const HASH_LABEL_ID = "web3-smart-nodes-transaction-hash";
export const USER_REFERRAL_LABEL_ID = "web3-smart-nodes-referral-code";
