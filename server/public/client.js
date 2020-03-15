//check if the client.js sourced properly
console.log('Hello');
//check if the jquery file sourced properly
$(document).ready(onReady);

//write function onReady

function onReady() {
    console.log('in onReady');
    // $('#add-btn').on('click', operationCalculate);
    // $('#subtract-btn').on('click', operationCalculate);
    // $('#Multiply-btn').on('click', operationCalculate);
    // $('#divide-btn').on('click', operationCalculate);
    $('#submit-btn').on('click', postInputToServer);
    // $('#clear-btn').on('click', clearHistory);

};


//write postInputToServer function

function postInputToServer(event) {
    event.preventDefault();
    console.log('In postInputToServer');

    let number1 = $('#number1-in').val();
    let number2 = $('#number2-in').val();
    $('#number1-in').val('');
    $('#number2-in').val('');

    if (validateInputs(number1, number2)) {

        let inputNumbers = { number1, number2 };

        $.ajax({
            method: 'POST',
            url: '/inputs',
            data: inputNumbers
        })
            .then(function (response) {
                console.log('Got input Numbers from Server', response);
            })
            .catch(function (error) {
                console.log('Error:', error);
            })

        operationCalculate();
    };

};

function validateInputs( number1, number2 ) {
    event.preventDefault();
    console.log( 'Validating inputs' );
    if ( !number1 || !number2 ) {
     alert( 'Two inputs are required!' );
      return false;
    }else {
      return true;
    }
  };

