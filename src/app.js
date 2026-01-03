import express from 'express';
import morgan from 'morgan';
import taskRoutes from './routes/tasks.routes.js'
const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}));



app.use(taskRoutes)


app.get("/", (req, res) => {
    res.json({
        message:"Welcome to my API"
    })
})

app.get('/test', (req, res) => {
    throw new Error('My custom error!')
    res.send("test")
})


app.use((err, req, res, next) => {
    res.status(500).json({
        status: "Error",
        message: err.message
    })
})




export default app;