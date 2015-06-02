# ProjectBoard

An AngularJS dashboard framework

## Install

- Install dependencies:

``` npm install ```

``` bower install ``

- Configuration

``` cp config/local.json.dist config/local.json ```

``` gulp config ```

``` gulp serve ```

## Structure

  - config # Your global config
  - src
    - app
        - components
        - dataProviders
            - your_dataProvider
                - your_dataProvider.js
        - projects
            - your_project
                - assets/
                - your_project.config.json
                - your_project.controller.js
                - your_project.html
        - widgets
            - assets/
            - your_widget.directive.js
            - your_widget.html
    - assets

## Next steps

- [Create a project](doc/project.md)

- [Create widgets](doc/widget.md)

- [Create dataProvider](doc/dataprovider.md)


## Tasks

``` gulp config ``` merge all config from ``` src/app/projects ``` and ``` config/{env}.json ```and expose them as service in the app.