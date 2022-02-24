const express = require("express")
const path = require("path")
const app = express()
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')
const port= process.env.PORT || 3000


//Path declarations
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath=path.join(__dirname, '../src/templates/views')
const partialsPath= path.join(__dirname, '../src/templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index',{
    title:'weather',
    name:'Maria'
  })
})

app.get('/about', (req, res)=>{
res.render('about', {
  title: 'Weather App',
  name: 'Maria'
})
})

app.get('/help',(req,res)=>{
res.render('help', {
  helpText:'This is helpfu text',
  name:'Maria',
  title:'Help'
})
})

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error:'Should enter address for forecasting!'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
      if(error){
        return res.send({error})
      }
      forecast(latitude,longitude, (error, forecastData)=>{
        if(error){
          return res.send({error})
        }
        res.send({
          forecastdata: forecastData,
          location,
          address: req.query.address
         
        })
      })
  })



  // res.send({
  //   address: req.query.address
  })


// app.get('/products',(req,res)=>{
//   //console.log(req.query.search)
//   if(!req.query.search){
//     return res.send({
//       error:'please provide search item!'
//     })
//   }
//   res.send({
//     products: []
//   })
// })


app.get('/help/*', (req,res)=>{
  res.render('404', {
    title:'Error',
    name:'Maria',
    errorText:'Help article not found'
  })
})

app.get('*', (req,res)=>{
  res.render('404', {
    title:'Error',
    name:'Maria',
    errorText:'Page not found'
  })
})






app.listen(port, () => {
  console.log("Server is up and runningin server "+port);
});
