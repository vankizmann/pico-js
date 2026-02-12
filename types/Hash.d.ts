/**
 * @var {Array<String>} radix_number Radix from 0 to 9
 */
export const radix_number: string[];
/**
 * @var {Array<String>} radix_letter_lower Radix from a to z
 */
export const radix_letter_lower: string[];
/**
 * @var {Array<String>} radix_letter_upper Radix from A to Z
 */
export const radix_letter_upper: string[];
/**
 * @var {Array<String>} radix_symbol_uuid Radix from 0-9, a-f and A-F
 */
export const radix_symbol_uuid: string[];
/**
 * @var {Array<String>} radix_symbol_up19 Radix with 8, 9, a and b
 */
export const radix_symbol_up19: string[];
/**
 * @var {Array<String>} radix_symbol_pass Radix for passwords
 */
export const radix_symbol_pass: string[];
export class Hash {
    /**
     * @var {Array<String>} $radix
     */
    static $radix: string[];
    /**
     * Get random char from radix
     *
     * @param {Number} [limit=60] Maximum radix char index
     * @param {Array<String>} [radix=null] A defined radix or null for default
     * @returns {String} Returns random char from radix
     * @example Hash.radix(2, ['R', 'f']) // => 'R' or 'f'
     */
    static radix(limit?: number, radix?: Array<string>): string;
    /**
     * Get random number
     *
     * @param {Number} [limit=1024] Maximum value
     * @param {Number} [start=0] Minimum value
     * @returns {Number} Returns a random number between start and limit
     * @example Hash.number(20, 18) // => 18, 19 or 20
     */
    static number(limit?: number, start?: number): number;
    /**
     * Get a random hash with given options
     *
     * @param {Number} [length] Length of generated hash
     * @param {Number} [radix] Maximum radix char index (10 for 0-9, 36 incl. a-z, 62 incl. A-Z)
     * @param {Record<number, string>} [map] Remap for generated string
     * @returns {String} Returns a random hash with fixed length
     * @example Hash.make(4, 32, { 0: '?' }) // => '?8Wj'
     */
    static make(length?: number, radix?: number, map?: Record<number, string>): string;
    /**
     * Get a valid v4 UUID
     *
     * @param {String|Number} [version] UUID version number
     * @returns {String} Returns a valid UUID
     * @example Hash.uuid() // => 'FBbA001F-0a01-4bE8-b29C-A9c47fA090f'
     */
    static uuid(version?: string | number): string;
    /**
     * Generate a password with or without symbols
     *
     * @param {Number} [length=24] Length of password
     * @param {Array<String>} [symbols=null] Defined symbols or null for default
     * @returns {String} A random password with fixed length
     * @example Hash.password(12, ['%', '&']) // => '0unJ%VDi2RJX'
     */
    static password(length?: number, symbols?: Array<string>): string;
}
export default Hash;
