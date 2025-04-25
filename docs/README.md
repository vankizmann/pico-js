
# Installation

```bash
npm install @kizmann/pico-js
```

<hr>

## Dependencies

This package is dependent of [moment](https://github.com/moment/moment) if you use `Now` and requires [Google Maps](https://developers.google.com/maps/documentation/javascript/overview) incase you use `Map`.

<hr>

## Global Usage

```html
<script src="//unpkg.com/@kizmann/pico-js@latest/dist/pico-js.js"></script>
```

```js
pi.Dom.ready(function () {
    console.log('Yeah :clap:');
});
```

<hr>

## Module Usage
```js
import { Dom } from "@kizmann/pico-js";
```

```js
Dom.ready(function () {
    console.log('Yeah :metal:');
});
```

<hr>

## ES5/6 Precompile

Incase you are not using the babel plugins (ES6) used in *babel.config.js* you will encounter errors while compiling. To prevent that its required to add an alias to your *webpack.config.js*.

#### webpack.config.js
```js
module.exports = {
    resolve: {
        alias: {
            '@kizmann/pico-js': '@kizmann/pico-js/dist/pico-js.js'
        }
    }
}
```

#### webpack.mix.js
```js
mix.webpackConfig({
    resolve: {
        alias: {
            '@kizmann/pico-js': '@kizmann/pico-js/dist/pico-js.js'
        }
    }
});
```

<hr>

## Visual Studio Code Autocomplete

When using VS Code with the ES5 fix from above, you need to create or add to your existing `jsconfig.json` this alias to enable correct autocomplete.

#### jsconfig.json
```json
{
  "compilerOptions": {
    "paths": {
      "@kizmann/pico-js": ["node_modules/@kizmann/pico-js/src/index.js"]
    }
  }
}
```