import { Obj, Dom } from "../index.esm.ts";
import { PicoDom, PicoDomInterface } from "../utils/Dom.ts";
import PicoDomRectangle from "./DomRectangle.js";

export interface PicoDomPopover extends PicoDomInterface,
    PicoDomRectangle
{
    //
}

/**
 * @memberof PicoDom
 */
export class PicoDomPopover
{

    popover(target : any, position : string = 'botttom-center', options : any = {}) : any
    {
        if ( /^(top|bottom)-/.test(position) ) {
            return this.popoverY(target, position, options);
        }

        if ( /^(left|right)-/.test(position) ) {
            return this.popoverX(target, position, options);
        }
    }

    popoverY(target : any, position : string = 'bottom-center', options : any = {}) : any
    {
        target = Dom.find(target);

        let [rect, self] = [
            target.rect(), this.rect()
        ];

        if ( options.x ) {
            rect = { ...rect, left: options.x, width: 1 };
        }

        if ( options.y ) {
            rect = { ...rect, top: options.y, height: 1 };
        }

        if ( !options.width ) {
            // self.width = rect.width;
        }

        let [offset, recto] = [
            { x: 0, y: 0 }, rect.width - self.width
        ];

        if ( /^top-/.test(position) ) {
            offset.y = rect.top - self.height;
        }

        if ( /^bottom-/.test(position) ) {
            offset.y = rect.top + rect.height;
        }

        if ( /-start$/.test(position) ) {
            offset.x = rect.left;
        }

        if ( /-center$/.test(position) ) {
            offset.x = rect.left + (recto * 0.5);
        }

        if ( /-end$/.test(position) ) {
            offset.x = rect.left + recto;
        }

        let inverse = position;

        if ( /^top-/.test(position) ) {
            inverse = inverse.replace(/^top-/, 'bottom-');
        }

        if ( /^bottom-/.test(position) ) {
            inverse = inverse.replace(/^bottom-/, 'top-');
        }

        let win : any = {
            x: window.innerWidth, y: window.innerHeight
        };

        let broken = offset.y + self.height > win.y || offset.y < 0;

        if ( offset.y < 0 ) {
            broken = true;
        }

        const rebound = {
            ...options, offset
        };

        if ( broken && !options.offset ) {
            return this.popoverY(target, inverse, rebound);
        }

        if ( broken && options.offset ) {
            offset = options.offset;
        }

        if ( offset.y < 0 ) {
            offset.y = 0;
        }

        if ( offset.y + self.height > win.height ) {
            offset.y = win.height - self.height;
        }

        let result = this.popoverNormalize(...[
            offset, self, rect, win
        ]);

        if ( broken ) {
            position = 'auto';
        }

        return { ...result, position };
    }

    popoverX(target : any, position : string = 'left-center', options : any = {}) : any
    {
        target = Dom.find(target);

        let [rect, self] = [
            target.rect(), this.rect()
        ];

        if ( !options.height ) {
            // self.height = rect.height;
        }

        let [offset, recto] = [
            { x: 0, y: 0 }, rect.height - self.height
        ];

        if ( /^left-/.test(position) ) {
            offset.x = rect.left - self.width;
        }

        if ( /^right-/.test(position) ) {
            offset.x = rect.left + rect.width;
        }

        if ( /-start$/.test(position) ) {
            offset.y = rect.top;
        }

        if ( /-center/.test(position) ) {
            offset.y = rect.top + (recto * 0.5);
        }

        if ( /-end/.test(position) ) {
            offset.y = rect.top + recto;
        }

        let inverse = position;

        if ( /^left-/.test(position) ) {
            inverse = inverse.replace(/^left-/, 'right-');
        }

        if ( /^right-/.test(position) ) {
            inverse = inverse.replace(/^right-/, 'left-');
        }

        let win : any = {
            x: window.innerWidth, y: window.innerHeight
        };

        let broken = offset.y + self.height > win.y;

        if ( offset.y < 0 ) {
            broken = true;
        }

        const rebound = {
            ...options, offset
        };

        if ( broken && !options.offset ) {
            return this.popoverX(target, inverse, rebound);
        }

        if ( broken && options.offset ) {
            offset = options.offset;
        }

        let result = this.popoverNormalize(...[
            offset, self, rect, win
        ]);

        if ( broken ) {
            position = 'auto';
        }

        return { ...result, position };
    }

    popoverNormalize(offset : any, self : any, rect : any, win : any)
    {
        const scroll = Dom.find(document.body).scroll();

        if ( offset.y < 0 ) {
            offset.y = 0;
        }

        if ( offset.y + self.height > win.y ) {
            offset.y = win.y - self.height;
        }

        if ( offset.x < 0 ) {
            offset.x = 0;
        }

        const dw = document.body.clientWidth;

        if ( offset.x + self.width > win.x ) {
            offset.x = win.x - self.width - (win.x - dw);
        }

        offset = {
            x: offset.x + scroll.left, y: offset.y + scroll.top
        }

        Obj.each(offset, (v : any, k : any) => {
            offset[k] = Math.round(v);
        });

        offset.self = {
            width: self.width, height: self.height
        };

        offset.rect = {
            width: rect.width, height: rect.height
        };

        return offset;
    }

}

export default PicoDomPopover;