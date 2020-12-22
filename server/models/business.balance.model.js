const { Schema, model } = require('mongoose');

const BusiBalanceSchema = Schema({
    money:{
        type: Number,
        default: 0
    },
    Business: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Business'
    }
},{
    collection: 'Business-Balance',
    versionKey: false
})

module.exports = model('BusiBalanceModel', BusiBalanceSchema);