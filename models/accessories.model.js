const {Schema, model, SchemaTypes} = require("mongoose");

const AccessoriesSchema = new Schema({
    product: SchemaTypes.String,
    brand: SchemaTypes.String,
    product_group: SchemaTypes.String,
    price: SchemaTypes.Decimal128,
});

const Accessories = model("Accessories", AccessoriesSchema);

module.exports = Accessories;