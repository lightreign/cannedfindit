import mongoose, { Schema } from "mongoose";

// Schema
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: Date,
});

const locationSchemaDef = {
    name: {
        type: String,
        required: true,
    }
};

const locationSchema = new Schema(locationSchemaDef);
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

const productSchema = new Schema(productSchemaDef);

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
    expiry: {
        type: Date,
        required: true
    },
});

// Models
export const User = mongoose.model('User', userSchema);
export const Type = mongoose.model('Type', typeSchema);
export const Brand = mongoose.model('Brand', brandSchema);
export const Product = mongoose.model('Product', productSchema);
export const Location = mongoose.model('Location', locationSchema);
export const Item = mongoose.model('Item', itemSchema);
