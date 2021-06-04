const express = require("express");
const router = express.Router();
const Food = require("../models/foods.model");
const auth = require("../auth-middleware");

router.get("/foods", auth, async function(request, response, next){

    try {
        let result = await Food.find();

        response.json(result);

    } catch (error) {
       return next(error)
    }

    //response.send("get request animals")
})

// get single animal by id
router.get("/foods/:foodsId", async function(request, response, next){
    try {
       let result = await Food.findById(request.params.foodsId)
       
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


router.post("/foods", auth, function(request, response, next){

    try {
        let food = new Food({
            product_name: request.fields.product_name,
            brand: request.fields.brand,
            animal: request.fields.animal,
            price: request.fields.price,
            weight: request.fields.weight,
        })
        food.save();

        response.status(201);
        response.json(food)

    } catch (error) {
       return next(error)
    }

})

router.patch("/foods/:foodsId", auth, async function(request, response, next){

    let { product_name, brand, animal, price, weight } = request.fields;
    let updateObject = {};

    if (product_name) updateObject.product_name = product_name;
    if (brand) updateObject.brand = brand;
    if (animal) updateObject.animal = animal;
    if (price) updateObject.price = price;
    if (weight) updateObject.weight = weight;
    //ctrl + d

    let food = await Food.findByIdAndUpdate(request.params.foodsId, updateObject, {new:true})

    response.json(food)

})

router.delete("/foods/:foodsId", auth, async function(request, response, next){

    try {
        await Food.findByIdAndDelete(request.params.foodsId)

        response.status(200)
        response.end()
    } catch (error) {
        return next(error)
    }

})

module.exports = router;