// import
const { deepStrictEqual } = require('assert')
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
// creating an instance of an express ap
const app = express()

//MIDDLEWARES
// tell express that I'm using ejs as the view engine
app.set('view engine', 'ejs')
//tell my app that I'm using ejs layouts
app.use(ejsLayouts)
// body parser middleware
app.use(express.urlencoded({extended: false}))
// allow non GET/POST methods from an HTML5 form 
app.use(methodOverride('_method'))

const PORT = 8000

// HOME ROUTE
app.get('/', (req, res)=> {
    res.render('home.ejs')
})

app.use('/dinosaurs', require('./controllers/dinosaurs'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))


app.listen(PORT, ()=> {
    console.log(`cruddy dinos 🦖 on Port ${PORT}`)
})