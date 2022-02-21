console.log("Javascript loading!!");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });



const weatherForm=  document.querySelector('form')
const input= document.querySelector('input')
const outputData1= document.querySelector('#message-1')
const outputData2= document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
e.preventDefault()
const search= input.value

outputData1.textContent='Loading!!!!...'
outputData2.textContent=''
fetch("http://localhost:3000/weather?address="+search).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
      outputData2.textContent= data.error
    } else {
      console.log(data.location);
      console.log(data.forecastdata);
      outputData1.textContent=data.location
      outputData2.textContent=data.forecastdata

    }
  });
});



//console.log(search)
})






