const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const path = require('path');
const connection = require('../db');
const notFound = require('../utils/not-found');
const ObjectID = require('mongodb').ObjectID;

app.use(bodyParser.urlencoded({ extended: true }));


app.post('/dogs', (req,res) => {
    const Dogs = connection.db.collection('dogs');
    Dogs.insert(req.body)
        .then(result => {
            result.ops[0];
            console.log(result);
        })
        .then(dog => {
            console.log(dog);
            res.send(dog);
        })
        .catch(console.log);
});
    
app.get('/dogs', (req,res) => {
    //else if(req.method === 'GET' && !req.url.params.id) {
    const Dogs = connection.db.collection('dogs');
    Dogs.find({})
        .toArray()
        .then(dogs => res.end(JSON.stringify(dogs)))
        .catch(console.log);
});

app.get('/dogs/:id', (req,res) => {
    // else if(req.method === 'GET' && req.url.params.id) {
    const Dogs = connection.db.collection('dogs');
    let id = new ObjectID(req.url.params.id);

    Dogs.findOne({_id : id})
        .then(dog => {
            if(!dog) {
                return notFound(req, res);
            } else {
                res.end(JSON.stringify(dog));
            }
        })
        .catch(console.log);
});
      
app.delete('/dogs/:id', (req,res) => {
    const Dogs = connection.db.collection('dogs');
    // else if(req.method === 'DELETE') {
    let id = new ObjectID(req.url.params.id);

    Dogs.findOneAndDelete({_id : id})
        .then(dog => {
            console.log(dog);
            if(!dog) {
                res.end (JSON.stringify({removed:false}));
            } else {
                res.end (JSON.stringify({removed:true}));
            }
        });
});
        
app.put('/dogs/:id', (req,res) => {
    const Dogs = connection.db.collection('dogs');
    // else if(req.method === 'PUT') {
    let id = new ObjectID(req.url.params.id);

    Dogs.updateOne({_id:id}, {$set:req.body})
        .then(dog => {
            if(!dog) {
                res.end (JSON.stringify({updated:false}));
            } else {
                res.end (JSON.stringify(dog));
            }
        });   
});
        
module.exports = app;