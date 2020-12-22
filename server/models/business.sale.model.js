const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const BusiSaleSchema = Schema({
    description: {
        type: [{
            name:{
                type: String
            },
            quantity:{
                type: Number,
                default: 0
            },
            money:{
                type: Number,
                default: 0
            },
            totalValue:{
                type: Number,
                default: 0
            }
        }]
    },
    money:{
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
    collection: 'Business-Sale',
    versionKey: false
})

BusiSaleSchema.plugin(mongoosePaginate);


module.exports = model('SaleModel', BusiSaleSchema);