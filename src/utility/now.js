import { Num, Arr, Any } from "../index";
import * as moment from 'moment';

export class Now
{
    initialDate = null;
    moment = null;

    constructor(date = null)
    {
        this.initialDate = date;

        if ( date instanceof Now ) {
            date = date.get().toDate();
        }

        if ( ! Any.isString(date) ) {
            this.moment = moment(date);
        }

        if ( this.moment !== null ) {
            return this;
        }

        this.moment = moment(date.match(/^now/) ?
            new Date : date);

        let day = this.initialDate.match(/(\+|-)([0-9]+)days?/);

        if ( Any.isEmpty(day) === false && day[1] === '+' ) {
            this.moment.add(day[2], 'day');
        }

        if ( Any.isEmpty(day) === false && day[1] === '-' ) {
            this.moment.subtract(day[2], 'day');
        }

        let month = this.initialDate.match(/(\+|-)([0-9]+)months?/);

        if ( Any.isEmpty(month) === false && month[1] === '+' ) {
            this.moment.add(month[2], 'month');
        }

        if ( Any.isEmpty(month) === false && month[1] === '-' ) {
            this.moment.subtract(month[2], 'month');
        }

        let year = this.initialDate.match(/(\+|-)([0-9]+)years?/);

        if ( Any.isEmpty(year) === false && year[1] === '+' ) {
            this.moment.add(year[2], 'year');
        }

        if ( Any.isEmpty(year) === false && year[1] === '-' ) {
            this.moment.subtract(year[2], 'year');
        }

        return this;
    }

    static make(date = null)
    {
        return new Now(date);
    }

    get()
    {
        return this.moment;
    }

    valid()
    {
        return ! Any.isEmpty(this.initialDate) &&
            this.moment.isValid();
    }

    clone()
    {
        return new Now(this.moment.toDate());
    }

    code(format = 'X')
    {
        return Num.int(this.format(format));
    }

    format(format = 'YYYY-MM-DD hh:mm:ss')
    {
        if ( ! this.valid() ) {
            return '';
        }

        return this.moment.format(format);
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
        return this.code('hhmmss') <
            Now.make(before).code('hhmmss');
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
        return this.code('hhmmss') >
            Now.make(after).code('hhmmss');
    }

    equal(equal = null, format = 'X')
    {
        return this.code(format) ===
            Now.make(equal).code(format);
    }

    equalDate(equal = null, format = 'YYYYMMDD')
    {
        return this.equal(equal, format);
    }

    equalTime(equal = null, format = 'hhmmss')
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
        return this.year(this.moment.year() + (count * 10));
    }

    subDecades(count = 1)
    {
        return this.year(this.moment.year() - (count * 10));
    }

    year(year = null)
    {
        if ( year === null ) {
            return this.moment.year();
        }

        this.moment.year(year);

        return this;
    }

    prevYear()
    {
        return this.clone().year(this.year() - 1);
    }

    nextYear()
    {
        return this.clone().year(this.year() + 1);
    }

    addYears(count = 1)
    {
        return this.year(this.year() + count);
    }

    subYears(count = 1)
    {
        return this.year(this.year() - count);
    }

    month(month = null)
    {
        if ( month === null ) {
            return this.moment.month();
        }

        this.moment.month(month);

        return this;
    }

    addMonths(count = 1)
    {
        return this.month(this.month() + count);
    }

    subMonths(count = 1)
    {
        return this.month(this.month() - count);
    }

    prevMonth()
    {
        return this.clone().month(this.month() - 1);
    }

    nextMonth()
    {
        return this.clone().month(this.month() + 1);
    }

    date(date = null)
    {
        if ( date === null ) {
            return this.moment.date();
        }

        this.moment.date(date);

        return this;
    }

    addDates(count = 1)
    {
        return this.date(this.date() + count);
    }

    subDates(count = 1)
    {
        return this.date(this.date() - count);
    }

    prevDate()
    {
        return this.clone().date(this.date() - 1);
    }

    nextDate()
    {
        return this.clone().date(this.date() + 1);
    }

    lastDate()
    {
        return this.prevMonth().date(0).date();
    }

    day(day = null)
    {
        if ( day === null ) {
            return this.moment.day();
        }

        this.moment.day(day);

        return this;
    }

    hour(hour = null)
    {
        if ( hour === null ) {
            return this.moment.hour();
        }

        this.moment.hour(hour);

        return this;
    }

    addHour(count = 1)
    {
        return this.hour(this.hour() + count);
    }

    subHour(count = 1)
    {
        return this.hour(this.hour() - count);
    }

    prevHour()
    {
        return this.clone().hour(this.hour() - 1);
    }

    nextHour()
    {
        return this.clone().hour(this.hour() + 1);
    }

    minute(minute = null)
    {
        if ( minute === null ) {
            return this.moment.minute();
        }

        this.moment.minute(minute);

        return this;
    }

    addMinute(count = 1)
    {
        return this.minute(this.minute() + count);
    }

    subMinute(count = 1)
    {
        return this.minute(this.minute() - count);
    }

    prevMinute()
    {
        return this.clone().minute(this.minute() - 1);
    }

    nextMinute()
    {
        return this.clone().minute(this.minute() + 1);
    }

    second(second = null)
    {
        if ( second === null ) {
            return this.moment.second();
        }

        this.moment.second(second);

        return this;
    }

    addSecond(count = 1)
    {
        return this.second(this.second() + count);
    }

    subSecond(count = 1)
    {
        return this.second(this.second() - count);
    }

    prevSecond()
    {
        return this.clone().second(this.second() - 1);
    }

    nextSecond()
    {
        return this.clone().second(this.second() + 1);
    }

    humanDay()
    {
        return this.day();
    }

    humanMonth()
    {
        return this.month();
    }

    getMonths()
    {
        return Arr.make(12).map((month) => {
            return this.clone().month(month - 1);
        });
    }

    getYears()
    {
        return Arr.make(10).map((year) => {
            return this.clone().year(this.decade() + year - 1);
        });
    }

    getYearsGrid(size = 12)
    {
        return Arr.make(size).map((year) => {
            return this.clone().year((Math.floor(this.year() / size)
                * size) + year - 1);
        });
    }

    getDates()
    {
        return Arr.make(this.lastDate()).map((date) => {
            return this.clone().date(date);
        });
    }

    getDatesRange(target = null)
    {
        let range = [], targetNow = Now.make(target);

        if ( this.afterDate(target) ) {

            for ( let day = targetNow; ! day.equalDate(this); day = day.nextDate() ) {
                Arr.push(range, day);
            }

            Arr.push(range, this);
        }

        if ( this.beforeDate(target) ) {

            for ( let day = this; ! day.equalDate(targetNow); day = day.nextDate() ) {
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
            return this.clone().hour(hour * interval);
        });
    }

    getMinutes(interval = 1)
    {
        return Arr.make(60 / interval).map((val, minute) => {
            return this.clone().minute(minute * interval);
        });
    }

    getSeconds(interval = 1)
    {
        return Arr.make(60 / interval).map((val, second) => {
            return this.clone().second(second * interval);
        });
    }

}

export default Now;
