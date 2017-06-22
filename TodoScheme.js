const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoScheme = new Schema({
    text: String,
    userId: String
});
mongoose.model('Todo', TodoScheme);
