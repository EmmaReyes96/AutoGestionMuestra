const  BusinessModel  = require ('../models/business.model')
const  busiBalanceModel  = require ('../models/business.balance.model');

module.exports.getBusiness = async (req, res) => {

    const id = req.params.id;

    const BusinessDB = await BusinessModel.find({user:id})

    res.json({
        ok: true,
        BusinessDB
    })
}

module.exports.CreateBusiness = async (req, res) => {    

    const BusinessName = req.body.name
    const id = req.params.id

    try {
        
        const existBusiness = await BusinessModel
            .findOne({user:id, name:BusinessName});
        
        if(existBusiness){
            return res.status(400).json({
                ok: false,
                msg: 'Business exist'
            })
        }

        const business = new BusinessModel({
            user: id,
            ...req.body
        });


        const newBusiness = await business.save();

        if(newBusiness){
            const balance = new busiBalanceModel({
                Business: newBusiness._id,
                money: 0
            })
            await balance.save();
        }

        res.json({
            ok: true,
            newBusiness
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'internal_error'
        })
        
    }
}

module.exports.putBuisness = async (req, res) => {
    
    const id = req.params.id
    
    try {

        const BusinessDB = await BusinessModel({_id: id});

        if( !BusinessDB){
            res.status(404).json({
                ok: false,
                msg: 'Business nor exist'
            })
        }
        
        const changeBusiness = {
            _id :id,
            ...req.body
        }
        
        const Business = await BusinessModel.findOneAndUpdate({_id:id}, changeBusiness , {new: true})
        
        res.json({
            ok: true,
            Business
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'internal_error'
        })
        
    }
}

module.exports.deleteBusiness = async (req, res) => {
    
    const id = req.params.id
    
    try {
        
        const BusinessDB = BusinessModel.findOne({_id:id})

        if( !BusinessDB){
            res.status(404).json({
                ok: false,
                msg: 'Business nor exist'
            })
        }

        await BusinessModel.findOneAndDelete({_id:id});

        res.json({
            ok: true,
            msg: 'Delete Business'
        })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'internal_error'
        })
        
    }
}