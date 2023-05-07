const fs = require('fs');
const path = require('path');
const process = require('process');
const newFile = path.join(__dirname, 'test.txt');
const newMessage = fs.createWriteStream(newFile);

process.stdout.write('Hi! Please, write me a message\n');
process.on('SIGINT', end);
process.stdin.on('data', (data)=>{
  if(data.toString().trim() === 'exit'){
    end();
  }
  newMessage.write(data);
});

function end() {
  process.stdout.write('\nThank you!');
  process.exit();
}

