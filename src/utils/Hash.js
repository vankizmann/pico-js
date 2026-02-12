import { Str, Hash } from "../index.esm.js";

/**
 * @var {Array<string>} RADIX_NUMBER Radix from 0 to 9
 */
export const RADIX_NUMBER = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

/**
 * @var {Array<string>} RADIX_LETTER_LC Radix from a to z
 */
export const RADIX_LETTER_LC = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
];

/**
 * @var {Array<string>} RADIX_LETTER_UC Radix from A to Z
 */
export const RADIX_LETTER_UC = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

/**
 * @var {Array<string>} RADIX_UUID Radix from 0-9, a-f and A-F
 */
export const RADIX_UUID = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'A', 'B', 'C', 'D', 'E', 'F',
];


/**
 * @var {Array<string>} RADIX_UP19 Radix with 8, 9, a and b
 */
export const RADIX_UP19 = [
    '8', '9', 'a', 'b',
];

/**
 * @var {Array<string>} radix_symbol_pass Radix for passwords
 */
export const radix_symbol_pass = [
    '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '[', ']', '{', '}', ';', ':', ',', '.', '/', '<', '>', '?'
];

export class PicoHash
{

    /**
     * @var {Array<string>} RADIX
     */
    static RADIX = [
        ...RADIX_NUMBER, ...RADIX_LETTER_LC, ...RADIX_LETTER_UC
    ];

    /**
     * Get random char from radix
     *
     * @example Hash.radix(2, ['R', 'f']) // => 'R' or 'f'
     *
     * @param {number} [limit=60] Maximum radix char index
     * @param {Array<string>} [radix=null] A defined radix or null for default
     * @returns {string} Returns random char from radix
     */
    static radix(limit = 60, radix = null)
    {
        return (radix || this.RADIX)[this.number(limit - 1)];
    }

    /**
     * Get random number
     *
     * @example Hash.number(20, 18) // => 18, 19 or 20
     *
     * @param {number} [limit=1024] Maximum value
     * @param {number} [start=0] Minimum value
     * @returns {number} Returns a random number between start and limit
     */
    static number(limit = 1024, start = 0)
    {
        return Math.floor(Math.random() * (limit - start + 1)) + start;
    }

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
    static make(length = 6, radix = 62, map = {})
    {
        let hash = '';

        for ( let i = 0; i < length; i ++ ) {
            hash += Hash.radix(radix);
        }

        for ( const k of Object.keys(map) ) {
            hash = Str.set(hash, k, map[k]);
        }

        return hash;
    }

    /**
     * Get a valid v4 UUID
     *
     * @example Hash.uuid() // => 'FBbA001F-0a01-4bE8-b29C-A9c47fA090f'
     *
     * @param {string|number} [version] UUID version number
     * @returns {string} Returns a valid UUID
     */
    static uuid(version = 4)
    {
        let hash = '';

        // Use only selected chars from the radix store
        for ( let i = 0; i < 31; i ++ ) {
            if ( i === 15 ) {
                hash += Hash.radix(RADIX_UP19.length, RADIX_UP19);
            } else {
                hash += Hash.radix(RADIX_UUID.length, RADIX_UUID);
            }
        }

        // For higher performance use substring
        return hash.substring(0, 8)
            + '-' + hash.substring(8, 12)
            + '-' + version + hash.substring(12, 15)
            + '-' + hash.substring(15, 19)
            + '-' + hash.substring(19, 31);
    }

    /**
     * Generate a password with or without symbols
     *
     * @example Hash.password(12, ['%', '&']) // => '0unJ%VDi2RJX'
     *
     * @param {number} [length=24] Length of password
     * @param {Array<string>} [symbols=null] Defined symbols or null for default
     * @returns {string} A random password with fixed length
     */
    static password(length = 24, symbols = null)
    {
        let radix = [
            ...this.RADIX, ...(symbols || radix_symbol_pass)
        ];

        let hash = '';

        for ( let i = 0; i < length; i ++ ) {
            hash += Hash.radix(radix.length, radix);
        }

        return hash;
    }

}

export default PicoHash;