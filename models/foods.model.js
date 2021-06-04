const {Schema, model, SchemaTypes} = require("mongoose");

const FoodsSchema = new Schema({
    product_name: SchemaTypes.String,
    brand: SchemaTypes.String,
    animal: SchemaTypes.String,
    price: SchemaTypes.Decimal128,
    weight: SchemaTypes.Number,
});

const Food = model("Food", FoodsSchema);

module.exports = Food;