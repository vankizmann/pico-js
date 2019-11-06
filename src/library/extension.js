import { Arr, Obj, Asset, Queue } from "../index";

export class Extension
{
    static imports = Obj.get(window, '_imports', {});

    static exports = {};

    static pending = [];

    static loaded = [];

    static aborted = [];


    static bind (name, config)
    {
        this.imports[name] = Obj.assign({
            scripts: [], styles: [], modules: []
        }, config);
    }

    static load (name, load = undefined, error = undefined)
    {
        let reload = () => {
            this.load(name, load, error);
        };

        if ( ! Obj.has(this.imports, name) ) {
            return error ? error() : error;
        }

        if ( Obj.has(this.loaded, name) ) {
            return load ? load() : load;
        }

        if ( Obj.has(this.aborted, name) ) {
            return error ? error() : error;
        }

        if ( Obj.has(this.pending, name) ) {
            return setTimeout(reload, 100);
        }

        let queue = new Queue();

        queue.add((next) => {
            this.pending.push(name);
            next();
        });

        Arr.each(this.imports[name].styles, (style) => {
            queue.add((next) => Asset.style(style, next, error));
        });

        Arr.each(this.imports[name].scripts, (script) => {
            queue.add((next) => Asset.script(script, next, error));
        });

        queue.add((next) => {
            this.pending = Arr.diff(this.pending, name);
            next();
        });

        queue.add((next) => {
            this.loaded.push(name);
            next();
        });

        queue.add(load).run();
    };

    static export (name, data)
    {
        return this.exports[name] = data;
    }

    static import (name, load = null, error = null)
    {
        if ( this.exports[name] !== undefined ) {
            return load ? load(this.exports[name]) : load;
        }

        let index = Obj.findIndex(this.imports, (item) => {
            return Arr.intersect(item.modules, [name]).length !== 0;
        });

        if ( index === undefined ) {
            return error ? error() : console.error('Import ' + name + ' not found.');
        }

        if ( this.loaded[index] !== undefined ) {
            return load ? load(this.exports[name]) : load;
        }

        this.load(index, () => load(this.exports[name]), error);
    };

}

export default Extension;
