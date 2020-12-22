const SpendingModel = require ('../models/business.spending.model');
const BusiBalanceModel = require ('../models/business.balance.model');
const InventoryModel = require ('../models/business.inventory.model')

module.exports.getSpending = async (req, res) => {

    const id = req.params.id
    const selectLimit = Number(req.query.selectLimit) || 5;
    const selectPage = Number(req.query.selectPage) || 1;

    const SpendingDB = await SpendingModel
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
        SpendingDB
    })
    
    
}
module.exports.postSpending = async (req, res) => {

    
    const id = req.params.id;
    const SpendingBody = req.body[0];
    const ProductsBody = req.body[1];
    const total = [];

    try {

        if(ProductsBody.length > 0){

            for (let index = 0; index < ProductsBody.length; index++) {
                
                const fixed = ProductsBody[index].money.toFixed(2);
                const value = Number(fixed);
                
                const InventoryDB = await InventoryModel.findOne({Business: id, name: ProductsBody[index].name});

                if(InventoryDB){

                    const ProductId = InventoryDB._id;
                    
                    const changeInventory = {
                        name: ProductsBody[index].name,
                        money: value,
                        quantity: ProductsBody[index].quantity,
                        _id: ProductId
                    }
    
                    await InventoryModel.findOneAndUpdate( {_id:ProductId}, changeInventory, { new: true })
    
                }else{
    
                    const newInventory = new InventoryModel({
                        Business: id,
                        name: ProductsBody[index].name,
                        money: value,
                        quantity: ProductsBody[index].quantity
                    });
            
                    await newInventory.save();
                }
            };
        };

        for (let index = 0; index < SpendingBody.length; index++) {
            total.push(Number(SpendingBody[index].totalValue))
        }

        const money = total.reduce((a, b) => a + b, 0);
        const fixed = money.toFixed(2);
        const value = Number(fixed);
        

        const balanceDB = await BusiBalanceModel.findOne({Business:id});

        const totalBalance =  balanceDB.money - value;
        const fixed2 = totalBalance.toFixed(2);
        const totalBalanceResult = Number(fixed2);

        const changeBalance = {
            money: totalBalanceResult,
            Business: id
        };

        await BusiBalanceModel.findOneAndUpdate({Business:id}, changeBalance, {new: true});

        const newSpending = new SpendingModel({
            Business: id,
            description: SpendingBody,
            money: money
        });

        await newSpending.save();
        
        
        res.json({
            ok: true,
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'post Spending not function'
        });

    };
    
}