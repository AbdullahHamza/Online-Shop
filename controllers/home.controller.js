const productsModel = require('../models/products.model')

exports.getHome = (req,res,next)=>{
            
                // get category
                // make a promise
                // if category && category !== all
                //      filter         (use getProductsByCategory)
                // else
                //      render alll    (use getAllProducts)
                
    //console.log(req.session.userId)
    let category = req.query.category
    let productsPromise
    let valedCategories = ['pants','t-shirts']
    if(category && valedCategories.includes(category)) productsPromise =productsModel.getProductsByCategory(category)
    else productsPromise =productsModel.getAllProducts()
    
    productsPromise.then(products=>{
        res.render('index',{
            products:products,
            isUser:req.session.userId
        })
    })
}