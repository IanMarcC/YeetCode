// function submitter(language, message) {
// 	//alert(language.value)
// 	//alert(message.value)
// 	alert("Thank you! Your code has been submitted for testing")
// 	//testCases(language.value, message.value)
// 	hello1('testCases', message.value.split(""))
// }



//		$("#testing").innerHTML += value

let testCaseNumber = 0;
const numParams = 2;
function parser() {
	var arr = window.location.href.split('?');
	obj = arr.pop()
	fields = obj.split("+")
	fields = fields.map(field =>{
		return (field.split("%20")).join(" ");
	})
	//fields[1] = (fields[1].split("%20")).join(" ")
	console.log(fields)
	console.log(document.getElementById("challenge"))
	document.getElementById("challenge").getElementsByTagName("H1")[0].innerHTML = fields[0];
	document.getElementById("challenge").getElementsByTagName("H2")[0].innerHTML = fields[1];
	params()
}



//creates an unordered list for each test case
function params() {
	f = document.getElementById("cases")
	let Li = document.createElement("Li");
	Li.setAttribute("class", "enclosingCase");
    testCaseNumber+=1
	Li.innerHTML+=testCaseNumber;
	//Li.setAttribute("class", "box")
	for (var i = 0; i<numParams; i++) {
		let li = document.createElement("li")
		li.setAttribute("class", "box")
		inp = document.createElement("input");
		inp.setAttribute('type', "text")
		li.append(inp)
		//li.setAttribute('class', "testCase")
		Li.append(li)
	}
	//Li.append(document.getElementsByClassName("buffered")[0])
	Li.innerHTML+="<br>"
	f.append(Li)


}


function submitter(ol) {
	console.log(ol)
	let cases = ol.getElementsByClassName("box")
	// let case = []
	let evals = []
	for (var i = 0; i<cases.length; i+=numParams) {
		console.log()
	}

}

function hello1(id, data) {
	document.getElementById(id).innerHTML = "";
	f = document.getElementById(id)
	// data.forEach(value => {
	// 	$(f).append('<li class="testCase">' + value + "</li>")
	// 	console.log()
	// });
	for (var i = 1; i<=data.length; i++) {
		var item = document.createElement("li");
		item.setAttribute('class', 'testCase')
		item.textContent = "Test Case " + i + ": " + data[i-1]
		$(f).append(item)
		//$(f).append('<li class="testCase">Test Case ' + i + ": " + data[i-1] + "</li>")
	}
	document.getElementById("list").style.height = "100%;"
}

$(document).ready(parser);
