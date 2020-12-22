const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const BusiInventorySchema = Schema({
    name: {
        type: String
    },
    money:{
        type: Number,
        default: 0
    },
    quantity:{
        type: Number,
        default: 0
    },
    reg_time: {
        type: Date,
        default: Date.now
    },
    Business: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Business'
    }
},{
    collection: 'Business-Inventory',
    versionKey: false
})


BusiInventorySchema.plugin(mongoosePaginate);

module.exports = model('InventoryModel', BusiInventorySchema);