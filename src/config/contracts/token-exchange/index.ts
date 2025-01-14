import { Address } from "@/types";

export const abi = [
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldToken",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "active", type: "bool" },
    ],
    name: "ConversionActiveSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "rate",
        type: "uint128",
      },
      { indexed: false, internalType: "bool", name: "active", type: "bool" },
    ],
    name: "ConversionConfigured",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldToken",
        type: "address",
      },
    ],
    name: "ConversionDeleted",
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
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "oldToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "amountToConvertWei",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "TokensConverted",
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
      { internalType: "address", name: "oldToken", type: "address" },
      { internalType: "address", name: "newToken", type: "address" },
      { internalType: "uint128", name: "rate", type: "uint128" },
      { internalType: "bool", name: "active", type: "bool" },
    ],
    name: "configureConversion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "oldToken", type: "address" },
      { internalType: "uint128", name: "amountToConvertWei", type: "uint128" },
    ],
    name: "convert",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "oldToken", type: "address" }],
    name: "deleteConversion",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "getBurntAmount",
    outputs: [
      { internalType: "uint128", name: "burntAmount", type: "uint128" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "oldToken", type: "address" }],
    name: "getConversion",
    outputs: [
      {
        components: [
          { internalType: "address", name: "outputToken", type: "address" },
          { internalType: "uint128", name: "rate", type: "uint128" },
          { internalType: "uint128", name: "active", type: "uint128" },
        ],
        internalType: "struct EARNMv2Converter.Conversion",
        name: "conversionConfig",
        type: "tuple",
      },
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
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint128", name: "amount", type: "uint128" },
    ],
    name: "ownerWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
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
      { internalType: "address", name: "oldToken", type: "address" },
      { internalType: "bool", name: "active", type: "bool" },
    ],
    name: "setActive",
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
] as const;

export const CONTRACT_ADDRESS = import.meta.env
  .VITE_TOKEN_EXCHANGE_CONTRACT_ADDRESS as Address;
