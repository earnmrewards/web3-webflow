export const stakeEventABI = {
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
} as const;
