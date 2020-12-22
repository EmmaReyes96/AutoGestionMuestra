const SaleModel = require ('../models/business.sale.model');
const BusiBalanceModel = require ('../models/business.balance.model')
const InventoryModel = require ('../models/business.inventory.model');

module.exports.getSale = async (req, res) => {
    
    const id = req.params.id
    const selectLimit = Number(req.query.selectLimit) || 5;
    const selectPage = Number(req.query.selectPage) || 1;

    const SaleDB = await SaleModel
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
        SaleDB
    })
    
};

module.exports.postSale = async (req, res) => {
    
    const id = req.params.id;
    const body = req.body[0];
    const Money = [];
    const Description = [];

    
    try {
        
        for (let index = 0; index < body.length; index++) {

            const bid = body[index].id;
            const quantity  = body[index].quantity;

            const InventoryDB = await InventoryModel.findOne({_id:bid});

            if(!InventoryDB){
                return res.status(404).json({
                    ok: false,
                    msg: 'Product not exist'
                })
            };
            
            if(InventoryDB.quantity < quantity){
                return res.status(404).json({
                    ok: false,
                    msg:'not enough inventory'
                })
            };

            const Multiply = InventoryDB.money * quantity;
            const fixed = Multiply.toFixed(2);
            const total = Number(fixed);
            
            const object = {
                name: InventoryDB.name,
                quantity: quantity,
                money: InventoryDB.money,
                totalValue: total
            };

            Money.push(Multiply);
            Description.push( object );
            
            const changeInventory = {
                quantity: InventoryDB.quantity - quantity,
                _id: bid
            };

            await InventoryModel.findOneAndUpdate( {_id:bid}, changeInventory, { new: true });    
            
        }

        const Multiply2 = Money.reduce((a, b) => a + b, 0);
        const fixed = Multiply2.toFixed(2);
        const total = Number(fixed);
        
        const newSale = new SaleModel({
            Business: id,
            description: Description,
            money: total 
        });

        const balanceDB = await BusiBalanceModel.findOne({Business:id});

        const totalBalance =  total + balanceDB.money;
        const fixed2 = totalBalance.toFixed(2);
        const totalBalanceResult = Number(fixed2);

        const changeBalance = {
            money: totalBalanceResult,
            Business: id
        };

        await BusiBalanceModel.findOneAndUpdate({Business:id}, changeBalance, {new: true});
        
        await newSale.save();

        res.json({
            ok: true,
            newSale
        });
        
    } catch (error) {

        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'postSale not function'
        });
        
    };

};
    