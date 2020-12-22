const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    img:{
        type: String
    },
    reg_time: {
        type: Date,
        default: Date.now
    },
    google: {
        type: Boolean,
        default: false
    }
},{
    versionKey: false
})

UsuarioSchema.method('toJSON', function () {
    const {_id, ...object} = this.toObject()
    object.uid = _id;
    return object
})

module.exports = model('User', UsuarioSchema);