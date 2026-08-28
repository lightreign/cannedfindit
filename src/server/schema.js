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

const itemLocationSchema = new Schema(locationSchemaDef, { timestamps: true });

const typeSchemaDef = {
    name: {
        type: String,
        required: true
    }
};

const productTypeSchema = new Schema(typeSchemaDef);

const brandSchemaDef = {
    name: {
        type: String,
        required: true,
    }
};

const productBrandSchema = new Schema(brandSchemaDef);

const productSchemaDef = {
    type: {
        type: productTypeSchema,
        required: true,
    },
    brand: {
        type: productBrandSchema,
        required: true,
    },
    weight: Number,
    volume: Number,
    barcode: String,
};

const itemProductSchema = new Schema(productSchemaDef, { timestamps: true });

const itemSchema = new Schema({
    product: {
        type: itemProductSchema,
        required: true,
    },
    location: {
        type: itemLocationSchema,
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

const typeSchema = new Schema(typeSchemaDef, { timestamps: true });
typeSchema.index({ name: 1 }, { unique: true });

const brandSchema = new Schema(brandSchemaDef, { timestamps: true });
brandSchema.index({ name: 1 }, { unique: true });

const locationSchema = new Schema(locationSchemaDef, { timestamps: true });
locationSchema.index({ name: 1 }, { unique: true });

const productSchema = new Schema(productSchemaDef, { timestamps: true });
productSchema.index({
    type: 1,
    brand: 1,
    weight: 1,
    volume: 1,
}, {
    unique: true
});

// Models
export const User = mongoose.model('User', userSchema);
export const Type = mongoose.model('Type', typeSchema);
export const Brand = mongoose.model('Brand', brandSchema);
export const Product = mongoose.model('Product', productSchema);
export const Location = mongoose.model('Location', locationSchema);
export const Item = mongoose.model('Item', itemSchema);
