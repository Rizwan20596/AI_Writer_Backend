const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: {type: Buffer }
});

const Documents  = mongoose.model('documents', documentSchema);
module.exports = Documents;