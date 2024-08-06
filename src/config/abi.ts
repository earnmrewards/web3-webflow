export const abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "royaltyReceiver_",
        type: "address",
        internalType: "address",
      },
      {
        name: "royaltyFeeNumerator_",
        type: "uint96",
        internalType: "uint96",
      },
      { name: "name_", type: "string", internalType: "string" },
      { name: "symbol_", type: "string", internalType: "string" },
      { name: "baseTokenURI_", type: "string", internalType: "string" },
      { name: "contractURI_", type: "string", internalType: "string" },
      { name: "vrfHandler_", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "DEFAULT_TRANSFER_VALIDATOR",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_MINT",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "MAX_SUPPLY",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "TIER_IDS_LENGTH",
    inputs: [],
    outputs: [{ name: "", type: "uint128", internalType: "uint128" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "_baseTokenURI",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "_contractURI",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "autoApproveTransfersFromValidator",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "calculateMintFee",
    inputs: [{ name: "amount", type: "uint32", internalType: "uint32" }],
    outputs: [{ name: "mintFee", type: "uint128", internalType: "uint128" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "contractURI",
    inputs: [],
    outputs: [{ name: "contractURI_", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "fulfillRandomWords",
    inputs: [
      { name: "_requestId", type: "uint256", internalType: "uint256" },
      {
        name: "_randomWords",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getApproved",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSmartNode",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "tier", type: "uint128", internalType: "uint128" },
      { name: "blockTs", type: "uint128", internalType: "uint128" },
      { name: "hasEarnNode", type: "uint128", internalType: "uint128" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTransferValidationFunction",
    inputs: [],
    outputs: [
      {
        name: "functionSignature",
        type: "bytes4",
        internalType: "bytes4",
      },
      { name: "isViewFunction", type: "bool", internalType: "bool" },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getTransferValidator",
    inputs: [],
    outputs: [{ name: "validator", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isApprovedForAll",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "operator", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "isApproved", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isMintAllowed",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [{ name: "amount", type: "uint32", internalType: "uint32" }],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ownerOf",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "royaltyInfo",
    inputs: [
      { name: "_tokenId", type: "uint256", internalType: "uint256" },
      { name: "_salePrice", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setApprovalForAll",
    inputs: [
      { name: "operator", type: "address", internalType: "address" },
      { name: "approved", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAutomaticApprovalOfTransfersFromValidator",
    inputs: [{ name: "autoApprove", type: "bool", internalType: "bool" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setBaseTokenURI",
    inputs: [
      { name: "__baseTokenURI", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setContractURI",
    inputs: [{ name: "__contractURI", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDefaultRoyalty",
    inputs: [
      { name: "receiver", type: "address", internalType: "address" },
      { name: "feeNumerator", type: "uint96", internalType: "uint96" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setIsMintAllowed",
    inputs: [{ name: "isMintAllowed_", type: "bool", internalType: "bool" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setTokenRoyalty",
    inputs: [
      { name: "tokenId", type: "uint256", internalType: "uint256" },
      { name: "receiver", type: "address", internalType: "address" },
      { name: "feeNumerator", type: "uint96", internalType: "uint96" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setTransferValidator",
    inputs: [
      {
        name: "transferValidator_",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setVrfHandler",
    inputs: [{ name: "_vrfHandler", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [{ name: "interfaceId", type: "bytes4", internalType: "bytes4" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "tokenURI",
    inputs: [{ name: "tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "tokenURI_", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "vrfHandler",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IVRFHandler",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AutomaticApprovalOfTransferValidatorSet",
    inputs: [
      {
        name: "autoApproved",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BaseTokenURIUpdated",
    inputs: [
      {
        name: "baseTokenURI",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ContractURIUpdated",
    inputs: [
      {
        name: "contractURI",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DefaultRoyaltySet",
    inputs: [
      {
        name: "receiver",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "feeNumerator",
        type: "uint96",
        indexed: false,
        internalType: "uint96",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "IsMintAllowedUpdated",
    inputs: [
      {
        name: "isRevealAllowed",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SmartNodeHasEarnNode",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SmartNodeMinted",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tier",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenRoyaltySet",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "receiver",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "feeNumerator",
        type: "uint96",
        indexed: false,
        internalType: "uint96",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransferValidatorUpdated",
    inputs: [
      {
        name: "oldValidator",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "newValidator",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "VrfHandlerUpdated",
    inputs: [
      {
        name: "vrfHandler",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "BadRequest", inputs: [] },
  {
    type: "error",
    name: "CreatorTokenBase__InvalidTransferValidatorContract",
    inputs: [],
  },
  { type: "error", name: "InvalidMintAmount", inputs: [] },
  { type: "error", name: "InvalidTier", inputs: [] },
  { type: "error", name: "InvalidVrfRequest", inputs: [] },
  { type: "error", name: "InvalidVrfState", inputs: [] },
  { type: "error", name: "MintsExhausted", inputs: [] },
  { type: "error", name: "NoMoreTiersAvailable", inputs: [] },
  {
    type: "error",
    name: "OnlyVrfHandlerCanFulfill",
    inputs: [
      {
        name: "actualFulfiller",
        type: "address",
        internalType: "address",
      },
      {
        name: "expectedFulfiller",
        type: "address",
        internalType: "address",
      },
    ],
  },
  { type: "error", name: "ShouldNotMintToBurnAddress", inputs: [] },
  { type: "error", name: "Unauthorized", inputs: [] },
] as const;
