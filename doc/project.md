## Create a project

A project is visible on the home slider and has his own dashboard page  `dashboard/my_project/view`

All projects are on the `src/app/projects/` directory. You need to create a specific folder to each project. The directory name MUST be the same as the slug in the **my_project.config.json** (see below).

### Structure

    - projects
        - your_project
            - assets/
            - your_project.config.json
            - your_project.controller.js
            - your_project.html

### Configuration

All your widget specific configuration MUST be a property of object `widgets`.

**my_project.config.json**


    {
      "title": "My awesome project",
      "slug": "my_project",
      "url": "http://thibaultpierre.com",
      "tags": ["cool", "dashboard", "angular"],
      "image": "http://www.publicdomainpictures.net/pictures/20000/velka/gold-fields.jpg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "team": [
        {
          "name": "Thibault",
          "avatar": "thibault.jpg"
        }
      ],
      "widgets": {
        "url": "http://thibaultpierre.com",
        "instagram": {
          "apiKey": "bce8761741424bafbc8a3d40f967ed8e"
        }
      }
    }

### Controller

Then we define a controller ` my_project.controller.js ` . Its name MUST be of the type `MyProjectCtrl` (Slug in CamelCase + 'Ctrl'). It used by the routing to dynamically resolve controller name.

**my_project.controller.js**

    'use strict';

    angular.module('projectBoard')
      .controller('MyProjectCtrl', ['$scope', 'project', function ($scope, project) {
        $scope.myWidgetConfig = {
          title: 'Sous',
          provider: {},
          options: {
            subtitle: '€/30sec',
            icon: 'fa-euro',
          },
          timingOptions: {
            interval: 30000,
            delay: 5000,
          }
        };
      }])
    ;

### Template

Your template name MUST be `my_project.html`

ProjectBoard use angular-gridster for the layout, see the [angular-gridster doc](https://github.com/ManifestWebDesign/angular-gridster) for more informations.

**my_project.html**

     <div gridster="gridsterOpts">
        <ul>
            <li gridster-item size-x="2" size-y="1" project-widget="{{ myWidgetConfig }}"></li>
            <li gridster-item size-x="1" size-y="1" simple-number-widget="{{ myOtherWidgetConfig }}"></li>
            <li gridster-item size-x="1" size-y="1" clock-widget></li>
        </ul>
    </div>

That's all. Now you need to create/use more widgets and add them to yours boards.