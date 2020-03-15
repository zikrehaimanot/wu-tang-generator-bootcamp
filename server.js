const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    let response = nameGenerator(params)
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
  }
  else if (page == '/css/main.css'){
    fs.readFile('css/main.css', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);

let firstName = ['RZA', 'Ghostface', 'Spongebob', 'Method', 'Ol Dirty']
let lastName = [' SZA', ' Trilla', ' Squarepants', ' Woman', ' Bastard']

function nameGenerator(params){
  let answers = Object.values(params)
  let firstNameCount = 0
  let lastNameCount = 0
  let name;

  if(answers){
    for(let i = 0; i<answers.length -1; i++){
      if(answers[i] === "Yes"){
        firstNameCount++
      }else if(answers[i] === "No"){
        lastNameCount++
      }
    }
      name = firstName[firstNameCount].concat(lastName[lastNameCount])
      return {name: name}
    }
}

// console.log(firstName[firstNameCount])
// console.log(lastName[lastNameCount])
// if(!lastName[lastNameCount] == 0){
//   name = firstName[firstNameCount].concat(["Batman"])
//   return
// }
// else if(firstNameCount === 5){
//   // name = firstName[4].concat(lastName[0])
//   return "Yes Person"
// }else if(lastNameCount === 5){
//   // name = firstName[0].concat(lastName[4])
//   return "No Person"
// }
// function nameGenerator(params){
//
//
//   let answers = Object.values(params)
//   console.log(answers)
//   let firstNameCount = 0
//   let lastNameCount = 0
//
//   for(let i = 0; i<answers.length; i++){
//     let name = firstName[i].concat(lastNames[i])
//   }
//   console.log(name)
//
// }
