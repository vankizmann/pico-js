<p align="center"><img width="170" src="https://github.com/vankizmann/pico-js/blob/master/assets/pico-js-dark.svg?raw=true" alt="pico-ui"></p>

<p align="center">
  <a href="https://www.npmjs.org/package/@kizmann/pico-js">
    <img src="https://img.shields.io/npm/v/@kizmann/pico-js.svg">
  </a>
  <a href="https://npmcharts.com/compare/@kizmann/pico-js?minimal=true">
    <img src="http://img.shields.io/npm/dm/@kizmann/pico-js.svg">
  </a>
  <br>
</p>

<p align="center">A JS heleper library. <i>Docs following soon</i></p>

### Installation

```bash
npm install @kizmann/pico-js [or] yarn add @kizmann/pico-js
```

### Dependencies

This package is dependent of [moment](https://github.com/moment/moment) (*Right now its required but will be optional or ditched soon*).

### CDN Usage

```html
<script src="//unpkg.com/@kizmann/pico-js@latest/dist/pico-js.js"></script>
```

```js
pi.Dom.ready(function () {
    console.log('Yeah :clap:');
});
```

### Module Usage
```js
import { Dom } from "@kizmann/pico-js";
```

```js
Dom.ready(function () {
    console.log('Yeah :metal:');
});
```

### ES5/6 Precompile

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

### Visual Studio Code Autocomplete

When using VS Code with the ES5 fix from above you need to create or add to your existsing *jsconfig.json* this alias to enable correct autocomplete.

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