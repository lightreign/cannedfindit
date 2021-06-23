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

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const typeSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const productSchema = new Schema({
    type: typeSchema,
    brand: brandSchema,
    weight: Number,
    volume: Number,
});

const itemSchema = new Schema({
    product: productSchema,
    location: locationSchema,
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
