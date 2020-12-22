const express = require('express');
require('dotenv').config();
const routes = require('./server/routes');
const cors = require('cors');
const db = require('./server/dbconection')


module.exports.init = function () {
    const app = express()
    
    app.use(cors());
    app.use(express.json());

    db.init();
    routes.init(app);

    app.listen(3000,()=>{
        console.log('Server On port 3000')
    });

}