import { Any, Arr, Obj } from "../index"

export class Num
{
    static int(num)
    {
        return !Any.isString(num) ? parseInt(num) :
            parseInt(num.replace('px', ''));
    }

    static float(num)
    {
        return !Any.isString(num) ? parseFloat(num) :
            parseFloat(num.replace('px', ''));
    }

    static ceil(num)
    {
        return Math.ceil(num);
    }

    static round(num)
    {
        return Math.round(num);
    }

    static floor(num)
    {
        return Math.floor(num);
    }

    static fixed(num, fixed = 2)
    {
        return this.float(num).toFixed(fixed);
    }

    static random(start = 0, end = 100)
    {
        return Math.floor((Math.random() * (end + 1)) + start);
    }

    static matrix(num, limit = 10, base = [])
    {
        let value = 0;

        for ( let i = 20; i >= 0; i -- ) {
            if ( num >= (value = Math.pow(2, i)) ) {
                base.push(value);
                num -= value;
            }
        }

        return base;
    }

    static combine(arr)
    {
        return Arr.reduce(arr, (acc, val) => acc + val, 0);
    }

    static distance(cord1, cord2, miles = false)
    {
        let defaultCord = {
            lat: 0, lng: 0
        };

        cord1 = Obj.assign({}, defaultCord, cord1);
        cord2 = Obj.assign({}, defaultCord, cord2);

        let radlat1 = (Math.PI * this.float(cord1.lat)) / 180;
        let radlat2 = (Math.PI * this.float(cord2.lat)) / 180;

        let theta = this.float(cord1.lng) - this.float(cord2.lng);
        let radtheta = (Math.PI * theta) / 180;

        let dist = Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

        if ( dist > 1 ) {
            dist = 1;
        }

        dist = (Math.acos(dist) * 180) / Math.PI * 60 * 1.1515;

        if ( !miles ) {
            dist = dist * 1.609344;
        }

        return dist;
    }

    static format(num, decimal = '.', thousand = ',', fixed = null)
    {
        if ( num === null ) {
            return null;
        }

        let value = num.toString();

        if ( fixed !== null && fixed !== - 1 ) {
            value = num.toFixed(fixed);
        }

        let totals = value.replace(/\.[0-9]+$/, ''),
            minals = value.replace(/^[0-9\-]+\./, '');

        let splits = Arr.reduce(totals.split('').reverse(), (result, val, key) => {

            let index = Math.floor(key / 3);

            result[index] = index === key / 3 ?
                val : result[index] = val + result[index];

            return result;
        }, []);

        let result = splits.reverse().join(thousand);

        if ( fixed !== - 1 && fixed !== 0 && value.match(/\./) ) {
            result += decimal + minals;
        }

        return result;
    }
}

export default Num;
