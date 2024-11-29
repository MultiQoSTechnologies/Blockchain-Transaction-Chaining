import { Pipe, PipeTransform } from '@angular/core';

/**
 * ShortenAddressPipe
 * A custom Angular pipe to shorten Ethereum wallet addresses for better readability.
 * Example: Converts '0x1234567890abcdef1234567890abcdef12345678' to '0x1234...5678'.
 */
@Pipe({ name: 'shortenAddress' })
export class ShortenAddressPipe implements PipeTransform {
  /**
   * Transforms a full Ethereum wallet address into a shortened format.
   *
   * @param address - The full Ethereum wallet address to shorten.
   * @returns A shortened version of the address, or 'N/A' if the address is invalid or empty.
   */
  transform(address: string): string {
    return address
      ? `${address.slice(0, 6)}...${address.slice(-4)}` // Keep the first 6 and last 4 characters of the address
      : 'N/A'; // Return 'N/A' if the address is undefined, null, or empty
  }
}

