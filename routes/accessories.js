const express = require("express");
const router = express.Router();
const Accessories = require("../models/accessories.model");
const auth = require("../auth-middleware");

router.get("/accessories", auth, async function(request, response, next){

    try {
        let result = await Accessories.find();

        response.json(result);

    } catch (error) {
       return next(error)
    }

    //response.send("get request animals")
})

// get single animal by id
router.get("/accessories/:accessoriesId", async function(request, response, next){
    try {
       let result = await Accessories.findById(request.params.accessoriesId)
       
       //return 404 if no result is found
       if (result == null) {
        //response.status(404)
        //response.end()
           return next(new Error("Cannot find requested resource"))
       }

       response.status(200)
       response.json(result)

    } catch (error) {
       return next(error)
    }
})


router.post("/accessories", auth, function(request, response, next){

    try {
        let accessories = new Accessories({
            product: request.fields.product,
            brand: request.fields.brand,
            product_group: request.fields.product_group,
            price: request.fields.price,
        })
        accessories.save();

        response.status(201);
        response.json(accessories)

    } catch (error) {
       return next(error)
    }

})

router.patch("/accessories/:accessoriesId", auth, async function(request, response, next){

    let { product, brand, product_group, price} = request.fields;
    let updateObject = {};

    if (product) updateObject.product = product;
    if (brand) updateObject.brand = brand;
    if (product_group) updateObject.product_group = product_group;
    if (price) updateObject.price = price;
    //ctrl + d

    let accessories = await Accessories.findByIdAndUpdate(request.params.accessoriesId, updateObject, {new:true})

    response.json(accessories)

})

router.delete("/accessories/:accessoriesId", auth, async function(request, response, next){

    try {
        await Accessories.findByIdAndDelete(request.params.accessoriesId)

        response.status(200)
        response.end()
    } catch (error) {
        return next(error)
    }

})

module.exports = router;