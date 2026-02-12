import { Mix, Now, Obj } from "#src/index.esm.js";

/**
 * @memberof PicoNow
 * @extends {PicoNow}
 */
export class PicoNowMatchInstance
{

    before(value = null, format = 'x')
    {
        return this.code(format) < Now.make(value).code(format);
    }

    beforeDate(value = null, format = 'YYYYMMDD')
    {
        return this.before(value, format);
    }

    beforeTime(value = null, format = 'HHmmss')
    {
        return this.before(value, format);
    }

    after(value = null, format = 'x')
    {
        return this.code(format) > Now.make(value).code(format);
    }

    afterDate(value = null, format = 'YYYYMMDD')
    {
        return this.after(value, format);
    }

    afterTime(value = null, format = 'HHmmss')
    {
        return this.after(value, format);
    }

    equal(value = null, format = 'x')
    {
        if ( ! (value instanceof Now) ) {
            value = Now.make(value);
        }

        return this.code(format) === value.clone().code(format);
    }

    equalDate(value = null, format = 'YYYYMMDD')
    {
        return this.equal(value, format);
    }

    equalTime(value = null, format = 'HHmmss')
    {
        return this.equal(value, format);
    }

    between(start = null, end = null, format = 'YYYYMMDD')
    {
        let dates = [
            Now.make(start), Now.make(end)
        ];

        if ( dates[0].after(dates[1], format) ) {
            dates = dates.reverse();
        }

        return this.after(dates[0], format) && this.before(dates[1], format);
    }

}

export const PicoNowMatchPlugin = function () {

    Obj.each(Mix.proto(PicoNowMatchInstance), (fn, id) => {
        this.prototype[id] = fn;
    });

    return this;
}