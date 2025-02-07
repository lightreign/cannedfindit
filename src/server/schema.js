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
        index: true,
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
        required: true,
        index: true,
    }
};

const brandSchema = new Schema(brandSchemaDef);
brandSchema.path('name').index({ unique: true });

const productSchemaDef = {
    type: {
        type: typeSchema,
        required: true,
        index: true,
    },
    brand: {
        type: brandSchema,
        required: true,
    },
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
    product: {
        type: productSchema,
        required: true,
    },
    location: {
        type: locationSchema,
        required: true,
    },
    description: {
        type: String
    },
    expiry: {
        type: Date,
        required: true,
        index: true,
    },
    consumed: {
        type: Date,
        required: false
    }
}, { timestamps: true });

console.log(itemSchema);

// Models
export const User = mongoose.model('User', userSchema);
export const Type = mongoose.model('Type', typeSchema);
export const Brand = mongoose.model('Brand', brandSchema);
export const Product = mongoose.model('Product', productSchema);
export const Location = mongoose.model('Location', locationSchema);
export const Item = mongoose.model('Item', itemSchema);
