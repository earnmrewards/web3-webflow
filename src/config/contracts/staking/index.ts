import { Address } from "@/types";

export const abi = [
  {
    inputs: [
      { internalType: "address", name: "__initialOwner", type: "address" },
      { internalType: "address", name: "__smartNodesErc721", type: "address" },
      { internalType: "address", name: "__earnmTokenErc20", type: "address" },
      {
        internalType: "address",
        name: "__rewardsClaimFeeReceiver",
        type: "address",
      },
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
    inputs: [
      { internalType: "uint8", name: "bits", type: "uint8" },
      { internalType: "uint256", name: "value", type: "uint256" },
    ],
    name: "SafeCastOverflowedUintDowncast",
    type: "error",
  },
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
    stateMutability: "payable",
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
    inputs: [],
    name: "getClaimFee",
    outputs: [
      { internalType: "uint128", name: "claimFeeWei", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getClaimFeesReceiver",
    outputs: [
      { internalType: "address", name: "claimFeesReceiver", type: "address" },
    ],
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
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "snTokenId", type: "uint16" }],
    name: "getLastRewardsIterationTimestamp",
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
    inputs: [],
    name: "getLastRewardsIterationTimestamp",
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
      { internalType: "uint128", name: "rewardsClaimFee", type: "uint128" },
    ],
    name: "setRewardsClaimFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "rewardsClaimFeeReceiver",
        type: "address",
      },
    ],
    name: "setRewardsClaimFeeReceiver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "smartNodesErc721",
    outputs: [{ internalType: "contract IERC721", name: "", type: "address" }],
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
    stateMutability: "payable",
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
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "withdraw",
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

export const nftCollectionAbi = [
  {
    inputs: [
      { internalType: "address", name: "royaltyReceiver_", type: "address" },
      { internalType: "uint96", name: "royaltyFeeNumerator_", type: "uint96" },
      { internalType: "string", name: "baseTokenURI_", type: "string" },
      { internalType: "string", name: "contractURI_", type: "string" },
      { internalType: "uint40", name: "launchTimestamp_", type: "uint40" },
      { internalType: "uint16", name: "conversionUSDPrice_", type: "uint16" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "CreatorTokenBase__InvalidTransferValidatorContract",
    type: "error",
  },
  { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
  { inputs: [], name: "ShouldNotMintToBurnAddress", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "assetURI",
        type: "string",
      },
    ],
    name: "AssetURIUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "autoApproved",
        type: "bool",
      },
    ],
    name: "AutomaticApprovalOfTransferValidatorSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "baseTokenURI",
        type: "string",
      },
    ],
    name: "BaseTokenURIUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "contractURI",
        type: "string",
      },
    ],
    name: "ContractURIUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "conversionUSDPrice",
        type: "uint16",
      },
    ],
    name: "ConversionUSDPriceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint96",
        name: "feeNumerator",
        type: "uint96",
      },
    ],
    name: "DefaultRoyaltySet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "FeesReceiverUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint16",
        name: "bonusSmartNodes",
        type: "uint16",
      },
    ],
    name: "FreeSmartNodesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "isMintAllowed",
        type: "bool",
      },
    ],
    name: "MintAllowedUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint16[]",
        name: "tokenIdsMinted",
        type: "uint16[]",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "bonusSmartNodes",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "mintFee",
        type: "uint128",
      },
    ],
    name: "Minted",
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
        indexed: false,
        internalType: "uint16",
        name: "tierId",
        type: "uint16",
      },
      { indexed: false, internalType: "uint128", name: "fee", type: "uint128" },
    ],
    name: "TierFeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint96",
        name: "feeNumerator",
        type: "uint96",
      },
    ],
    name: "TokenRoyaltySet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint96",
        name: "feeNumerator",
        type: "uint96",
      },
    ],
    name: "TokenRoyaltyUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldValidator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newValidator",
        type: "address",
      },
    ],
    name: "TransferValidatorUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_TRANSFER_VALIDATOR",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_assetURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_baseTokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_contractURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "autoApproveTransfersFromValidator",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16", name: "amountRequested", type: "uint16" },
    ],
    name: "calculateMintFee",
    outputs: [{ internalType: "uint128", name: "mintFee", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractURI",
    outputs: [{ internalType: "string", name: "contractURI_", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getConversionUSDPrice",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentTier",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFeesReceiverAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "tierId", type: "uint16" }],
    name: "getInitialTierSupply",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLaunchTimestamp",
    outputs: [{ internalType: "uint40", name: "", type: "uint40" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "tierId", type: "uint16" }],
    name: "getMintedTierAmount",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getRemainingFreeSmartNodes",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "tokenId", type: "uint16" }],
    name: "getSmartNode",
    outputs: [
      { internalType: "uint16", name: "tier", type: "uint16" },
      { internalType: "uint128", name: "blockTs", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "tierId", type: "uint16" }],
    name: "getTierAvailabilityPeriodTimestamp",
    outputs: [{ internalType: "uint40", name: "", type: "uint40" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "tierId", type: "uint16" }],
    name: "getTierFee",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint16", name: "tierId", type: "uint16" }],
    name: "getTierSupply",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getTotalMintedSmartNodes",
    outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTransferValidationFunction",
    outputs: [
      { internalType: "bytes4", name: "functionSignature", type: "bytes4" },
      { internalType: "bool", name: "isViewFunction", type: "bool" },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getTransferValidator",
    outputs: [{ internalType: "address", name: "validator", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "isApproved", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16", name: "amountRequested", type: "uint16" },
      { internalType: "uint16", name: "bonusCriteria", type: "uint16" },
    ],
    name: "mint",
    outputs: [
      { internalType: "uint16[]", name: "tokenIdsMinted", type: "uint16[]" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
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
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
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
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "uint256", name: "_salePrice", type: "uint256" },
    ],
    name: "royaltyInfo",
    outputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "__assetURI", type: "string" }],
    name: "setAssetURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "autoApprove", type: "bool" }],
    name: "setAutomaticApprovalOfTransfersFromValidator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "__baseTokenURI", type: "string" },
    ],
    name: "setBaseTokenURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "__contractURI", type: "string" }],
    name: "setContractURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16", name: "conversionUSDPrice_", type: "uint16" },
    ],
    name: "setConversionUSDPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "uint96", name: "feeNumerator", type: "uint96" },
    ],
    name: "setDefaultRoyalty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint16", name: "bonusSmartNodes", type: "uint16" },
    ],
    name: "setFreeSmartNodes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "isMintAllowed_", type: "bool" }],
    name: "setIsMintAllowed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint16", name: "tierId", type: "uint16" },
      { internalType: "uint128", name: "fee", type: "uint128" },
    ],
    name: "setTierFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "uint96", name: "feeNumerator", type: "uint96" },
    ],
    name: "setTokenRoyalty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "transferValidator_", type: "address" },
    ],
    name: "setTransferValidator",
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
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "tokenURI_", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
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
];

export const CONTRACT_ADDRESS = import.meta.env.VITE_STAKING_ADDRESS as Address;
export const NFT_COLLECTION_ADDRESS = import.meta.env
  .VITE_SN_NFT_COLLECTION_ADDRESS as Address;
