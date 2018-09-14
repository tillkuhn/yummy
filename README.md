yummy [![Build Status](https://travis-ci.org/tillkuhn/yummy.svg?branch=master)](https://travis-ci.org/tillkuhn/yummy) [![Dependencies](https://david-dm.org/tillkuhn/yummy.svg)](https://david-dm.org/tillkuhn/yummy#info=dependencies&view=table) [![Coverage Status](https://coveralls.io/repos/tillkuhn/yummy/badge.svg?branch=master)](https://coveralls.io/r/tillkuhn/yummy?branch=master)
=====

This Project is no longer maintained, checkout the successor [yummy-aws](https://github.com/tillkuhn/yummy-aws) which is based on Angular 6 and DynamoDB!
---

Motivation
-----
Formally a CRUD application for my favourite recipes, but basically it's sample javascript project to learn AngularJS, MongoDB, Grunt, Jasmine and all the other funny things people are using these days

Installation
----------------
Nothing special here ...

    git clone https://github.com/tillkuhn/yummy.git
    cd yummy
    npm install
    bower install
    grunt serve   # This will run a development server with watch & livereload enabled.

API Reference
------
Internally this project is heavily based on [angularjs-mongolab](https://github.com/pkozlowski-opensource/angularjs-mongolab) and [mongolab REST API](http://docs.mongolab.com/data-api/), check the information on their pages for details.

Tests
-----

    grunt test

License
------
See the [LICENSE](https://github.com/tillkuhn/yummy/blob/master/LICENSE) file.

Todos
----
* Add flavour :sparkling_heart:
* Implement coverage in karma and report in travis see https://github.com/nickmerwin/node-coveralls :point_left:
* Deploy somewhere check out [openshift](https://blog.openshift.com/getting-started-with-mongodb-on-nodejs-on-openshift/) or [Heroku1](http://www.sitepoint.com/deploying-yeomanangular-app-heroku/) or [Heroku2](http://cloud.dzone.com/articles/how-deploy-angularjs-app)
