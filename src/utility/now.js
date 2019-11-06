import { Num, Arr, Any } from "../index";

export class Now
{
    initial = null;
    timestamp = null;

    static _months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    static _days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    constructor(date = null)
    {
        this.initial = date;

        if ( Any.isEmpty(date) ) {
            date = new Date;
        }

        if ( Any.isString(date) ) {
            date = Now.datetime(date)
        }

        if ( date instanceof Now ) {
            date = date.get();
        }

        if ( date.getDate() !== date.getDate() ) {
            date = new Date;
        }

        this.timestamp = date;
    }

    static make(date = null)
    {
        return new Now(date);
    }

    static datetime(val)
    {
        let offset = 0, offsetMatch = val.match(/\s?(.*?)(\+|\-)([0-9]{2}):([0-9]{2})$/);

        if ( offsetMatch !== null ) {
            offset = (Num.int(eval(offsetMatch[2] + '1')) *
                Num.int(offsetMatch[3]) * 60) + Num.int(offsetMatch[4]);
        }

        val = val.replace(/\s?(\+|\-)([0-9]{2}):([0-9]{2})$/, '');

        if ( val.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/) ) {
            val = val.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2})(.*?)$/, '$1/$2/$3$4');
        }

        if ( val.match(/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})/) ) {
            val = val.replace(/^([0-9]{4})-([0-9]{2})-([0-9]{2})/, '$3/$2/$1');
        }

        if ( val.match(/(T|\s)([0-9]{2}):([0-9]{2}):([0-9]{2})$/) ) {
            val = val.replace(/(T|\s)([0-9]{2}):([0-9]{2}):([0-9]{2})$/, ' $2:$3:$4');
        }

        if ( val.match(/(T|\s)([0-9]{2}):([0-9]{2})($)/) ) {
            val = val.replace(/(T|\s)([0-9]{2}):([0-9]{2})($)/, ' $2:$3:00');
        }

        let date = new Date(val);

        if ( val.match(/^now/) ) {
            date = new Date;
        }

        date.setTime(date.getTime() + (offset * 60 * 1000));

        let days = val.match(/(\+|-)([0-9]+)days?/);

        if ( Any.isEmpty(days) === false ) {
            date.setDate(eval(eval('date.getDate() + days[1] + days[2]')));
        }

        let months = val.match(/(\+|-)([0-9]+)months?/);

        if ( Any.isEmpty(months) === false ) {
            date.setMonth(eval(eval('date.getMonth() + months[1] + months[2]')));
        }

        let years = val.match(/(\+|-)([0-9]+)years?/);

        if ( Any.isEmpty(years) === false ) {
            date.setFullYear(eval(eval('date.getMonth() + years[1] + years[2]')));
        }

        return date;
    }

    get()
    {
        return this.timestamp;
    }

    valid()
    {
        return Any.isEmpty(this.initial) === false &&
            this.timestamp.getTime() === this.timestamp.getTime();
    }

    clone()
    {
        return new Now(new Date(this.timestamp));
    }

    code(format = 'YYYYMMDDhhiiss')
    {
        return Num.int(this.format(format));
    }

    iso()
    {
        return new Date(this.timestamp.getTime() -
            (this.timestamp.getTimezoneOffset() * 60000));
    }

    format(format = 'YYYY-MM-DD hh:ii:ss')
    {
        if ( this.valid() === false ) {
            return '';
        }

        format = format.replace(/YYYY/g,
            this.iso().toJSON().substr(0, 4));

        format = format.replace(/YY/g,
            this.iso().toJSON().substr(2, 2));

        format = format.replace(/MM/g,
            this.iso().toJSON().substr(5, 2));

        format = format.replace(/DD/g,
            this.iso().toJSON().substr(8, 2));

        format = format.replace(/hh/g,
            this.iso().toJSON().substr(11, 2));

        format = format.replace(/ii/g,
            this.iso().toJSON().substr(14, 2));

        format = format.replace(/ss/g,
            this.iso().toJSON().substr(17, 2));

        return format;
    }

    before(before = null)
    {
        return this.code() < Now.make(before).code();
    }

    beforeDate(before = null)
    {
        return this.code('YYYYMMDD') <
            Now.make(before).code('YYYYMMDD');
    }

    beforeTime(before = null)
    {
        return this.code('hhiiss') <
            Now.make(before).code('hhiiss');
    }

    after(after = null)
    {
        return this.code() > Now.make(after).code();
    }

    afterDate(after = null)
    {
        return this.code('YYYYMMDD') >
            Now.make(after).code('YYYYMMDD');
    }

    afterTime(after = null)
    {
        return this.code('hhiiss') >
            Now.make(after).code('hhiiss');
    }

    equal(equal = null, format = 'YYYYMMDDhhiiss')
    {
        return this.code(format) ===
            Now.make(equal).code(format);
    }

    equalDate(equal = null, format = 'YYYYMMDD')
    {
        return this.equal(equal, format);
    }

    equalTime(equal = null, format = 'hhiiss')
    {
        return this.equal(equal, format);
    }

    between(fromDate = null, toDate = null, format = 'YYYYMMDD')
    {
        if ( Now.make(toDate).code(format) < Now.make(fromDate).code(format) ) {
            return this.after(toDate, format) && this.before(fromDate, format) &&
                ! this.equal(toDate, format) && ! this.equal(fromDate, format);
        }

        return this.after(fromDate, format) && this.before(toDate, format) &&
            ! this.equal(toDate, format) && ! this.equal(fromDate, format);
    }

    humanDay()
    {
        return Now._days[this.day()];
    }

    humanMonth()
    {
        return Now._months[this.month()];
    }

    decade()
    {
        return Math.floor(this.year() / 10) * 10;
    }

    prevDecade()
    {
        return this.clone().subDecades(1);
    }

    nextDecade()
    {
        return this.clone().addDecades(1);
    }

    addDecades(count = 1)
    {
        return this.setYear(this.year() + (count * 10));
    }

    subDecades(count = 1)
    {
        return this.setYear(this.year() - (count * 10));
    }

    year()
    {
        return this.timestamp.getFullYear();
    }

    setYear(year)
    {
        this.timestamp.setFullYear(year);

        return this;
    }

    prevYear()
    {
        return this.clone().setYear(this.year() - 1);
    }

    nextYear()
    {
        return this.clone().setYear(this.year() + 1);
    }

    addYears(count = 1)
    {
        return this.setYear(this.year() + count);
    }

    subYears(count = 1)
    {
        return this.setYear(this.year() - count);
    }

    month()
    {
        return this.timestamp.getMonth() + 1;
    }

    setMonth(month)
    {
        this.timestamp.setMonth(month - 1);

        return this;
    }

    addMonths(count = 1)
    {
        return this.setMonth(this.month() + count);
    }

    subMonths(count = 1)
    {
        return this.setMonth(this.month() - count);
    }

    prevMonth()
    {
        return this.clone().setMonth(this.month() - 1);
    }

    nextMonth()
    {
        return this.clone().setMonth(this.month() + 1);
    }

    date()
    {
          return this.timestamp.getDate();
    }

    setDate(date)
    {
        this.timestamp.setDate(date);

        return this;
    }

    addDates(count = 1)
    {
        return this.setDate(this.date() + count);
    }

    subDates(count = 1)
    {
        return this.setDate(this.date() - count);
    }

    prevDate()
    {
        return this.clone().setDate(this.date() - 1);
    }

    nextDate()
    {
        return this.clone().setDate(this.date() + 1);
    }

    day()
    {
        return this.timestamp.getDay();
    }

    lastDate()
    {
        return this.prevMonth().setDate(0).date();
    }

    hours()
    {
        return this.timestamp.getHours();
    }

    setHours(hours)
    {
        this.timestamp.setHours(hours);

        return this;
    }

    addHours(count = 1)
    {
        return this.setHours(this.hours() + count);
    }

    subHours(count = 1)
    {
        return this.setHours(this.hours() - count);
    }

    prevHours(count = 1)
    {
        return this.clone().subHours(count);
    }

    nextHours(count = 1)
    {
        return this.clone().addHours(count);
    }

    minutes()
    {
        return this.timestamp.getMinutes();
    }

    setMinutes(minutes)
    {
        this.timestamp.setMinutes(minutes);

        return this;
    }

    addMinutes(count = 1)
    {
        return this.setMinutes(this.minutes() + count);
    }

    subMinutes(count = 1)
    {
        return this.setMinutes(this.minutes() - count);
    }

    prevMinutes(count = 1)
    {
        return this.clone().subMinutes(count);
    }

    nextMinutes(count = 1)
    {
        return this.clone().addMinutes(count);
    }

    seconds()
    {
        return this.timestamp.getSeconds();
    }

    setSeconds(seconds)
    {
        this.timestamp.setSeconds(seconds);

        return this;
    }

    addSeconds(count = 1)
    {
        return this.setSeconds(this.seconds() + count);
    }

    subSeconds(count = 1)
    {
        return this.setSeconds(this.seconds() - count);
    }

    prevSeconds(count = 1)
    {
        return this.clone().subSeconds(count);
    }

    nextSeconds(count = 1)
    {
        return this.clone().addSeconds(count);
    }

    getMonths()
    {
        return Arr.make(12).map((month) => {
            return this.clone().setMonth(month);
        });
    }

    getYears()
    {
        return Arr.make(10).map((year) => {
            return this.clone().setYear(this.decade() + year - 1);
        });
    }

    getYearsGrid(size = 12)
    {
        return Arr.make(size).map((year) => {
            return this.clone().setYear((Math.floor(this.year() / size)
                * size) + year - 1);
        });
    }

    getDates()
    {
        return Arr.make(this.lastDate()).map((date) => {
            return this.clone().setDate(date);
        });
    }

    getDatesRange(target = null)
    {
        let range = [], targetNow = Now.make(target);

        if ( this.afterDate(target) ) {

            for (let day = targetNow; ! day.equalDate(this); day = day.nextDate()) {
                Arr.push(range, day);
            }

            Arr.push(range, this);
        }

        if ( this.beforeDate(target) ) {

            for (let day = this; ! day.equalDate(targetNow); day = day.nextDate()) {
                Arr.push(range, day);
            }

            Arr.push(range, targetNow);
        }

        if ( range.length === 0 ) {
            range = [this];
        }

        return range;
    }

    getDatesGrid(start = 1, end = 0)
    {
        let dates = this.getDates(), before = [], after = [];

        let prev = Arr.first(dates);

        for (let day = prev.day(); prev.day() !== start; day = prev.day()) {
            Arr.prepend(before, prev = prev.prevDate());
        }

        let next = Arr.last(dates);

        for (let day = next.day(); next.day() !== end; day = next.day()) {
            Arr.append(after, next = next.nextDate());
        }

        return Arr.merge(before, dates, after);
    }

    getHours(interval = 1)
    {
        return Arr.make(24 / interval).map((val, hour) => {
            return this.clone().setHours(hour * interval);
        });
    }

    getMinutes(interval = 1)
    {
        return Arr.make(60 / interval).map((val, minute) => {
            return this.clone().setMinutes(minute * interval);
        });
    }

    getSeconds(interval = 1)
    {
        return Arr.make(60 / interval).map((val, second) => {
            return this.clone().setSeconds(second * interval);
        });
    }

}

export default Now;
