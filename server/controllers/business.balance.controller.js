const { response } = require('express');
const  BalanceModel  = require ('../models/business.balance.model')

module.exports.getBalance =  async (req, res) => {

    const id = req.params.id;

    const BalanceDB = await BalanceModel
        .findOne({Business:id}, 'money')

    res.json({
        ok: true,
        BalanceDB
    });

}
