install new
---------------
npm install -g grunt-cli yo bower
npm install -g generator-cg-angular
mkdir yummy
cd yummy
yo cg-angular

run
---
grunt serve   #This will run a development server with watch & livereload enabled.
grunt test    #Run unit tests.
grunt build   #Places a fully optimized (minified, concatenated, and more) in /dist

database
------------

To connect using the shell:
mongo ds039427.mongolab.com:39427/yummy -u <dbuser> -p <dbpassword>
To connect using a driver via the standard URI (what's this?):
  mongodb://<dbuser>:<dbpassword>@ds039427.mongolab.com:39427/yummy

  user yummy,password yummy1
   The resources in your MongoLab account can be accessed via the MongoLab REST API.

In order to use the API, you must code your clients to present an API Key to the server on each API request. The key should be presented using an HTTP query parameter called 'apiKey' as in the following example: 

https://api.mongolab.com/api/1/databases?apiKey=<your-api-key>
  Current key gexKhnbdwA0fTjVkU5HwZJ8WHkYL6pQd 
https://api.mongolab.com/api/1/databases?apiKey=gexKhnbdwA0fTjVkU5HwZJ8WHkYL6pQd 


  
extend
------------
yo cg-angular:directive my-awesome-directive
yo cg-angular:partial my-partial
yo cg-angular:service my-service
yo cg-angular:filter my-filter

There are a set of sub-generators to initialize empty Angular components. Each of these generators will:

    Create one or more skeleton files (javascript, LESS, html, spec etc) for the component type.
    Update index.html and add the necessary script tags.
    Update app.less and add the @import as needed.
    For partials, update the app.js, adding the necessary route call if a route was entered in the generator prompts.

There are generators for directive,partial,service, and filter.

Running a generator:

yo cg-angular:directive my-awesome-directive
yo cg-angular:partial my-partial
yo cg-angular:service my-service
yo cg-angular:filter my-filter

The name paramater passed (i.e. 'my-awesome-directive') will be used the file names. The generators will derive appropriate class names from this parameter (ex. 'my-awesome-directive' will convert to a class name of 'MyAwesomeDirective'). Each sub-generator will ask for the folder in which to create the new skeleton files. You may override the default folder for each sub-generator in the .yo-rc.json file.

Each sub-generator pulls the Angular app/module name from the package.json. Therefore, if you choose to change the name of your Angular app/module, you must ensure that the name in the package.json stays in sync.

Sub-generators are also customizable. Please read CUSTOMIZING.md for details.

 Preconfigured Libraries
------------------------------------
The new app will have a handful of preconfigured libraries included. This includes Angular 1.2, Bootstrap 3, AngularUI Bootstrap, AngularUI Utils, FontAwesome 4, JQuery 2, Underscore 1.5, LESS 1.6, and Moment 2.5. You may of course add to or remove any of these libraries. But the work to integrate them into the app and into the build process has already been done for you.

 Build Process
 ------------------------

The project will include a ready-made Grunt build that will:

    Build all the LESS files into one minified CSS file.
    Uses grunt-angular-templates to turn all your partials into Javascript.
    Uses grunt-ngmin to preprocess all Angular injectable methods and add the necessary Angular annotations to ensure minification will not break your app (and you don't have to use the array syntax to manually add the annotations nor $inject). Read more about ngmin.
    Concatenates and minifies all Javascript into one file.
    Replaces all appropriate script references in index.html with the minified CSS and JS files.
    Minifies any images in /img.
    Minifies the index.html.
    Copies any extra files necessary for a distributable build (ex. Font-Awesome font files, etc).

The resulting build loads only a few highly compressed files.

The build process uses grunt-dom-munger to pull script references from the index.html. This means that your index.html is the single source of truth about what makes up your app. Adding a new library, new controller, new directive, etc does not require that you update the build file. Also the order of the scripts in your index.html will be maintained when they're concatenated.

Importantly, grunt-dom-munger uses CSS selectors to manage the parsing of the script tags. It is very easy to exclude certain scripts from the build. For example, the project includes a references to the livereload.js from the grunt-contrib-watch task. But this file should not be included in a production build. Thus the grunt-dom-munger task is configured with a selector like script[data-build!="exclude"] and the script tag for livereload.js includes an attribute like data-build="exclude". You can use this flexibility in your project to include/exclude scripts in your production builds.