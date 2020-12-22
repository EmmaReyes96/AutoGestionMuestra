const BusiContactsModel = require ('../models/business.contacts.model')

module.exports.getContacts = async (req, res) => {

    const id = req.params.id;

    const contactDB = await BusiContactsModel.find({user: id})

    res.json({
        ok: true,
        contactDB
    })
        
     
}
module.exports.postContacts = async (req, res) => {

    const id =  req.params.id;
    const name = req.body.name;

    try {
        
        const contactDB = await BusiContactsModel.findOne({user:id, name: name})
        
        if(contactDB){
                        
            return res.status(404).json({
                ok: true,
                msg: 'name exist'
            })

        }

        const newContact = new BusiContactsModel({
            user: id,
            ...req.body
        })
        
        await newContact.save()

        res.json({
            ok: true
        })
        
    } catch (error) {

        res.status(400).json({
            ok: true,
            msg: 'internal_error'
        })
        
    }

}
module.exports.putContacts = async (req, res) => {

    const id =  req.params.id;

    try {

        const contactDB = await BusiContactsModel.findById({_id: id})

        if(!contactDB){
            return res.status(404).json({
                    ok: false,
                    msg: 'contact not exist'
            })
        }

        const changeContact = {
            _id: id,
            ...req.body
        }

        const contact = await BusiContactsModel.findByIdAndUpdate({_id: id}, changeContact, { new: true})


        res.json({
            ok: true,
            contact
        })
        
    } catch (error) {

        res.status(400).json({
            ok: true,
            msg: 'internal_error'
        })
        
        
    }


}
module.exports.deleteContacts = async (req, res) => {

    const id =  req.params.id;

    try {

        const contactDB = await BusiContactsModel.findById({_id: id})

        if(!contactDB){
            return res.status(404).json({
                    ok: false,
                    msg: 'contact not exist'
            })
        }


        await BusiContactsModel.findByIdAndDelete({_id: id})


        res.json({
            ok: true,
            msg: 'has been deleted'
        })
        
    } catch (error) {

        res.status(400).json({
            ok: true,
            msg: 'internal_error'
        })
        
    }

}