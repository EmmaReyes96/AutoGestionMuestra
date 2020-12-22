const { response } = require('express');
const HistoryModel = require('../models/user.history.model');

module.exports.getHistory = async (req, res = response) => {

    const selectLimit = Number(req.query.selectLimit) || 5;
    const selectPage = Number(req.query.selectPage) || 1;
    const id = req.params.id

    
    const history =  await HistoryModel
        .paginate(
            {user:id},
            {
                limit: selectLimit,
                page: selectPage,
                sort : { reg_time: -1}
             }             
        )
    
    res.json({
        ok: true,
        history
    })
}