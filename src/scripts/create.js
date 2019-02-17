/*#var request = new XMLHTTPRequest();*/
function requestHandler(language,title,prompt,funct) {
    var arr = [language, title,prompt, funct];
    console.log(arr);
    var url = '/server.js';
    /*
    #request.open('POST', url, true);
    #request.onreadystatechange = sendData;
   # request.send(arr);
   */
}
function sendData() {
    if (request.readyState == 4 && request.status == 200) {
        alert('Challenge added!');
    } else {
        alert('You even yeeted the challenge creator.');
        console.log(request);
    }
    
};