function expandList(problem){
    var dl = document.getElementById("problem-list");
    console.log(problem)


    var dt = document.createElement("dt");
    dt.setAttribute("id", problem.name);
    dt.setAttribute("class", "problemListing")
    var a = document.createElement("a");
    var buffer = document.createElement("div");
    buffer.setAttribute('class','buffer');
    /*
    Needs to get object containing the description term AND the description itself, appending the description after the description terms
    */
    var dd = document.createElement("dd");
    dd.setAttribute('id',problem.description);
    a.textContent = problem.name;
    a.setAttribute('href',"code.html?" + problem.name + "+" + problem.description + "+" + problem.function_body);
    dt.appendChild(a);
    var button = document.createElement("button");
    button.setAttribute("value", "UpVote")
    button.setAttribute("class", "button")
    button.setAttribute("onclick", 'toggleUpVote(document.getElementById().parentElement);')
    /*
    dt.appendChild(document.createTextNode(problem.value));
    */
    dt.append(button)
    dl.appendChild(dt);
    dl.appendChild(dd);

    dl.appendChild(buffer);
}


function toggleUpVote(element) {
  console.log(element)

}



function getChallenges() {

    let URL = "/challenges"
    console.log(URL)
    var request = new XMLHttpRequest();
    console.log(request)
    request.open('GET', URL, true);
    request.onload = function () {

      // Begin accessing JSON data here
      var data = JSON.parse(this.response);
      console.log(data)


      if (request.status >= 200 && request.status < 400) {
        data = data['problems'].filter(problem => {
          //console.log(problem.Body.language);
          //console.log(document.getElementById("language").value);
          return problem.Body.language === document.getElementById("language").value;
        })
        console.log(data)
        data.sort(function(a,b) {
          return a.votes-b.votes;
        })
        data.forEach(problem => {
          //console.log(problem.Body);
          expandList(problem.Body);
        });
      } else {
        console.log('error');
      }
   }


    request.send();
}

function newChallenges() {
  document.getElementById("problem-list").innerHTML = "";
  getChallenges()
}


$(document).ready(getChallenges());
