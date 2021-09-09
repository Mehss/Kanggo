const {Order} = require('../models/index')

class Controller{
    static getOrders(req, res, next){
        if(req.params.id){
            Order.findOne({where: {id: req.params.id}})
            .then(data => {
                if (!data) throw {name: "notFound", message: "order not found" }
                console.log(data)
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
        }
        else {
            Order.findAll()
            .then(data => {
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
        }
    }

    static postOrder(req, res, next){
        let newOrder = req.body
        newOrder.user_id = req.currentUser.id
        newOrder.status = 'pending'
        if(!newOrder.product_id) next({name:'badRequest', message: 'Please input product id'})
        Order.create(newOrder, {returning:true})
            .then(data => res.status(201).json({message: 'success', data}))
            .catch(err => next(err))
    }

    static patchOrder(req, res, next){
        console.log(req.params.id)
        Order.update({amount: req.body.amount}, {where: {id:req.params.id}, returning: true})
            .then((data) => {
                if(data[0] == 0) throw({name: "notFound", message: "request not found" })
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
    }

    static delOrder(req, res, next){
        Order.destroy({where:{id: req.params.id}})
            .then((data) => {
                if(data == 0) throw({name: "notFound", message: "request not found"})
                res.status(200).json({message: "success"})
            })
            .catch(err => next(err))
    }
}

module.exports = Controller