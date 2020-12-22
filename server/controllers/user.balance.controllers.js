const { response } = require('express');
const BalanceModel = require('../models/user.balance.model');
const HistoryModel = require('../models/user.history.model');

module.exports.getBalance = async (req, res = response) => {

    const id = req.params.id

    
    const balance =  await BalanceModel
        .find({user:id}, 'money')
    
    res.json({
        ok: true,
        balance,
    })
}

module.exports.postBalance = async (req, res = response) => {

    const { operator, money, description } = req.body;
    const uid = req.uid;
    const id = req.params.id;
    
    const fixed = money.toFixed(2);
    const value = Number(fixed);
    let ResultGlob;

    try {

        const balance = await BalanceModel.findOne({user:id});
        
        if( !balance ){
            return  res.status(404).json({
                ok: false,
                msg: 'balance not exist'
            });
        }
        
        if(balance){            
            const result = operator == 'suma' ? balance.money + value : balance.money - value;
            ResultGlob = result
        }
        
        const changeBalance = {
            money: ResultGlob,
            user: uid
        }

        const BalanceUpdated = await BalanceModel.findOneAndUpdate( {user:id}, changeBalance, { new: true })
        
        const history = new HistoryModel({
            user: uid,
            description,
            money: value,
            operator

        })

        const historyDB = await history.save();

        res.json({
            ok: true,
            historyDB,
            BalanceUpdated
        })

        
    } catch (error) {

        res.json({
            ok: false,
            msg: 'postBalance not function'
        })
        
    }


}



