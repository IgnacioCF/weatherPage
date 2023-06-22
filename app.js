


const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
//this is the necessary code 

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req,res){
console.log(req.body.cityName);

const query = req.body.cityName
const apiKey = "a79a87134cea745fd149900779ae7c7d"
const unit = "units=metric"

//https://api.openweathermap.org/
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&"+ unit +"&lang=es"

https.get(url, function(response){
    console.log(response. statusCode);

    response.on("data", function(data){
        JSON.parse(data);
        const weatherData = JSON.parse(data);
        
        console.log(weatherData);

        const temp = weatherData.main.temp
        const place = weatherData.name
        const description = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        // these all are the path
        const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
        const weatherText = "<h1> Today's temperature in <br>" + query + " is " + temp + " the sky is like " + description + " </h1>"
        
       console.log(weatherText)

        res.write(weatherText)
        res.write("aloha, check the image, cool isn't it?</br>Server is up and Running")
        // we can add html code 
        res.write("<img src=" + imageURL + ">");

        res.send()


// we just are alow to use one send, when we call send es the end, so we placed in the end

        const object = {
            name: "nacho",
            favoriteFood:"Laksa"

            
        }

        console.log (JSON.stringify(object));

    })
})

    // res.send("<br> Hakuna - Matata !</br>Server is up and Running")
console.log("Post request recived");

})


app. listen(3000,function(){
    console.log("server is running on port 3000.")
});

//JSON.parse   ....... easy to see as a javascript text
// JASON.stringify  ...... hard to read as a json text

// we can manipulate parameters de url in web postman.co 

// install      npm i body-parser
