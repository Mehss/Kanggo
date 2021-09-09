const {jwtDecrypt} = require("../helpers/jwt")
const {User, Order} = require("../models")

const authentication = (req, res, next) =>{
    try{
        const {access_token} = req.headers
        if (!access_token) throw{name: "authenticationError", message:"Please log in"}
        const dataDecoded = jwtDecrypt(access_token)
        User.findByPk(dataDecoded.id)
            .then(user => {
                if (!user){
                    throw {name: "authenticationError", message:"User not Found"}
                } else {
                    req.currentUser = {id: user.id}
                    next()
                }
            }) .catch(err => {
                next(err)
            })
    } catch(err) {
        next(err)
    } 
}

const orderAuth = (req, res, next) => {
    try{
        Order.findOne({where: {id: req.params.id}})
            .then(order => {
                console.log('test')
                if (!order) throw {name:"notFound", message: "order not found"}
                if (order.user_id !== req.currentUser.id) throw {name: "authenticationError", message:"You may only modify your own order"}
                else next()
            })
            .catch(err => next(err))
    } catch(err) {
        next(err)
    } 
}

module.exports = {authentication, orderAuth}