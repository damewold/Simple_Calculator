const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('server/public'));

//let the client know that you have received the input Numbers

app.post('/inputs', (req,res) =>{
  let numberObj=(req.body);
  number1=numberObj.number1;
  number2=numberObj.number2;
  console.log('Got input from client',numberObj);
  res.sendStatus(200);
})








app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })