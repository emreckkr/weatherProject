const express = require("express");
//for  recieve data  from api we use https npm 
const https = require("https");
const app = express();
const bodyParser= require("body-parser");

//to get data from sheet.
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

    
});

app.post("/",function(req,res){
    console.log(req.body.cityName);
    const apiKey = "254500642a17565c333a864c7f4411f6";
    const query =req.body.cityName;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    
    //to make requests with https
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData= JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const description=weatherData.weather[0].description;
            const icon = weatherData.weather[0].id;
            const iconUrl="https://openweathermap.org/img/wn/"+icon+ "@2x.png";
            console.log(temp);
            console.log(description);
            res.write("<h1>Current temperature of "+query+" is " + temp + " degree</h1>");
            res.write("Description of weather is " + description + ". ");
            res.write("<img src="+ iconUrl + ">");
            res.send();
            })
    })
})



app.listen(3000,function(){
    console.log("Server is running on port 3000.");
})