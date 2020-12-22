const {check} = require('express-validator');
const { fieldValidator } = require('./middlewares/validateFields');
const { validateJWT } = require('./middlewares/validate-jwt');
const expressFileUpload = require('express-fileupload');

const userController = require('./controllers/user.controllers');
const historyController = require('./controllers/user.history.controllers');
const balanceController = require('./controllers/user.balance.controllers');
const uploadController = require('./controllers/user.uploads.controller');
const ContactsController = require('./controllers/user.contacts.controller');

const BusinessController = require('./controllers/business.controller');
const BusiBalanceController = require('./controllers/business.balance.controller');
const BusiSaleController = require('./controllers/business.sale.controller');
const BusiSpendingController = require('./controllers/business.spending.controller');
const BusiInventoryController = require('./controllers/business.inventory.controller');
const BusiContactsController = require('./controllers/business.contacts.controller');

const mailer = require('./controllers/user.message.controller');

module.exports.init = function (app) {

    // user -----------------------------------------------------

    app.get('/user/user', 
        userController.getUsuarios);

    app.post('/user/login', 
        userController.userLogin);

    app.post('/user/login/google', [
        check('token').not().isEmpty(),
        userController.googleSignIn
        ]);

    app.post('/user/register', [
        check('name').not().isEmpty(),
        check('password').not().isEmpty(),
        check('email').isEmail(),
        fieldValidator
        ], 
        userController.createUser);

    app.put('/user/edit/:id',  [
        validateJWT,
        check('name').not().isEmpty(),
        check('email').isEmail(),
        fieldValidator
        ], 
        userController.editUser);

    app.get( '/user/login/renew',  
        validateJWT, userController.renewToken );

    // history user ----------------------------------------------

    app.get('/user/history/:id',    
        validateJWT, historyController.getHistory);

    // uploads user ----------------------------------------------
    
    app.use(expressFileUpload());

    app.get(['/user/uploads/:type/:img',
        fieldValidator
    ],
    uploadController.returnImg);

    app.put('/user/uploads/:type/:id', [
    ],
    uploadController.fileUpload);

    // balance user ---------------------------------------------

    app.get('/user/balance/:id', [
        fieldValidator
    ],
    balanceController.getBalance);
    
    app.post('/user/balance/:id', [
        validateJWT,
        fieldValidator
        ],
        balanceController.postBalance);

    
    // business  contacts ----------------------------------------
    
    app.get('/user/contact/:id',
        validateJWT, ContactsController.getContacts);

    app.post('/user/contact/:id', [
        validateJWT,
        fieldValidator
    ],
    ContactsController.postContacts);

    app.put('/user/contact/:id', [
        validateJWT,
        fieldValidator
    ],
    ContactsController.putContacts);

    app.delete('/user/contact/:id', [
        validateJWT,
        fieldValidator
    ],
    ContactsController.deleteContacts);

    // business sale --------------------------------------------

    app.get('/user/business/sale/:id',    
        validateJWT, BusiSaleController.getSale);

    app.post('/user/business/sale/:id', [
        validateJWT,
        fieldValidator
        ],
        BusiSaleController.postSale);
    
    // business balance -----------------------------------------
    
    app.get('/user/business/balance/:id',    
    validateJWT, BusiBalanceController.getBalance);
        
    // business spending ----------------------------------------

    app.get('/user/business/spending/:id',    
        validateJWT, BusiSpendingController.getSpending);

    app.post('/user/business/spending/:id', [
        validateJWT,
        fieldValidator
        ],
        BusiSpendingController.postSpending);
    
    // business inventory ---------------------------------------

    app.get('/user/business/inventory/:id',    
        validateJWT, BusiInventoryController.getInventory);

    app.get('/user/business/inventoryAll/:id',    
        validateJWT, BusiInventoryController.getInventoryAll);

    app.post('/user/business/inventory/:id', [
        validateJWT,
        fieldValidator
        ],
        BusiInventoryController.postInventory);

    app.delete('/user/business/inventory/:id', [
        validateJWT,
        fieldValidator
        ],
        BusiInventoryController.deleteInventory);

    // business -------------------------------------------------

    app.get('/user/business/:id',
        validateJWT, BusinessController.getBusiness);

    app.post('/user/business/:id', [
        validateJWT,
        fieldValidator
    ],
    BusinessController.CreateBusiness);

    app.put('/user/business/:id', [
        validateJWT,
        fieldValidator
    ],
    BusinessController.putBuisness);

    app.delete('/user/business/:id', [
        validateJWT,
        fieldValidator
    ],
    BusinessController.deleteBusiness);

    // business  contacts ----------------------------------------
    
    app.get('/user/business/contact/:id',
        validateJWT, BusiContactsController.getContacts);

    app.post('/user/business/contact/:id', [
        validateJWT,
        fieldValidator
    ],
    BusiContactsController.postContacts);

    app.put('/user/business/contact/:id', [
        validateJWT,
        fieldValidator
    ],
    BusiContactsController.putContacts);

    app.delete('/user/business/contact/:id', [
        validateJWT,
        fieldValidator
    ],
    BusiContactsController.deleteContacts);

    // mailer ----------------------------------------

    app.post('/user/messange', [
        validateJWT,
    ],
    mailer.messange)
}