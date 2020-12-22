const path = require('path');
const fs = require('fs');
const User = require('../models/user.model');
const Business = require ('../models/business.model')

module.exports.updateImage = async (type, id, nameArchive) => {

    const deleteImage = (path) => {
        if ( fs.existsSync(path) ) {
            // borrar la imagen anterior
            fs.unlink(path, (err) => {
                if (err) console.log(err);
            });
        }
    }

    switch (type) {
        case 'user':
            const user = await User.findById(id);
            if( !user ){
                console.log('No es un usuario por id');
                return false;
            }

            pathOld = path.resolve(__dirname, '../uploads/'+ type + '/' + user.img) ;
            deleteImage( pathOld );

            user.img = nameArchive;
            await user.save();
        break;
        case 'business':
            const business = await Business.findById(id);
            if( !business ){
                console.log('No es un business por id');
                return false;
            }

            pathOld = path.resolve(__dirname, '../uploads/'+ type + '/' + business.img) ;
            deleteImage( pathOld );

            business.img = nameArchive;
            await business.save();
        break;
    }

}