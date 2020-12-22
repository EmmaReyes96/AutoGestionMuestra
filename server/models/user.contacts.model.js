const { Schema, model } = require('mongoose');

const ContactsSchema = Schema({
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
    },user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    collection: 'Contacts',
    versionKey: false
})

module.exports = model('ContactsModel', ContactsSchema);