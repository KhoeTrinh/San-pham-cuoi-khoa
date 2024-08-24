import express from 'express';

const app = express();

import dotenv from 'dotenv'

dotenv.config()

import connectDB from './configs/db.js'

connectDB()

const port = process.env.PORT || 8000

app.use(express.json())

import userRoutes from './routes/usersRoutes.js'
import productRoutes from './routes/productRoutes.js'
import productTypeRoutes from './routes/productTypeRoutes.js'

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/productType', productTypeRoutes)

app.listen(port, () => {
    console.log('Server running on port:' + port);
});
