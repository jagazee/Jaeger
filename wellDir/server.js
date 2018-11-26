var express = require('express');
var app = express();

var wells = [
    {id: 1, name: 'WellName-1'},
    {id: 2, name: 'WellName-2'},
    {id: 3, name: 'WellName-3'},
    {id: 4, name: 'WellName-4'},
];

app.get('/api/wells', function (req, res) {
    res.send(wells);
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Listening on port ${port}`);