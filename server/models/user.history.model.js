const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const HistorySchema = Schema({
    description:{
        type: String
    },
    money:{
        type: Number
    },
    reg_time: {
        type: Date,
        default: Date.now
    },
    operator:{ 
        type: String
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    collection: 'history',
    versionKey: false
})

HistorySchema.method('toJSON', function () {
    const {__v, ...object} = this.toObject();
    return object
})

HistorySchema.plugin(mongoosePaginate);

module.exports = model('HistoryModel', HistorySchema);