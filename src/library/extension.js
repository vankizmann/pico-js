import { Arr, Obj, Asset, Queue } from "../index";

export class Extension
{
    static imports = Obj.get(window, '_imports', {});

    static pending = [];

    static loaded = [];

    static aborted = [];


    static bind(name, config)
    {
        this.imports[name] = Obj.assign({
            scripts: [], styles: []
        }, config);
    }

    static get(name, done = null, error = null)
    {
        if ( this.imports[name] === undefined ) {
            return error ? error() : console.error('Import ' + name + ' not found.');
        }

        let queue = new Queue();

        Arr.each(this.imports[name].styles, (style) => {
            queue.add((next) => {

                if ( Arr.has(this.loaded, style) ) {
                    return next();
                }

                this.pending.push(style);

                let loaded = () => {
                    this.loaded.push(style); next();
                };

                let aborted = () => {
                    this.aborted.push(style); next();
                };

                Asset.style(style, loaded, aborted);
            });
        });

        Arr.each(this.imports[name].scripts, (script) => {
            queue.add((next) => {

                if ( Arr.has(this.loaded, script) ) {
                    return next();
                }

                this.pending.push(script);

                let loaded = () => {
                    this.loaded.push(script); next();
                };

                let aborted = () => {
                    this.aborted.push(script); next();
                };

                Asset.script(script, loaded, aborted);
            });
        });

        if ( typeof done === "function" ) {
            queue.add(done);
        }

        queue.run();
    };

}

export default Extension;
