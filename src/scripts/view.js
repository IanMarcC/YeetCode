function expandList(){
    var dl = document.getElementById("problem-list");
    var problem = document.getElementById("problem");
    var description = document.getElementById("problem");
    var dt = document.createElement("dt");
    var a = document.createElement("a");
    var buffer = document.createElement("div");
    buffer.setAttribute('class','buffer');
    /*
    Needs to get object containing the description term AND the description itself, appending the description after the description terms
    */
    var dd = document.createElement("dd");
    dd.setAttribute('id',problem.value);
    a.textContent = problem.value;
    a.setAttribute('href',"code.html");
    dt.appendChild(a);
    /*
    dt.appendChild(document.createTextNode(problem.value));
    */
    dl.appendChild(dt);
    dl.appendChild(dd);
    dl.appendChild(buffer);
}