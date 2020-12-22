const jwt = require('jsonwebtoken');

module.exports.generateJWT = ( uid ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = {
            uid,
        };
    
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => {
    
            if ( err ) {
                console.log(err);
                reject('Not generate JWT');
            } else {
                resolve( token );
            }
    
        });

    });

}