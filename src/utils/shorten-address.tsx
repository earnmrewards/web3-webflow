export function shortenAddress(address: string, offset = 5) {
  const size = address.length;
  return `${address.slice(0, offset)}...${address.slice(size - offset, size)}`;
}
