/***************************************
* Author: Shivam Patel
* Email: Shivam_Patel3@student.uml.edu
* GitHub: shivy02
***************************************/

function captureValues() {
  //capture the values needed
  let input1 = parseInt(document.getElementById("row-one").value);
  let input2 = parseInt(document.getElementById("row-two").value);
  let input3 = parseInt(document.getElementById("col-one").value);
  let input4 = parseInt(document.getElementById("col-two").value);
  let table = document.getElementsByClassName("table");

  //store the captured values in an object to pass by reference
  var values = {
    x1: input1,
    x2: input2,
    y1: input3,
    y2: input4,
    t: table,
  };

  //check order of the values from the form and swap
  checkOrder(values);

  //return values obj
  return values;
}

function checkOrder(values) {
  //swap values if needed
  if (values.x1 > values.x2) {
    var temp = values.x1;
    var temp2 = values.x2;
    values.x1 = temp2;
    values.x2 = temp;
  }

  if (values.y1 > values.y2) {
    var temp = values.y1;
    var temp2 = values.y2;
    values.y1 = temp2;
    values.y2 = temp;
  }
}

//generate the table based on the values by appeding to the tableHTMl string
function generateTable() {

  let values = captureValues(); //get values object

  //first cell
  var tableHTML = "<thead> <tr> <th> </th>";
 
  //initialize horizontal axis
  for (var i = values.x1; i <= values.x2; i++) {
    tableHTML += "<th>" + i + "</th>";
  }
  //end of first row
  tableHTML += "</tr> </thead> <tbody> ";

  //initialize vertical range and row values
  for (var j = values.y1; j <= values.y2; j++) {
    tableHTML += '<tr> <th scope="row">' + j + "</td>";
    for (var i = values.x1; i <= values.x2; i++) {
      tableHTML += "<td>" + j * i + "</td>";
    }
    tableHTML += "</tr>";
  }
  tableHTML += "<tbody";
  values.t[0].innerHTML = tableHTML; //need to index table due to getElementByClass
}

//generate the table when the document is fully validated using its id
$(document).ready(function () {
    // Initialize form validation
    $("#inputForm").validate({
        rules: {
            num1: { required: true, checkFloat: true, checkRange: true },
            num2: { required: true, checkFloat: true, checkRange: true },
            num3: { required: true, checkFloat: true, checkRange: true },
            num4: { required: true, checkFloat: true, checkRange: true },
        },
        messages: {
            num1: {
                required: "Both bounds are required for the horizontal axis.",
                number: "Please enter a valid integer.",
            },
            num2: {
                required: "Both bounds are required for the horizontal axis.",
                number: "Please enter a valid integer.",
            },
            num3: {
                required: "Both bounds are required for the vertical axis.",
                number: "Please enter a valid integer.",
            },
            num4: {
                required: "Both bounds are required for the vertical axis.",
                number: "Please enter a valid integer.",
            },
        },
    });

    // Enable/disable submit button based on form validity
    $("#inputForm").on("blur keyup", function () {
        if ($("#inputForm").validate().checkForm()) {
            $("#submitButton").prop("disabled", false);
        } else {
            $("#submitButton").prop("disabled", true);
        }
    });

    // Click event for the submit button
    $("#submitButton").click(function () {
        if ($("#inputForm").valid()) {
            generateTable();
        }
    });
});

//additional functions
jQuery.validator.addMethod(
  "checkFloat",
  function (value, element) {
    return this.optional(element) || Number.isInteger(parseFloat(value));
  },
  "Floats are not supported, please enter integers only."
);

//custom rule to ensure the range entered does not crash website
jQuery.validator.addMethod(
  "checkRange",
  function (value, element) {
    return this.optional(element) || (value >= -50 && value <= 50);
  },
  "Please enter an integer between -50 and 50"
);
