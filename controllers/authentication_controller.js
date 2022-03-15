const User = require('../models/user');
const crypt = require('bcryptjs');

exports.loginPage = (req, res, next) => {
    res.render('authentication/login', {
        title: 'Login',
        secondLayer: false
    });
}

exports.authenticate = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username:username})
        .then(user => {
            if (!user) {
                res.redirect('authentication/login')
            }
            crypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        req.session.user = user;
                        req.session.loggedIn = true;
                        return req.session.save(err => {
                            console.log(err);
                            console.log('1')
                            res.redirect('../view_orders/order_table');
                        })
                    }
                    console.log('2')
                    //req.flash('failed', "Invalid email or password");

                    res.redirect('authentication/login');
                })
                .catch(err => {
                    console.log(err);
                });


        })
        .catch(err => {
            console.log(err);
        })
}

exports.logout = (req, res, next) => {
    if (req.session.loggedIn == true) {
        req.session.loggedIn = false;
        res.redirect('/');
    }
}

exports.signupPage = (req, res, next) => {
    res.render('authentication/signup', {
        title: 'signup',
        secondLayer: false
    });
}

exports.createAccount = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username})
        .then(userdoc => {
            console.log(userdoc)
            if (userdoc) {
                return res.redirect('signup');
            }
            return crypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        username: username,
                        password: hashedPassword
                    })
                    return user.save();
                })
                .then(result => {
                    res.redirect('login');
                })

        })
        .catch(err => {
            console.log(err);
        });
}
