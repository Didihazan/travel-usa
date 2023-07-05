const express = require('express')

const morgan = require('morgan')
// const articlesRoutes = require('./api/routes/articles')
// const categoriesRoutes = require('./api/routes/categories')
// const userRoutes = require('./api/routes/users')
const mongoose = require('mongoose')
// const checkAuth = require("./api/middlewares/checkAuth");
const app = express()
mongoose.
connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@a-new-travel-project.suijbad.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected')
})

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
// routes
// app.use('/articles', articlesRoutes)
// app.use('/categories',checkAuth, categoriesRoutes)
// app.use('/users', userRoutes)
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app
