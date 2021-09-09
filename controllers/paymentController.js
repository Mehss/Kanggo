const {Pembayaran, Order, Product} = require('../models/index')

class Controller{
    static postPayment(req, res, next){
        let newPayment = req.body
        newPayment.order_id = req.params.orderId
        newPayment.status = "paid"
        Order.update({status: "paid"}, {where:{id: req.params.orderId}, returning: true})
        .then(order => {
            if (!order[0]) throw {name: "notFound", message: "order not found"}
            return Product.decrement({qty: newPayment.amount}, {where:{id: order[1][0].product_id}})
        })
        .then(() => {
            return Pembayaran.create(newPayment, {returning: true})
        })
        .then(data => res.status(201).json({message: 'success', data}))
        .catch(err => next(err))
    }

    static getPayment(req, res, next){
        if(req.params.id){
            Pembayaran.findOne({where: {id: req.params.id}})
            .then(data => {
                if (!data) throw {name: "notFound", message: "Pembayaran not found" }
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
        }
        else {
            Pembayaran.findAll()
            .then(data => {
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
        }
    }
}

module.exports = Controller