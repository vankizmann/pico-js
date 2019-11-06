import { Obj, Dom } from "../index";

export class Phone
{
    el = null;

    options = {
        format: '<a href="tel:{phone}">{phone}</a>',
        pseudoName: 'js__pseudo'
    };

    constructor(el, options)
    {
        this.el = el;
        this.options = Obj.assign({}, this.options, options);
    }

    bind()
    {
        Dom.find(this.el).each((el) => this.bindReplace(el));
    }

    bindReplace(el)
    {
        if ( Dom.find(el).is('script') || Dom.find(el).is('style') || el.nodeType !== 3  ) {

            // Return if inside script or style or not text element
            return Dom.find(el).childs(null, false).each((el) => this.bindReplace(el));
        }

        /**
         * Regex pattern
         */
        let regex = RegExp('(?<!([0-9"]|<.*?>.*))((\\+[0-9]{1,2}(\\s?\\(0\\))?)?\\s?(\\(?[0-9]{2,}\\)?\\s?(-\\s?)?)+(\\s?-\\s?[0-9]+)?)(?!([0-9"]|.*<\\/.*?>))', 'g');

        /**
         * Match storage
         */
        let matches = [];

        /**
         * Match callback
         */
        let callback = (phone) => {

            // Count phone without special chars
            let count = phone.replace(/[\s\\+\-()]/g, '').length;

            // Return if inside a link
            if ( Dom.find(el.parentNode).inside('a') === true ) {
                return phone;
            }

            // Return if beginns with +49 and count under 7
            if ( phone.match(/^\+49}/) !== null && count < 7 ) {
                return phone;
            }

            // Return if beginns not with +49 and count under 6
            if ( phone.match(/^\+49}/) === null && count < 6 ) {
                return phone;
            }

            // Add match
            matches.push(phone);

            return this.options.format.replace(/{phone}/g, phone);
        };

        let clone = Dom.make('span'), html = el.textContent.replace(regex, callback);

        if ( matches.length === 0 ) {
            return;
        }

        // Add pseudo name as class
        clone.class(this.options.pseudoName);

        // Add pseudo html
        clone.html(html);

        // Replace element
        Dom.find(el).replace(clone.get(0));
    }

}

export default Phone;
