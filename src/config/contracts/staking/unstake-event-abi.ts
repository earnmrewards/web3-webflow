export const unstakeEventABI = {
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
} as const;
