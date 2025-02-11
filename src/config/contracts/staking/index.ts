import { Address } from "@/types";

export const abi = [
  {
    inputs: [
      { internalType: "address", name: "__initialOwner", type: "address" },
      { internalType: "address", name: "__smartNodesErc721", type: "address" },
      { internalType: "address", name: "__earnmTokenErc20", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "EtherTransferFailed", type: "error" },
  { inputs: [], name: "IncorrectlyProvidedIds", type: "error" },
  { inputs: [], name: "InvalidTimestamp", type: "error" },
  { inputs: [], name: "IsZeroAddress", type: "error" },
  { inputs: [], name: "NoExcessTokens", type: "error" },
  { inputs: [], name: "NoRewardsToClaim", type: "error" },
  { inputs: [], name: "NoSmartNodesStaked", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  { inputs: [], name: "SmartNodeIsUnderStaking", type: "error" },
  { inputs: [], name: "SmartNodeNotUnderStaking", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint40",
        name: "lastRewardsIterationTimestamp",
        type: "uint40",
      },
    ],
    name: "LastRewardsIterationTimestampUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "rewardsClaimFeeReceiver",
        type: "address",
      },
    ],
    name: "RewardsClaimFeeReceiverUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint128",
        name: "rewardsClaimFee",
        type: "uint128",
      },
    ],
    name: "RewardsClaimFeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "stakerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint16[]",
        name: "snTokenIds",
        type: "uint16[]",
      },
      {
        indexed: false,
        internalType: "uint128[]",
        name: "rewardsWei",
        type: "uint128[]",
      },
    ],
    name: "SmartNodesRewardsClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint40",
        name: "currentIterationEndTimestamp",
        type: "uint40",
      },
      {
        indexed: false,
        internalType: "uint16[]",
        name: "snTokenIds",
        type: "uint16[]",
      },
      {
        indexed: false,
        internalType: "uint128[]",
        name: "rewardsWei",
        type: "uint128[]",
      },
      {
        indexed: false,
        internalType: "uint40",
        name: "secondsSinceLastRewardsIteration",
        type: "uint40",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "rewardsWeiPerSmartNodePerSecond",
        type: "uint128",
      },
    ],
    name: "SmartNodesRewardsUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "stakerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint16[]",
        name: "snTokenIds",
        type: "uint16[]",
      },
    ],
    name: "SmartNodesStaked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "stakerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint16[]",
        name: "snTokenIds",
        type: "uint16[]",
      },
      {
        indexed: false,
        internalType: "uint128[]",
        name: "rewardsWei",
        type: "uint128[]",
      },
    ],
    name: "SmartNodesUnstaked",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16[]", name: "snTokenIds", type: "uint16[]" },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "earnmTokenErc20",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint40",
        name: "currentIterationEndTimestampParam",
        type: "uint40",
      },
      {
        internalType: "uint128",
        name: "currentIterationRewardWeiParam",
        type: "uint128",
      },
      { internalType: "uint16[]", name: "snTokenIds", type: "uint16[]" },
    ],
    name: "getIterationRewards",
    outputs: [
      {
        internalType: "uint128",
        name: "memoryTotalRewardsWei",
        type: "uint128",
      },
      {
        internalType: "uint128",
        name: "rewardsWeiPerSmartNodePerSecond_",
        type: "uint128",
      },
      {
        internalType: "uint128[]",
        name: "memoryRewardsPerSmartNode",
        type: "uint128[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastIterationTimestamp",
    outputs: [
      {
        internalType: "uint40",
        name: "lastRewardsIterationTimestamp",
        type: "uint40",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "snTokenId", type: "uint16" }],
    name: "getLastRewardTimestamp",
    outputs: [
      {
        internalType: "uint40",
        name: "lastRewardsIterationTimestamp",
        type: "uint40",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "snTokenId", type: "uint16" }],
    name: "getRewards",
    outputs: [{ internalType: "uint128", name: "rewardsWei", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getRewardsClaimed",
    outputs: [
      { internalType: "uint128", name: "earnmClaimedWei", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint40", name: "iterationTimestamp", type: "uint40" },
    ],
    name: "getRewardsFromIterationTimestamp",
    outputs: [{ internalType: "uint128", name: "rewardsWei", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16", name: "snTokenId", type: "uint16" },
      {
        internalType: "uint40",
        name: "currentIterationEndTimestampParam",
        type: "uint40",
      },
    ],
    name: "getSecondsSinceLastRewardsIteration",
    outputs: [
      {
        internalType: "uint256",
        name: "secondsSinceLastRewardsIteration",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16", name: "snTokenId", type: "uint16" },
      {
        internalType: "uint40",
        name: "currentIterationEndTimestampParam",
        type: "uint40",
      },
    ],
    name: "getSecondsUnderStaking",
    outputs: [
      { internalType: "uint256", name: "secondsUnderStaking", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getSmartNodesStakedCount",
    outputs: [
      { internalType: "uint16", name: "smartNodesStaked", type: "uint16" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "snTokenId", type: "uint16" }],
    name: "getStaker",
    outputs: [{ internalType: "address", name: "staker", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "snTokenId", type: "uint16" }],
    name: "getStakingTimestamp",
    outputs: [
      { internalType: "uint40", name: "stakingTimestamp", type: "uint40" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalPendingRewards",
    outputs: [
      {
        internalType: "uint128",
        name: "totalPendingRewardsWei",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalSmartNodesStaked",
    outputs: [
      { internalType: "uint16", name: "totalSmartNodesStaked", type: "uint16" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint40", name: "iterationTimestamp", type: "uint40" },
      { internalType: "uint128", name: "rewardAmount", type: "uint128" },
    ],
    name: "setTimestampToReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "smartNodesErc721c",
    outputs: [
      {
        internalType: "contract ISmartNodesERC721C",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16[]", name: "snTokenIds", type: "uint16[]" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16", name: "snTokenId", type: "uint16" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "transferBack",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16[]", name: "snTokenIds", type: "uint16[]" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint40", name: "timestamp", type: "uint40" }],
    name: "updateLastRewardsIterationTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint40",
        name: "currentIterationEndTimestampParam",
        type: "uint40",
      },
      {
        internalType: "uint128",
        name: "currentIterationRewardWeiParam",
        type: "uint128",
      },
      { internalType: "uint16[]", name: "snTokenIds", type: "uint16[]" },
    ],
    name: "updateRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawExcessEarnm",
    outputs: [
      { internalType: "uint128", name: "amountWithdrawn", type: "uint128" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const CONTRACT_ADDRESS = import.meta.env.VITE_STAKING_ADDRESS as Address;
