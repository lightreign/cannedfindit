import mongoose from "mongoose";
const url = process.env.MONGODB_URI || `mongodb://localhost:27017/inventory`;
let db = null;

export default async function connectDatabase() {
    if (db) return db;

    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    db = mongoose.connection;

    db.once('open', _ => {
        console.log('Database connected:', url)
    });

    db.on('error', err => {
        console.error('connection error:', err)
    });

    return db;
}
