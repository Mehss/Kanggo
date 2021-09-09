const {User} = require('../models/index')
const {compare} = require('../helpers/bcrypt')
const {jwtEncrypt} = require('../helpers/jwt')

class Controller{
    static login(req, res, next){
        if (!req.body.email || !req.body.password) throw ({name:"badRequest", message:"No username or password"})
        User.findOne({where: {email: req.body.email}})
            .then(user => {
                if(!user) {throw {name: "notFound", message: "email is not registered"}}
                else if(compare(req.body.password, user.password)) {
                    const token = jwtEncrypt({id: user.id})
                    res.status(200).json({message: "Login successful", access_token: token}) 
                } else {throw {name: "unauthorized", message:"Wrong password"}}
            })
            .catch(error => {
                next(error)
            })
    }
    
    static register(req, res, next){
        if (!req.body.email || !req.body.password) throw ({name:"badRequest", message:"No username or password"})
        User.create(req.body, {returning: true})
            .then((user) => {
                res.status(201).json({message: "success", access_token: jwtEncrypt({id: user.id})})
            })
            .catch(error => {
                next(error)
            })
    }
}

module.exports = Controller