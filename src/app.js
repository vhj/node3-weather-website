const path = require ('path')
const express = require('express')
const hbs = require('hbs')  //Only need it for partials
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3001

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vimal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:"About Us",
        name:"Vimal"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        msg: 'Some useful help',
        name:'Vimal'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longtitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location: location,
                address: req.query.address,
                forecast: forecastData
            })
        })

    })
})

app.get('/products', (req,res) => {
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title:'404',
        name:'Vimal',
        errorMsg: 'Help Page Not found'
    })
})

app.get('*',(req,res) =>{
    res.render('404', {
        title:'404',
        name:'Vimal',
        errorMsg: 'Page Not found'
    })
})
app.listen(port, () =>{
     console.log('Server is up on port '+port+'.')
})