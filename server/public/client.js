//check if the client.js sourced properly
console.log('Hello');
//check if the jquery file sourced properly
$(document).ready(onReady);

//write function onReady

function onReady() {
    console.log('in onReady');
    $('.key-operator').on('click', postInputToServer);
    $('.key-operator').on('click', appendHistoryToDom);
    // $('#clear-btn').on('click', clearHistory);

};


//write postInputToServer function

function postInputToServer(event) {
    event.preventDefault();
    console.log('In postInputToServer');
    $('.key-operator').removeClass('selected');
    operator = this.id;
    $(this).addClass('selected')
    let number1 = $('#number1-in').val();
    let number2 = $('#number2-in').val();
    $('#number1-in').val('');
    $('#number2-in').val('');

    // if (validateInputs(number1,operator, number2)) {

    let inputNumbers = { number1, operator, number2 };


    $.ajax({
        method: 'POST',
        url: '/inputs',
        data: inputNumbers
    })
        .then(function (response) {
            console.log('Got response from Server', response);
        })
        .catch(function (error) {
            console.log('Error:', error);
        })
    //    appendHistoryToDom();
};

// };



// function validateInputs( number1,operator, number2 ) {
//     event.preventDefault();
//     console.log( 'Validating inputs',operator,number1,number2 );
//     if ( !number1 || !number2 ) {
//      alert( 'Two inputs are required!' );
//       return false;
//     }else {
//       return true;
//     }
//   };

//write appendHistoryToDome

function appendHistoryToDom(event) {
    event.preventDefault();
    console.log('in appendHistoryToDom');
    $.ajax({
        method: 'GET',
        url: '/history',
    })
        .then(function (response) {
            console.log('Got response from server', response)
                // $('#resultTable').empty();
                $('#resultTable').append(`<tr><td>${response.result}</td></tr>`)
                // $('#containerList').empty();
                $('#containerList').append(`<li>${response.number1}${response.operator}${response.number2}=${response.result}</li>`)
            
        })
        .catch(function (error) {
            console.log('error', error)
        })


}





