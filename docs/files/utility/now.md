# Now Class

A utility class for date and time operations that wraps Moment.js.

```js
import { Now } from "@kizmann/pico-js";
```

<hr>

### Now.constructor
Creates a new Now instance wrapping a date.

```js
// new Now(date = null, format = 'YYYY-MM-DD HH:mm:ss')

const date = new Now('2023-01-01');
```

**Arguments:**  
date `Date|String|Now`: The date to wrap (default: current date).  
format `String`: Format string for parsing date strings.

**Returns:**  
`Now`: New Now instance.

<hr>

### Now.make
Creates a new Now instance (static factory method).

```js
// Now.make(date = null, format = 'YYYY-MM-DD HH:mm:ss')

Now.make('2023-01-01');
// => Now instance for January 1, 2023
```

**Arguments:**  
date `Date|String|Now`: The date to wrap (default: current date).  
format `String`: Format string for parsing date strings.

**Returns:**  
`Now`: New Now instance.

<hr>

### Now.get
Returns the internal Moment.js instance.

```js
// Now.prototype.get()

Now.make('2023-01-01').get();
// => Moment.js instance
```

**Returns:**  
`Object`: Moment.js instance.

<hr>

### Now.valid
Checks if the wrapped date is valid.

```js
// Now.prototype.valid()

Now.make('2023-01-01').valid();
// => true

Now.make('invalid-date').valid();
// => false
```

**Returns:**  
`boolean`: Whether the date is valid.

<hr>

### Now.clone
Creates a copy of the Now instance.

```js
// Now.prototype.clone()

const copy = Now.make('2023-01-01').clone();
```

**Returns:**  
`Now`: New Now instance with the same date.

<hr>

### Now.code
Gets the date as a numeric code.

```js
// Now.prototype.code(format = 'X')

Now.make('2023-01-01').code();
// => Unix timestamp (seconds since epoch)

Now.make('2023-01-01').code('YYYYMMDD');
// => 20230101
```

**Arguments:**  
format `String`: Format to use for the code.

**Returns:**  
`Number`: Date formatted as a number.

<hr>

### Now.format
Formats the date as a string.

```js
// Now.prototype.format(format = 'YYYY-MM-DD HH:mm:ss', force = false)

Now.make('2023-01-01').format();
// => '2023-01-01 00:00:00'

Now.make('2023-01-01').format('MM/DD/YYYY');
// => '01/01/2023'
```

**Arguments:**  
format `String`: Output format string.  
force `boolean`: Format even if the date is invalid.

**Returns:**  
`String`: Formatted date string.

<hr>

### Now.before
Checks if the date is before another date.

```js
// Now.prototype.before(before = null)

Now.make('2023-01-01').before('2023-01-02');
// => true
```

**Arguments:**  
before `Date|String|Now`: Date to compare with.

**Returns:**  
`boolean`: Whether this date is before the other date.

<hr>

### Now.beforeDate
Checks if the date part is before another date (ignoring time).

```js
// Now.prototype.beforeDate(before = null)

Now.make('2023-01-01 23:59:59').beforeDate('2023-01-02 00:00:00');
// => true
```

**Arguments:**  
before `Date|String|Now`: Date to compare with.

**Returns:**  
`boolean`: Whether this date is before the other date.

<hr>

### Now.beforeTime
Checks if the time part is before another time (ignoring date).

```js
// Now.prototype.beforeTime(before = null)

Now.make('2023-01-01 10:00:00').beforeTime('2023-01-01 11:00:00');
// => true
```

**Arguments:**  
before `Date|String|Now`: Time to compare with.

**Returns:**  
`boolean`: Whether this time is before the other time.

<hr>

### Now.after
Checks if the date is after another date.

```js
// Now.prototype.after(after = null)

Now.make('2023-01-02').after('2023-01-01');
// => true
```

**Arguments:**  
after `Date|String|Now`: Date to compare with.

**Returns:**  
`boolean`: Whether this date is after the other date.

<hr>

### Now.afterDate
Checks if the date part is after another date (ignoring time).

```js
// Now.prototype.afterDate(after = null)

Now.make('2023-01-02 00:00:00').afterDate('2023-01-01 23:59:59');
// => true
```

**Arguments:**  
after `Date|String|Now`: Date to compare with.

**Returns:**  
`boolean`: Whether this date is after the other date.

<hr>

### Now.afterTime
Checks if the time part is after another time (ignoring date).

```js
// Now.prototype.afterTime(after = null)

Now.make('2023-01-01 11:00:00').afterTime('2023-01-01 10:00:00');
// => true
```

**Arguments:**  
after `Date|String|Now`: Time to compare with.

**Returns:**  
`boolean`: Whether this time is after the other time.

<hr>

### Now.equal
Checks if the date is equal to another date.

```js
// Now.prototype.equal(equal = null, format = 'X')

Now.make('2023-01-01').equal('2023-01-01');
// => true
```

**Arguments:**  
equal `Date|String|Now`: Date to compare with.  
format `String`: Format to use for comparison.

**Returns:**  
`boolean`: Whether the dates are equal.

<hr>

### Now.equalDate
Checks if the date part is equal to another date (ignoring time).

```js
// Now.prototype.equalDate(equal = null, format = 'YYYYMMDD')

Now.make('2023-01-01 10:00:00').equalDate('2023-01-01 20:00:00');
// => true
```

**Arguments:**  
equal `Date|String|Now`: Date to compare with.  
format `String`: Format to use for comparison.

**Returns:**  
`boolean`: Whether the dates are equal.

<hr>

### Now.equalTime
Checks if the time part is equal to another time (ignoring date).

```js
// Now.prototype.equalTime(equal = null, format = 'HHmmss')

Now.make('2023-01-01 10:00:00').equalTime('2023-01-02 10:00:00');
// => true
```

**Arguments:**  
equal `Date|String|Now`: Time to compare with.  
format `String`: Format to use for comparison.

**Returns:**  
`boolean`: Whether the times are equal.

<hr>

### Now.between
Checks if the date is between two other dates.

```js
// Now.prototype.between(fromDate = null, toDate = null, format = 'YYYYMMDD')

Now.make('2023-01-02').between('2023-01-01', '2023-01-03');
// => true
```

**Arguments:**  
fromDate `Date|String|Now`: Start date.  
toDate `Date|String|Now`: End date.  
format `String`: Format to use for comparison.

**Returns:**  
`boolean`: Whether the date is between the given dates.

<hr>

### Now.decade
Gets the decade of the date.

```js
// Now.prototype.decade()

Now.make('2023-01-01').decade();
// => 2020
```

**Returns:**  
`Number`: Decade (e.g., 2020 for 2023).

<hr>

### Now.prevDecade
Gets a new instance with the previous decade.

```js
// Now.prototype.prevDecade()

Now.make('2023-01-01').prevDecade().year();
// => 2013
```

**Returns:**  
`Now`: New Now instance set to the previous decade.

<hr>

### Now.nextDecade
Gets a new instance with the next decade.

```js
// Now.prototype.nextDecade()

Now.make('2023-01-01').nextDecade().year();
// => 2033
```

**Returns:**  
`Now`: New Now instance set to the next decade.

<hr>

### Now.addDecades
Adds decades to the date.

```js
// Now.prototype.addDecades(count = 1)

Now.make('2023-01-01').addDecades(2).year();
// => 2043
```

**Arguments:**  
count `Number`: Number of decades to add.

**Returns:**  
`Now`: This instance with updated date.

<hr>

### Now.subDecades
Subtracts decades from the date.

```js
// Now.prototype.subDecades(count = 1)

Now.make('2023-01-01').subDecades(2).year();
// => 2003
```

**Arguments:**  
count `Number`: Number of decades to subtract.

**Returns:**  
`Now`: This instance with updated date.

<hr>

### Now.year
Gets or sets the year.

```js
// Now.prototype.year(year = null)

Now.make('2023-01-01').year();
// => 2023

Now.make('2023-01-01').year(2024).format('YYYY-MM-DD');
// => '2024-01-01'
```

**Arguments:**  
year `Number`: Year to set or null to get.

**Returns:**  
`Number|Now`: Current year or this instance with updated year.

<hr>

### Now.prevYear
Gets a new instance with the previous year.

```js
// Now.prototype.prevYear()

Now.make('2023-01-01').prevYear().format('YYYY-MM-DD');
// => '2022-01-01'
```

**Returns:**  
`Now`: New Now instance set to the previous year.

<hr>

### Now.nextYear
Gets a new instance with the next year.

```js
// Now.prototype.nextYear()

Now.make('2023-01-01').nextYear().format('YYYY-MM-DD');
// => '2024-01-01'
```

**Returns:**  
`Now`: New Now instance set to the next year.

<hr>

### Now.addYears
Adds years to the date.

```js
// Now.prototype.addYears(count = 1)

Now.make('2023-01-01').addYears(5).format('YYYY-MM-DD');
// => '2028-01-01'
```

**Arguments:**  
count `Number`: Number of years to add.

**Returns:**  
`Now`: This instance with updated date.

<hr>

### Now.subYears
Subtracts years from the date.

```js
// Now.prototype.subYears(count = 1)

Now.make('2023-01-01').subYears(3).format('YYYY-MM-DD');
// => '2020-01-01'
```

**Arguments:**  
count `Number`: Number of years to subtract.

**Returns:**  
`Now`: This instance with updated date.

<hr>

### Now.month
Gets or sets the month (0-11).

```js
// Now.prototype.month(month = null)

Now.make('2023-01-01').month();
// => 0 (January)

Now.make('2023-01-01').month(1).format('YYYY-MM-DD');
// => '2023-02-01'
```

**Arguments:**  
month `Number`: Month to set (0-11) or null to get.

**Returns:**  
`Number|Now`: Current month or this instance with updated month.

<hr>

### Now.addMonths
Adds months to the date.

```js
// Now.prototype.addMonths(count = 1)

Now.make('2023-01-01').addMonths(3).format('YYYY-MM-DD');
// => '2023-04-01'
```

**Arguments:**  
count `Number`: Number of months to add.

**Returns:**  
`Now`: This instance with updated date.

<hr>

### Now.subMonths
Subtracts months from the date.

```js
// Now.prototype.subMonths(count = 1)

Now.make('2023-03-01').subMonths(2).format('YYYY-MM-DD');
// => '2023-01-01'
```

**Arguments:**  
count `Number`: Number of months to subtract.

**Returns:**  
`Now`: This instance with updated date.

<hr>

### Now.prevMonth
Gets a new instance with the previous month.

```js
// Now.prototype.prevMonth()

Now.make('2023-02-01').prevMonth().format('YYYY-MM-DD');
// => '2023-01-01'
```

**Returns:**  
`Now`: New Now instance set to the previous month.

<hr>

### Now.nextMonth
Gets a new instance with the next month.

```js
// Now.prototype.nextMonth()

Now.make('2023-01-01').nextMonth().format('YYYY-MM-DD');
// => '2023-02-01'
```

**Returns:**  
`Now`: New Now instance set to the next month.

<hr>

### Now.date
Gets or sets the day of month.

```js
// Now.prototype.date(date = null)

Now.make('2023-01-01').date();
// => 1

Now.make('2023-01-01').date(15).format('YYYY-MM-DD');
// => '2023-01-15'
```

**Arguments:**  
date `Number`: Day of month to set or null to get.

**Returns:**  
`Number|Now`: Current day of month or this instance with updated day.

<hr>

### Now.addDates
Adds days to the date.

```js
// Now.prototype.addDates(count = 1)

Now.make('2023-01-01').addDates(5).format('YYYY-MM-DD');
// => '2023-01-06'
```

**Arguments:**  
count `Number`: Number of days to add.

**Returns:**  
`Now`: This instance with updated date.

<hr>

### Now.subDates
Subtracts days from the date.

```js
// Now.prototype.subDates(count = 1)

Now.make('2023-01-10').subDates(5).format('YYYY-MM-DD');
// => '2023-01-05'
```

**Arguments:**  
count `Number`: Number of days to subtract.

**Returns:**  
`Now`: This instance with updated date.

<hr>

### Now.prevDate
Gets a new instance with the previous day.

```js
// Now.prototype.prevDate()

Now.make('2023-01-02').prevDate().format('YYYY-MM-DD');
// => '2023-01-01'
```

**Returns:**  
`Now`: New Now instance set to the previous day.

<hr>

### Now.nextDate
Gets a new instance with the next day.

```js
// Now.prototype.nextDate()

Now.make('2023-01-01').nextDate().format('YYYY-MM-DD');
// => '2023-01-02'
```

**Returns:**  
`Now`: New Now instance set to the next day.

<hr>

### Now.lastDate
Gets the last day of the current month.

```js
// Now.prototype.lastDate()

Now.make('2023-01-15').lastDate();
// => 31
```

**Returns:**  
`Number`: Last day of the month.

<hr>

### Now.day
Gets or sets the day of week (0-6, 0 is Sunday).

```js
// Now.prototype.day(day = null)

Now.make('2023-01-01').day();
// => Day of week (0-6)

Now.make('2023-01-01').day(1).format('YYYY-MM-DD');
// => Sets to Monday
```

**Arguments:**  
day `Number`: Day of week to set (0-6) or null to get.

**Returns:**  
`Number|Now`: Current day of week or this instance with updated day.

<hr>

### Now.hour
Gets or sets the hour.

```js
// Now.prototype.hour(hour = null)

Now.make('2023-01-01 14:30:00').hour();
// => 14

Now.make('2023-01-01 14:30:00').hour(10).format('HH:mm:ss');
// => '10:30:00'
```

**Arguments:**  
hour `Number`: Hour to set or null to get.

**Returns:**  
`Number|Now`: Current hour or this instance with updated hour.

<hr>

### Now.addHour
Adds hours to the time.

```js
// Now.prototype.addHour(count = 1)

Now.make('2023-01-01 14:30:00').addHour(5).format('HH:mm:ss');
// => '19:30:00'
```

**Arguments:**  
count `Number`: Number of hours to add.

**Returns:**  
`Now`: This instance with updated time.

<hr>

### Now.subHour
Subtracts hours from the time.

```js
// Now.prototype.subHour(count = 1)

Now.make('2023-01-01 14:30:00').subHour(5).format('HH:mm:ss');
// => '09:30:00'
```

**Arguments:**  
count `Number`: Number of hours to subtract.

**Returns:**  
`Now`: This instance with updated time.

<hr>

### Now.prevHour
Gets a new instance with the previous hour.

```js
// Now.prototype.prevHour()

Now.make('2023-01-01 14:30:00').prevHour().format('HH:mm:ss');
// => '13:30:00'
```

**Returns:**  
`Now`: New Now instance set to the previous hour.

<hr>

### Now.nextHour
Gets a new instance with the next hour.

```js
// Now.prototype.nextHour()

Now.make('2023-01-01 14:30:00').nextHour().format('HH:mm:ss');
// => '15:30:00'
```

**Returns:**  
`Now`: New Now instance set to the next hour.

<hr>

### Now.minute
Gets or sets the minute.

```js
// Now.prototype.minute(minute = null)

Now.make('2023-01-01 14:30:00').minute();
// => 30

Now.make('2023-01-01 14:30:00').minute(45).format('HH:mm:ss');
// => '14:45:00'
```

**Arguments:**  
minute `Number`: Minute to set or null to get.

**Returns:**  
`Number|Now`: Current minute or this instance with updated minute.

<hr>

### Now.addMinute
Adds minutes to the time.

```js
// Now.prototype.addMinute(count = 1)

Now.make('2023-01-01 14:30:00').addMinute(15).format('HH:mm:ss');
// => '14:45:00'
```

**Arguments:**  
count `Number`: Number of minutes to add.

**Returns:**  
`Now`: This instance with updated time.

<hr>

### Now.subMinute
Subtracts minutes from the time.

```js
// Now.prototype.subMinute(count = 1)

Now.make('2023-01-01 14:30:00').subMinute(15).format('HH:mm:ss');
// => '14:15:00'
```

**Arguments:**  
count `Number`: Number of minutes to subtract.

**Returns:**  
`Now`: This instance with updated time.

<hr>

### Now.prevMinute
Gets a new instance with the previous minute.

```js
// Now.prototype.prevMinute()

Now.make('2023-01-01 14:30:00').prevMinute().format('HH:mm:ss');
// => '14:29:00'
```

**Returns:**  
`Now`: New Now instance set to the previous minute.

<hr>

### Now.nextMinute
Gets a new instance with the next minute.

```js
// Now.prototype.nextMinute()

Now.make('2023-01-01 14:30:00').nextMinute().format('HH:mm:ss');
// => '14:31:00'
```

**Returns:**  
`Now`: New Now instance set to the next minute.

<hr>

### Now.second
Gets or sets the second.

```js
// Now.prototype.second(second = null)

Now.make('2023-01-01 14:30:45').second();
// => 45

Now.make('2023-01-01 14:30:45').second(30).format('HH:mm:ss');
// => '14:30:30'
```

**Arguments:**  
second `Number`: Second to set or null to get.

**Returns:**  
`Number|Now`: Current second or this instance with updated second.

<hr>

### Now.addSecond
Adds seconds to the time.

```js
// Now.prototype.addSecond(count = 1)

Now.make('2023-01-01 14:30:45').addSecond(10).format('HH:mm:ss');
// => '14:30:55'
```

**Arguments:**  
count `Number`: Number of seconds to add.

**Returns:**  
`Now`: This instance with updated time.

<hr>

### Now.subSecond
Subtracts seconds from the time.

```js
// Now.prototype.subSecond(count = 1)

Now.make('2023-01-01 14:30:45').subSecond(15).format('HH:mm:ss');
// => '14:30:30'
```

**Arguments:**  
count `Number`: Number of seconds to subtract.

**Returns:**  
`Now`: This instance with updated time.

<hr>

### Now.prevSecond
Gets a new instance with the previous second.

```js
// Now.prototype.prevSecond()

Now.make('2023-01-01 14:30:45').prevSecond().format('HH:mm:ss');
// => '14:30:44'
```

**Returns:**  
`Now`: New Now instance set to the previous second.

<hr>

### Now.nextSecond
Gets a new instance with the next second.

```js
// Now.prototype.nextSecond()

Now.make('2023-01-01 14:30:45').nextSecond().format('HH:mm:ss');
// => '14:30:46'
```

**Returns:**  
`Now`: New Now instance set to the next second.

<hr>

### Now.humanDay
Gets the day of the week (0-6, 0 is Sunday).

```js
// Now.prototype.humanDay()

Now.make('2023-01-01').humanDay();
// => 0 (Sunday)
```

**Returns:**  
`Number`: Day of week (0-6).

<hr>

### Now.humanMonth
Gets the month (0-11, 0 is January).

```js
// Now.prototype.humanMonth()

Now.make('2023-01-01').humanMonth();
// => 0 (January)
```

**Returns:**  
`Number`: Month (0-11).

<hr>

### Now.getMonths
Gets an array of Now instances for all months in the year.

```js
// Now.prototype.getMonths()

Now.make('2023-01-01').getMonths();
// => Array of 12 Now instances (Jan-Dec)
```

**Returns:**  
`Array<Now>`: Array of Now instances for each month.

<hr>

### Now.getYears
Gets an array of Now instances for years in the current decade.

```js
// Now.prototype.getYears()

Now.make('2023-01-01').getYears();
// => Array of 10 Now instances (2020-2029)
```

**Returns:**  
`Array<Now>`: Array of Now instances for each year in the decade.

<hr>

### Now.getYearsGrid
Gets an array of Now instances for years in a grid.

```js
// Now.prototype.getYearsGrid(size = 12)

Now.make('2023-01-01').getYearsGrid(12);
// => Array of 12 Now instances (2016-2027)
```

**Arguments:**  
size `Number`: Number of years in the grid.

**Returns:**  
`Array<Now>`: Array of Now instances for each year in the grid.

<hr>

### Now.getDates
Gets an array of Now instances for all days in the month.

```js
// Now.prototype.getDates()

Now.make('2023-01-01').getDates();
// => Array of 31 Now instances (Jan 1-31)
```

**Returns:**  
`Array<Now>`: Array of Now instances for each day in the month.

<hr>

### Now.getDatesRange
Gets an array of Now instances between this date and the target date.

```js
// Now.prototype.getDatesRange(target = null)

Now.make('2023-01-01').getDatesRange('2023-01-05');
// => Array of Now instances (Jan 1-5)
```

**Arguments:**  
target `Date|String|Now`: End date for the range.

**Returns:**  
`Array<Now>`: Array of Now instances for each day in the range.

<hr>

### Now.getDatesGrid
Gets an array of Now instances for a calendar grid of the current month.

```js
// Now.prototype.getDatesGrid(start = 1, end = 0)

Now.make('2023-01-01').getDatesGrid();
// => Array of Now instances for calendar view
```

**Arguments:**  
start `Number`: First day of week (0-6).  
end `Number`: Last day of week (0-6).

**Returns:**  
`Array<Now>`: Array of Now instances for calendar grid.

<hr>

### Now.getHours
Gets an array of Now instances for hours of the day at specified intervals.

```js
// Now.prototype.getHours(interval = 1)

Now.make('2023-01-01').getHours(2);
// => Array of 12 Now instances (every 2 hours)
```

**Arguments:**  
interval `Number`: Hour interval.

**Returns:**  
`Array<Now>`: Array of Now instances for each hour interval.

<hr>

### Now.getMinutes
Gets an array of Now instances for minutes of the hour at specified intervals.

```js
// Now.prototype.getMinutes(interval = 1)

Now.make('2023-01-01 14:00').getMinutes(15);
// => Array of 4 Now instances (00, 15, 30, 45)
```

**Arguments:**  
interval `Number`: Minute interval.

**Returns:**  
`Array<Now>`: Array of Now instances for each minute interval.

<hr>

### Now.getSeconds
Gets an array of Now instances for seconds of the minute at specified intervals.

```js
// Now.prototype.getSeconds(interval = 1)

Now.make('2023-01-01 14:00:00').getSeconds(15);
// => Array of 4 Now instances (00, 15, 30, 45)
```

**Arguments:**  
interval `Number`: Second interval.

**Returns:**  
`Array<Now>`: Array of Now instances for each second interval.

<hr>

### Now.resetTime
Resets the time to 00:00:00.

```js
// Now.prototype.resetTime()

Now.make('2023-01-01 14:30:45').resetTime().format('HH:mm:ss');
// => '00:00:00'
```

**Returns:**  
`Now`: This instance with time reset to 00:00:00.

<hr>

### Now.applyDate
Applies the date part from another date.

```js
// Now.prototype.applyDate(now, format = 'YYYY-MM-DD HH:mm:ss')

Now.make('2023-01-01 14:30:00').applyDate('2024-02-15');
// => Takes date part from '2024-02-15'
```

**Arguments:**  
now `Date|String|Now`: Date to apply from.  
format `String`: Format for parsing date strings.

**Returns:**  
`Now`: This instance with updated date.

<hr>

### Now.applyTime
Applies the time part from another date.

```js
// Now.prototype.applyTime(now, format = 'YYYY-MM-DD HH:mm:ss')

Now.make('2023-01-01 14:30:00').applyTime('2023-01-01 18:45:30');
// => Takes time part from '18:45:30'
```

**Arguments:**  
now `Date|String|Now`: Date to apply from.  
format `String`: Format for parsing date strings.

**Returns:**  
`Now`: This instance with updated time.