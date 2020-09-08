import { Arr, Obj, Any, Data, Event } from "../index";

export class Ajax
{
    static apis = {};

    static has(input)
    {
        return Arr.has(this.apis, Arr.first(input));
    }

    static bind(input, api)
    {
        Ajax.apis[Arr.first(input)] = api;

        return this;
    }

    static handler()
    {
        return window.axios || window.Vue.http;
    }

    static solve(input, vars = {}, options = {})
    {
        return Ajax.apis[Arr.first(input)](this.handler(), vars, options);
    }

    static call (input, store = false, vars = {}, options = {})
    {
        let call = (resolve, reject) => {
            return Ajax.solve(input, vars, options).then((res) => {

                if ( store === true ) {
                    Data.set(Arr.second(input), res.data);
                }

                Event.fire(Arr.first(input), vars);

                return resolve(res);
            }, reject);
        };

        return new Promise(call);
    }

    static form (obj)
    {
        let form = new FormData();

        let appendField = (values, keys = []) => {
            Obj.each(values, (value, index) => {

                let inner = Arr.merge([], keys, index);

                if ( Any.isPlain(value) ) {
                    return appendField(value, inner);
                }

                if ( Any.isArray(value) ) {
                    return appendField(value, inner);
                }

                let key = inner.splice(0, 1)[0];

                Arr.each(inner, (index) => {
                    key += '[' + index + ']';
                });

                if ( value !== null ) {
                    form.append(key, value);
                }
            });

            return form;
        };

        return appendField(obj);
    }

}

export default Ajax;
