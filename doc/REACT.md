- once `make install` is finished you should run
```shell
php bin/console c:e -e dev
```
in the project folder you'll need to set up stimulus bridge in order to load js controllers by doing
```shell
composer recipes:update symfony/webpack-encore-bundle
```
> hint: or remove the reference in `symfony.lock` in order to replay sf recipe from the beginning
- `package.json` should look like this :
```json
{
    "devDependencies": {
        "@babel/core": "^7.17.0",
        "@babel/plugin-transform-react-jsx": "^7.22.15",
        "@babel/preset-env": "^7.16.0",
        "@babel/preset-react": "^7.22.15",
        "@hotwired/stimulus": "^3.0.0",
        "@sylius-ui/frontend": "^1.0",
        "@symfony/stimulus-bridge": "^3.2.0",
        "@symfony/ux-react": "file:vendor/symfony/ux-react/assets",
        "@symfony/webpack-encore": "^4.0.0",
        "@synolia/sylius-maintenance-plugin": "file:vendor/synolia/sylius-maintenance-plugin/assets",
        "core-js": "^3.23.0",
        "react": "^18.0",
        "react-dom": "^18.0",
        "regenerator-runtime": "^0.13.9",
        "webpack": "^5.74.0",
        "webpack-cli": "^4.10.0",
        "webpack-notifier": "^1.15.0"
    },
    "scripts": {
        "build": "encore dev",
        "build:prod": "encore production",
        "postinstall": "semantic-ui-css-patch",
        "lint": "yarn lint:js",
        "watch": "encore dev --watch"
    }
}
```
- leave `config/packages/webpack_encore.yaml` as-it-is :
```yaml
webpack_encore:
    output_path: '%kernel.project_dir%/public/build/default'
    builds:
        admin: '%kernel.project_dir%/public/build/admin'
        shop: '%kernel.project_dir%/public/build/shop'
        app.admin: '%kernel.project_dir%/public/build/app/admin'
        app.shop: '%kernel.project_dir%/public/build/app/shop'
```
___
- once files are generated successfully you'll need to configure `webpack.config.js` as follows :
```javascript
const Encore = require('@symfony/webpack-encore');
Encore
    .addEntry('app-shop-entry', './assets/shop/entry.js')
    .enableStimulusBridge('./assets/controllers.json')
    .enableReactPreset()
    .configureBabel(function(babelConfig) {
        babelConfig.plugins.push('@babel/plugin-transform-react-jsx');
    }, {
        includeNodeModules: ['@synolia'],
    })
;
```
- don't forget to import the newly generated `./assets/app.js` in `./assets/shop/entry.js` and make sure `controllers.json` is fulfilled with :
```json
{
    "controllers": {
        "@symfony/ux-react": {
            "react": {
                "enabled": true,
                "fetch": "eager"
            }
        },
        "@synolia/sylius-maintenance-plugin": {
            "react": {
                "enabled": true,
                "fetch": "eager"
            }
        }
    },
    "entrypoints": []
}
```
___
- btw stimulus controller is called like this
```html
<div data-controller="synolia--sylius-maintenance-plugin--react" 
     data-synolia--sylius-maintenance-plugin--react-props-value="{{ props|json_encode }}">
    <!-- react component will be rendered here -->
</div>
```
___
> pro tips: you can use `yarn link` to make `yarn build --watch` possible