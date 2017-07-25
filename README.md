## Half Stack Lab

Developers:
* Meryl Turner
* Stephanie Fitzgerald

### Description

This half-stack app combines a vanilla NodeJS http server with mongodb drivers to create a REST API. The collection saved in the tests is varieties and origins of cheese.

### How to Use Our API

* Go to /cheeses to `GET` an array of all cheeses in the database
* Go to /cheeses and `POST` to insert the request cheese object into the collection
* Go to /cheeses/:id to `GET` a single cheese object by that id
    * If that id is not in the database, a 404 error is returned
* Go to /cheeses/:id and `DELETE` to remove the resource with that id
    * Upon removal, `{ removed: true }` will be returned
    * If the resource was not removed, `{ removed: false }` will be returned
* Go to /cheeses/:id and `PUT` to update the cheese matching that id with the data included in the request body

### Installation

To install this API, `git clone` this repo, and `npm i` to install the following dependencies:

* chai
* chai-http
* mocha
* mongodb

Note that you will need to change the "test" value in the package.json to "mocha tests" since that is the name of the directory (vs. the default "mocha test").

Next use `npm start` to start the dev server, and `npm test` to run the tests.