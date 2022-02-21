const request= require('request')

const geocode=(address, callback)=>{
    const url='http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWFyaWExY2hlcmlhbiIsImEiOiJja3pjYTI0Z2cwdHRyMm9zNnU2MTJtazZ3In0.3bghLYeDnn7I0rBEK09uHg'
     request({url, json:true},(error, {body}={})=>{
       if(error){
           callback('Unable to connect to server!', undefined)
       }else if(body.features.length===0){
           callback('Entered location is unable to find, please try again!',undefined)
       }else{
           callback(undefined, {
               latitude: body.features[0].center[0],
               longitude: body.features[0].center[1],
               location: body.features[0].place_name
            })
       }
    })
}

module.exports= geocode 