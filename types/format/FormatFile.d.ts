export const FILE_UNITS: string[];
/**
 * @memberof PicoFormat
 * @extends {PicoFormat}
 */
export class PicoFormatFileStatic {
    /**
     * Format file size
     *
     * @example Format.filesize(1000) // => "1.0 KB"
     *
     * @param {any} value Bytes value
     * @param {number} [decimals] Decimal points
     * @returns {string} Formatted size
     */
    static filesize(value: any, decimals?: number): string;
}
export function PicoFormatFilePlugin(self: any): typeof import("#src/utils/Format.js").PicoFormat;
