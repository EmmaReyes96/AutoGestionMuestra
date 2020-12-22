const { Schema, model } = require('mongoose');

const BusiContactsSchema = Schema({
    name:{
        type: String,
    },
    mobile:{
        type: Number,
    },
    phone:{
        type: Number,
    },
    email:{
        type: String,
    },    
},{
    collection: 'Business-Contacts',
    versionKey: false
})

module.exports = model('BusiContactsModel', BusiContactsSchema);