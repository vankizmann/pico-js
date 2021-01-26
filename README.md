<p align="center"><img width="170" src="https://github.com/vankizmann/pico-js/blob/master/pico.svg?raw=true" alt="pico-ui"></p>

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

### Included utilities

- [pi.Arr](#coming-soon)
- [pi.Obj](#coming-soon)
- [pi.Str](#coming-soon)
- [pi.Num](#coming-soon)
- [pi.Any](#coming-soon)
- [pi.Dom](#coming-soon)
- [pi.Now](#coming-soon)<br>Requires moment

### Included libraries

- [pi.Cookie](#coming-soon)
- [pi.Data](#coming-soon)
- [pi.Element](#coming-soon)
- [pi.Event](#coming-soon)
- [pi.Locale](#coming-soon)
- [pi.Map](#coming-soon)
- [pi.Queue](#coming-soon)
- [pi.Route](#coming-soon)

### Autocomplete

Incase you are not using the babel plugins used in *babel.config.js* you will get errors when compiling with webpack. To counter that you need to add an alias to your *webpack.config.js*.

#### webpack.config.js
```js
module.exports = {
    resolve: {
        alias: {
            '@kizmann/pico-js': '@kizmann/pico-js/dist/pico-js.esm.js'
        }
    }
}
```

#### webpack.mix.js
```js
mix.webpackConfig({
    resolve: {
        alias: {
            '@kizmann/pico-js': '@kizmann/pico-js/dist/pico-js.esm.js'
        }
    }
});
```

### Visual Studio Code Autocomplete

Incase you are using the fix above and VS Code you need to create or add to your existsing *jsconfig.json* this alias.

#### jsconfig.json
```json
{
  "compilerOptions": {
    "paths": {
      "@kizmann/pico-js": ["node_modules/@kizmann/pico-js/src/index.js"],
    }
  }
}
```