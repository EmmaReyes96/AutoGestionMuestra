const  InventoryModel  = require ('../models/business.inventory.model')

module.exports.getInventory = async (req, res) => { 

    const id = req.params.id
    const selectLimit = Number(req.query.selectLimit) || 5;
    const selectPage = Number(req.query.selectPage) || 1;

    const InventoryDB = await InventoryModel
        .paginate(
            {Business:id},
            {
                limit: selectLimit,
                page: selectPage,
                sort : { reg_time: -1}
            }             
        )

    res.json({
        ok: true,
        InventoryDB
    })

}

module.exports.getInventoryAll = async (req, res) => { 

    const id = req.params.id

    const InventoryDB = await InventoryModel.find({Business:id})

    res.json({
        ok: true,
        InventoryDB
    })

}

module.exports.postInventory = async (req, res) => {

    const id = req.params.id
    const body = req.body
    
    try {

        for (let index = 0; index < body.length; index++) {

            const nameExist = body[index].name;
            const money = Number(body[index].money);
            const fixed = money.toFixed(2);
            const value = Number(fixed);
            const InventoryDB = await InventoryModel.findOne({Business:id, name:nameExist});


            if(InventoryDB){

                const ProductId = InventoryDB._id;
                
                const changeInventory = {
                    name: body[index].name,
                    money: value,
                    quantity: Number(body[index].quantity),
                    _id: ProductId
                }

                await InventoryModel.findOneAndUpdate( {_id:ProductId}, changeInventory, { new: true })

            }else{

                const newInventory = new InventoryModel({
                    Business: id,
                    name: body[index].name,
                    money: value,
                    quantity: Number(body[index].quantity)
                });
        
                await newInventory.save();
            }
        };

        res.json({
            ok: true,
            
        });
        
    } catch (error) {
        console.log(error)
        res.status(404).json({
            ok: false,
            msg: 'internal_error'
        });              
    };
    
};

module.exports.deleteInventory = async (req, res) => {    

    const id = req.params.id

    try {

        const InventoryDB = await InventoryModel.findOne({_id:id})

        if(!InventoryDB){
            return res.status(404).json({
                ok: false,
                msg: 'Product not exist'
            })
        }

        await InventoryModel.findOneAndDelete( {_id:id})

        res.json({
            ok: true,
            msg: 'Deleted Product'
        })
        
        
    } catch (error) {
        console.log(error)
        res.status(404).json({
            ok: false,
            msg: 'internal_error'
        })        
    }

}
    