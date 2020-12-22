const { Schema, model } = require('mongoose');

const BusinessSchema = Schema({
    name:{
        type: String,
        required: true
    },
    city:{
        type: String
    },
    address:{
        type: String
    },
    description:{
        type: String
    },
    img:{
        type: String
    },
    reg_time:{
        type: Date,
        default: Date.now
    },    
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    collection: 'Business',
    versionKey: false
})

module.exports = model('BusinessModel', BusinessSchema);