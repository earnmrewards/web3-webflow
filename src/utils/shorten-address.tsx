export function shortenAddress(address: string, offset = 5) {
  if (offset === 0) return address;
  if (address.length <= offset) return address;

  const size = address.length;
  return `${address.slice(0, offset)}...${address.slice(size - offset, size)}`;
}
