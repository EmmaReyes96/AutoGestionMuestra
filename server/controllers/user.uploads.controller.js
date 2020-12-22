const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update');
const path = require('path');
const fs = require('fs');



module.exports.fileUpload = (req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    // validate type

    const typeVilidate = ['user', 'business'];

    if( !typeVilidate.includes(type)){
        return res.status(400).json({
            ok: false,
            msg: 'type not validate'
        })
    }

    // express fileUpload

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded'
        });
      }

    // process image

    const file = req.files.image;
    const nameCut = file.name.split('.');
    const extension = nameCut[ nameCut.length - 1].toLowerCase();

    // validate

    const extensionValidate = ['png', 'jpg', 'jpeg', 'gif'];
    if( !extensionValidate.includes(extension)){
        return res.status(400).json({
            ok: false,
            msg: 'extension not exist'
        });
    }

    // generate name
    const nameArchive = `${uuidv4()}.${extension}`

    // path for save
    const path = `server/uploads/${ type }/${ nameArchive }`;
    console.log(path)

    // move image
    file.mv( path, (err) => {
    if (err){
        console.log(err)
        return res.status(500).json({
            ok: false,
            msg: 'Error: move the image'
        });
    }

    // update
    updateImage(type, id, nameArchive);

    res.json({
        ok: true,
        msg: 'File uploaded!',
        nameArchive
    })  

  });

}

module.exports.returnImg = ( req, res = response ) => {

    const type = req.params.type;
    const img = req.params.img;

    const pathImg = path.join(__dirname, `../uploads/${ type }/${ img }`);

    // default image
    if(fs.existsSync( pathImg )){
         res.sendFile( pathImg ); 
        }else{
            const pathImg = path.join(__dirname, `../uploads/not-available.png`);
            res.sendFile( pathImg );  
    }

}