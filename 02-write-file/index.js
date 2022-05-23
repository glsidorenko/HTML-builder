const fileStream = require('fs');
const path = require('path');
const readline = require('readline');

const dirPath = path.join(__dirname, '/text.txt');

const writableStream = fileStream.createWriteStream(dirPath); // Create new file

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('Enter any text or type \'exit\' to close the program\n');
rl.prompt();
rl.on('line', (answer) => {
  if (answer === 'exit') {
    console.log('The program has been closed\n');
    rl.close();
  } 
  else writableStream.write(answer);
});

// If Ctrl + c pressed
rl.on('SIGINT', () => {
  rl.question('Do you really want to exit (y or n)? ', (input) => {
    if (input.match(/^y(es)?$/i)) { rl.pause(); }
  });
});

