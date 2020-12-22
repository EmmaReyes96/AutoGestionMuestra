const mongoose = require('mongoose');

exports.init = function () {
    mongoose.connect('mongodb://.........', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
}