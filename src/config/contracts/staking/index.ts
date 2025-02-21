import { Address } from "@/types";

export const abi = [
  {
    inputs: [
      { internalType: "address", name: "__initialOwner", type: "address" },
      { internalType: "address", name: "__smartNodesErc721", type: "address" },
      { internalType: "address", name: "__initialErc20", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "AccessControlBadConfirmation", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bytes32", name: "neededRole", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
    type: "error",
  },
  { inputs: [], name: "IncorrectlyProvidedIds", type: "error" },
  { inputs: [], name: "InvalidErc20", type: "error" },
  { inputs: [], name: "InvalidRewardAmount", type: "error" },
  { inputs: [], name: "InvalidTimestamp", type: "error" },
  { inputs: [], name: "IterationNotFound", type: "error" },
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
        internalType: "address",
        name: "erc20",
        type: "address",
      },
    ],
    name: "Erc20Added",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "erc20",
        type: "address",
      },
    ],
    name: "Erc20Removed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint128",
        name: "iterationId",
        type: "uint128",
      },
      {
        indexed: true,
        internalType: "uint40",
        name: "currentIterationEndTimestamp",
        type: "uint40",
      },
      {
        indexed: false,
        internalType: "uint40",
        name: "iterationDuration",
        type: "uint40",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "currentIterationRewardWei",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "rewardsWeiPerSmartNodePerSecond",
        type: "uint128",
      },
    ],
    name: "IterationCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint128",
        name: "iterationId",
        type: "uint128",
      },
    ],
    name: "IterationDeleted",
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
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint16",
        name: "snTokenId",
        type: "uint16",
      },
      { indexed: true, internalType: "address", name: "to", type: "address" },
    ],
    name: "SmartNodeRescued",
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
        indexed: true,
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
        internalType: "uint128",
        name: "iterationId",
        type: "uint128",
      },
      {
        indexed: true,
        internalType: "uint16[]",
        name: "snTokenIds",
        type: "uint16[]",
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
        indexed: true,
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
        indexed: true,
        internalType: "uint16[]",
        name: "snTokenIds",
        type: "uint16[]",
      },
    ],
    name: "SmartNodesUnstaked",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REWARDS_UPDATER_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "erc20", type: "address" }],
    name: "addErc20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "erc20", type: "address" },
      { internalType: "uint16[]", name: "snTokenIds", type: "uint16[]" },
    ],
    name: "claimRewards",
    outputs: [
      {
        internalType: "uint128",
        name: "memoryTotalRewardsWei",
        type: "uint128",
      },
      {
        internalType: "uint128[]",
        name: "memoryRewardsPerSmartNode",
        type: "uint128[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "erc20", type: "address" },
      {
        internalType: "uint16",
        name: "snStakedDuringIterationParam",
        type: "uint16",
      },
      {
        internalType: "uint40",
        name: "currentIterationStartTimestampParam",
        type: "uint40",
      },
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
    ],
    name: "createIteration",
    outputs: [
      { internalType: "uint128", name: "iterationId", type: "uint128" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint128", name: "iterationId", type: "uint128" }],
    name: "deleteIteration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "erc20", type: "address" }],
    name: "getContractBalanceOf",
    outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "erc20", type: "address" }],
    name: "getErc20PendingRewards",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint128", name: "iterationId", type: "uint128" }],
    name: "getIteration",
    outputs: [
      { internalType: "address", name: "erc20", type: "address" },
      { internalType: "uint40", name: "duration", type: "uint40" },
      { internalType: "uint40", name: "startTimestamp", type: "uint40" },
      { internalType: "uint40", name: "endTimestamp", type: "uint40" },
      { internalType: "uint16", name: "totalSmartNodesStaked", type: "uint16" },
      { internalType: "uint128", name: "totalRewardsWei", type: "uint128" },
      {
        internalType: "uint128",
        name: "rewardsWeiPerSmartNodePerSecond",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint40",
        name: "currentIterationStartTimestampParam",
        type: "uint40",
      },
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
        name: "rewardsWeiPerSmartNodePerSecond",
        type: "uint128",
      },
      {
        internalType: "uint128[]",
        name: "memoryRewardsPerSmartNode",
        type: "uint128[]",
      },
      {
        internalType: "uint40[]",
        name: "memorySecondsStaked",
        type: "uint40[]",
      },
      { internalType: "uint16[]", name: "snTokenIdsOmitted", type: "uint16[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint128", name: "iterationId", type: "uint128" },
      { internalType: "uint16", name: "snTokenId", type: "uint16" },
    ],
    name: "getIterationSmartNodeRewards",
    outputs: [{ internalType: "uint128", name: "rewardsWei", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "snTokenId", type: "uint16" }],
    name: "getSecondsUnderStaking",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "erc20", type: "address" },
      { internalType: "uint16", name: "snTokenId", type: "uint16" },
    ],
    name: "getSmartNodeErc20PendingRewards",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "snTokenId", type: "uint16" }],
    name: "getStaking",
    outputs: [
      { internalType: "address", name: "staker", type: "address" },
      { internalType: "uint40", name: "stakingTimestamp", type: "uint40" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "snTokenId", type: "uint16" }],
    name: "getStakingStaker",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "snTokenId", type: "uint16" }],
    name: "getStakingTimestamp",
    outputs: [{ internalType: "uint40", name: "", type: "uint40" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalSmartNodesStaked",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "erc20", type: "address" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getUserErc20ClaimedRewards",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserSmartNodesStakedCount",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
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
    inputs: [{ internalType: "address", name: "erc20", type: "address" }],
    name: "removeErc20",
    outputs: [],
    stateMutability: "nonpayable",
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
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "callerConfirmation", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "revokeRole",
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
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
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
    inputs: [
      { internalType: "uint128", name: "iterationId", type: "uint128" },
      { internalType: "uint16[]", name: "snTokenIds", type: "uint16[]" },
    ],
    name: "updateSmartNodeRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "erc20", type: "address" }],
    name: "withdrawExcessEarnm",
    outputs: [
      { internalType: "uint128", name: "amountWithdrawn", type: "uint128" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const CONTRACT_ADDRESS = import.meta.env.VITE_STAKING_ADDRESS as Address;
