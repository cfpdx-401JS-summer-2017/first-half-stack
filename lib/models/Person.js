const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quirksSchema = new Schema(
  { annoying: {type: String} },
  { healthy:{type: String} },
  { odd: {type: String}}
);

const personSchema = new Schema({
  name: { type: String, required: true },
  heightInInches: {
    type: Number, required: [true, 'Your height is required.']
  },
  likesRollerCoasters: { type: Boolean, required: true },
  home: {type: String, required: false},
  quirks: quirksSchema,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Person', personSchema);
