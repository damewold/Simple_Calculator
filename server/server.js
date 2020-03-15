const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('server/public'));

//let the client know that you have received the input Numbers

let calcResult;
let numberArray=[];

app.post('/inputs', (req,res) =>{
  let numberObj=(req.body);
  number1=numberObj.number1;
  number2=numberObj.number2;
  operator=numberObj.operator;
  console.log('Got input from client',numberObj);
  if (numberObj.operator === 'add-btn') {
    result = Number(number1) + Number(number2);
  } else if (numberObj.operator  === 'subtract-btn') {
    result = Number(number1) - Number(number2)
  } else if (numberObj.operator  === 'multiply-btn') {
    result = Number(number1) * Number(number2)
  } else if (numberObj.operator  === 'divide-btn') {
    result =  Number(number1) / Number(number2)
  };
   calcResult={number1:number1,
    number2:number2,
    result:result
   };
  console.log(calcResult);

  res.sendStatus(200);
  numberArray.push(calcResult)
})









app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })