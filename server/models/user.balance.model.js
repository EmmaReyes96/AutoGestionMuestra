const { Schema, model } = require('mongoose');

const BalanceSchema = Schema({
    money:{
        type: Number,
        default: 0
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    collection: 'balance',
    versionKey: false
})

BalanceSchema.method('toJSON', function () {
    const {__v, ...object} = this.toObject();
    return object
})

module.exports = model('BalanceModel', BalanceSchema);