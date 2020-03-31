const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('server/public'));

//let the client know that you have received the input Numbers

let calcResult;
let numberArray = [];
//write post app that sends status that it got the object from the client side
app.post('/inputs', (req, res) => {
  let numberObj = (req.body);
  number1 = numberObj.number1;
  number2 = numberObj.number2;
  operator = numberObj.operator;
  console.log('Got input from client', numberObj);
//write a conditional that will process and calculate using the info from th object
  if (numberObj.operator === 'add-btn') {
    result = Number(number1) + Number(number2);
    key = '+';
  } else if (numberObj.operator === 'subtract-btn') {
    result = Number(number1) - Number(number2)
    key = '-';
  } else if (numberObj.operator === 'multiply-btn') {
    result = Number(number1) * Number(number2)
    key = '*'
  } else if (numberObj.operator === 'divide-btn') {
    result = Number(number1) / Number(number2)
    key = '/'
  };
  calcResult = {
    number1: number1,
    number2: number2,
    result: result,
    operator: key,
  };
//push the resultant object into an empty array
  console.log(calcResult);
numberArray.push(calcResult);
//send status to the client that server received the object
  res.sendStatus(200);

})
//write a get app that will send the array with all the resultant information to the client
app.get('/history', (req, res) => {
  console.log('Got request from client');
  res.send(numberArray);
})
//write a delete app that will reset by setting the number array to empty
app.delete('/delete', (req,res)=>{
  console.log('Reset History',req.body)
  numberArray=[];
  res.sendStatus(200);
})




app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})