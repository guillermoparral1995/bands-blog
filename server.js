const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// This serves static files from the specified directory
app.use(express.static(__dirname));

const server = app.listen(8081, () => {

    const host = server.address().address;
    const port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});

app.post('/pages/contact/contact.html', (req, res) => {
   res.sendFile(__dirname + '/pages/contact/ok.html');
});



