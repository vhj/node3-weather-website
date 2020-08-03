const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4f7cf41b3cfdb8b9936abe1d0f6c2587&units=f&query='+latitude+','+longtitude
    request({url, json:true}, (error, {body}) =>{
        if(error){
            callback(error, undefined)
        }else if (body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined,  body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' deggrees out. It feels like '+body.current.feelslike)            
        }
    })
} 

module.exports =  forecast
