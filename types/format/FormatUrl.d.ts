export const SLUG_CONVERT: string[][];
/**
 * @memberof PicoFormat
 * @extends {PicoFormat}
 */
export class PicoFormatUrlStatic {
    /**
     * Create slug from string
     *
     * @example Format.slugify("Hello World") // => "hello-world"
     *
     * @param {any} value Input string
     * @returns {string} Slug string
     */
    static slugify(value: any): string;
}
export function PicoFormatUrlPlugin(self: any): typeof import("#src/utils/Format.js").PicoFormat;
