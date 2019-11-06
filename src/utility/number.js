import { Any, Arr } from "../index"

export class Num
{
    static int(num)
    {
        return ! Any.isString(num) ? parseInt(num) :
            parseInt(num.replace('px', ''));
    }

    static float(num)
    {
        return ! Any.isString(num) ? parseFloat(num) :
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

    static matrix(num, limit = 10, base = [])
    {
        let value = 0;

        for ( let i = 20; i >= 0; i-- ) {
            if ( num >= (value = Math.pow(2, i)) ) {
                base.push(value); num -= value;
            }
        }

        return base;
    }

    static combine(arr)
    {
        return Arr.reduce(arr, (acc, val) => acc + val, 0);
    }

    static format(num, decimal = '.', thousand = ',', fixed = null)
    {
        let value = num.toString();

        if ( fixed !== null && fixed !== -1 ) {
            value = num.toFixed(fixed);
        }

        let totals = value.replace(/\.[0-9]+$/, ''),
            minals = value.replace(/^[0-9]+\./, '');

        let splits = Arr.reduce(totals.split('').reverse(), (result, val, key) => {

            let index = Math.floor(key / 3);

            result[index] = index === key / 3 ?
                val : result[index] = val + result[index];

            return result;
        }, []);

        let result = splits.reverse().join(thousand);

        if ( fixed !== -1 && fixed !== 0 && value.match(/\./) ) {
            result += decimal + minals;
        }

        return result;
    }
}

export default Num;
