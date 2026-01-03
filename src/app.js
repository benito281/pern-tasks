import express from 'express';
import morgan from 'morgan';
import taskRoutes from './routes/tasks.routes.js'
import authRoutes from './routes/auth.routes.js'
const app = express();

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}));

//Rutas
app.get("/", (req, res) => {
    res.json({
        message:"Welcome to my API"
    })
})
app.use(taskRoutes)
app.use(authRoutes)


app.get('/test', (req, res) => {
    throw new Error('My custom error!')
    res.send("test")
})

//Error handler
app.use((err, req, res, next) => {
    res.status(500).json({
        status: "Error",
        message: err.message
    })
})




export default app;