/**
 * @var {Array<string>} RADIX_NUMBER Radix from 0 to 9
 */
export const RADIX_NUMBER: string[];
/**
 * @var {Array<string>} RADIX_LETTER_LC Radix from a to z
 */
export const RADIX_LETTER_LC: string[];
/**
 * @var {Array<string>} RADIX_LETTER_UC Radix from A to Z
 */
export const RADIX_LETTER_UC: string[];
/**
 * @var {Array<string>} RADIX_UUID Radix from 0-9, a-f and A-F
 */
export const RADIX_UUID: string[];
/**
 * @var {Array<string>} RADIX_UP19 Radix with 8, 9, a and b
 */
export const RADIX_UP19: string[];
/**
 * @var {Array<string>} radix_symbol_pass Radix for passwords
 */
export const radix_symbol_pass: string[];
export class PicoHash {
    /**
     * @var {Array<string>} RADIX
     */
    static RADIX: string[];
    /**
     * Get random char from radix
     *
     * @example Hash.radix(2, ['R', 'f']) // => 'R' or 'f'
     *
     * @param {number} [limit=60] Maximum radix char index
     * @param {Array<string>} [radix=null] A defined radix or null for default
     * @returns {string} Returns random char from radix
     */
    static radix(limit?: number, radix?: Array<string>): string;
    /**
     * Get random number
     *
     * @example Hash.number(20, 18) // => 18, 19 or 20
     *
     * @param {number} [limit=1024] Maximum value
     * @param {number} [start=0] Minimum value
     * @returns {number} Returns a random number between start and limit
     */
    static number(limit?: number, start?: number): number;
    /**
     * Get a random hash with given options
     *
     * @example Hash.make(4, 32, { 0: '?' }) // => '?8Wj'
     *
     * @param {number} [length] Length of generated hash
     * @param {number} [radix] Maximum radix char index (10 for 0-9, 36 incl. a-z, 62 incl. A-Z)
     * @param {Record<number, string>} [map] Remap for generated string
     * @returns {string} Returns a random hash with fixed length
     */
    static make(length?: number, radix?: number, map?: Record<number, string>): string;
    /**
     * Get a valid v4 UUID
     *
     * @example Hash.uuid() // => 'FBbA001F-0a01-4bE8-b29C-A9c47fA090f'
     *
     * @param {string|number} [version] UUID version number
     * @returns {string} Returns a valid UUID
     */
    static uuid(version?: string | number): string;
    /**
     * Generate a password with or without symbols
     *
     * @example Hash.password(12, ['%', '&']) // => '0unJ%VDi2RJX'
     *
     * @param {number} [length=24] Length of password
     * @param {Array<string>} [symbols=null] Defined symbols or null for default
     * @returns {string} A random password with fixed length
     */
    static password(length?: number, symbols?: Array<string>): string;
}
export default PicoHash;
