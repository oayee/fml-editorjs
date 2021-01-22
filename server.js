var express = require('express');
var path = require('path');

app = express();

app.use(express.static(__dirname));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('server started '+ port);
