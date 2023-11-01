var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.json({message:'Listening at port 8000', status: 200});
});


app.listen('8000', () => {
    console.log("server started");
})