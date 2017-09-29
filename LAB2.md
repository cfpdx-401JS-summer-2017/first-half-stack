<img src="https://cloud.githubusercontent.com/assets/478864/22186847/68223ce6-e0b1-11e6-8a62-0e3edc96725e.png" width=30> First Express Half Stack App with ExpressJS
======

## Directions

Convert your vanilla NodeJS http server from previous lab into an ExpressJS app:
  * Use `app.<method>` handlers
  * Use `:id` to handle params
  * Use `body-parser` for request body
  * Use `res.send` or `res.json` for `application/json` responses (remove vanilla content type setting)
  
New requirements:
* Add the ability to submit a `query` as part of `GET` all. Choose 2 properties that you allow to be queried, 
e.g. `?type=cat`. Query can be 1, both, or none of those properties
* Add a "child array" property (simple strings okay) to your resource:
  * Include nested `POST` and `DELETE` routes to add or remove child items, e.g. `/cats/507f1f77bcf86cd799439011/toys`
  * If using a primitive, you may need to put the value in an object (body-parser is the culprit, let's test this out)

## Testing

* Use your existing tests to guide you in your transition
* Add tests for new requirements

## Rubric

* Express style Server, App, Project Organization Conversion: *4pt*
* Query feature and tests *3pts*
* Child route feature and tests *3pts*
