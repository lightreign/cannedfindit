import mongoose, { Schema } from "mongoose";

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

// Schema
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

const itemSchema = new Schema({
    type: typeSchema,
    location: locationSchema,
    expiry: {
        type: Date,
        required: true
    },
});

// Models
export const User = mongoose.model('User', userSchema);
export const Type = mongoose.model('Type', typeSchema);
export const Location = mongoose.model('Location', locationSchema);
export const Item = mongoose.model('Item', itemSchema);
