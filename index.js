// let sys = require('sys')
let exec = require('child_process').exec;



function showOutput(error, stdout, stderr) {
  console.log(stdout);
}

exec("npm start", showOutput);
