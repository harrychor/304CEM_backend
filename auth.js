const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');

exports.authenticate = (email, password) =>{
    return new Promise(async (resolve, reject) => {
        try{
            // Get user email
            const user = await User.findOne({email});
            // find password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch){
                    resolve(user);
                } else{
                   reject('Authentivation Failed')
                }
            });

        }catch(err){
            // Email not found
            reject('Authentivation Failed');
        }
    });
}