const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quirksSchema = new Schema([
  { annoying: String },
  { healthy: String },
  { odd: String }
]);

const personSchema = new Schema({
  name: { type: String, required: true },
  heightInInches: {
    type: Number,
    validate: {
      validator: function(v) {
        // I know this function is unnecessary - I just wanted to try it!
        let status = v > 59 ? true : false;
        return status;
      },
      message: "Sorry! You're too short to ride the roller coaster. ☹️"
    },
    required: [true, 'Your height is required.']
  },
  likesRollerCoasters: { type: Boolean, required: true },
  quirks: quirksSchema,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Person', personSchema);
