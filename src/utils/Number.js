import { Mix, Num, Arr, Hash, Str, Obj } from "#src/index.esm.js";

export class PicoNumber
{

    static fixed(value, decimals = 2)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return value.toFixed(decimals);
    }

    static float(value)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return parseFloat(value);
    }

    static int(value)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return parseInt(value);
    }

    static ceil(value)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return Math.ceil(value);
    }

    static floor(value)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return Math.floor(value);
    }

    static round(value)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return Math.round(value);
    }

    static combine(value)
    {
        return Arr.reduce(value, (acc, val) => acc + val, 0);
    }

    static subtract(value)
    {
        return Arr.reduce(value, (acc, val) => acc - val, 0);
    }

    static decade(value)
    {
        if ( ! Mix.isNum(value) ) {
            value = Mix.num(value);
        }

        return Math.floor(value / 10) * 10;
    }

    static matrix(num, limit = 10, base = [])
    {
        let value = 0;

        for ( let i = 20; i >= 0; i -- ) {
            if ( num >= (value = Math.pow(2, i)) ) {
                (base.push(value), num -= value);
            }
        }

        return base;
    }

    static distance(cord1, cord2, miles = false)
    {
        let cord = { lat: 0, lng: 0 };

        [cord1, cord2] = [
            { ...cord, ...cord1 }, { ...cord, ...cord2 }
        ];

        let radlat1 = (Math.PI * this.float(cord1.lat)) / 180;
        let radlat2 = (Math.PI * this.float(cord2.lat)) / 180;

        let theta = this.float(cord1.lng) - this.float(cord2.lng);
        let radtheta = (theta) / 180;

        let dist = this.combine([
            Math.sin(radlat1) * Math.sin(radlat2),
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        ]);

        dist = (Math.acos(dist > 1 ? 1 : dist) * 180) /
            Math.PI * 60 * 1.1515;

        return miles ? dist * 1.609344 : dist;
    }

}

PicoNumber.format = (value, ...args) => {
    console.warn('Num.format() is deprecated, use Str.number() instead.');
    return Str.number(value, args[2] || null);
};

PicoNumber.random = (...args) => {
    console.warn('Num.random() is deprecated, use Hash.number() instead.');
    return Hash.number(...args);
};

export default PicoNumber;