const Router = require('express').Router;
const router = Router();
const Person = require('../models/Person');
const bodyParser = require('body-parser').json();

router
  .post('/', bodyParser, (req, res, next) => {
    new Person(req.body)
      .save()
      .then(savedPerson => {
        return res.send(savedPerson);
      })
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Person.find()
      .then(thenUsers => {
        return res.send(thenUsers);
      })
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Person.findOne({ _id: id })
      .then(thenUsers => {
        return res.send(thenUsers);
      })
      .catch(next);
  })
  .put('/:id', bodyParser, (req, res, next) => {
    const { likesRollerCoasters, heightInInches, name } = req.body;
    const { id } = req.params;

    Person.findByIdAndUpdate(
      id,
      {
        $set: {
          likesRollerCoasters: likesRollerCoasters,
          heightInInches: heightInInches,
          name: name
        }
      },
      { new: true, runValidators: true }
    )
      .then(updatedUser => {
        return res.send(updatedUser);
      })
      .catch(next);
  })
  .delete('/:id', bodyParser, (req, res, next) => {
    const { id } = req.params;
    Person.findOneAndRemove({
      query: { _id: id },
      remove: true
    })
      .then(response => {
        return res.send(response);
      })
      .catch(next);
  });

module.exports = router;