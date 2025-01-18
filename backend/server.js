import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import path from 'path';
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

//database config
connectDB();

//esmodule fix
const __filename= fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
};


//middlewares
// app.use(express.json());
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, '../frontend/build')))


//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

//rest api
app.use('*', function(req, res){
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Routes
app.get('/', (req, res) => {
  res.send("<h1>Welcome to e-commerce app<h1>");
});

// Connect to MongoDB and start server
const PORT = process.env.POST || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`);

});

