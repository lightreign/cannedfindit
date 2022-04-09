import mongoose, { Schema } from "mongoose";

// Schema
const userSchema = new Schema({
    id: Number,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false
    }
});

const locationSchemaDef = {
    name: {
        type: String,
        required: true,
    }
};

const locationSchema = new Schema(locationSchemaDef, { timestamps: true });
locationSchema.path('name').index({ unique: true });

const typeSchemaDef = {
    name: {
        type: String,
        required: true
    }
};

const typeSchema = new Schema(typeSchemaDef);
typeSchema.path('name').index({ unique: true });

const brandSchemaDef = {
    name: {
        type: String,
        required: true
    }
};

const brandSchema = new Schema(brandSchemaDef);
brandSchema.path('name').index({ unique: true });

const productSchemaDef = {
    type: typeSchemaDef,
    brand: brandSchemaDef,
    weight: Number,
    volume: Number,
};

const productSchema = new Schema(productSchemaDef, { timestamps: true });

productSchema.index({
    type: 1,
    brand: 1,
    weight: 1,
    volume: 1,
}, {
    unique: true
});

const itemSchema = new Schema({
    product: productSchemaDef,
    location: locationSchemaDef,
    description: {
        type: String
    },
    expiry: {
        type: Date,
        required: true
    },
    consumed: {
        type: Date,
        required: false
    }
}, { timestamps: true });

itemSchema.index({ 'product.type.name': 1 });
itemSchema.index({ 'product.brand.name': 1 });
itemSchema.index({ 'location.name': 1 });
itemSchema.index({ expiry: 1 });

// Models
export const User = mongoose.model('User', userSchema);
export const Type = mongoose.model('Type', typeSchema);
export const Brand = mongoose.model('Brand', brandSchema);
export const Product = mongoose.model('Product', productSchema);
export const Location = mongoose.model('Location', locationSchema);
export const Item = mongoose.model('Item', itemSchema);
