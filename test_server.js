const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const { exec } = require('child_process');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
  // send index.html with code supplied by POST request
  var code = req.body.codeArea;
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file.');
    }
    const content = data.replace(/<pre>[^<]*<\/pre>/, `<pre>\n${code}\n</pre>`);
    res.send(content);
  });
});
         
app.get('/update-source-js', (req, res) => {
  const webppl_path = '/home/wo/programming/webpplview/webppl';
  const this_path = '/home/wo/programming/webppl-rsa';
  const cmd = 'cd '+webppl_path+' && grunt browserify:'+this_path;
  exec(cmd, (error, stdout, stderr) => {
    console.log(cmd);
    if (error) {
      console.log("Error");
      console.error('Error:', error);
      res.status(500).send('Error executing command');
    } else {
      console.log('Command executed successfully');
      res.status(200).send('Command executed successfully');
    }
  });
});

app.get('/update-bundle', (req, res) => {
  const webppl_path = '/home/wo/programming/webpplview/webppl';
  const this_path = '/home/wo/programming/webppl-rsa';
  const cmd = 'cd '+webppl_path+' && grunt bundle:'+this_path;
  exec(cmd, (error, stdout, stderr) => {
    console.log(cmd);
    if (error) {
      console.log("Error");
      console.error('Error:', error);
      res.status(500).send('Error executing command');
    } else {
      console.log('Command executed successfully');
      res.status(200).send('Command executed successfully');
    }
  });
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
