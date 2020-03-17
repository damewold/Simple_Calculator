//check if the client.js sourced properly
console.log('Hello');
//check if the jquery file sourced properly
$(document).ready(onReady);

//write function onReady

function onReady() {
    console.log('in onReady');
    $('.key-operator').on('click', postInputToServer);
    $('#submit-btn').on('click', appendHistoryToDom);
    $('#clear-btn').on('click', clearHistory);

};


//write postInputToServer function

function postInputToServer(event) {
    event.preventDefault();
    console.log('In postInputToServer');
    $('.key-operator').removeClass('selected');
    let operator=null;
//get the operator to be a variable 
    operator = $(this).val();
    console.log('operator:', $(this).val());
    $(this).addClass('selected')
    let number1 = $('#number1-in').val();
    let number2 = $('#number2-in').val();
    $('#number1-in').val('');
    $('#number2-in').val('');
//place the operator as a variable together with the number inputs into an object
    if (validateInputs(number1, operator, number2)) {

        let inputNumbers = { number1, operator, number2 };

//send the object to the server side so that it can be used to do the calculation
        $.ajax({
            method: 'POST',
            url: '/inputs',
            data: inputNumbers
        })
//check if you have received a response from the server
            .then(function (response) {
                console.log('Got response from Server', response);
            })
            .catch(function (error) {
                console.log('Error:', error);
            })
       
    };

 };


//write function validateInputs that will make sure all inputs and operator submitted 
    function validateInputs(number1, operator, number2) {
        event.preventDefault();
        console.log('Validating inputs', operator, number1, number2);
        if (operator==='') {
            alert('Click on operator!');
            return false;
        } else if (!number1 || !number2) {
            alert('Both inputs need to be filled!')
        } else {
            return true;
        }
    };

    //write appendHistoryToDome

    function appendHistoryToDom(event) {
        event.preventDefault();
       console.log('in appendHistoryToDom');
    //send a request for the information to displayed on the DOM using the 'GET' method
        $.ajax({
            method: 'GET',
            url: '/history',
        })
            .then(function (response) {
                console.log('Got response from server', response)
    //empty the container that will be used to append the history of calculations excuted          
                     $('#containerList').empty();
                for (i = 0; i < response.length; i++) {
                    $('#resultTable').empty();
    //append the result and history to the DOM
                    $('#resultTable').append(`<tr><th>${response[i].result}</th></tr>`)
                    $('#containerList').append(`<li>${response[i].number1}${response[i].operator}${response[i].number2}=${response[i].result}</li>`)
                }
            })
            .catch(function (error) {
                console.log('error', error)
            })


    };
//write function clearHistory that will clear and reset 
    function clearHistory( event) {
        // event.preventDefault();
        console.log('in clearTheDom');
        $('resultTable').empty();
//send a request to server to reset using the 'DELETE' method
        $.ajax({
            method: 'DELETE',
            url: '/delete',
           
        })
            .then(function (response) {
                console.log('Reset calculator', response);
                appendHistoryToDom();
              

            })
            .catch(function (error) {
                console.log('Error', error);
            })

    }





