const {Product} = require('../models/index')

class Controller{
    static getProducts(req, res, next){
        if(req.params.id){
            Product.findOne({where: {id: req.params.id}})
            .then(data => {
                if (!data) throw {name: "notFound", message: "Product not found" }
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
        }
        else {
            Product.findAll()
            .then(data => {
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
        }
    }

    static postProduct(req, res, next){
        let newProduct = req.body
        Product.create(newProduct, {returning:true})
            .then(data => res.status(201).json({message: 'success', data}))
            .catch(err => next(err))
    }

    static putProduct(req, res, next){
        Product.update(req.body, {where: {id:req.params.id}, returning: true})
            .then((data) => {
                if(data[0] == 0) throw({name: "notFound", message: "Product not found" })
                res.status(200).json({message: "success", data})
            })
            .catch(err => next(err))
    }

    static delProduct(req, res, next){
        Product.destroy({where:{id: req.params.id}})
            .then((data) => {
                if(data == 0) throw({name: "notFound", message: "Product not found"})
                console.log("data deleted")
                res.status(200).json({message: "success"})
            })
            .catch(err => next(err))
    }
}

module.exports = Controller