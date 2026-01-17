import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import taskRoutes from './routes/tasks.routes.js'
import authRoutes from './routes/auth.routes.js'
const app = express();

//Middlewares
app.use(morgan('dev'))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cors(
    {origin: [process.env.CORS_ORIGIN || 'http://localhost:5173'],
    credentials: true
}
));

//Rutas
app.get("/", (req, res) => {
    res.json({
        message:"Welcome to my API"
    })
})
app.use('/api',taskRoutes)
app.use('/api',authRoutes)

//Error handler
app.use((err, req, res, next) => {
    res.status(500).json({
        status: "Error",
        message: err.message
    })
})


export default app;