import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoute from './src/routes/authRoute.js';
import loginRoute from './src/routes/loginRoute.js';
import registerRoute from './src/routes/registerRoute.js';
import productRoute from './src/routes/productRoute.js';
import userProfileRoute from './src/routes/userProfileRoute.js';
import userAddressRoute from './src/routes/userAddressRoute.js';
import adminRoute from './src/routes/adminRoute.js';
import purchaseRoute from './src/routes/purchaseRoute.js';
import historicRoute from './src/routes/historicRoute.js';
import { rateLimit } from 'express-rate-limit';
import { errorHandler } from "./src/middleware/errorHandler.js";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? process.env.PROD_URL : process.env.DEV_URL,
    credentials: true,
};

if (process.env.NODE_ENV === 'production') {
    app.set('trust-proxy', true);
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
    mongoose.connect(process.env.MONGO_URL_PROD as string)
            .then(() => console.log('Connected to MongoDB prod'))
            .catch((error) => console.log(error));
} else {
    mongoose.connect(process.env.MONGO_URL_DOCKER as string)
            .then(() => console.log('Connected to MongoDB dev'))
            .catch((error) => console.log(error));
}

const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: 'Muitas requisições, tente novamente mais tarde'
});

app.use('/', apiLimiter);
app.use('/api/v1', authRoute);
app.use('/api/v1', loginRoute);
app.use('/api/v1', registerRoute);
app.use('/api/v1', productRoute);
app.use('/api/v1/user', userProfileRoute);
app.use('/api/v1/user', userAddressRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1', purchaseRoute);
app.use('/api/v1/user', historicRoute);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));