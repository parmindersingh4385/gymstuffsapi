import mongoose from 'mongoose';

//mongodb+srv://kaur1kulvir:9988641591@ptk@cluster0.heeoinj.mongodb.net/db_products?retryWrites=true&w=majority&appName=Cluster0

export const connectDB = async () => {
    /* const MONGO_URI =
        'mongodb+srv://parminder:9988641591%40ptk@cluster0.ix992.mongodb.net/db_users?retryWrites=true&w=majority&appName=Cluster0';
 */

    const MONGO_URI =
        'mongodb+srv://kaur1kulvir:9988641591%40ptk@cluster0.heeoinj.mongodb.net/db_products?retryWrites=true&w=majority&appName=Cluster0';
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected.........');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
