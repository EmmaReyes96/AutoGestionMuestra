const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const BalanceModel = require('../models/user.balance.model');

module.exports.getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ usuarios, total ] = await Promise.all([
        User
            .find({}, 'name email google img')
            .skip( desde )
            .limit( 5 ),

        User.countDocuments()
    ]);


    res.json({
        ok: true,
        usuarios,
        total
    });

}

module.exports.userLogin = async(req, res) => {

    const {email, password} = req.body;

   
        const existEmail = await User.findOne({email})
        
        if(!existEmail){
            return res.status(400).json({
                ok: true,
                msg: 'Email no encontrado'
            })
        }
        
        const validPassword = bcrypt.compareSync( password, existEmail.password);
        
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: "La contraseña no es valida"
            })
        }

        // Generar el TOKEN - JWT
        const token = await generateJWT (existEmail.id);
    

    res.json({
        login: true,
        token
    })
}

module.exports.createUser = async(req, res) => {

    const {email, password} = req.body;
    
    try {
        const existEmail = await User.findOne({email})

        if(existEmail){
            return res.status(400).json({
                ok: true,
                msg: 'El email ya existe'
            })
        }

        const usuario = new User(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        const newUser = await usuario.save();

        if(newUser){
            const balance = new BalanceModel({
                user: newUser._id,
                money: 0
            })

            await balance.save();     
        }

        // Generar el TOKEN - JWT
        const token = await generateJWT (usuario.id);

        res.json({
            newUser: true,
            usuario,
            token
            // uid: req.uid
        })

        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'internal_error'
        })
    }
}


module.exports.editUser = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await User.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'user_not_exist'
            })
        }

        //Update
        const {google, email, password, ...Update} = req.body;
        
        if( usuarioDB.email !== email){

            const emailExist = await User.findOne({ email });
            if( emailExist ){
                return res.status(400).json({
                    ok: false,
                    msg: 'error email exist'
                });
            }
        }

        if ( !usuarioDB.google ){
            Update.email = email;
        } else if ( usuarioDB.email !== email ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no pueden cambiar su correo'
            });
        }

        const UpdateUser = await User.findByIdAndUpdate( uid, Update, {new: true} );
       
        res.json({
            newUser: true,
            User: UpdateUser,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'unexpected error'
        })
    }

}

module.exports.googleSignIn = async (req, res = response) => {
    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify( googleToken );

        const usuarioDB = await User.findOne({ email });
        let user;
        if ( !usuarioDB ) {
            // si no existe el usuario
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
                
            });

            // guardar en DB            
            const newUser = await user.save();

            if(newUser){
                const balance = new BalanceModel({
                    user: newUser._id,
                    money: 0
                })
                 await balance.save();    
            }

        }else {
            // existe usuario
            user = usuarioDB;
            user.google = true;
        }

        
        // Generar el TOKEN - JWT
        const token = await generateJWT(user.id);

        res.json({
            login: true,
            token
        });

    } catch (error) {
        res.status(401).json({
            login: false,
            msg: 'Token not is correct',
        });
    }

}


module.exports.renewToken = async (req, res = response) => {

    const  uid = req.uid;
    const  user = await User.findById( uid );

    // Generar el TOKEN - JWT
    const token = await generateJWT( uid );

    res.json({
        ok: true,
        token,
        user
    });


}