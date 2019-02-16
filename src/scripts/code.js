
$(document).ready();
function submitter(language, message) {
	//alert(language.value)
	//alert(message.value)
	alert("Thank you! Your code has been submitted for testing")
	//testCases(language.value, message.value)
	hello1('testing', message.value.split(""))
}



//		$("#testing").innerHTML += value

function hello1(id, data) {
	f = document.getElementById(id)
	// data.forEach(value => {
	// 	$(f).append('<li class="testCase">' + value + "</li>")
	// 	console.log()
	// });
	for (var i = 1; i<=data.length; i++) {
		$(f).append('<li class="testCase">Test Case ' + i + ": " + data[i-1] + "</li>")
	}
}


function testCases(language, message) {
	//api call, returns some sort of json
	var request = new XMLHttpRequest();

	request.open('GET', URL, true);
	request.onload = function () {

	  // Begin accessing JSON data here
	  var data = JSON.parse(this.response);

	  if (request.status >= 200 && request.status < 400) {
	    data.forEach(movie => {
	      console.log(movie.title);
	    });
	  } else {
	    console.log('error');
	  }
	}

	request.send();


}
