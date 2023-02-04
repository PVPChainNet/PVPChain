/**
 * Slices the first 4 characters and the last 4 of an address and returns a string with the sliced characters.
 *
 * @author Dapptain <@dapptain>
 * @param {string} address - The address to be sliced
 * @param {boolean} short - Return the short version of the address
 * @returns {string} - The sliced address
 */
export default function handleAddress(address: string, short = false): string {
  const formattedAddress = address ? `${address.slice(0, 8)}...${address.slice(-6)}` : 'unknown';
  return short ? formattedAddress.slice(4, 12) : formattedAddress;
}
