My first half-stack
===
July 21st, 2017

## Description:
Combine a vanilla NodeJS http server with the mongodb drivers to create your first REST API

To use this app, [Postman](https://www.getpostman.com/) is recommended.

The current acceptable verbs are GET, POST, PUT, PATCH, and DELETE. 

* `GET /dogs` - returns array of all of the dogs
* `POST /dogs` - inserts the supplied request body as a document into the dogs collection
* `GET /dogs/id` -
    * returns the single object specified by the id
    * returns 404 not found if no dogs found with that id    
* `DELETE /dogs/id` - removes the dogs with that id. not an error if doesn't exist. 
    (will: return `{ removed: true }` or `{ removed: false }`)
* `PUT /dogs/id` - changes the dogs with supplied request body
* `PATCH /dogs/id` - updates the dogs with additional supplied request body

