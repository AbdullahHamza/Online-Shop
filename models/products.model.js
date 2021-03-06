const { promiseImpl } = require('ejs')
const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/online-shop'

const productSchema = mongoose.Schema({    //Product Schema
    name:String,
    image:String,
    price:Number,
    description:String,
    category:String
})

const Product = mongoose.model('product',productSchema) //Product model

exports.getAllProducts=() =>{

    //connect to db
    // get products
    // disconnect

    return new Promise ((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.find({})
        }).then(products =>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getProductsByCategory=(category) =>{

    return new Promise ((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.find({category : category})
        }).then(products =>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err =>{
            mongoose.disconnect()
            reject(err)
        } )
    })
}

exports.getProductById = (id) => {
    return new Promise ((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.findById(id)
        }).then(product =>{
            mongoose.disconnect()
            resolve(product)
        })
        .catch(err =>{
            mongoose.disconnect()
            reject(err)
        } )
    })
}


exports.getFristProduct = () => {
    return new Promise ((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.findOne({})
        }).then(product =>{
            mongoose.disconnect()
            resolve(product)
        })
        .catch(err => reject(err))
    })
}