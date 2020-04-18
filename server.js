const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const key = '79930c4365d66775142c8c56073398bc'

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req,res) =>{
    res.render('index', {weather: null, error: null})
    })
app.post("/", (req,res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`
    request(url, (err, response, body) => {
        if(err) {
            res.render('index', {weather : null , error : 'Error please do it agaiN?'})
        } else {
            let weather = JSON.parse(body)

            if(weather.main == undefined) {
               res.render('index', {weather : null, error : 'Error please do it agaiN?'})  
            } else {
                let weatherText = `It's about ${weather.main.temp} in ${weather.name}`
                res.render('index', {weather : weatherText, error: null})
            }
        }
    })
})
app.listen(3000, () => {
    console.log("server is listening on port 3000")

})
