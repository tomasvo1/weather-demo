const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express ()
const port = process.env.PORT || 3000

// Defined path for express config 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req,res) => {
    res.render('index', {
        title: 'this is the best weather app ever made',
        name: 'TV'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'no search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'this is the best about page ever made',
        name: 'TV'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'this is the best help page ever made',
        name: 'TV'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'whoopsy daisy!',
        name: 'TV',
        errorMsg: 'this is the best 404 page ever made'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})