const fs = require('fs');
const stream = fs.createReadStream(__dirname + '/text.txt', 'utf8');
stream.on('data', function(chunk){
  console.log(chunk);
});
// stream.on('end', () => console.log('End', data.length));
stream.on('error', error => console.log('Error', error.message));