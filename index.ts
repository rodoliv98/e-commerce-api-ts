import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import loginRoute from './src/routes/loginRoute.js';
import registerRoute from './src/routes/registerRoute.js';
import productRoute from './src/routes/productRoute.js';
import userProfileRoute from './src/routes/userProfileRoute.js';
import userAddressRoute from './src/routes/userAddressRoute.js';
import adminRoute from './src/routes/adminRoute.js';
import purchaseRoute from './src/routes/purchaseRoute.js';
import historicRoute from './src/routes/historicRoute.js';
import { errorHandler } from "./src/middleware/errorHandler.js";
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.set('trust-proxy', true);
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static('public'));
mongoose.connect(process.env.MONGO_URL as string)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.log(error));

app.use('/', loginRoute);
app.use('/', registerRoute);
app.use('/', productRoute);
app.use('/user', userProfileRoute);
app.use('/user', userAddressRoute);
app.use('/admin', adminRoute);
app.use('/', purchaseRoute);
app.use('/user', historicRoute);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));